import React from 'react';
import { HERO_BANNER_IMAGE } from '../data/products';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onShopNow: () => void;
  onViewDeals: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow, onViewDeals }) => {
  return (
    <section className="relative h-[560px] md:h-[600px] flex items-center overflow-hidden border-b border-[#e2e2e8]">
      {/* Background with Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-[12s] hover:scale-105"
          style={{ backgroundImage: `url('${HERO_BANNER_IMAGE}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 sm:via-white/75 to-transparent" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10 w-full">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD200]/25 text-[#1A4F95] text-xs font-bold uppercase tracking-wider border border-[#FFD200]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#1A4F95]" />
            <span>New Season Arrivals</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[48px] font-extrabold text-[#003874] leading-[1.15] tracking-tight">
            Quality Goods, <br />
            <span className="text-[#1A4F95]">Ethiopian Spirit.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#424751] max-w-lg leading-relaxed font-normal">
            Addis Ber is your reliable guide to the finest electronics, local fashion, and daily essentials delivered with absolute care across Addis Ababa and nationwide.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onShopNow}
              className="px-8 py-4 bg-[#1A4F95] text-white rounded-lg font-semibold text-base hover:bg-[#003874] hover:scale-105 transition-all shadow-lg shadow-[#1A4F95]/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onViewDeals}
              className="px-8 py-4 border-2 border-[#1A4F95] text-[#1A4F95] rounded-lg font-semibold text-base hover:bg-[#1A4F95]/10 transition-all cursor-pointer bg-white/60 backdrop-blur-xs"
            >
              View Deals
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
