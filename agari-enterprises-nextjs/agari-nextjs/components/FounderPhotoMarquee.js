'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function FounderPhotoMarquee({ initialImages = null }) {
  const [images, setImages] = useState(initialImages || []);
  const [loading, setLoading] = useState(!initialImages);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeImage, setActiveImage] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const scrollContainerRef = useRef(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Fetch live admin-managed gallery images
  useEffect(() => {
    let isMounted = true;
    async function loadGallery() {
      try {
        const res = await fetch('/api/gallery', { next: { revalidate: 60 } });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data.images) && data.images.length > 0) {
            setImages(data.images);
          }
        }
      } catch (err) {
        console.warn('Using default gallery images:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (!initialImages || initialImages.length === 0) {
      loadGallery();
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [initialImages]);

  // Filter images by selected category
  const filteredImages = images.filter((img) => {
    if (selectedCategory === 'all') return true;
    return img.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Duplicate items for continuous seamless loop (need at least 12 items for continuous loop)
  const displayImages = filteredImages.length > 0 ? filteredImages : images;
  const loopList = [...displayImages, ...displayImages];

  const categories = [
    { key: 'all', label: 'All Displays', icon: '✨' },
    { key: 'showroom', label: 'Stores & Branches', icon: '🏛️' },
    { key: 'furniture', label: 'Living & Bedroom', icon: '🛋️' },
    { key: 'electronics', label: 'Appliances & TV', icon: '📺' },
    { key: 'kitchen', label: 'Kitchen Utilities', icon: '🥣' },
  ];

  return (
    <div className="w-full relative py-8 overflow-hidden" aria-label="Founder Showcase Gallery">
      {/* ── Marquee Section Header & Filter Badges ── */}
      <div className="container-a mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono mb-2">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span>Three Decades of Showroom &amp; Household Excellence</span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-cream">
              Showrooms, Handcrafted Furniture &amp; Verified Installations
            </h3>
            <p className="text-xs sm:text-sm text-cream/70 font-mono mt-1">
              Real photographs from our stores in Surathkal, Mangaluru, Moodabidri, and customer installations
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  selectedCategory === cat.key
                    ? 'bg-gradient-to-r from-gold/30 to-copper/30 text-gold border border-gold/40 shadow-sm'
                    : 'text-cream/70 hover:text-cream hover:bg-white/10'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Continuous Moving Photo Track ── */}
      <div
        className="relative w-full group/marquee"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Soft Vignette Fade */}
        <div className="absolute left-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-r from-[#0B1613] via-[#0B1613]/70 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-l from-[#0B1613] via-[#0B1613]/70 to-transparent z-20 pointer-events-none" />

        {/* Moving Rail */}
        <div
          ref={scrollContainerRef}
          className={`flex gap-5 sm:gap-6 py-4 w-max ${
            prefersReducedMotion
              ? 'overflow-x-auto scrollbar-none px-6'
              : 'animate-infinite-marquee'
          }`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
            willChange: 'transform',
          }}
        >
          {loopList.map((item, idx) => (
            <div
              key={`${item.id || item.imageUrl}-${idx}`}
              onClick={() => setActiveImage(item)}
              className="group relative flex-shrink-0 w-[280px] sm:w-[360px] md:w-[420px] aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border border-gold/30 bg-[#12201C] shadow-[0_12px_36px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-300 hover:border-gold/80 hover:shadow-[0_20px_50px_rgba(232,166,87,0.35)]"
            >
              {/* Image */}
              <Image
                src={item.imageUrl}
                alt={item.altText || item.title || 'Agari Enterprises'}
                fill
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 420px"
                className="object-cover group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
              />

              {/* Top Category Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-gold/40 text-[10px] font-mono uppercase tracking-wider text-gold shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  {item.category || 'Agari'}
                </span>
              </div>

              {/* Magnify Icon on Hover */}
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-gold/50 text-gold flex items-center justify-center text-xs shadow-md">
                  🔍
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-10 flex flex-col justify-end">
                <h4 className="font-display font-bold text-sm sm:text-base text-cream group-hover:text-gold transition-colors leading-snug drop-shadow-md">
                  {item.title}
                </h4>
                {item.caption && (
                  <p className="text-[11px] sm:text-xs text-cream/75 line-clamp-2 mt-1 font-body">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Marquee Navigation & Control Bar ── */}
      <div className="container-a mt-4 flex items-center justify-between text-xs font-mono text-cream/60">
        <div className="flex items-center gap-2">
          <span>Continuous Loop ·</span>
          <span className="text-gold">Hover to Pause</span>
          <span className="hidden sm:inline">· Click any photo to view full resolution</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-cream text-[11px] border border-white/10 transition-colors"
          >
            {isPaused ? '▶ Resume Motion' : '⏸ Pause Motion'}
          </button>
        </div>
      </div>

      {/* ── High-Resolution Lightbox Modal ── */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[92vh] w-full flex flex-col items-center bg-[#0B1613] border-2 border-gold/60 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Modal Top Bar */}
              <div className="w-full flex items-center justify-between px-6 py-4 border-b border-gold/30 bg-black/75">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">
                    {activeImage.category}
                  </span>
                  <h3 className="font-display font-bold text-cream text-base sm:text-lg">
                    {activeImage.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveImage(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-cream flex items-center justify-center transition-colors text-lg"
                  aria-label="Close photo preview"
                >
                  ✕
                </button>
              </div>

              {/* Full Image */}
              <div className="relative w-full flex-1 min-h-[50vh] max-h-[70vh] bg-black flex items-center justify-center p-2">
                <img
                  src={activeImage.imageUrl}
                  alt={activeImage.altText || activeImage.title}
                  className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              </div>

              {/* Modal Footer Caption */}
              <div className="w-full px-6 py-4 bg-black/85 border-t border-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-cream/80">
                <p className="font-body text-cream/90 max-w-2xl text-xs sm:text-sm">
                  {activeImage.caption || 'Agari Enterprises — Trusted for electronics, furniture and service across Dakshina Kannada since 1992.'}
                </p>
                <div className="flex items-center gap-3 text-gold">
                  <span>📍 Surathkal · Mangaluru · Moodabidre</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS for the infinite marquee animation if not already present */}
      <style jsx global>{`
        @keyframes infiniteMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-infinite-marquee {
          animation: infiniteMarquee 38s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-infinite-marquee {
            animation-duration: 28s;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-infinite-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
