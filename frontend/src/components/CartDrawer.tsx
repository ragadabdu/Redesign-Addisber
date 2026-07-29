import React, { useState } from 'react';
import type { CartItem } from '../types';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, Truck, Tag, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 5000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const discountAmount = (subtotal * discount) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ADDIS10' || promoCode.trim().toUpperCase() === 'WELCOME') {
      setDiscount(10);
      setPromoMessage('Promo code applied! 10% discount added.');
    } else {
      setPromoMessage('Invalid code. Try "ADDIS10" for 10% off!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#c3c6d2]">
          {/* Header */}
          <div className="p-6 bg-[#003874] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#FFD200]" />
              <h2 className="text-lg font-bold">Your Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tracker */}
          <div className="bg-[#f3f3fa] p-4 border-b border-[#e2e2e8]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#1a1c20] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#1A4F95]" />
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-700 font-bold">You qualify for FREE Addis Ababa Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-[#1A4F95]">ETB {remainingForFreeShipping.toLocaleString()}</strong> for Free Delivery
                  </span>
                )}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1A4F95] transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#e2e2e8]/60">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#f3f3fa] flex items-center justify-center mx-auto text-[#737782]">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-[#003874] text-lg">Your cart is empty</h3>
                <p className="text-xs text-[#737782] max-w-xs mx-auto">
                  Explore our electronics, fashion, groceries, and home products to start shopping!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#1A4F95] text-white rounded-lg text-sm font-semibold hover:bg-[#003874] transition-all"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg bg-[#f3f3fa] border border-[#e2e2e8]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-sm text-[#1a1c20] line-clamp-1">{product.name}</h4>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#737782]">{product.category}</p>
                      <p className="text-sm font-bold text-[#1A4F95] mt-1">
                        ETB {product.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#c3c6d2] rounded-md bg-white overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="p-1 hover:bg-gray-100 text-[#424751]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-[#1a1c20]">{quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="p-1 hover:bg-gray-100 text-[#424751]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs font-semibold text-[#424751]">
                        Subtotal: ETB {(product.price * quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#f3f3fa] border-t border-[#c3c6d2] space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-[#737782] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. ADDIS10)"
                    className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#c3c6d2] text-xs bg-white outline-none focus:border-[#1A4F95]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#003874] text-white text-xs font-bold rounded-lg hover:bg-[#1A4F95]"
                >
                  Apply
                </button>
              </form>
              {promoMessage && (
                <p className={`text-[11px] font-medium ${discount > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                  {promoMessage}
                </p>
              )}

              {/* Total Summary */}
              <div className="space-y-1.5 text-xs text-[#424751] pt-2 border-t border-[#c3c6d2]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1a1c20]">ETB {subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({discount}%)</span>
                    <span>- ETB {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery (Addis Ababa)</span>
                  <span className="font-semibold text-emerald-700">
                    {subtotal >= freeShippingThreshold ? 'FREE' : 'ETB 250'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#003874] pt-2 border-t border-[#c3c6d2]">
                  <span>Total</span>
                  <span>ETB {(finalTotal + (subtotal >= freeShippingThreshold ? 0 : 250)).toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-[#FFD200] hover:bg-[#ecc200] text-[#0D1117] font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#737782] flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1A4F95]" /> Guaranteed safe checkout with Telebirr & CBE
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
