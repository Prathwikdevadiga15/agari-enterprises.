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
    <section className="section-pad bg-panel-2" id="proprietor">
      <div className="container-a">
        <RevealOnScroll as="div" className="text-center max-w-xl mx-auto mb-12">
          <span className="eyebrow justify-center !text-copper">Proprietor Address</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl mb-3 text-ink">
            A Message From Our Founder
          </h2>
          <p className="text-muted text-sm sm:text-base">
            Sri Agari Raghavendra Rao reflects on 30+ years of serving the households of coastal Karnataka.
          </p>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* 🌟 Real Video sent on 8-12-2026 🌟 */}
          <RevealOnScroll className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-copper/30 bg-black group">
              <video
                ref={videoRef}
                className="w-full aspect-[9/16] max-h-[500px] object-cover mx-auto"
                playsInline
                preload="metadata"
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="/videos/proprietor-video.mp4" type="video/mp4" />
                <source src="/videos/demo-video-aug12.mp4" type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>

              {/* Custom Play Overlay if paused */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 hover:bg-black/25 transition-colors text-white group"
                  aria-label="Play Founder Video"
                >
                  <span className="w-16 h-16 rounded-full bg-copper/90 text-white flex items-center justify-center text-2xl shadow-2xl group-hover:scale-110 transition-transform">
                    ▶
                  </span>
                  <span className="mt-3 text-xs font-mono uppercase tracking-widest text-gold drop-shadow">
                    Watch Proprietor Address
                  </span>
                </button>
              )}
            </div>
          </RevealOnScroll>

          {/* Transcript & Message Card */}
          <RevealOnScroll className="lg:col-span-6">
            <div className="card p-8 sm:p-10 relative bg-panel border border-line rounded-3xl shadow-sm">
              <span className="absolute -top-5 left-8 text-7xl text-copper/20 font-display leading-none select-none" aria-hidden="true">
                &ldquo;
              </span>
              <div className="space-y-4 text-[1.02rem] leading-relaxed text-ink/80 pt-2">
                <p className="text-lg font-semibold text-ink">Namasthe 🙏🏻</p>
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
                <p className="font-semibold text-ink">Thank You 🙏🏻</p>
              </div>
              <div className="mt-6 pt-5 border-t border-line flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-ink text-base">
                    Agari Raghavendra Rao
                  </div>
                  <div className="text-xs font-mono text-muted">
                    Founder &amp; Proprietor (Est. 1992)
                  </div>
                </div>
                <span className="text-xs font-mono text-gold bg-ink px-3 py-1.5 rounded-full font-medium">
                  34+ Yrs of Trust
                </span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
