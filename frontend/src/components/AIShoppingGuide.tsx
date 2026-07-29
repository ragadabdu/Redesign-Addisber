import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import type { Product } from '../types';

interface AIShoppingGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedProducts?: Product[];
}

export const AIShoppingGuide: React.FC<AIShoppingGuideProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Selam! I am your Addis Ber AI Shopping Guide. How can I help you find quality Ethiopian goods today? Tell me what you are looking for or your budget!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const text = queryText || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsLoading(true);

    setTimeout(() => {
      let matched = PRODUCTS;
      const lower = text.toLowerCase();

      if (lower.includes('coffee') || lower.includes('brew') || lower.includes('drink')) {
        matched = PRODUCTS.filter(p => p.id === 'prod-2' || p.id === 'prod-5');
      } else if (lower.includes('tech') || lower.includes('electronic') || lower.includes('headphone') || lower.includes('earbud') || lower.includes('laptop')) {
        matched = PRODUCTS.filter(p => p.category === 'Electronics');
      } else if (lower.includes('gift') || lower.includes('under 5000') || lower.includes('budget') || lower.includes('5,000') || lower.includes('5000')) {
        matched = PRODUCTS.filter(p => p.price <= 5000);
      } else if (lower.includes('fashion') || lower.includes('dress') || lower.includes('shoes') || lower.includes('sneakers')) {
        matched = PRODUCTS.filter(p => p.category === 'Fashion');
      } else if (lower.includes('skin') || lower.includes('beauty')) {
        matched = PRODUCTS.filter(p => p.category === 'Beauty & Personal Care');
      } else {
        matched = PRODUCTS.slice(0, 3);
      }

      const aiReply: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `Based on your request for "${text}", here are the top curated recommendations from Addis Ber marketplace:`,
        recommendedProducts: matched,
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsLoading(false);
    }, 800);
  };

  const samplePrompts = [
    'Coffee gear & beans',
    'Tech under ETB 5,000',
    'Habesha traditional fashion',
    'Best seller skincare',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#c3c6d2] relative h-[580px] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#003874] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#FFD200]/20 text-[#FFD200]">
              <Sparkles className="w-5 h-5 text-[#FFD200]" />
            </div>
            <div>
              <h2 className="text-base font-bold">Addis Ber AI Shopping Guide</h2>
              <p className="text-[11px] text-gray-300">Intelligent Ethiopian Marketplace Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#f3f3fa]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-[#1A4F95] text-white'
                    : 'bg-[#FFD200] text-[#0D1117] font-bold'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-2 max-w-[80%]">
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#1A4F95] text-white rounded-tr-none'
                      : 'bg-white border border-[#c3c6d2]/60 text-[#1a1c20] shadow-xs rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>

                {/* Recommended products cards */}
                {m.recommendedProducts && m.recommendedProducts.length > 0 && (
                  <div className="space-y-2 pt-1">
                    {m.recommendedProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="bg-white p-2.5 rounded-xl border border-[#c3c6d2] hover:border-[#1A4F95] flex items-center gap-3 cursor-pointer hover:shadow-sm transition-all"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-[#003874] truncate">{p.name}</h4>
                          <span className="text-[11px] font-semibold text-[#1A4F95]">
                            ETB {p.price.toLocaleString()}
                          </span>
                        </div>
                        <ShoppingBag className="w-4 h-4 text-[#FFD200] fill-[#FFD200]" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2 items-center text-xs text-[#737782] bg-white p-3 rounded-xl border border-[#c3c6d2] w-fit">
              <Sparkles className="w-4 h-4 animate-spin text-[#1A4F95]" />
              <span>Finding the best matches in Addis Ber...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-white border-t border-[#c3c6d2]/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {samplePrompts.map((p) => (
            <button
              key={p}
              onClick={() => handleSend(p)}
              className="px-2.5 py-1 rounded-full bg-[#f3f3fa] hover:bg-[#1A4F95]/10 text-[11px] font-medium text-[#1A4F95] whitespace-nowrap cursor-pointer border border-[#c3c6d2]/50"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#c3c6d2]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for recommendations or products..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#c3c6d2] outline-none focus:border-[#1A4F95]"
            />
            <button
              type="submit"
              className="p-2.5 bg-[#1A4F95] text-white rounded-xl hover:bg-[#003874] transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
