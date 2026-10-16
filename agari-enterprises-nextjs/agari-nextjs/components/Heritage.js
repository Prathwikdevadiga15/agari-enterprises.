'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import RevealOnScroll from './RevealOnScroll';

export function Heritage() {
  return (
    <section className="bg-ink text-[#F5F1E6] py-16 relative overflow-hidden border-b border-copper/20">
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(232,166,87,0.3) 0%, transparent 60%)',
        }}
      />
      <RevealOnScroll className="container-a flex flex-col items-center text-center gap-4 relative z-10">
        <Image
          src="/images/logo.png"
          alt="Agari Enterprises logo"
          width={220}
          height={68}
          className="h-14 w-auto object-contain bg-white rounded-xl p-2 shadow-lg"
        />
        <p className="font-display text-2xl sm:text-3xl italic text-gold font-semibold mt-2">
          &ldquo;Offer is yours. Rate is ours.&rdquo;
        </p>
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#E8A657] shadow-xl mt-2 group">
          <img
            src="/images/yakshagana.jpg"
            alt="Yakshagana performer, coastal Karnataka heritage"
            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <p className="text-sm font-mono text-cream/80 max-w-md">
          A Tulunadu tradition, celebrating three decades with Agari Enterprises (Est. 1992)
        </p>
      </RevealOnScroll>
    </section>
  );
}

export function Proprietor() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

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
            'radial-gradient(ellipse 70% 60% at 20% 30%, rgba(232,166,87,0.12) 0%, transparent 60%),' +
            'radial-gradient(ellipse 50% 50% at 85% 75%, rgba(46,107,88,0.10) 0%, transparent 55%),' +
            'radial-gradient(ellipse 40% 40% at 50% 10%, rgba(193,105,43,0.08) 0%, transparent 50%)',
        }}
      />
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.8) 1px, transparent 1.3px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Top gold accent line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      {/* Bottom gold accent line */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-copper/30 to-transparent" />

      <div className="container-a relative z-10">
        {/* Section Header */}
        <RevealOnScroll as="div" className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[.06] border border-gold/20 text-gold text-[11px] font-mono uppercase tracking-[.18em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Proprietor&apos;s Address
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.75rem] text-cream leading-tight mb-3">
            A Message From <span className="bg-gradient-to-r from-[#F0C989] to-[#DA8C48] bg-clip-text text-transparent">Our Founder</span>
          </h2>
          <p className="text-cream/60 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Sri Agari Raghavendra Rao reflects on 30+ years of serving the households of coastal Karnataka with honesty, quality, and Tulunadu warmth.
          </p>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* ── Video Panel (July 30 2026) ── */}
          <RevealOnScroll className="lg:col-span-5">
            <div className="relative group">
              {/* Ambient glow behind video */}
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-gold/20 via-copper/15 to-transparent blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/25 bg-black">
                <video
                  ref={videoRef}
                  className="w-full aspect-[9/16] max-h-[520px] object-cover mx-auto"
                  playsInline
                  preload="metadata"
                  controls
                  poster="/images/founder-portrait.jpeg"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src="/videos/founder-video.mp4" type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>

                {/* Custom Play Overlay */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/60 via-black/30 to-black/10 hover:from-black/40 hover:via-black/15 hover:to-transparent transition-all duration-500 text-white"
                    aria-label="Play Founder Video"
                  >
                    <span className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#E8A657] to-[#C1692B] text-white flex items-center justify-center text-2xl shadow-[0_0_40px_rgba(232,166,87,0.5)] group-hover:scale-110 transition-transform duration-300 pl-1">
                      ▶
                    </span>
                    <span className="mt-4 text-[11px] font-mono uppercase tracking-[.2em] text-gold/90 drop-shadow-lg">
                      Watch Video Message
                    </span>
                  </button>
                )}

                {/* Corner badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-gold/30 text-[10px] font-mono text-gold pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  Est. 1992
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* ── Message Card ── */}
          <RevealOnScroll className="lg:col-span-7">
            <div className="relative rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-white/[.08] bg-white/[.03] backdrop-blur-sm shadow-lg">
              {/* Decorative quote mark */}
              <span
                className="absolute -top-6 left-8 text-[5rem] leading-none select-none pointer-events-none font-display"
                style={{ color: 'rgba(232,166,87,0.12)' }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Gold accent bar */}
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-gold to-copper mb-6" />

              <div className="space-y-4 text-[1.02rem] leading-relaxed text-cream/80 pt-1">
                <p className="text-xl font-semibold text-cream">Namasthe 🙏🏻</p>
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
                <p className="font-semibold text-cream">Thank You 🙏🏻</p>
              </div>

              {/* Founder signature row */}
              <div className="mt-8 pt-6 border-t border-white/[.08] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-gold/50 flex-shrink-0">
                    <img
                      src="/images/founder-portrait.jpeg"
                      alt="Agari Raghavendra Rao"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="font-display font-bold text-cream text-base">
                      Agari Raghavendra Rao
                    </div>
                    <div className="text-[11px] font-mono text-cream/50">
                      Founder &amp; Proprietor · Est. 1992
                    </div>
                  </div>
                </div>
                <span className="hidden sm:inline-flex text-[11px] font-mono text-gold bg-gold/10 border border-gold/20 px-3 py-1.5 rounded-full font-medium tracking-wide">
                  34+ Yrs of Trust
                </span>
              </div>
            </div>

            {/* Floating motto below card */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/30" />
              <p className="font-display text-sm sm:text-base italic text-gold/80 font-medium whitespace-nowrap">
                &ldquo;Offer is yours. Rate is ours.&rdquo;
              </p>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/30" />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
