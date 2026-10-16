'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';
import { REVIEWS } from '@/lib/config';
import { Star, StarOutline } from './icons';

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [isPaused]);

  function prev() { setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length); }
  function next() { setCurrent((c) => (c + 1) % REVIEWS.length); }

  const avg = (REVIEWS.reduce((s, r) => s + r.stars, 0) / REVIEWS.length).toFixed(1);

  return (
    <section className="section-pad bg-panel-2">
      <div className="container-a">
        <RevealOnScroll className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <span className="eyebrow">Customer Reviews</span>
            <h2 className="text-3xl sm:text-4xl mb-2">What our customers say</h2>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5 text-copper">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-5 h-5" />
                ))}
              </div>
              <span className="font-display font-bold text-xl">{avg}</span>
              <span className="text-ink-faint text-sm">/ 5 · {REVIEWS.length} reviews</span>
            </div>
          </div>
          {/* Nav arrows */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              className="w-10 h-10 rounded-full border border-line bg-panel flex items-center justify-center hover:border-trace hover:text-trace transition-colors"
              aria-label="Previous review"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              className="w-10 h-10 rounded-full border border-line bg-panel flex items-center justify-center hover:border-trace hover:text-trace transition-colors"
              aria-label="Next review"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </RevealOnScroll>

        {/* Featured review (large) */}
        <RevealOnScroll className="mb-8">
          <div
            className="relative overflow-hidden rounded-2xl bg-grad-ink text-panel p-8 sm:p-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Quote mark */}
            <div className="absolute top-6 right-8 text-[96px] font-display font-bold text-white/5 leading-none select-none">
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex gap-0.5 text-gold mb-5">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < REVIEWS[current].stars
                      ? <Star key={i} className="w-5 h-5" />
                      : <StarOutline key={i} className="w-5 h-5 opacity-30" />
                  )}
                </div>
                <p className="text-xl sm:text-2xl font-medium leading-relaxed text-cream/95 mb-8 max-w-2xl">
                  &ldquo;{REVIEWS[current].text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <span className="w-12 h-12 rounded-full bg-white/15 text-gold flex items-center justify-center font-display font-bold text-base flex-shrink-0">
                    {REVIEWS[current].avatar}
                  </span>
                  <div>
                    <p className="font-semibold text-cream">{REVIEWS[current].name}</p>
                    <p className="text-sm text-cream/60 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {REVIEWS[current].meta}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="flex gap-2 mt-8">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-gold w-8' : 'bg-white/25 w-1.5'}`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Mini review grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <motion.button
              key={r.name}
              type="button"
              onClick={() => setCurrent(i)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className={`text-left card p-4 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5
                ${i === current ? 'border-trace shadow-glow-trace' : ''}`}
            >
              <div className="flex gap-0.5 text-copper mb-2">
                {Array.from({ length: 5 }).map((_, s) =>
                  s < r.stars
                    ? <Star key={s} className="w-3.5 h-3.5" />
                    : <StarOutline key={s} className="w-3.5 h-3.5 opacity-30" />
                )}
              </div>
              <p className="text-xs text-ink-soft leading-relaxed line-clamp-3 mb-3">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-trace-soft text-trace flex items-center justify-center font-semibold text-[10px] flex-shrink-0">
                  {r.avatar}
                </span>
                <div>
                  <p className="text-xs font-medium leading-tight">{r.name}</p>
                  <p className="text-[10px] text-ink-faint">{r.meta}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
