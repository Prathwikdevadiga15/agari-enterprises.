'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG, telHref } from '@/lib/config';
import { useCart } from '@/lib/cart-context';
import { useCatalogUI } from '@/lib/catalog-context';
import { useWishlist } from '@/lib/wishlist-context';
import SearchBar from './SearchBar';

/* ── category nav items ── */
const CAT_NAV = [
  { label: 'All Products', section: '/shop' },
  { label: 'Electronics', section: '/shop?category=electronics' },
  { label: 'Furniture', section: '/shop?category=furniture' },
  { label: 'Kitchen', section: '/shop?category=kitchen' },
  { label: 'Book Repair', section: '/repairs/book' },
  { label: 'Track Repair Status', section: '/repairs/track' },
  { label: 'About & Heritage', section: '/about' },
  { label: 'FAQs & Policies', section: '/faq' },
  { label: 'Our Branches', section: '/contact' },
  { label: 'Admin Portal', section: '/admin' },
];

const MAIN_NAV = [
  { href: '/about', label: 'About & Heritage' },
  { href: '/shop', label: 'Shop Catalog' },
  { href: '/repairs/book', label: 'Book Repair' },
  { href: '/repairs/track', label: 'Track Repair' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/faq', label: 'FAQs' },
  { href: '/contact', label: 'Locations & Contact' },
  { href: '/admin', label: 'Staff Admin' },
];

const LOCATIONS = [
  'Surathkal', 'Mangalore', 'Moodabidre', 'Kavoor', 'Yedapadavu',
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Surathkal');
  const [activeNav, setActiveNav] = useState('');
  const locationRef = useRef(null);

  const { count, openDrawer } = useCart();
  const { openCategory } = useCatalogUI();
  const { count: wishCount } = useWishlist();

  /* scroll + progress */
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight || 1;
      setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close location dropdown on outside click */
  useEffect(() => {
    function handler(e) {
      if (!locationRef.current?.contains(e.target)) setLocationOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* active section tracking */
  useEffect(() => {
    const ids = ['about', 'repair', 'order', 'gallery', 'faq', 'contact'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveNav(`#${e.target.id}`); });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 inset-x-0 z-[60] transition-all duration-300 ${
          scrolled
            ? 'bg-panel/95 backdrop-blur-md shadow-[0_2px_20px_rgba(28,43,42,.15)] border-b border-line'
            : 'bg-transparent'
        }`}
      >
        {/* ── ROW 1: top info bar (hides on scroll) ── */}
        <AnimatePresence>
          {!scrolled && (
            <motion.div
              initial={{ height: 36, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="bg-green-deep text-cream/80 text-xs font-mono">
                <div className="container-a flex items-center justify-between h-9 gap-4">
                  {/* Left: trust marquee */}
                  <div className="hidden sm:flex items-center gap-6">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      6-Month Warranty
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      Free Doorstep Delivery
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                      </svg>
                      Open Every Day, 9 AM – 9 PM
                    </span>
                  </div>
                  <span className="sm:hidden text-gold font-semibold">Est. 1992 · Trusted across Mangaluru</span>
                  {/* Right: quick links + phone */}
                  <div className="flex items-center gap-4">
                    <Link href="/repairs" className="hover:text-gold transition-colors hidden md:inline">
                      Track Repair
                    </Link>
                    <Link href="/admin" className="hover:text-gold transition-colors hidden md:inline opacity-80 hover:opacity-100">
                      Admin
                    </Link>
                    <a href={telHref()} className="flex items-center gap-1.5 hover:text-gold transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      {CONFIG.displayPhone}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── ROW 2: main bar ── */}
        <div className={`container-a flex items-center gap-3 lg:gap-4 h-[66px] transition-all duration-300`}>
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 flex-shrink-0 group" aria-label="Agari Enterprises — home">
            <span className={`inline-flex items-center justify-center rounded-xl shadow-md transition-all duration-300 overflow-hidden
              ${scrolled ? 'bg-white p-1.5 w-10 h-10' : 'bg-white p-1.5 w-10 h-10'}`}>
              <Image
                src="/images/logo.png"
                alt="Agari Enterprises logo"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </span>
            <div className="hidden sm:block leading-tight">
              <span className={`block font-display font-bold text-[1.05rem] transition-colors ${scrolled ? 'text-ink' : 'text-cream'}`}>
                Agari Enterprises
              </span>
              <span className={`block text-[10px] font-mono transition-colors ${scrolled ? 'text-ink-faint' : 'text-gold/80'}`}>
                Est. 1992
              </span>
            </div>
          </a>

          {/* Location selector */}
          <div className="relative hidden lg:block flex-shrink-0" ref={locationRef}>
            <button
              type="button"
              onClick={() => setLocationOpen((v) => !v)}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border transition-colors
                ${scrolled
                  ? 'border-line bg-panel-2 text-ink-soft hover:border-trace'
                  : 'border-white/20 bg-white/10 text-cream/80 hover:border-white/40'
                }`}
              aria-label="Select location"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <span>{selectedLocation}</span>
              <svg className={`w-3 h-3 transition-transform ${locationOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <AnimatePresence>
              {locationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-1.5 left-0 w-44 bg-panel border border-line rounded-xl shadow-lg overflow-hidden z-50"
                >
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => { setSelectedLocation(loc); setLocationOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-panel-2
                        ${selectedLocation === loc ? 'text-trace font-semibold' : 'text-ink'}`}
                    >
                      {loc}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search bar */}
          <div className="flex-1 min-w-0 hidden md:block">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Account */}
            <a
              href="#request"
              className={`hidden lg:flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors
                ${scrolled ? 'text-ink hover:bg-panel-2' : 'text-cream hover:bg-white/10'}`}
              aria-label="Account"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              <span className="text-[10px] font-medium">Account</span>
            </a>

            {/* Orders */}
            <a
              href="#request"
              className={`hidden lg:flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors
                ${scrolled ? 'text-ink hover:bg-panel-2' : 'text-cream hover:bg-white/10'}`}
              aria-label="Orders"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="2" />
                <path d="M9 12h6M9 16h4" />
              </svg>
              <span className="text-[10px] font-medium">Orders</span>
            </a>

            {/* Wishlist */}
            <button
              type="button"
              className={`hidden lg:flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg relative transition-colors
                ${scrolled ? 'text-ink hover:bg-panel-2' : 'text-cream hover:bg-white/10'}`}
              aria-label={`Wishlist (${wishCount} items)`}
            >
              <span className="relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-copper text-white text-[9px] font-bold flex items-center justify-center">
                    {wishCount}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-medium">Wishlist</span>
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={openDrawer}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg relative transition-colors
                ${scrolled ? 'text-ink hover:bg-panel-2' : 'text-cream hover:bg-white/10'}`}
              aria-label={`Cart (${count} items)`}
            >
              <span className="relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-copper text-white text-[9px] font-bold flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </span>
              <span className="text-[10px] font-medium">Cart</span>
            </button>

            {/* Call Now CTA */}
            <a
              href={telHref()}
              className={`hidden sm:inline-flex items-center gap-1.5 btn btn-copper !py-2 !px-4 !text-sm`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call
            </a>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors
                ${scrolled ? 'text-ink hover:bg-panel-2' : 'text-cream hover:bg-white/10'}`}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}
                    className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </motion.svg>
                ) : (
                  <motion.svg key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}
                    className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── ROW 3: category nav bar ── */}
        <div className={`border-t transition-colors duration-300 ${scrolled ? 'border-line' : 'border-white/10'}`}>
          <div className="container-a">
            <div className="pills-scroll">
              <nav className="flex items-center gap-0 py-0" aria-label="Product categories">
                {CAT_NAV.map((item) => (
                  <a
                    key={item.label}
                    href={item.section}
                    className={`cat-nav-link flex-shrink-0 px-4 py-2.5 text-[.84rem] font-medium transition-colors relative
                      ${scrolled ? 'text-ink-soft hover:text-ink' : 'text-cream/75 hover:text-cream'}
                      ${activeNav === item.section ? 'text-gold font-semibold' : ''}`}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex-1" />
                <a
                  href="#request"
                  className={`flex-shrink-0 px-4 py-2 text-[.84rem] font-semibold transition-colors
                    ${scrolled ? 'text-trace hover:text-trace-dark' : 'text-gold hover:text-gold-light'}`}
                >
                  Get Started →
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden bg-panel border-t border-line md:hidden"
            >
              <div className="container-a py-4 space-y-4">
                <SearchBar />
                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-ink-soft">
                  <svg className="w-4 h-4 text-trace" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Delivering to:</span>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="flex-1 bg-panel-2 border border-line rounded-lg px-2 py-1.5 text-sm text-ink"
                  >
                    {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <nav className="grid grid-cols-2 gap-2">
                  {MAIN_NAV.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-panel-2
                        ${activeNav === l.href ? 'text-trace bg-trace-soft' : 'text-ink'}`}
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => { openDrawer(); setMobileOpen(false); }}
                    className="btn btn-ghost flex-1 !py-2.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    Cart {count > 0 && `(${count})`}
                  </button>
                  <a href={telHref()} className="btn btn-copper flex-1 !py-2.5">
                    Call Now
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
