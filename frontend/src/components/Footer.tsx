import React, { useState } from 'react';
import { Globe, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { VISA_LOGO, MASTERCARD_LOGO } from '../data/products';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onShopFlashSale: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onShopFlashSale }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#0D1117] w-full text-white pt-12 pb-8 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <a href="#" className="text-2xl font-extrabold text-[#FFD200] tracking-tight block">
              Addis Ber
            </a>
            <p className="text-xs text-[#c3c6cf] leading-relaxed">
              Your reliable guide to the finest marketplace experience in Ethiopia. We bring quality, trust, and efficiency to your doorstep across Addis Ababa and beyond.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFD200]/20 hover:text-[#FFD200] transition-colors text-xs"
                title="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:support@addisber.et"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFD200]/20 hover:text-[#FFD200] transition-colors text-xs"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:+251911000000"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFD200]/20 hover:text-[#FFD200] transition-colors text-xs"
                title="Call Us"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-[#c3c6cf]">
              <li>
                <button
                  onClick={() => onSelectCategory('All')}
                  className="hover:text-[#FFD200] transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('All')}
                  className="hover:text-[#FFD200] transition-colors cursor-pointer text-left"
                >
                  Browse Categories
                </button>
              </li>
              <li>
                <button
                  onClick={onShopFlashSale}
                  className="hover:text-[#FFD200] transition-colors cursor-pointer text-left"
                >
                  Flash Sales
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('All')}
                  className="hover:text-[#FFD200] transition-colors cursor-pointer text-left"
                >
                  Become a Seller
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5 text-xs text-[#c3c6cf]">
              <li><a href="#" className="hover:text-[#FFD200] transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-[#FFD200] transition-colors">Shipping Policy (Addis & Regional)</a></li>
              <li><a href="#" className="hover:text-[#FFD200] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#FFD200] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#FFD200] transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">Newsletter</h4>
            <p className="text-xs text-[#c3c6cf] mb-3 leading-relaxed">
              Subscribe to receive updates on new arrivals, local flash sales, and exclusive deals.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FFD200] w-full"
                />
                <button
                  type="submit"
                  className="bg-[#FFD200] text-[#0D1117] px-4 py-2 rounded-lg font-bold text-xs hover:bg-[#ecc200] transition-all cursor-pointer whitespace-nowrap"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed successfully!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#c3c6cf]">
          <p>© 2026 Addis Ber Marketplace. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-gray-400">Accepted Payment Methods:</span>
            <img src={VISA_LOGO} alt="Visa" className="h-5 opacity-70 hover:opacity-100 transition-opacity" />
            <img src={MASTERCARD_LOGO} alt="Mastercard" className="h-5 opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </footer>
  );
};
