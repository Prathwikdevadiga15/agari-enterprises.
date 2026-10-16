'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OFFERS = [
  { icon: '🎉', text: 'No Cost EMI on all electronics above ₹10,000', cta: 'Explore Deals', href: '#order' },
  { icon: '🚚', text: 'Free doorstep delivery across Surathkal, Mangaluru & Moodabidre', cta: 'Order Now', href: '#order' },
  { icon: '🛡️', text: '6-month repair warranty on every service — guaranteed', cta: 'Book Repair', href: '#repair' },
];

export default function OffersBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % OFFERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const offer = OFFERS[current];

  return (
    <div className="bg-trace text-white overflow-hidden">
      <div className="container-a py-3">
        <div className="flex items-center gap-3 justify-between">
          {/* Dot indicators */}
          <div className="hidden sm:flex gap-1.5 flex-shrink-0">
            {OFFERS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-gold w-4' : 'bg-white/40'}`}
                aria-label={`Offer ${i + 1}`}
              />
            ))}
          </div>

          {/* Sliding offer text */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex items-center gap-2 justify-center text-sm font-medium"
              >
                <span className="text-base">{offer.icon}</span>
                <span className="truncate">{offer.text}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA */}
          <a
            href={offer.cta === 'Book Repair' ? '#repair' : '#order'}
            className="flex-shrink-0 bg-gold text-green-deep text-xs font-bold px-3 py-1.5 rounded-full hover:bg-gold-light transition-colors"
          >
            {offer.cta}
          </a>
        </div>
      </div>
    </div>
  );
}
