/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import type { Product, CartItem } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryBento } from './components/CategoryBento';
import { TrendingSection } from './components/TrendingSection';
import { TrustProps } from './components/TrustProps';
import { FlashSale } from './components/FlashSale';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AIShoppingGuide } from './components/AIShoppingGuide';
import { Footer } from './components/Footer';
import { Check, X, User, Package, MapPin, CreditCard, LogOut } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('addisber_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('addisber_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1'];
    } catch {
      return ['prod-1'];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAIGuideOpen, setIsAIGuideOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cartDiscount, setCartDiscount] = useState(0);

  // Persist Cart
  useEffect(() => {
    localStorage.setItem('addisber_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist Wishlist
  useEffect(() => {
    localStorage.setItem('addisber_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to cart`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from favorites`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to favorites`);
        return [...prev, product.id];
      }
    });
  };

  // Filter products based on search query. Category filtering is handled by TrendingSection.
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesQuery =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesQuery;
  });

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToTrending = () => {
    const section = document.getElementById('trending-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9ff] text-[#1a1c20]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#003874] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#FFD200]/30 animate-in slide-in-from-bottom duration-300">
          <div className="p-1 rounded-full bg-[#FFD200] text-[#003874]">
            <Check className="w-4 h-4 font-bold" />
          </div>
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-300 hover:text-white ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (cat !== 'All') {
            scrollToTrending();
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q) scrollToTrending();
        }}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenAIGuide={() => setIsAIGuideOpen(true)}
      />

      {/* Main Page Content */}
      <main className="pt-20 flex-1">
        {/* Search / Category Filter Notice */}
        {searchQuery && (
          <div className="bg-[#1A4F95] text-white py-3 px-4 text-center text-xs sm:text-sm font-medium">
            Showing search results for "<strong className="text-[#FFD200]">{searchQuery}</strong>"
            <button
              onClick={() => setSearchQuery('')}
              className="ml-3 underline hover:text-[#FFD200]"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Hero Banner */}
        {!searchQuery && selectedCategory === 'All' && (
          <HeroSection
            onShopNow={scrollToTrending}
            onViewDeals={() => {
              setSelectedCategory('Electronics');
              scrollToTrending();
            }}
          />
        )}

        {/* Bento Category Section */}
        {!searchQuery && selectedCategory === 'All' && (
          <CategoryBento
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              scrollToTrending();
            }}
          />
        )}

        {/* Trending Now & Product Catalog */}
        <div id="trending-section">
          <TrendingSection
            products={filteredProducts}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            wishlistIds={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        </div>

        {/* Trust & Value Proposition Cards */}
        {!searchQuery && selectedCategory === 'All' && <TrustProps />}

        {/* Flash Sale Banner */}
        {!searchQuery && selectedCategory === 'All' && (
          <FlashSale
            onShopFlashSale={() => {
              setSelectedCategory('Electronics');
              scrollToTrending();
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToTrending();
        }}
        onShopFlashSale={() => {
          setSelectedCategory('Electronics');
          scrollToTrending();
        }}
      />

      {/* Drawers & Modals */}
      <ProductModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        discount={cartDiscount}
        onDiscountChange={setCartDiscount}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedProducts={wishlistedProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        discount={cartDiscount}
        onClearCart={() => {
          setCart([]);
          setCartDiscount(0);
        }}
      />

      <AIShoppingGuide
        isOpen={isAIGuideOpen}
        onClose={() => setIsAIGuideOpen(false)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Account Modal */}
      {isAccountOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-[#c3c6d2] relative p-6 space-y-5">
            <div className="flex justify-between items-center border-b border-[#e2e2e8] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1A4F95] text-white font-bold text-lg flex items-center justify-center">
                  YA
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#003874]">Yonas Alemu</h3>
                  <p className="text-xs text-[#737782]">yonas.alemu@example.com</p>
                </div>
              </div>
              <button
                onClick={() => setIsAccountOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-[#424751]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#424751]">
              <div className="p-3 rounded-xl bg-[#f3f3fa] flex items-center gap-3">
                <Package className="w-5 h-5 text-[#1A4F95]" />
                <div>
                  <span className="font-bold text-[#003874] block">Active Orders</span>
                  <span>1 Order Dispatched (AB-98124)</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#f3f3fa] flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#1A4F95]" />
                <div>
                  <span className="font-bold text-[#003874] block">Default Shipping</span>
                  <span>Bole Subcity, House #402, Addis Ababa</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#f3f3fa] flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-[#1A4F95]" />
                <div>
                  <span className="font-bold text-[#003874] block">Payment Methods</span>
                  <span>Telebirr (0911****67) Linked</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsAccountOpen(false);
                showToast('Signed out of Addis Ber account');
              }}
              className="w-full py-2.5 rounded-xl border border-red-200 text-red-600 font-bold text-xs hover:bg-red-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
