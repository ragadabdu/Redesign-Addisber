import React, { useState, useEffect } from 'react';
import { FLASH_SALE_BG } from '../data/products';
import { Flame, ArrowRight } from 'lucide-react';

interface FlashSaleProps {
  onShopFlashSale: () => void;
}

export const FlashSale: React.FC<FlashSaleProps> = ({ onShopFlashSale }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 32, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTwoDigits = (num: number) => String(num).padStart(2, '0');

  return (
    <section className="mb-12 max-w-[1280px] mx-auto px-4 md:px-10">
      <div className="relative rounded-2xl overflow-hidden min-h-[300px] flex items-center bg-[#0D1117] shadow-xl">
        {/* Abstract streaks background */}
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
          style={{ backgroundImage: `url('${FLASH_SALE_BG}')` }}
        />

        <div className="relative z-10 px-6 sm:px-12 py-8 space-y-5 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD200]/20 border border-[#FFD200]/30 text-[#FFD200] text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4 text-[#FFD200] fill-[#FFD200]" />
            <span>Limited Time Deal</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#FFD200] italic tracking-tight uppercase">
            FLASH SALE
          </h2>

          <p className="text-lg sm:text-xl font-medium text-white">
            Up to 60% Off on Selected Electronics & Coffee Gear
          </p>

          {/* Timer Display */}
          <div className="flex gap-3 pt-1">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl text-center border border-white/15 min-w-[65px]">
              <span className="block text-white font-bold text-2xl font-mono leading-none">
                {formatTwoDigits(timeLeft.hours)}
              </span>
              <span className="text-white/70 text-[10px] uppercase font-bold tracking-wider mt-1 block">Hours</span>
            </div>
            <div className="text-white font-bold text-2xl self-center">:</div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl text-center border border-white/15 min-w-[65px]">
              <span className="block text-white font-bold text-2xl font-mono leading-none">
                {formatTwoDigits(timeLeft.minutes)}
              </span>
              <span className="text-white/70 text-[10px] uppercase font-bold tracking-wider mt-1 block">Mins</span>
            </div>
            <div className="text-white font-bold text-2xl self-center">:</div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl text-center border border-white/15 min-w-[65px]">
              <span className="block text-white font-bold text-2xl font-mono leading-none">
                {formatTwoDigits(timeLeft.seconds)}
              </span>
              <span className="text-white/70 text-[10px] uppercase font-bold tracking-wider mt-1 block">Secs</span>
            </div>
          </div>

          <div>
            <button
              onClick={onShopFlashSale}
              className="mt-2 px-8 py-3.5 bg-[#FFD200] text-[#0D1117] font-extrabold rounded-full hover:bg-[#ecc200] hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>Shop the Sale</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
