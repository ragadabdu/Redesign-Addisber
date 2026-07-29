import React from 'react';
import type { Product } from '../types';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const formattedPrice = `ETB ${product.price.toLocaleString()}`;
  const formattedOriginalPrice = product.originalPrice ? `ETB ${product.originalPrice.toLocaleString()}` : null;

  return (
    <div className="bg-white rounded-xl overflow-hidden card-hover border border-[#e2e2e8]/80 p-4 flex flex-col h-full group relative shadow-xs">
      {/* Image Container */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-[#f3f3fa] mb-4 group/img">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-2.5 left-2.5 text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${
              product.badge === 'NEW'
                ? 'bg-[#1A4F95] text-white'
                : product.badge === 'SALE'
                ? 'bg-[#FFD200] text-[#0D1117]'
                : 'bg-[#DC2626] text-white'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all cursor-pointer shadow-xs ${
            isWishlisted
              ? 'bg-red-50 text-red-600 border border-red-200'
              : 'bg-white/90 backdrop-blur-xs text-[#424751] hover:text-red-500 hover:bg-white'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
        </button>

        {/* Quick View Hover Button */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white/90 hover:bg-white backdrop-blur-xs rounded-full text-[#003874] text-xs font-semibold opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-between space-y-2">
        <div>
          <p className="text-[11px] font-bold text-[#737782] uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3
            onClick={() => onQuickView(product)}
            className="font-semibold text-base text-[#1a1c20] line-clamp-1 hover:text-[#1A4F95] transition-colors cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1 text-[#FFD200]">
            <div className="flex items-center text-[#FFD200]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-[#FFD200] text-[#FFD200]'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-[#1a1c20] ml-1">{product.rating}</span>
            <span className="text-xs text-[#737782]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-2 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[#1A4F95]">{formattedPrice}</span>
            {formattedOriginalPrice && (
              <span className="text-xs text-[#737782] line-through">{formattedOriginalPrice}</span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="p-2.5 bg-[#FFD200] hover:bg-[#ecc200] rounded-lg text-[#0D1117] font-semibold hover:scale-105 active:scale-95 transition-all flex items-center gap-1 cursor-pointer shadow-xs"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4 text-[#0D1117]" />
          </button>
        </div>
      </div>
    </div>
  );
};
