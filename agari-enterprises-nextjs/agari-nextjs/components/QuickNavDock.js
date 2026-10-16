'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG, telHref } from '@/lib/config';
import { useCart } from '@/lib/cart-context';

export default function QuickNavDock() {
  const [visible, setVisible] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const { openDrawer, count } = useCart();

  useEffect(() => {
    function handleScroll() {
      // Show dock after scrolling down 200px
      setVisible(window.scrollY > 200);

      const sections = [
        { id: 'top', key: 'home' },
        { id: 'heritage', key: 'heritage' },
        { id: 'proprietor', key: 'founder' },
        { id: 'repair', key: 'repair' },
        { id: 'order', key: 'shop' },
        { id: 'contact', key: 'contact' },
      ];

      const scrollPos = window.scrollY + 300;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveItem(sec.key);
            break;
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    {
      key: 'home',
      label: 'Home',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      action: () => scrollToSection('top'),
    },
    {
      key: 'heritage',
      label: 'Heritage',
      icon: (
        <span className="text-sm">🎭</span>
      ),
      action: () => scrollToSection('heritage'),
    },
    {
      key: 'founder',
      label: 'Founder Video',
      icon: (
        <span className="text-sm">🎬</span>
      ),
      action: () => scrollToSection('proprietor'),
    },
    {
      key: 'repair',
      label: 'Book Repair',
      badge: '6-Mo',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      action: () => scrollToSection('repair'),
    },
    {
      key: 'shop',
      label: 'Catalog',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
      action: () => scrollToSection('order'),
    },
    {
      key: 'contact',
      label: 'Branches',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
      ),
      action: () => scrollToSection('contact'),
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-5 inset-x-0 z-50 flex justify-center pointer-events-none px-4"
          aria-label="Quick Navigation Dock"
        >
          <div className="pointer-events-auto bg-[#0B1613]/90 backdrop-blur-xl border border-gold/30 rounded-2xl p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center gap-1 sm:gap-1.5">
            {navItems.map((item) => {
              const isActive = activeItem === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={item.action}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-gold/30 to-copper/30 text-gold shadow-sm border border-gold/40'
                      : 'text-cream/75 hover:text-cream hover:bg-white/10'
                  }`}
                  aria-label={item.label}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="hidden md:inline whitespace-nowrap">{item.label}</span>
                  {item.badge && (
                    <span className="hidden sm:inline text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-copper text-white font-bold">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeDockIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gold rounded-full"
                    />
                  )}
                </button>
              );
            })}

            {/* Divider */}
            <div className="w-[1px] h-6 bg-white/20 mx-1 hidden sm:block" />

            {/* Quick Call */}
            <a
              href={telHref()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-trace text-white hover:bg-trace-dark transition-colors shadow-sm"
              title="Call 9845353412"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="hidden sm:inline">Call</span>
            </a>

            {/* Scroll to Top */}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-cream/70 hover:text-cream hover:bg-white/10 transition-colors"
              aria-label="Scroll to top"
              title="Back to top"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
