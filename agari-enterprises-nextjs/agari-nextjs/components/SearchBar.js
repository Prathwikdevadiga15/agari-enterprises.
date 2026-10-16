'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchProducts, CATEGORY_GROUPS } from '@/lib/catalog';
import { useCatalogUI } from '@/lib/catalog-context';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

const QUICK_CATS = ['Washing Machine', 'Television', 'Refrigerator', 'AC', 'Mixer', 'Bed and Cot'];

export default function SearchBar({ className = '' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef(null);
  const { openCategory, openSearch } = useCatalogUI();

  useEffect(() => {
    if (query.trim().length >= 2) {
      setResults(searchProducts(query).slice(0, 7));
    } else {
      setResults([]);
    }
    setActiveIdx(-1);
  }, [query]);

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIdx >= 0 && results[activeIdx]) {
        openCategory(results[activeIdx].cat);
        setQuery('');
        setFocused(false);
      } else if (query.trim()) {
        openSearch(query.trim());
        setQuery('');
        setFocused(false);
      }
    } else if (e.key === 'Escape') {
      setFocused(false);
      inputRef.current?.blur();
    }
  }

  const showDropdown = focused && (results.length > 0 || query.trim().length < 2);

  return (
    <div className={`relative ${className}`}>
      <div className={`flex items-center rounded-xl border-2 transition-all duration-200 bg-panel overflow-hidden
        ${focused ? 'border-trace shadow-[0_0_0_4px_rgba(46,107,88,.12)]' : 'border-line hover:border-ink-soft'}`}>
        {/* Search icon */}
        <svg className="w-5 h-5 ml-3.5 flex-shrink-0 text-ink-faint" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder="Search for TV, Washing Machine, Sofa…"
          aria-label="Search products"
          autoComplete="off"
          className="flex-1 px-3 py-3 text-sm bg-transparent outline-none placeholder:text-ink-faint text-ink"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
            className="mr-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-panel-2 text-ink-faint"
            aria-label="Clear search"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
        <button
          type="button"
          onClick={() => { if (query.trim()) { openSearch(query.trim()); setQuery(''); setFocused(false); } }}
          className="flex-shrink-0 h-full px-5 py-3 bg-trace text-white text-sm font-semibold transition-colors hover:bg-trace-dark border-l border-line"
        >
          Search
        </button>
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 right-0 bg-panel border border-line rounded-xl shadow-lg z-50 overflow-hidden"
          >
            {results.length > 0 ? (
              <>
                <div className="px-4 pt-3 pb-1 text-[11px] font-mono uppercase tracking-wider text-ink-faint">
                  Products
                </div>
                {results.map((p, i) => (
                  <button
                    key={`${p.cat}-${p.brand}-${p.name}`}
                    type="button"
                    onMouseDown={() => { openCategory(p.cat); setQuery(''); setFocused(false); }}
                    className={`autocomplete-item w-full text-left ${i === activeIdx ? 'bg-panel-2' : ''}`}
                  >
                    <span className="w-8 h-8 rounded-lg bg-trace-soft flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-trace" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-ink truncate">{p.brand} {p.name}</div>
                      <div className="text-[11px] text-ink-faint">{p.cat} · {formatINR(p.price)}</div>
                    </div>
                    <span className="text-xs text-trace font-medium flex-shrink-0">View →</span>
                  </button>
                ))}
              </>
            ) : null}

            {/* Quick categories */}
            <div className="px-4 pt-3 pb-1 text-[11px] font-mono uppercase tracking-wider text-ink-faint border-t border-line">
              Popular Categories
            </div>
            <div className="flex flex-wrap gap-2 px-4 pb-4 pt-2">
              {QUICK_CATS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onMouseDown={() => { openCategory(cat); setFocused(false); }}
                  className="cat-pill text-xs"
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
