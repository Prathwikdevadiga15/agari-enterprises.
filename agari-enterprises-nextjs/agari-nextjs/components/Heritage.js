'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';
import FounderPhotoMarquee from './FounderPhotoMarquee';

export function Heritage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section className="bg-ink text-[#F5F1E6] py-20 relative overflow-hidden border-b border-copper/20" id="heritage">
      {/* ── Background Ambience ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(232,166,87,0.35) 0%, transparent 65%),' +
            'radial-gradient(ellipse 50% 50% at 80% 80%, rgba(46,107,88,0.2) 0%, transparent 60%)',
        }}
      />
      {/* Subtle traditional motif grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(232,166,87,.8) 1px, transparent 1.3px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container-a relative z-10 flex flex-col items-center text-center">
        {/* Brand Logo */}
        <RevealOnScroll>
          <div className="inline-flex items-center justify-center p-2.5 bg-white rounded-2xl shadow-xl border border-gold/40 mb-3">
            <Image
              src="/images/logo.png"
              alt="Agari Enterprises logo"
              width={220}
              height={68}
              className="h-14 w-auto object-contain"
              priority
            />
          </div>
        </RevealOnScroll>

        {/* The Signature Motto */}
        <RevealOnScroll className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono uppercase tracking-[.2em] mb-3">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Tulunadu Tradition · Est. 1992
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl italic text-transparent bg-clip-text bg-gradient-to-r from-[#F0C989] via-[#E8A657] to-[#DA8C48] font-bold tracking-tight mb-2 drop-shadow-md">
            &ldquo;Offer is yours. Rate is ours.&rdquo;
          </h2>
          <p className="text-sm sm:text-base font-mono text-cream/80 max-w-xl mx-auto">
            A Tulunadu tradition of honour, fairness, and trust — celebrating over three decades with Agari Enterprises.
          </p>
        </RevealOnScroll>

        {/* ── BIG SIZE YAKSHAGANA PHOTO DISPLAY ── */}
        <RevealOnScroll className="w-full max-w-5xl mt-8">
          <div className="relative group">
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-4 sm:-inset-6 rounded-[2.5rem] bg-gradient-to-r from-gold/25 via-copper/20 to-gold/25 blur-3xl opacity-70 group-hover:opacity-95 transition-opacity duration-700" />

            {/* Showcase Container */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-gold/50 shadow-[0_20px_60px_rgba(0,0,0,0.65)] bg-gradient-to-b from-[#14231F] to-[#0A1311]">
              
              {/* Header Ribbon on Photo Frame */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-black/60 backdrop-blur-md border-b border-gold/30 text-xs font-mono">
                <div className="flex items-center gap-2 text-gold">
                  <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                  <span className="font-semibold tracking-wider">ಯಕ್ಷಗಾನ · YAKSHAGANA HERITAGE</span>
                </div>
                <span className="text-cream/60 hidden sm:inline">Coastal Karnataka &amp; Tulunadu Culture</span>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gold/15 hover:bg-gold/30 text-gold text-xs transition-colors border border-gold/30"
                  aria-label="View Fullscreen High-Res Photo"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                  <span>Expand Photo</span>
                </button>
              </div>

              {/* Big Size Photo Image */}
              <div
                className="relative w-full h-[420px] sm:h-[560px] md:h-[650px] lg:h-[720px] overflow-hidden bg-black/80 cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src="/images/yakshagana.jpg"
                  alt="Yakshagana performer, coastal Karnataka heritage art"
                  className="w-full h-full object-contain sm:object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle vignette gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Cultural Badge Overlays */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-gold/50 text-gold text-xs font-mono font-medium shadow-lg">
                    <span>🎭</span> The Living Soul of Tulunadu
                  </span>
                </div>

                <div className="absolute top-4 right-4 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-copper/50 text-cream text-xs font-mono shadow-lg">
                    <span>🏛️</span> Since 1992 · Surathkal
                  </span>
                </div>

                {/* Bottom Story & Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none">
                  <div className="max-w-3xl text-left">
                    <div className="flex items-center gap-2 text-gold text-xs font-mono uppercase tracking-widest mb-1">
                      <span>ಕರಾವಳಿಯ ಗಂಡುಕಲೆ</span> · Divine Art of Coastal Karnataka
                    </div>
                    <p className="font-display text-lg sm:text-2xl md:text-3xl text-cream font-bold leading-snug drop-shadow-md">
                      Tradition, Truth &amp; Integrity — The Guiding Spirit of Agari Enterprises
                    </p>
                    <p className="text-xs sm:text-sm text-cream/80 mt-2 leading-relaxed max-w-2xl font-body">
                      Yakshagana embodies the valor, devotion, and vibrant heritage of Tulunadu. Just as this ancient art demands steadfast discipline and devotion to perfection, Agari Enterprises has upheld genuine service and honest relationships with the people of Dakshina Kannada for over three decades.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Control Bar */}
              <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-black/75 backdrop-blur-md border-t border-gold/30 text-xs">
                <div className="flex items-center gap-3 text-cream/70 font-mono text-[11px]">
                  <span>📍 Opposite Govinda Dasa PU College, Surathkal</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline">6 Branches in Dakshina Kannada</span>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="btn btn-outline !text-xs !py-1.5 !px-3 border-gold/40 text-gold hover:bg-gold/15"
                  >
                    View High-Resolution Photo 🔍
                  </button>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* ── High-Res Photo Lightbox Modal ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[92vh] w-full flex flex-col items-center bg-[#0B1613] border-2 border-gold/60 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Modal Top Bar */}
              <div className="w-full flex items-center justify-between px-6 py-4 border-b border-gold/30 bg-black/70">
                <div className="flex items-center gap-2 text-gold font-display font-bold text-base">
                  <span>🎭</span> Yakshagana Heritage — Agari Enterprises
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-cream flex items-center justify-center transition-colors text-lg"
                  aria-label="Close photo preview"
                >
                  ✕
                </button>
              </div>

              {/* Full Image */}
              <div className="relative w-full flex-1 min-h-[50vh] max-h-[75vh] bg-black flex items-center justify-center p-2">
                <img
                  src="/images/yakshagana.jpg"
                  alt="Yakshagana full resolution display"
                  className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              </div>

              {/* Modal Footer Caption */}
              <div className="w-full px-6 py-3 bg-black/80 border-t border-gold/20 flex items-center justify-between text-xs font-mono text-cream/80">
                <span>&ldquo;Offer is yours. Rate is ours.&rdquo;</span>
                <span className="text-gold font-semibold">Surathkal · Mangaluru · Moodabidre</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function Proprietor() {
  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden"
      id="proprietor"
      style={{ background: '#0B1613' }}
    >
      {/* ── Rich Layered Background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 20% 30%, rgba(232,166,87,0.14) 0%, transparent 60%),' +
            'radial-gradient(ellipse 50% 50% at 85% 75%, rgba(46,107,88,0.12) 0%, transparent 55%),' +
            'radial-gradient(ellipse 40% 40% at 50% 10%, rgba(193,105,43,0.10) 0%, transparent 50%)',
        }}
      />
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.8) 1px, transparent 1.3px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-copper/30 to-transparent" />

      <div className="container-a relative z-10">
        {/* Section Header */}
        <RevealOnScroll as="div" className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[.06] border border-gold/20 text-gold text-[11px] font-mono uppercase tracking-[.18em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Proprietor&apos;s Address
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.75rem] text-cream leading-tight mb-3">
            A Message From <span className="bg-gradient-to-r from-[#F0C989] to-[#DA8C48] bg-clip-text text-transparent">Our Founder</span>
          </h2>
          <p className="text-cream/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Sri Agari Raghavendra Rao reflects on 30+ years of serving the households of coastal Karnataka with honesty, quality, and Tulunadu warmth.
          </p>
        </RevealOnScroll>

        {/* ── FOUNDER MESSAGE CARD ── */}
        <RevealOnScroll className="max-w-4xl mx-auto mb-12">
          <div className="relative rounded-3xl p-8 sm:p-12 border border-gold/25 bg-gradient-to-b from-white/[.05] to-white/[.02] backdrop-blur-md shadow-2xl">
            {/* Decorative quotation mark */}
            <span
              className="absolute -top-6 left-10 text-[6rem] leading-none select-none pointer-events-none font-display"
              style={{ color: 'rgba(232,166,87,0.15)' }}
              aria-hidden="true"
            >
              &ldquo;
            </span>

            {/* Gold bar */}
            <div className="w-14 h-1.5 rounded-full bg-gradient-to-r from-gold via-copper to-gold mb-6" />

            <div className="space-y-4 text-[1.05rem] leading-relaxed text-cream/85">
              <p className="text-2xl font-display font-bold text-cream">Namasthe 🙏🏻</p>
              <p>
                The firm was started in 1992 in Yedapadavu, by providing services of electricity bill payment, cable
                network payment, and furniture &amp; electronics retail.
              </p>
              <p>
                Our growth was steady, and we always focused on providing the best service to our loyal customers with genuine parts, reasonable pricing, and warm Tulunadu hospitality.
              </p>
              <p>
                Today, we are a leading electronics and furniture retail store in Dakshina Kannada with 6 branches and prompt doorstep repair support.
              </p>
              <p className="font-semibold text-cream text-lg">Thank You 🙏🏻</p>
            </div>

            {/* Founder Profile Details */}
            <div className="mt-8 pt-6 border-t border-white/[.1] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold shadow-lg flex-shrink-0">
                  <img
                    src="/images/founder-portrait.jpeg"
                    alt="Agari Raghavendra Rao"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="font-display font-bold text-cream text-lg">
                    Agari Raghavendra Rao
                  </div>
                  <div className="text-xs font-mono text-gold/90">
                    Founder &amp; Proprietor · Est. 1992
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-gold bg-gold/10 border border-gold/30 px-3.5 py-1.5 rounded-full font-medium tracking-wide">
                  ⭐ 34+ Years of Trust
                </span>
                <span className="text-xs font-mono text-cream/70 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                  Surathkal · Mangaluru
                </span>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* ── BELOW THE MESSAGE FROM FOUNDER: CONTINUOUS MOVING PHOTO GALLERY ── */}
        <div className="w-full mt-4">
          <FounderPhotoMarquee />
        </div>

        {/* Floating motto below */}
        <div className="mt-14 max-w-xl mx-auto flex items-center justify-center gap-3">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/30" />
          <p className="font-display text-sm sm:text-base italic text-gold/90 font-medium whitespace-nowrap">
            &ldquo;Offer is yours. Rate is ours.&rdquo;
          </p>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/30" />
        </div>
      </div>
    </section>
  );
}
