import React from 'react';
import { CATEGORIES } from '../data/products';
import { ArrowRight } from 'lucide-react';

interface CategoryBentoProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryBento: React.FC<CategoryBentoProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-12 max-w-[1280px] mx-auto px-4 md:px-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A4F95] block mb-1">Curated Collections</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#003874]">Shop by Category</h2>
        </div>
        <button
          onClick={() => onSelectCategory('All')}
          className="text-[#1A4F95] font-semibold text-sm flex items-center gap-1 hover:underline cursor-pointer group"
        >
          <span>See all categories</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[500px]">
        {/* Category 1: Electronics (Large Tile) */}
        <div
          onClick={() => onSelectCategory('Electronics')}
          className="md:col-span-2 md:row-span-2 min-h-[260px] md:min-h-[480px] relative rounded-xl overflow-hidden group cursor-pointer bento-item bg-[#e8e8ee] border border-transparent hover:border-[#1A4F95]/30 shadow-xs"
        >
          <div
            className="w-full h-full absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url('${CATEGORIES[0].image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
            <span className="text-xs uppercase tracking-widest text-[#FFD200] font-bold mb-1">Tech & Innovation</span>
            <h3 className="text-2xl md:text-3xl font-bold">{CATEGORIES[0].name}</h3>
            <p className="text-sm opacity-90 text-gray-200 mt-1">{CATEGORIES[0].subtitle}</p>
          </div>
        </div>

        {/* Category 2: Fashion */}
        <div
          onClick={() => onSelectCategory('Fashion')}
          className="min-h-[220px] relative rounded-xl overflow-hidden group cursor-pointer bento-item bg-[#e8e8ee] border border-transparent hover:border-[#1A4F95]/30 shadow-xs"
        >
          <div
            className="w-full h-full absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url('${CATEGORIES[1].image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
            <h3 className="text-xl font-bold">{CATEGORIES[1].name}</h3>
            <p className="text-xs opacity-90 text-gray-200">{CATEGORIES[1].subtitle}</p>
          </div>
        </div>

        {/* Category 3: Groceries */}
        <div
          onClick={() => onSelectCategory('Groceries')}
          className="min-h-[220px] relative rounded-xl overflow-hidden group cursor-pointer bento-item bg-[#e8e8ee] border border-transparent hover:border-[#1A4F95]/30 shadow-xs"
        >
          <div
            className="w-full h-full absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url('${CATEGORIES[2].image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
            <h3 className="text-xl font-bold">{CATEGORIES[2].name}</h3>
            <p className="text-xs opacity-90 text-gray-200">{CATEGORIES[2].subtitle}</p>
          </div>
        </div>

        {/* Category 4: Home & Living (Wide Tile) */}
        <div
          onClick={() => onSelectCategory('Home & Kitchen')}
          className="md:col-span-2 min-h-[220px] relative rounded-xl overflow-hidden group cursor-pointer bento-item bg-[#e8e8ee] border border-transparent hover:border-[#1A4F95]/30 shadow-xs"
        >
          <div
            className="w-full h-full absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url('${CATEGORIES[3].image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
            <h3 className="text-xl md:text-2xl font-bold">{CATEGORIES[3].name}</h3>
            <p className="text-sm opacity-90 text-gray-200">{CATEGORIES[3].subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
