const crypto = require('crypto');
const cors = require('cors');
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = Number(process.env.PORT || 3000);
const databaseUrl = process.env.DATABASE_URL;
const tokenSecret = process.env.AUTH_TOKEN_SECRET || 'development-only-auth-secret';
const tokenTtlSeconds = Number(process.env.AUTH_TOKEN_TTL_SECONDS || 60 * 60 * 24 * 7);
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : null;

if (tokenSecret === 'development-only-auth-secret') {
  console.warn('AUTH_TOKEN_SECRET is not set. Using an insecure development secret.');
}

app.use(cors());
app.use(express.json({ limit: '16kb' }));

const requireDatabase = (req, res, next) => {
  if (!pool) {
    res.status(503).json({ error: 'DATABASE_URL is not configured' });
    return;
  }
  next();
};

const base64UrlEncode = (value) =>
  Buffer.from(value).toString('base64url');

const base64UrlJson = (value) =>
  base64UrlEncode(JSON.stringify(value));

const signToken = (payload) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: now + tokenTtlSeconds,
  };
  const unsignedToken = `${base64UrlJson(header)}.${base64UrlJson(tokenPayload)}`;
  const signature = crypto
    .createHmac('sha256', tokenSecret)
    .update(unsignedToken)
    .digest('base64url');

  return `${unsignedToken}.${signature}`;
};

const verifyToken = (token) => {
  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }

  const [header, payload, signature] = parts;
  const unsignedToken = `${header}.${payload}`;
  const expectedSignature = crypto
    .createHmac('sha256', tokenSecret)
    .update(unsignedToken)
    .digest('base64url');

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!decoded.exp || decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
};

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { hash, salt };
};

const verifyPassword = (password, salt, storedHash) => {
  const { hash } = hashPassword(password, salt);
  const hashBuffer = Buffer.from(hash, 'hex');
  const storedHashBuffer = Buffer.from(storedHash, 'hex');

  return (
    hashBuffer.length === storedHashBuffer.length &&
    crypto.timingSafeEqual(hashBuffer, storedHashBuffer)
  );
};

const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

const validateAuthInput = ({ fullName, email, password }, mode) => {
  const errors = [];
  const normalizedEmail = normalizeEmail(email);

  if (mode === 'register' && !String(fullName || '').trim()) {
    errors.push('Full name is required.');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    errors.push('A valid email address is required.');
  }

  if (typeof password !== 'string' || password.length < 8) {
    errors.push('Password must be at least 8 characters.');
  }

  return { errors, normalizedEmail };
};

const toPublicUser = (user) => ({
  id: user.id,
  fullName: user.full_name,
  email: user.email,
  createdAt: user.created_at,
});

const createAuthResponse = (user) => ({
  user: toPublicUser(user),
  token: signToken({ sub: user.id, email: user.email }),
  tokenType: 'Bearer',
  expiresIn: tokenTtlSeconds,
});

const requireAuth = async (req, res, next) => {
  if (!pool) {
    res.status(503).json({ error: 'DATABASE_URL is not configured' });
    return;
  }

  const authHeader = req.get('authorization') || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    res.status(401).json({ error: 'Bearer token is required.' });
    return;
  }

  const payload = verifyToken(token);
  if (!payload?.sub) {
    res.status(401).json({ error: 'Invalid or expired token.' });
    return;
  }

  try {
    const result = await pool.query(
      'SELECT id, full_name, email, created_at FROM users WHERE id = $1',
      [payload.sub]
    );

    if (result.rowCount === 0) {
      res.status(401).json({ error: 'User no longer exists.' });
      return;
    }

    req.user = result.rows[0];
    next();
  } catch (error) {
    next(error);
  }
};

const initializeDatabase = async () => {
  if (!pool) {
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx
    ON users (LOWER(email));
  `);
};

app.get('/', (req, res) => {
  res.json({
    name: 'Addis Ber API',
    endpoints: ['/health', '/db-health', '/auth/register', '/auth/login', '/auth/me'],
  });
});

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'addisber-backend' });
});

app.get('/db-health', requireDatabase, async (req, res, next) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, database: 'reachable' });
  } catch (error) {
    next(error);
  }
});

app.post('/auth/register', requireDatabase, async (req, res, next) => {
  const { fullName, email, password } = req.body || {};
  const { errors, normalizedEmail } = validateAuthInput({ fullName, email, password }, 'register');

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  const { hash, salt } = hashPassword(password);

  try {
    const result = await pool.query(
      `
        INSERT INTO users (id, full_name, email, password_hash, password_salt)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, full_name, email, created_at
      `,
      [crypto.randomUUID(), String(fullName).trim(), normalizedEmail, hash, salt]
    );

    res.status(201).json(createAuthResponse(result.rows[0]));
  } catch (error) {
    if (error.code === '23505') {
      res.status(409).json({ error: 'An account with that email already exists.' });
      return;
    }
    next(error);
  }
});

app.post('/auth/login', requireDatabase, async (req, res, next) => {
  const { email, password } = req.body || {};
  const { errors, normalizedEmail } = validateAuthInput({ email, password }, 'login');

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  try {
    const result = await pool.query(
      `
        SELECT id, full_name, email, password_hash, password_salt, created_at
        FROM users
        WHERE LOWER(email) = LOWER($1)
      `,
      [normalizedEmail]
    );

    const user = result.rows[0];
    if (!user || !verifyPassword(password, user.password_salt, user.password_hash)) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    res.json(createAuthResponse(user));
  } catch (error) {
    next(error);
  }
});

app.get('/auth/me', requireAuth, (req, res) => {
  res.json({ user: toPublicUser(req.user) });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error.' });
});

let server;

initializeDatabase()
  .then(() => {
    server = app.listen(port, () => {
      console.log(`Addis Ber backend listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database', error);
    process.exit(1);
  });

const shutdown = async () => {
  if (pool) {
    await pool.end();
  }
  if (server) {
    server.close(() => process.exit(0));
    return;
  }
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
