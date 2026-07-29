import React, { useState } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { TrendingUp, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface TrendingSectionProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('featured');

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Groceries', 'Beauty & Personal Care'];

  let filteredProducts = activeTab === 'All'
    ? products
    : products.filter(p => p.category === activeTab);

  if (sortOption === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortOption === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  return (
    <section className="py-12 bg-[#f3f3fa] border-y border-[#e2e2e8]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-100 text-red-600">
              <TrendingUp className="w-6 h-6 text-[#DC2626]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">Top Picks This Week</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#003874]">Trending Now</h2>
            </div>
          </div>

          {/* Controls: Sort & Filter */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#c3c6d2] text-xs font-medium text-[#424751]">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent outline-none cursor-pointer font-semibold text-[#003874]"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === cat
                  ? 'bg-[#1A4F95] text-white shadow-sm'
                  : 'bg-white text-[#424751] hover:bg-gray-100 border border-[#c3c6d2]/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-[#c3c6d2]">
            <p className="text-base text-[#737782]">No products found in this category.</p>
            <button
              onClick={() => setActiveTab('All')}
              className="mt-3 text-sm text-[#1A4F95] font-bold underline"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
