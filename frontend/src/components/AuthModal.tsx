import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { X, Lock, Mail, User, Eye, EyeOff, ShieldCheck, CheckCircle2, ArrowRight, Smartphone, Globe } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
  onLoginSuccess: (user: UserProfile) => void;
  onRegisterSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'login',
  onLoginSuccess,
  onRegisterSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Registration form state
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Feedback messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);
    
    if (!loginIdentifier.trim()) {
        setErrorMessage('Please enter your email address.');
        setIsSubmitting(false);
        return;
    }
    
    if (!loginIdentifier.includes('@')) {
        setErrorMessage('Please sign in using the email address associated with your account.');
        setIsSubmitting(false);
        return;
    }
    
    if (!loginPassword) {
        setErrorMessage('Please enter your password.');
        setIsSubmitting(false);
        return;
    }
    
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginIdentifier.trim(),
                    password: loginPassword,
                }),
            }
        );
        
        const data = await response.json();
        
        if (!response.ok) {
            if (data.errors?.length) {
                setErrorMessage(data.errors.join(' '));
            } else {
                setErrorMessage(data.error || 'Unable to sign in.');
            }
            return;
        }
        
        // Save authentication token
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('authToken', data.token);
        // Convert backend user into your frontend UserProfile format
        const user: UserProfile = {
            fullName: data.user.fullName,
            email: data.user.email,
            phone: '',
            city: '',
            subcity: '',
        };
        
        onLoginSuccess(user);
        onClose();
    } catch (error) {
        console.error('Login error:', error);
        setErrorMessage(
            'Unable to connect to the server. Please make sure the backend is running.'
        );
    } finally {
        setIsSubmitting(false);
    }
};

const handleRegisterSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMessage(null);
  setIsSubmitting(true);

  if (!regFullName.trim()) {
    setErrorMessage('Please enter your full name.');
    setIsSubmitting(false);
    return;
  }

  if (!regEmail.trim()) {
    setErrorMessage('Please enter a valid email address.');
    setIsSubmitting(false);
    return;
  }

  if (regPassword.length < 8) {
    setErrorMessage('Password must be at least 8 characters long.');
    setIsSubmitting(false);
    return;
  }

  if (regPassword !== regConfirmPassword) {
    setErrorMessage('Passwords do not match.');
    setIsSubmitting(false);
    return;
  }

  if (!agreeTerms) {
    setErrorMessage('You must agree to the Terms of Service.');
    setIsSubmitting(false);
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: regFullName.trim(),
          email: regEmail.trim(),
          password: regPassword,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (data.errors?.length) {
        setErrorMessage(data.errors.join(' '));
      } else {
        setErrorMessage(data.error || 'Unable to create your account.');
      }
      return;
    }

    // Save authentication token
    localStorage.setItem('authToken', data.token);

    // Convert backend user into your frontend UserProfile format
    const newUser: UserProfile = {
      fullName: data.user.fullName,
      email: data.user.email,
      phone: '',
      city: '',
      subcity: '',
    };

    onRegisterSuccess(newUser);
    onClose();
  } catch (error) {
    console.error('Registration error:', error);
    setErrorMessage(
      'Unable to connect to the server. Please make sure the backend is running.'
    );
  } finally {
    setIsSubmitting(false);
  }
};

  const handleForgotPassword = () => {
    if (!loginIdentifier.trim()) {
      setErrorMessage('Please enter your email or phone above first.');
      return;
    }
    setForgotPasswordMessage(`Password reset link sent to ${loginIdentifier}. Please check your messages.`);
    setTimeout(() => setForgotPasswordMessage(null), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-[#c3c6d2] relative flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-[#003874] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#FFD200]" />
            <div>
              <h2 className="text-lg font-bold">Addis Ber Security Portal</h2>
              <p className="text-[11px] text-gray-300">Ethiopia's Trusted Marketplace</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#e2e2e8] bg-[#f3f3fa]">
          <button
            onClick={() => {
              setActiveTab('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'login'
                ? 'border-[#1A4F95] text-[#1A4F95] bg-white'
                : 'border-transparent text-[#737782] hover:text-[#1a1c20]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'register'
                ? 'border-[#1A4F95] text-[#1A4F95] bg-white'
                : 'border-transparent text-[#737782] hover:text-[#1a1c20]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {forgotPasswordMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{forgotPasswordMessage}</span>
            </div>
          )}

          {activeTab === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#424751] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#737782] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. yonas@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#c3c6d2] text-xs outline-none focus:border-[#1A4F95] bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-[#424751]">Password</label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[11px] text-[#1A4F95] hover:underline cursor-pointer font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#737782] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-[#c3c6d2] text-xs outline-none focus:border-[#1A4F95] bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737782] hover:text-[#1a1c20]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#424751]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#c3c6d2] text-[#1A4F95] focus:ring-[#1A4F95]"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1A4F95] hover:bg-[#003874] text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95 mt-2"
              >
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#e2e2e8]" />
                </div>
                <span className="relative bg-white px-3 text-[10px] uppercase font-bold text-[#737782] tracking-wider">
                  Or Quick Sign In
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onLoginSuccess({
                      fullName: 'Telebirr User',
                      email: 'telebirr.user@addisber.et',
                      phone: '0911000999',
                      city: 'Addis Ababa',
                      subcity: 'Bole',
                    });
                    onClose();
                  }}
                  className="py-2 px-3 border border-[#c3c6d2] rounded-xl text-xs font-semibold text-[#003874] hover:bg-[#f3f3fa] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-[#1A4F95]" />
                  <span>Telebirr Quick</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onLoginSuccess({
                      fullName: 'Google User',
                      email: 'google.user@gmail.com',
                      phone: '0922111222',
                      city: 'Addis Ababa',
                      subcity: 'Kazanchis',
                    });
                    onClose();
                  }}
                  className="py-2 px-3 border border-[#c3c6d2] rounded-xl text-xs font-semibold text-[#424751] hover:bg-[#f3f3fa] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-red-500" />
                  <span>Google Account</span>
                </button>
              </div>

              <p className="text-center text-xs text-[#737782] pt-3">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setErrorMessage(null);
                  }}
                  className="text-[#1A4F95] font-bold hover:underline cursor-pointer"
                >
                  Register now
                </button>
              </p>
            </form>
          ) : (
            /* Registration Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#424751] mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#737782] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Abebe Bikila"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#c3c6d2] text-xs outline-none focus:border-[#1A4F95] bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">

                <div>
                  <label className="block text-xs font-semibold text-[#424751] mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#737782] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="abebe@example.com"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#c3c6d2] text-xs outline-none focus:border-[#1A4F95] bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#424751] mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full px-3 py-2 rounded-xl border border-[#c3c6d2] text-xs outline-none focus:border-[#1A4F95] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#424751] mb-1">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-3 py-2 rounded-xl border border-[#c3c6d2] text-xs outline-none focus:border-[#1A4F95] bg-white"
                  />
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[#424751]">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="rounded border-[#c3c6d2] text-[#1A4F95] focus:ring-[#1A4F95] mt-0.5"
                  />
                  <span>
                    I agree to Addis Ber's <a href="#" className="text-[#1A4F95] underline">Terms of Service</a> & <a href="#" className="text-[#1A4F95] underline">Privacy Policy</a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FFD200] hover:bg-[#ecc200] text-[#0D1117] font-extrabold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95 mt-2"
              >
                <span>Create Addis Ber Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-xs text-[#737782] pt-2">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setErrorMessage(null);
                  }}
                  className="text-[#1A4F95] font-bold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
