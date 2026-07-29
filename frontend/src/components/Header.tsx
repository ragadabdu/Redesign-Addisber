import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Heart, User, ShoppingCart, Menu, X, Sparkles, LogIn, UserPlus } from 'lucide-react';
import type { UserProfile } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onOpenAIGuide: () => void;
  currentUser?: UserProfile | null;
  onOpenAuth: (tab: 'login' | 'register') => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onOpenAIGuide,
  currentUser,
  onOpenAuth,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Groceries', 'Beauty & Personal Care'];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md'
          : 'bg-[#ffffff] shadow-xs'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 flex items-center justify-between w-full">
        {/* Brand Logo & Desktop Nav */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onSelectCategory('All')}
            className="text-2xl font-bold text-[#1A4F95] flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFD200]/20 flex items-center justify-center text-[#FFD200] group-hover:bg-[#FFD200] group-hover:text-[#003874] transition-colors">
              <ShoppingBag className="w-6 h-6 text-[#FFD200] fill-[#FFD200] group-hover:text-[#003874] group-hover:fill-[#003874]" />
            </div>
            <span className="tracking-tight font-extrabold text-[#003874]">Addis Ber</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`text-sm font-medium transition-colors py-1 relative cursor-pointer ${
                    isActive
                      ? 'text-[#1A4F95] font-semibold border-b-2 border-[#1A4F95]'
                      : 'text-[#424751] hover:text-[#1A4F95]'
                  }`}
                >
                  {cat === 'Home & Kitchen' ? 'Home' : cat === 'Beauty & Personal Care' ? 'Beauty' : cat}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Search Input */}
        <div className="flex-1 max-w-md mx-6 hidden md:block">
          <div className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for products, brands..."
              className="w-full h-10 pl-4 pr-10 rounded-full border border-[#c3c6d2] bg-[#f3f3fa] focus:ring-2 focus:ring-[#1A4F95] focus:border-transparent transition-all text-sm outline-none text-[#1a1c20]"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#424751] w-4 h-4 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-9 top-1/2 -translate-y-1/2 text-xs text-[#737782] hover:text-black"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* AI Guide Button */}
          <button
            onClick={onOpenAIGuide}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#1A4F95]/10 to-[#FFD200]/30 hover:from-[#1A4F95]/20 hover:to-[#FFD200]/50 text-[#003874] text-xs font-semibold transition-all border border-[#1A4F95]/20"
            title="Ask Addis Ber AI Guide"
          >
            <Sparkles className="w-4 h-4 text-[#1A4F95] animate-pulse" />
            <span>AI Guide</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="p-2.5 rounded-full hover:bg-[#f3f3fa] transition-colors text-[#424751] relative cursor-pointer"
            title="Favorites"
          >
            <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Account / Auth */}
          {currentUser ? (
            <button
              onClick={onOpenAccount}
              className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full hover:bg-[#f3f3fa] border border-[#c3c6d2]/60 transition-colors text-[#424751] cursor-pointer"
              title="Account Details"
            >
              <div className="w-7 h-7 rounded-full bg-[#1A4F95] text-white text-xs font-bold flex items-center justify-center">
                {currentUser.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase() || 'YA'}
              </div>
              <span className="hidden md:inline text-xs font-semibold text-[#003874] max-w-[100px] truncate">
                {currentUser.fullName.split(' ')[0]}
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth('login')}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-[#003874] hover:bg-[#f3f3fa] transition-colors cursor-pointer"
                title="Sign In"
              >
                <LogIn className="w-3.5 h-3.5 text-[#1A4F95]" />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FFD200] hover:bg-[#ecc200] text-[#0D1117] transition-all cursor-pointer shadow-2xs"
                title="Create Account"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </button>
              <button
                onClick={() => onOpenAuth('login')}
                className="sm:hidden p-2.5 rounded-full hover:bg-[#f3f3fa] transition-colors text-[#424751] cursor-pointer"
                title="Sign In / Register"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="p-2.5 sm:px-4 sm:py-2 rounded-full bg-[#1A4F95] text-white hover:bg-[#003874] transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
            title="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">
              Cart ({cartCount})
            </span>
            <span className="inline sm:hidden text-xs font-bold bg-[#FFD200] text-[#003874] px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#f3f3fa] text-[#424751]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-[#c3c6d2] shadow-lg p-4 space-y-3 z-50">
          <div className="relative mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full h-10 pl-4 pr-10 rounded-full border border-[#c3c6d2] bg-[#f3f3fa] text-sm outline-none"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#424751] w-4 h-4" />
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-[#737782] uppercase px-2 mb-1">Categories</p>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#1A4F95]/10 text-[#1A4F95] font-bold'
                    : 'text-[#424751] hover:bg-[#f3f3fa]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onOpenAIGuide();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FFD200] text-[#003874] font-bold text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Addis Ber AI Assistant</span>
          </button>
        </div>
      )}
    </header>
  );
};
