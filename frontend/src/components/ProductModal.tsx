import React, { useState } from 'react';
import type { Product } from '../types';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Truck, Check, Minus, Plus } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!isOpen || !product) return null;

  const formattedPrice = `ETB ${product.price.toLocaleString()}`;
  const formattedOriginalPrice = product.originalPrice ? `ETB ${product.originalPrice.toLocaleString()}` : null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#c3c6d2] relative max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#424751] hover:text-black transition-colors shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 bg-[#f3f3fa] p-6 flex items-center justify-center relative min-h-[280px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full max-h-[350px] object-cover rounded-xl shadow-xs"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-[#FFD200] text-[#0D1117] text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#1A4F95] uppercase tracking-wider">
                {product.category}
              </span>
              <h2 className="text-2xl font-bold text-[#003874] mt-1">{product.name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#FFD200]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#FFD200] text-[#FFD200]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#1a1c20]">{product.rating}</span>
                <span className="text-xs text-[#737782]">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-[#1A4F95]">{formattedPrice}</span>
              {formattedOriginalPrice && (
                <span className="text-sm text-[#737782] line-through">{formattedOriginalPrice}</span>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md w-fit">
              <Check className="w-3.5 h-3.5" />
              <span>In Stock ({product.stockCount} available at Addis Ababa fulfillment center)</span>
            </div>

            {/* Description */}
            <p className="text-sm text-[#424751] leading-relaxed">{product.description}</p>

            {/* Specs if available */}
            {product.specs && (
              <div className="bg-[#f3f3fa] p-3.5 rounded-xl border border-[#e2e2e8] space-y-1.5 text-xs">
                <p className="font-bold text-[#003874] uppercase text-[10px] tracking-wider mb-1">Key Specifications</p>
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-[#424751]">
                    <span className="font-medium">{key}:</span>
                    <span className="font-semibold text-[#1a1c20]">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Section */}
          <div className="pt-6 border-t border-[#e2e2e8] mt-6 space-y-3">
            <div className="flex items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-[#c3c6d2] rounded-lg bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 text-[#424751] hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 font-bold text-sm text-[#1a1c20] min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 text-[#424751] hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-6 bg-[#FFD200] hover:bg-[#ecc200] text-[#0D1117] font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-800" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add {quantity} to Cart</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'border-red-300 bg-red-50 text-red-600'
                    : 'border-[#c3c6d2] hover:bg-gray-50 text-[#424751]'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#737782] pt-1">
              <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-[#1A4F95]" /> Same-day delivery in Addis</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#1A4F95]" /> 100% Authentic Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
