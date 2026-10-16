'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import { waLink } from '@/lib/config';

export default function ScrollTools() {
  const [showTop, setShowTop] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const { count, openDrawer } = useCart();

  useEffect(() => {
    function handleScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setShowTop(current > 350);
      if (total > 0) {
        setScrollPercent(Math.min(100, Math.round((current / total) * 100)));
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Floating Scroll-To-Top Button ── */}
      <div
        className={`fixed bottom-24 right-5 sm:bottom-8 sm:right-8 z-40 transition-all duration-300 ${
          showTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-90 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={scrollToTop}
          className="relative w-12 h-12 rounded-full glass-luxury bg-ink/90 text-gold flex items-center justify-center shadow-2xl border border-gold/40 hover:scale-110 active:scale-95 transition-all group"
          aria-label="Scroll back to top"
        >
          {/* Circular SVG Progress Ring */}
          <svg className="w-12 h-12 absolute inset-0 -rotate-90 pointer-events-none" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2.5"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#E8A657"
              strokeWidth="2.5"
              strokeDasharray="125.6"
              strokeDashoffset={125.6 - (125.6 * scrollPercent) / 100}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>

          {/* Arrow Icon */}
          <span className="text-base group-hover:-translate-y-0.5 transition-transform font-bold">
            ↑
          </span>
        </button>
      </div>

      {/* ── Mobile Fixed Bottom Navigation Bar (Amazon / Flipkart UX) ── */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0B1613]/95 backdrop-blur-lg border-t border-white/10 py-2 px-3 flex items-center justify-around text-cream/80 text-[10px] font-mono shadow-2xl">
        <a href="/" className="flex flex-col items-center gap-1 py-1 hover:text-gold transition-colors">
          <span className="text-base">🏠</span>
          <span>Home</span>
        </a>
        <a href="/shop" className="flex flex-col items-center gap-1 py-1 hover:text-gold transition-colors">
          <span className="text-base">🛍️</span>
          <span>Shop</span>
        </a>
        <a href="/repairs" className="flex flex-col items-center gap-1 py-1 hover:text-gold transition-colors">
          <span className="text-base">🔧</span>
          <span>Repairs</span>
        </a>
        <button
          type="button"
          onClick={openDrawer}
          className="flex flex-col items-center gap-1 py-1 relative hover:text-gold transition-colors"
          aria-label="View Cart"
        >
          <span className="text-base">🛒</span>
          <span>Cart</span>
          {count > 0 && (
            <span className="absolute -top-1 right-2 w-4 h-4 rounded-full bg-copper text-white text-[9px] font-bold flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
        <a
          href={waLink('Hi Agari Enterprises, I want to inquire about products and repair services.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-1 text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span className="text-base">💬</span>
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}
