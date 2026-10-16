'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { CONFIG } from '@/lib/config';
import { useCatalogUI } from '@/lib/catalog-context';
import { ShieldCheck, Truck, Clock, Wrench, ShoppingBag, MapPin } from './icons';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

const QUICK_CATS = [
  { label: 'Washing Machine', icon: '🫧' },
  { label: 'Television', icon: '📺' },
  { label: 'Refrigerator', icon: '🧊' },
  { label: 'AC', icon: '❄️' },
  { label: 'Smart Phone', icon: '📱' },
  { label: 'Bed and Cot', icon: '🛏️' },
  { label: 'Dining Table', icon: '🪑' },
  { label: 'Mixer', icon: '🥣' },
];

const STATS = [
  { label: 'Est.', value: '1992', sub: '30+ yrs of trust' },
  { label: 'Branches', value: '6', sub: 'Across Mangaluru' },
  { label: 'Callback', value: '30m', sub: 'Guaranteed' },
];

export default function Hero() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const { openCategory } = useCatalogUI();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-eyebrow',  { opacity: 0, y: 14, duration: 0.6 })
        .from('.hero-welcome',  { opacity: 0, y: 14, duration: 0.6 }, '-=0.4')
        .from('.hero-title',    { opacity: 0, y: 24, duration: 0.8 }, '-=0.35')
        .from('.hero-tagline',  { opacity: 0, y: 16, duration: 0.6 }, '-=0.45')
        .from('.hero-sub',      { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')
        .from('.hero-chip',     { opacity: 0, y: 12, duration: 0.5 }, '-=0.35')
        .from('.hero-cta',      { opacity: 0, y: 14, duration: 0.5, stagger: 0.1 }, '-=0.3')
        .from('.hero-trust',    { opacity: 0, y: 10, duration: 0.5, stagger: 0.08 }, '-=0.25')
        .from('.hero-cats',     { opacity: 0, y: 14, duration: 0.5 }, '-=0.2')
        .from('.hero-stat',     { opacity: 0, x: 20, duration: 0.5, stagger: 0.1 }, '-=0.3');
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  return (
    <section ref={rootRef} className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#0B1613]" id="top">
      {/* ── Background Video sent at 7-29-2026 ── */}
      <video
        ref={videoRef}
        className="hero-video absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-90"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* 3D circuit trace overlay */}
      <div className="absolute inset-0 z-[1] opacity-35 mix-blend-screen pointer-events-none">
        <HeroScene />
      </div>

      {/* Hero overlay from exact reference website */}
      <div
        className="hero-overlay absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 18% 20%, rgba(217,140,72,.30), transparent 60%),' +
            'radial-gradient(ellipse 55% 50% at 88% 88%, rgba(46,107,88,.26), transparent 60%),' +
            'linear-gradient(180deg, rgba(9,17,15,.76) 0%, rgba(9,17,15,.48) 42%, rgba(9,17,15,.88) 100%)',
        }}
      />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none z-[2] opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.07) 1px, transparent 1.3px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Main hero content */}
      <div className="container-a relative z-10 py-28 sm:py-32 lg:py-36 text-cream">
        <div className="max-w-2xl">
          <span className="hero-eyebrow eyebrow !text-gold !mb-2">Est. 1992 · Electronics &amp; Furniture</span>
          <p className="hero-welcome font-mono text-sm tracking-wide opacity-75 mb-1">Welcome to</p>
          <h1 className="hero-title font-display font-bold text-[2.6rem] sm:text-[3.4rem] lg:text-[4.2rem] leading-[1.05] mb-3 text-shadow">
            Agari{' '}
            <span className="bg-gradient-to-r from-[#F0C989] to-[#DA8C48] bg-clip-text text-transparent">
              Enterprises
            </span>
          </h1>
          <p className="hero-tagline text-xl sm:text-2xl font-semibold mb-2 text-cream/95">
            Bring home the future of comfort.
          </p>
          <p className="hero-sub text-[1.02rem] leading-relaxed opacity-82 max-w-xl mb-5">
            From smart electronics to handcrafted furniture — everything for your dream home, repaired, renewed, or delivered, with three decades of trusted service in Surathkal.
          </p>

          {/* Heritage chip */}
          <div className="hero-chip inline-flex items-center gap-3 glass rounded-full pl-1.5 pr-4 py-1.5 mb-5 border border-gold/40">
            <span className="w-9 h-9 rounded-full overflow-hidden border-2 border-gold/60 flex-shrink-0">
              <img
                src="/images/yakshagana.jpg"
                alt="Yakshagana performer — Tulunadu tradition"
                className="w-full h-full object-cover object-top"
              />
            </span>
            <span className="text-sm font-medium text-cream/90 font-mono">A Tulunadu tradition, since 1992</span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-4">
            <a
              href="#request"
              data-set-mode="repair"
              className="hero-cta btn btn-copper btn-lg shadow-[0_0_30px_rgba(193,105,43,.35)] hover:scale-105 transition-all"
            >
              <Wrench className="w-[18px] h-[18px]" />
              Book a Repair
            </a>
            <a
              href="#request"
              data-set-mode="order"
              className="hero-cta btn btn-lg glass !text-cream hover:!bg-white/20 hover:scale-105 transition-all"
              style={{ borderColor: 'rgba(255,255,255,.4)' }}
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              Order Now
            </a>
            <a href="#contact" className="hero-cta btn btn-lg glass !text-cream hover:!bg-white/20 !border-transparent">
              <MapPin className="w-[18px] h-[18px] text-gold" />
              Visit Store
            </a>
          </div>

          {/* Quick category pills */}
          <div className="hero-cats mb-5">
            <p className="text-xs font-mono uppercase tracking-widest text-cream/50 mb-2">Browse categories</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_CATS.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => openCategory(c.label)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-cream/85 text-xs font-medium
                    hover:bg-white/20 hover:text-cream transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>{c.icon}</span>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[.85rem] opacity-80">
            <span className="hero-trust flex items-center gap-1.5 font-mono">
              <ShieldCheck className="w-4 h-4 text-gold" />
              6-month warranty
            </span>
            <span className="hero-trust flex items-center gap-1.5 font-mono">
              <Truck className="w-4 h-4 text-gold" />
              Doorstep service
            </span>
            <span className="hero-trust flex items-center gap-1.5 font-mono">
              <Clock className="w-4 h-4 text-gold" />
              30-min callback
            </span>
          </div>
        </div>

        {/* Floating stat cards (bottom-right) */}
        <div className="absolute right-0 bottom-24 hidden xl:flex flex-col gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="hero-stat glass rounded-xl px-4 py-3 text-right min-w-[120px] border border-white/20"
            >
              <div className="text-2xl font-display font-bold text-gold">{s.value}</div>
              <div className="text-[11px] font-mono text-cream/60">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Floating Store Badge from reference */}
        <div className="hidden md:flex items-center gap-2 absolute right-8 bottom-6 z-20 bg-white/95 rounded-2xl px-4 py-2.5 shadow-2xl border border-white/60 pointer-events-none">
          <img src="/images/logo.png" alt="Agari Enterprises" className="h-8 w-auto object-contain" />
          <div className="text-left text-ink pl-1 border-l border-line/60">
            <span className="block font-display font-bold text-xs leading-none">Agari Enterprises</span>
            <span className="block text-[9px] font-mono text-muted">Est. 1992 · Surathkal</span>
          </div>
        </div>
      </div>

      {/* Video controls toggle button */}
      <button
        onClick={toggleVideo}
        type="button"
        className="absolute bottom-6 left-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-[11px] font-mono text-cream/75 hover:text-cream hover:bg-white/20 transition-all border border-white/20"
        aria-label={isVideoPlaying ? 'Pause background video' : 'Play background video'}
      >
        <span>{isVideoPlaying ? '⏸' : '▶'}</span>
        <span>{isVideoPlaying ? 'Pause Video' : 'Play Video'}</span>
      </button>

      {/* Bottom wave divider */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[70px] text-paper z-10"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,40 C 360,95 1080,0 1440,45 L1440,100 L0,100 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
