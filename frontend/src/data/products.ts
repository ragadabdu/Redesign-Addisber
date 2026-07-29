import type { Product, Category } from '../types';

export const HERO_BANNER_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB2Q7k4ugiMz0BzWMrKdlZRqDXHih8eSU2eGF5XfKRbQ56Al40mBVEwSSC-Vyn33mjrw0elT49hEGd_CD_VQTHdtABkcT3a7fWyLwZN28CJwCGs_wBXxrWEUyNDUBFnfoM5Rg4FrOcT1rxYbUAjEya26uRxt31y1rCvMeXljWPQaHxrcA9TqnQXicBv1kVU3VhWUbz8Kf0BuI86g8B7M3u7qj0iHthJlz2P5GSRLihLZkOmEOBbghJoq6oAxsqGn605vqoUIs0';
export const FLASH_SALE_BG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_9CuYbvnQTUuxo5ILew4ApR6bJqNGxkPuvXcju9S4VlBv4yTJxaLl9MQOoeH1wVWMQVeq5HtO2qP836dx-rNoZ-V2LZQftTu7ZzCXBwaP1DCi4uWDACHUx0tjHX7TUE5NLcz_4OoH-g6fxeVFnZ7i6g9ZpskFH2Ng8ripMdN6LIb2h_8jt4Lzl35L2e_eSEN2Qanz1TQphpxsb7lTbYBd6WdyU6JBZG4HOu1tbO8gr4g4dStsurBpeCQ4sd0RID0lFOCqlnx-';
export const VISA_LOGO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI1JahxGQNFiXbKlMLGcg6I34PseznTLKiNjUix7dbYq0DkZ1YBjqVXaj7FmDo97nJREJN_dZ37y68KvU0D2cm3HW4seCOR7GKRJ3TwSC3r1gWOSb8w88ll-0x-ob8Qv9lhHolcjE4bCE7oNosvLcub_PZiDu3Tgo34HUddVOaSZ3RDo-wwt7aFujffrwXJzghoGmHUbqZe8Ar42z4BVl38pwrYChQwyGyOQD1J0BQyCOKlVLgSurquMtwNqFXvrS8qfbrPWNZ';
export const MASTERCARD_LOGO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAdbB6ViUziSnzuFqMH7gqcLk8NWp-c_S0A3bSCrP3DbygQ-BwR_YAEWSqMDGBL9I7mA50RzSLoNeldP7QGQWUOXx0EFYCkxUlvp78mJg3e2bFEs8-AkUwZfrWhy80Zh-oM2rcSZUSgukHYenYQHTI1ICGvIcZXi6GvakROHam--Q1ThRuVnCG4NmUPjJxZKansMPZkFLqCyx71sBpPsWMXbM-0W99AzkLY7-nhvacKNTJNB2aQo2H4JU2QrT4y3dgzRs60zeg';

