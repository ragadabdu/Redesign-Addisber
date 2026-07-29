import React from 'react';
import { ShieldCheck, Truck, Headset } from 'lucide-react';

export const TrustProps: React.FC = () => {
  return (
    <section className="py-12 max-w-[1280px] mx-auto px-4 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Secure Payments */}
        <div className="p-8 rounded-2xl bg-[#003874] text-white space-y-4 shadow-xl relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#FFD200]">
            <ShieldCheck className="w-8 h-8 text-[#FFD200]" />
          </div>
          <h3 className="text-xl font-bold">Secure Payments</h3>
          <p className="text-sm opacity-90 leading-relaxed text-gray-200">
            Safe, encrypted transactions for your peace of mind. We support Telebirr, CBE Birr, Chapa, and major cards.
          </p>
        </div>

        {/* Card 2: Fast Delivery */}
        <div className="p-8 rounded-2xl bg-[#e8e8ee] border border-[#c3c6d2] space-y-4 text-[#1a1c20]">
          <div className="w-12 h-12 rounded-xl bg-[#1A4F95]/10 flex items-center justify-center text-[#1A4F95]">
            <Truck className="w-8 h-8 text-[#1A4F95]" />
          </div>
          <h3 className="text-xl font-bold text-[#003874]">Fast Delivery</h3>
          <p className="text-sm text-[#424751] leading-relaxed">
            Rapid shipping across Addis Ababa and regional hubs. Track your order in real-time from checkout to doorstep.
          </p>
        </div>

        {/* Card 3: Reliable Support */}
        <div className="p-8 rounded-2xl bg-[#e8e8ee] border border-[#c3c6d2] space-y-4 text-[#1a1c20]">
          <div className="w-12 h-12 rounded-xl bg-[#1A4F95]/10 flex items-center justify-center text-[#1A4F95]">
            <Headset className="w-8 h-8 text-[#1A4F95]" />
          </div>
          <h3 className="text-xl font-bold text-[#003874]">Reliable Support</h3>
          <p className="text-sm text-[#424751] leading-relaxed">
            Our "Reliable Guide" local support team is available 24/7 in Amharic & English to assist with any order inquiries.
          </p>
        </div>
      </div>
    </section>
  );
};
