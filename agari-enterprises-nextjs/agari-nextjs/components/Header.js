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

/* ── Category Nav with visual icons & badges ── */
const CAT_NAV = [
  { label: 'All Products', icon: '🌟', section: '/shop' },
  { label: 'Electronics', icon: '📺', section: '/shop?category=electronics' },
  { label: 'Furniture', icon: '🛋️', section: '/shop?category=furniture' },
  { label: 'Kitchen', icon: '🥣', section: '/shop?category=kitchen' },
  { label: 'Book Repair', icon: '🛠️', badge: 'Hot', section: '/repairs/book' },
  { label: 'Track Status', icon: '📦', section: '/repairs/track' },
  { label: 'Heritage', icon: '🎭', section: '#heritage' },
  { label: 'Founder', icon: '🎬', section: '#proprietor' },
  { label: 'FAQs & Policies', icon: '❓', section: '/faq' },
  { label: 'Our Branches', icon: '📍', section: '/contact' },
  { label: 'Admin Portal', icon: '👤', section: '/admin' },
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

/* ── Mega Menu Departments Data ── */
const DEPARTMENTS = [
  {
    title: 'Consumer Electronics',
    icon: '⚡',
    color: 'from-blue-500/20 to-teal-500/20',
    link: '/shop?category=electronics',
    items: [
      { name: 'Smart 4K & LED TVs', desc: 'Sony, Samsung, LG, Mi', href: '/shop?category=electronics' },
      { name: 'Double & Single Door Fridges', desc: 'LG, Samsung, Whirlpool', href: '/shop?category=electronics' },
      { name: 'Inverter Split & Window ACs', desc: 'Daikin, Voltas, Blue Star', href: '/shop?category=electronics' },
      { name: 'Front & Top Load Washers', desc: 'Bosch, IFB, Whirlpool', href: '/shop?category=electronics' },
      { name: 'Convection Microwave Ovens', desc: 'Quick reheating & baking', href: '/shop?category=electronics' },
    ],
  },
  {
    title: 'Home & Living Furniture',
    icon: '🛋️',
    color: 'from-amber-500/20 to-orange-500/20',
    link: '/shop?category=furniture',
    items: [
      { name: 'Teakwood Living Room Sofas', desc: 'L-shape & 3+1+1 luxury', href: '/shop?category=furniture' },
      { name: 'King & Queen Solid Cots', desc: 'With hydraulic storage', href: '/shop?category=furniture' },
      { name: '4 & 6-Seater Dining Sets', desc: 'Solid wood & glass top', href: '/shop?category=furniture' },
      { name: 'Wardrobes & Dressing Tables', desc: '2, 3 & 4-door modular', href: '/shop?category=furniture' },
      { name: 'Ergonomic Office Chairs', desc: 'Comfortable mesh support', href: '/shop?category=furniture' },
    ],
  },
  {
    title: 'Kitchen & Daily Utilities',
    icon: '🥣',
    color: 'from-emerald-500/20 to-green-500/20',
    link: '/shop?category=kitchen',
    items: [
      { name: 'Heavy Duty Mixer Grinders', desc: 'Preethi, Philips, Sujata 750W', href: '/shop?category=kitchen' },
      { name: 'RO + UV Water Purifiers', desc: 'Kent, Aquaguard, Pureit', href: '/shop?category=kitchen' },
      { name: 'Induction Stoves & Hobs', desc: 'Energy efficient cooking', href: '/shop?category=kitchen' },
      { name: 'Wet Grinders & Juicers', desc: 'Dosa/Idli batter perfection', href: '/shop?category=kitchen' },
      { name: 'Kitchen Spares & Jars', desc: 'Original blades & gaskets', href: '/shop?category=kitchen' },
    ],
  },
  {
    title: 'Doorstep Repair & Spares',
    icon: '🛠️',
    color: 'from-rose-500/20 to-red-500/20',
    link: '/repairs/book',
    items: [
      { name: 'TV Panel & Backlight Repair', desc: 'Sound, power, motherboard', href: '/repairs/book' },
      { name: 'Refrigerator Gas Refill', desc: 'Compressor & cooling issues', href: '/repairs/book' },
      { name: 'Washing Machine Drum & Motor', desc: 'Drainage & heavy vibration', href: '/repairs/book' },
      { name: 'AC Jet Cleaning & Service', desc: 'Filter clean & R32/R410A gas', href: '/repairs/book' },
      { name: 'Track Live Repair Status', desc: 'Real-time ticket updates', href: '/repairs/track' },
    ],
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Surathkal');
  const [activeNav, setActiveNav] = useState('');
  const locationRef = useRef(null);
  const megaMenuRef = useRef(null);

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

  /* close dropdowns on outside click */
  useEffect(() => {
    function handler(e) {
      if (!locationRef.current?.contains(e.target)) setLocationOpen(false);
      if (!megaMenuRef.current?.contains(e.target)) setMegaMenuOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* active section tracking */
  useEffect(() => {
    const ids = ['about', 'heritage', 'proprietor', 'repair', 'order', 'gallery', 'faq', 'contact'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveNav(`#${e.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
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
            ? 'bg-panel/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,.15)] border-b border-line'
            : 'bg-transparent'
        }`}
      >
        {/* ── ROW 1: top info bar ── */}
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
                  {/* Left: trust guarantees */}
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
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Open Every Day: 9 AM – 9 PM
                    </span>
                  </div>
                  <span className="sm:hidden text-gold font-semibold">Est. 1992 · Trusted across Mangaluru</span>

                  {/* Right: quick links + phone */}
                  <div className="flex items-center gap-4">
                    <Link href="/repairs/track" className="hover:text-gold transition-colors hidden md:inline">
                      Track Repair
                    </Link>
                    <Link href="/admin" className="hover:text-gold transition-colors hidden md:inline opacity-80 hover:opacity-100">
                      Staff Portal
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

        {/* ── ROW 2: main header bar ── */}
        <div className="container-a flex items-center gap-3 lg:gap-4 h-[66px] transition-all duration-300">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group" aria-label="Agari Enterprises — home">
            <span className={`inline-flex items-center justify-center rounded-xl shadow-md transition-all duration-300 overflow-hidden bg-white p-1.5 w-10 h-10`}>
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
                Est. 1992 · Surathkal
              </span>
            </div>
          </Link>

          {/* Mega Menu / All Departments Dropdown Button */}
          <div className="relative hidden lg:block flex-shrink-0" ref={megaMenuRef}>
            <button
              type="button"
              onClick={() => setMegaMenuOpen((v) => !v)}
              className={`flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all duration-200 ${
                megaMenuOpen
                  ? 'bg-gold text-green-deep border-gold shadow-md'
                  : scrolled
                  ? 'border-line bg-panel-2 text-ink hover:border-trace'
                  : 'border-white/20 bg-white/10 text-cream hover:bg-white/20'
              }`}
              aria-expanded={megaMenuOpen}
              aria-label="Toggle Departments Mega Menu"
            >
              <span>🗂️</span>
              <span>All Departments</span>
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* ── MEGA MENU POPUP ── */}
            <AnimatePresence>
              {megaMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2.5 w-[920px] bg-[#0E1B17] border border-gold/30 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.65)] overflow-hidden z-50 p-6 text-cream"
                >
                  {/* Top Bar inside mega menu */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                      <span className="font-display font-bold text-base text-gold">Explore Agari Departments &amp; Services</span>
                    </div>
                    <span className="text-xs font-mono text-cream/60">34+ Years of Trusted Craftsmanship</span>
                  </div>

                  {/* 4 Columns */}
                  <div className="grid grid-cols-4 gap-6">
                    {DEPARTMENTS.map((dept) => (
                      <div key={dept.title} className="space-y-3">
                        <Link
                          href={dept.link}
                          onClick={() => setMegaMenuOpen(false)}
                          className="flex items-center gap-2 font-display font-bold text-sm text-gold hover:text-gold-light transition-colors group"
                        >
                          <span className="text-lg">{dept.icon}</span>
                          <span className="group-hover:underline">{dept.title}</span>
                        </Link>
                        <ul className="space-y-2 text-xs">
                          {dept.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                onClick={() => setMegaMenuOpen(false)}
                                className="block p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                              >
                                <span className="font-medium text-cream block hover:text-gold">{item.name}</span>
                                <span className="text-[10px] text-cream/50 block font-mono">{item.desc}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Mega Menu Footer Banner */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between bg-white/[.03] -mx-6 -mb-6 px-6 py-4">
                    <div className="flex items-center gap-4 text-xs font-mono text-cream/70">
                      <span>🚚 Free Doorstep Delivery</span>
                      <span>•</span>
                      <span>🛡️ 6-Month Ironclad Warranty</span>
                      <span>•</span>
                      <span>⚡ 30-Min Service Response</span>
                    </div>
                    <a
                      href="#request"
                      onClick={() => setMegaMenuOpen(false)}
                      className="btn btn-copper !py-1.5 !px-4 !text-xs"
                    >
                      Instant Inquiry →
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Location selector */}
          <div className="relative hidden xl:block flex-shrink-0" ref={locationRef}>
            <button
              type="button"
              onClick={() => setLocationOpen((v) => !v)}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border transition-colors ${
                scrolled
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
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-panel-2 ${
                        selectedLocation === loc ? 'text-trace font-semibold' : 'text-ink'
                      }`}
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
            {/* Wishlist */}
            <button
              type="button"
              className={`hidden lg:flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg relative transition-colors ${
                scrolled ? 'text-ink hover:bg-panel-2' : 'text-cream hover:bg-white/10'
              }`}
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
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg relative transition-colors ${
                scrolled ? 'text-ink hover:bg-panel-2' : 'text-cream hover:bg-white/10'
              }`}
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

            {/* Call Now */}
            <a
              href={telHref()}
              className="hidden sm:inline-flex items-center gap-1.5 btn btn-copper !py-2 !px-4 !text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call
            </a>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                scrolled ? 'text-ink hover:bg-panel-2' : 'text-cream hover:bg-white/10'
              }`}
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

        {/* ── ROW 3: Enhanced Category Nav Bar with Visual Icons & Badges ── */}
        <div className={`border-t transition-colors duration-300 ${scrolled ? 'border-line' : 'border-white/10'}`}>
          <div className="container-a">
            <div className="pills-scroll">
              <nav className="flex items-center gap-1 py-1.5" aria-label="Product categories">
                {CAT_NAV.map((item) => (
                  <a
                    key={item.label}
                    href={item.section}
                    className={`cat-nav-link flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all relative ${
                      scrolled ? 'text-ink-soft hover:text-ink hover:bg-panel-2' : 'text-cream/80 hover:text-cream hover:bg-white/10'
                    } ${activeNav === item.section ? 'text-gold font-semibold bg-white/10' : ''}`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 bg-copper text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ))}
                <div className="flex-1" />
                <a
                  href="#request"
                  className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    scrolled ? 'text-trace hover:text-trace-dark bg-trace-soft' : 'text-gold hover:text-gold-light bg-gold/10 border border-gold/30'
                  }`}
                >
                  Book Visit →
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* ── Mobile menu drawer ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden bg-[#0B1613] text-cream border-t border-gold/30 md:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="container-a py-5 space-y-5">
                <SearchBar />

                {/* Location Picker */}
                <div className="flex items-center gap-2 text-xs text-cream/80 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Branch:</span>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="flex-1 bg-black/50 border border-gold/30 rounded-lg px-2 py-1 text-xs text-gold"
                  >
                    {LOCATIONS.map((l) => <option key={l} value={l} className="bg-black text-white">{l}</option>)}
                  </select>
                </div>

                {/* Mobile Department Grid */}
                <div>
                  <p className="text-[11px] font-mono text-gold uppercase tracking-wider mb-2">Explore Departments</p>
                  <div className="grid grid-cols-2 gap-2">
                    {DEPARTMENTS.map((d) => (
                      <Link
                        key={d.title}
                        href={d.link}
                        onClick={() => setMobileOpen(false)}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-gold/40 transition-colors flex items-center gap-2"
                      >
                        <span className="text-xl">{d.icon}</span>
                        <div className="text-left">
                          <span className="block text-xs font-bold text-cream leading-tight">{d.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Main Nav Links */}
                <nav className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                  {MAIN_NAV.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-colors bg-white/5 hover:bg-white/10 ${
                        activeNav === l.href ? 'text-gold border border-gold/40' : 'text-cream/80'
                      }`}
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => { openDrawer(); setMobileOpen(false); }}
                    className="btn btn-ghost flex-1 !py-2.5 !text-xs !text-cream border-white/20"
                  >
                    Cart {count > 0 && `(${count})`}
                  </button>
                  <a href={telHref()} className="btn btn-copper flex-1 !py-2.5 !text-xs">
                    Call 9845353412
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