export const CATEGORIES: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    subtitle: 'Cutting edge tech for every lifestyle',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA26-JxUf512-OdFvQuRUkSweQtpqyJ-nL6cR_gAJskzrGzrLyQaKk_1Lhw-Y_P-uqs1GpfA_IrQzPAWUhvbAYShYjHR7xIIZwWLjTytTFgTfHxqUsQNR-6JEHzS5Kq1jLGgnMpXjFJhhbFuDoAbXNCPkkFWfSlwjKQqlVMee2pNug7xKxhzUq_cfGVAdmLjAqCIQo_ozTsi80YEP0MY72LqPkMrLMOx-yQ_isMz8AMgt_U1EqwNJC9izEaT-c2z6nYfUs07o7k',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    subtitle: 'Timeless styles',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmsvJFGJ_98kITd-isANfqPz-Ox0IpiSEkMoNDgtyVT6l_bqtsCZ1rlAq8FFe8DeA7GQtNVBxEhsaxv3NxRG43xNQnEFiqLhIIlGRm-f-9SX2mXDlLbPCZyIB9x-ZmPioMNUjWbWLU3Ko1tVng6hNgIvBcHVe2WiN4vGB8PIZrmX3NJTf0L7ICnd0qOwZWo8yljHyxQDWKWG81w3kk2DNSCxijA58Nb8z5slXr4ttdzL2xH1uKpil9ThOYQNO_CEZiMC2WZpEr'
  },
  {
    id: 'groceries',
    name: 'Groceries',
    subtitle: 'Daily essentials',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxSyIrCJoH4lfL52oDcEdxEhwspOw_LxGmIvLh4l72CJo96wp8pDsO4UMUBwdu5xF4XObGGNXq67bV09bUvG9lwEzqlrZRviGT48NgHyxUARuikGMHjTA-6pHORgw_GjkYS0EapOfPcGRgyFY25cpoX61mBsX44e_9Was5gj947Esai4LEdnGyxhwGdwuLBOOxu7KmlMUIJ5NtOi13R4AIo_aQls0LuF3Qo0WfrV3YATLMTMinmlUJYxKrdIBJFyNiurFsGlCq'
  },
  {
    id: 'home',
    name: 'Home & Living',
    subtitle: 'Elevate your space',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBazpAXqvvuYpbhgxMu-Wns23OJiAbyFVElH-uHtl1-rpmdBvNXFpgXvV_jFSxkEThKqvYWNCWj1cgAWG3ST3tAcvztGnEYY9LsmmNylyj1WwyJnD_v8213XnMaEtLNKqQgxNeKrD-UQQuFSCz0COI1TA9rkzRNaG70GUaTinJUwR0SAy8a6aZp7paIkeP1JN6_C7gOiSqmlXxd8dt6p-1TI-rSiUFoEwA_Kq1s6RfIq0Y4gMj2qjv2FHsbekVYGHWjK4Eoc3rO',
    colSpan: 'md:col-span-2'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'SonicPro Wireless X2',
    category: 'Electronics',
    price: 4500,
    rating: 4.5,
    reviewCount: 42,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB38cbCRbNuOXFR_rjLdz9cvtljnBeoNLj1HMmmp4BiHxzps8_8hqbShsBK_jssMmR6bIC6WpoFV9CNdINpVi_PRMYq-Lqs-2Uz6OMUkykhFxGOwgoBmH8IH5-906Rr2WSWZpnNc36JpWZGxkUhf7516N0cvoQxkCiBEYuRtP7nnFP_PL-hLATMm8UmwY8pnFiuDxyzQ2lyY0q27PjMM44TOKf2YhCldCYiUqM7P7tfluH0nRqzDaEtCqp1CtnC0oFgvvTAwsg1',
    badge: 'NEW',
    isFlashSale: true,
    description: 'Sleek matte-black wireless earbuds with active noise cancellation, deep bass performance, crystal-clear mic for phone calls, and 36-hour total battery life with fast Type-C charging case.',
    specs: {
      'Connectivity': 'Bluetooth 5.3',
      'Battery Life': '8 Hours + 28 Hours Case',
      'Noise Control': 'Active ANC & Transparency',
      'Water Resistance': 'IPX5 Sweat-proof'
    },
    inStock: true,
    stockCount: 18
  },
  {
    id: 'prod-2',
    name: 'Urban Brew Espresso Maker',
    category: 'Home & Kitchen',
    price: 8200,
    originalPrice: 9500,
    rating: 5.0,
    reviewCount: 18,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY-SFtb58zwpXeVt3eMV0cHrV0B6zHAQ0N35xNHv54VORCzNeSQ9LWZ-2ZSBHYvaODreEuQkqMzLWVc3o3kOZraV8nQJK9p99esVrzhNd1Pg2X8jBUXB52XW0hc6byiKTTf7gAi7Mk0ewEhitPPTguCMJynE_boXqXZ2a8hUuOn_EwxdZGupmc7ZTP4QQRKsKe-Zvs5PZqTVYvcdeDbMETdGKBFj3nZjS8ukT-7sVoaz56AJcl9ai0MtzhpZZhupGQAIiJlqMo',
    badge: 'SALE',
    isFlashSale: true,
    description: '15-Bar Italian pump espresso machine designed for authentic Ethiopian single-origin coffees. Features precision steam wand for silky microfoam cappuccinos and lattes.',
    specs: {
      'Pump Pressure': '15 Bar Italian Pump',
      'Water Tank': '1.5 Liter Removable',
      'Milk Frother': 'Stainless Steel Steam Wand',
      'Material': 'Brushed Stainless Steel & Matte White'
    },
    inStock: true,
    stockCount: 9
  },
  {
    id: 'prod-3',
    name: 'Heritage Tan Sneakers',
    category: 'Fashion',
    price: 2800,
    rating: 4.8,
    reviewCount: 56,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnG5Z5orReVsgFpy6MeTNiU0Q7OOEOj6aeUay23qYDveKbYDGEo8b4Rnr1qfCwVSCT5BI0rFDa7Ib2O-Ja2dY5ZXC2oLcPrGFdFFosIX8AnOjG9ekWYHPcvhWdrhYCEwGVvZfHw8P5gVojLWm76GYYQRlGT-VzKjEedCwXlNx73wg6fhvmitApjefJZRcRPy2bScFvar8M1T4iMRUmtB_49qplGLg0c7D5QYdB4_lEMlkolafhxtaVrDi_RbNaD31ZAZHMaL3a',
    badge: 'TRENDING',
    isFlashSale: false,
    description: 'Minimalist tan leather sneakers crafted with breathable canvas lining and durable rubber cupsole. Perfect for casual urban wear across Addis Ababa.',
    specs: {
      'Upper Material': 'Premium Full-Grain Leather',
      'Sole': 'Anti-slip Rubber Cupsole',
      'Color': 'Heritage Tan & Off-White',
      'Origin': 'Designed in Ethiopia'
    },
    inStock: true,
    stockCount: 24
  },
  {
    id: 'prod-4',
    name: 'Lumina Glow Skin Kit',
    category: 'Beauty & Personal Care',
    price: 3100,
    rating: 4.6,
    reviewCount: 120,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSdjLZxIpeLHvSptull28wlOs0EuxezK_0GKRAVfCa-FxlUFMAfAygrfNCKapD1J_2UZEAMFdD3PCDptNddchZFCZUFhPlW0m3grwEZkuPvic6odNpZQdkWWnX3CKvO5EYUZaOjSkr_licw_gF1AKy30jhN-C6MUzzROssZSQIdNEAq4G2QzeEDi-EiZhgobg_LIEuTeTm1N2V7O26tfV1lMOMn4BH9lgRnGjMZYs-Ej4BToh_SGSRrAuSMs842sGxZc3-8CQg',
    badge: 'NEW',
    isFlashSale: false,
    description: '4-step organic skincare routine set enriched with natural botanical oils, hyaluronic acid, and Vitamin C for deeply hydrated, luminous skin.',
    specs: {
      'Includes': 'Cleanser, Serum, Daily Moisturizer, Night Cream',
      'Skin Type': 'All Skin Types (Sensitive Friendly)',
      'Key Ingredients': 'Eucalyptus, Vitamin C, Niacinamide'
    },
    inStock: true,
    stockCount: 15
  },
  {
    id: 'prod-5',
    name: 'Yirgacheffe Reserve Specialty Beans (1kg)',
    category: 'Groceries',
    price: 1250,
    originalPrice: 1450,
    rating: 4.9,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
    badge: 'SALE',
    isFlashSale: true,
    description: 'Freshly roasted Grade-1 single origin Yirgacheffe coffee beans with delicate floral jasmine notes, bergamot citrus acidity, and honeyed sweetness.',
    specs: {
      'Roast Level': 'Medium Light Roast',
      'Process': 'Washed',
      'Elevation': '2,000m - 2,200m',
      'Weight': '1000g Sealed Valve Bag'
    },
    inStock: true,
    stockCount: 30
  },
  {
    id: 'prod-6',
    name: 'Addis Smart Pro Laptop 15"',
    category: 'Electronics',
    price: 42500,
    originalPrice: 48000,
    rating: 4.9,
    reviewCount: 34,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    badge: 'SALE',
    isFlashSale: true,
    description: 'Ultra-thin aluminum laptop powered by Core i7 processor, 16GB RAM, 512GB NVMe SSD, and crisp 2.8K Retina OLED display with back-lit keyboard.',
    specs: {
      'Processor': 'Intel Core i7 13th Gen',
      'RAM': '16GB LPDDR5',
      'Storage': '512GB PCIe Gen4 SSD',
      'Display': '15.6" 2.8K OLED (120Hz)'
    },
    inStock: true,
    stockCount: 7
  },
  {
    id: 'prod-7',
    name: 'Habesha Traditional Handwoven Dress',
    category: 'Fashion',
    price: 6500,
    rating: 5.0,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800',
    badge: 'HOT',
    isFlashSale: false,
    description: 'Authentic pure cotton Habesha Kemis crafted by master weavers with intricate border embroidery (Tibeb). Elegant for celebrations and formal events.',
    specs: {
      'Fabric': '100% Ethiopian Handspun Cotton',
      'Embroidery': 'Traditional Gold & Crimson Tibeb',
      'Includes': 'Matching Netela Shawl'
    },
    inStock: true,
    stockCount: 5
  },
  {
    id: 'prod-8',
    name: 'Nordic Teak Lounge Chair',
    category: 'Home & Kitchen',
    price: 14200,
    rating: 4.7,
    reviewCount: 14,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800',
    badge: 'NEW',
    isFlashSale: false,
    description: 'Solid teak wood lounge chair with woven linen cushion pads. Ergonomically reclined for luxurious living room relaxation and modern aesthetic.',
    specs: {
      'Frame': 'Solid Sustainable Teak Wood',
      'Cushions': 'High-Density Foam with Washable Linen Cover',
      'Dimensions': '75cm x 80cm x 85cm'
    },
    inStock: true,
    stockCount: 8
  }
];
