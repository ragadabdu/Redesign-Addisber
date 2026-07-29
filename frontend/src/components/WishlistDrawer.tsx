import React from 'react';
import type { Product } from '../types';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistedProducts,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-xs" />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#c3c6d2]">
          {/* Header */}
          <div className="p-6 bg-[#003874] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400 fill-red-400" />
              <h2 className="text-lg font-bold">Saved Favorites ({wishlistedProducts.length})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#e2e2e8]">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto text-red-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-[#003874] text-lg">No saved items yet</h3>
                <p className="text-xs text-[#737782] max-w-xs mx-auto">
                  Click the heart icon on any product to save it for later.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
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
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#737782]">{product.category}</p>
                      <p className="text-sm font-bold text-[#1A4F95] mt-1">
                        ETB {product.price.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onRemoveFromWishlist(product);
                      }}
                      className="mt-2 w-full py-2 bg-[#FFD200] hover:bg-[#ecc200] text-[#0D1117] font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
