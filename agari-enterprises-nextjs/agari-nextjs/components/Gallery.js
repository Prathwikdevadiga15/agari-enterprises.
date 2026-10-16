'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import RevealOnScroll from './RevealOnScroll';
import { GALLERY } from '@/lib/config';
import { X, ChevronLeft, ChevronRight } from './icons';

export default function Gallery() {
  const [index, setIndex] = useState(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length)), []);
  const next = useCallback(() => setIndex((i) => (i === null ? null : (i + 1) % GALLERY.length)), []);

  useEffect(() => {
    function onKey(e) {
      if (index === null) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, close, prev, next]);

  return (
    <section className="section-pad" id="gallery">
      <div className="container-a">
        <RevealOnScroll className="mb-10 max-w-xl">
          <span className="eyebrow">Our stores</span>
          <h2 className="text-3xl sm:text-4xl mb-2">A look inside Agari Enterprises</h2>
          <p className="text-ink-soft">Snapshots from our showrooms, branches and customer moments across the years.</p>
        </RevealOnScroll>

        <RevealOnScroll stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {GALLERY.map((g, i) => (
            <button
              key={g.file}
              type="button"
              onClick={() => setIndex(i)}
              className="group relative aspect-square rounded-md overflow-hidden bg-panel-2"
            >
              <Image
                src={g.image}
                alt={g.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <span className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors" />
            </button>
          ))}
        </RevealOnScroll>
      </div>

      {index !== null && (
        <div className="fixed inset-0 z-[90] bg-ink/90 backdrop-blur-sm flex items-center justify-center px-4">
          <button type="button" onClick={close} aria-label="Close" className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20">
            <X className="w-6 h-6" />
          </button>
          <button type="button" onClick={prev} aria-label="Previous" className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button type="button" onClick={next} aria-label="Next" className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20">
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="max-w-3xl w-full">
            <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
              <Image src={GALLERY[index].image} alt={GALLERY[index].caption} fill sizes="90vw" className="object-contain bg-black" />
            </div>
            <p className="text-center text-white/85 mt-4 text-sm">{GALLERY[index].caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
