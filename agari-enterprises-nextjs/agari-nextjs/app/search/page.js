'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { CONFIG, waLink } from '@/lib/config';
import { categoryImage } from '@/lib/catalog';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

const SUGGESTIONS = [
  'Television',
  'Washing Machine',
  'Refrigerator',
  'AC',
  'Dining Table',
  'Bed and Cot',
  'Mixer',
  'Sony',
  'Samsung',
  'LG',
  'Whirlpool',
];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  async function performSearch(q) {
    if (!q.trim()) {
      setResults([]);
      setTotal(0);
      setHasSearched(false);
      return;
    }
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
      const data = await res.json();
      setResults(data.results || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Search query failed:', err);
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    performSearch(query);
  }

  function handleAdd(product) {
    addToCart(product, 1);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2000);
  }

  return (
    <div className="container-a py-12">
      {/* Search Bar Input */}
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-3">
          Search Products
        </h1>
        <p className="text-muted text-sm mb-6">
          Find electronics, furniture, appliances, and spare parts across our inventory
        </p>

        <form onSubmit={handleSearchSubmit} className="relative flex items-center mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by brand, category or model (e.g. Samsung TV, Whirlpool, Cot)..."
            className="w-full pl-5 pr-28 py-3.5 rounded-xl border border-line bg-panel text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-copper shadow-sm text-sm"
          />
          <button
            type="submit"
            className="absolute right-2 btn btn-copper py-2 px-5 text-xs rounded-lg"
          >
            Search
          </button>
        </form>

        {/* Suggested Searches */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-muted">
          <span className="font-mono text-[11px] uppercase tracking-wider mr-1">Popular:</span>
          {SUGGESTIONS.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setQuery(term);
                performSearch(term);
              }}
              className="px-2.5 py-1 rounded-full bg-panel border border-line hover:border-copper hover:text-copper transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      {hasSearched && (
        <div className="flex items-center justify-between border-b border-line pb-4 mb-8">
          <p className="text-sm font-medium text-ink">
            {loading ? (
              'Searching...'
            ) : (
              <>
                Showing <span className="font-bold text-copper">{total}</span> results for &ldquo;{query}&rdquo;
              </>
            )}
          </p>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-panel border border-line rounded-2xl p-4 animate-pulse">
              <div className="aspect-square bg-line/50 rounded-xl mb-4" />
              <div className="h-4 bg-line/60 rounded w-2/3 mb-2" />
              <div className="h-5 bg-line/80 rounded w-1/3 mb-4" />
              <div className="h-9 bg-line/50 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Results Grid */}
      {!loading && hasSearched && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((p) => {
            const img = categoryImage(p.categoryName);
            const wish = isWishlisted(p.id);

            return (
              <div
                key={p.id}
                className="group bg-panel border border-line rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square overflow-hidden bg-white/40">
                    <Link href={`/product/${p.id}`}>
                      <img
                        src={img}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </Link>
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-ink/80 text-cream backdrop-blur-sm">
                        {p.brand}
                      </span>
                    </div>
                    <button
                      onClick={() => toggle(p)}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center hover:scale-110 transition-transform"
                      aria-label="Wishlist"
                    >
                      <span>{wish ? '❤️' : '🤍'}</span>
                    </button>
                  </div>

                  <div className="p-4">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
                      {p.categoryName}
                    </p>
                    <Link href={`/product/${p.id}`}>
                      <h3 className="font-semibold text-ink text-sm hover:text-copper transition-colors line-clamp-2 mb-2">
                        {p.name}
                      </h3>
                    </Link>
                    <div className="text-lg font-bold font-display text-ink mb-3">
                      {formatINR(p.price)}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 space-y-2">
                  <button
                    onClick={() => handleAdd(p)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                      addedItem === p.id
                        ? 'bg-emerald-600 text-white'
                        : 'btn-copper w-full'
                    }`}
                  >
                    {addedItem === p.id ? '✓ Added to Cart' : 'Add to Cart'}
                  </button>
                  <a
                    href={waLink(`Hi Agari Enterprises, I found ${p.name} on your website search. Is it in stock?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full py-1.5 px-3 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors border border-emerald-200"
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && hasSearched && results.length === 0 && (
        <div className="text-center py-16 bg-panel border border-line rounded-2xl max-w-lg mx-auto p-8">
          <span className="text-4xl mb-4 block">🔍</span>
          <h2 className="font-display text-xl font-bold text-ink mb-2">
            No matching products found
          </h2>
          <p className="text-muted text-sm mb-6">
            We couldn&apos;t find any items matching &ldquo;{query}&rdquo;. Try another search term or browse our complete catalogue.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/shop" className="btn btn-outline text-xs">
              Browse All Products
            </Link>
            <a
              href={waLink(`Hi Agari Enterprises, I was searching for "${query}" on your website. Do you have this product available?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-copper text-xs"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper pt-28 pb-20">
        <Suspense fallback={<div className="container-a py-20 text-center font-mono text-sm text-muted">Loading search...</div>}>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
