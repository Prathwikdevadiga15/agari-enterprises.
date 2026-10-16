'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { CONFIG, waLink } from '@/lib/config';
import { CATEGORY_GROUPS, categoryImage } from '@/lib/catalog';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function ShopPage() {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [availFilter, setAvailFilter] = useState('all');
  const [sortOption, setSortOption] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(60000);

  // Load products from API
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch('/api/products?limit=150');
        const data = await res.json();
        if (data.products) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Compute available categories and brands
  const allCategories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (selectedGroup === 'all' || p.categoryGroup === selectedGroup) {
        set.add(p.categoryName);
      }
    });
    return Array.from(set).sort();
  }, [products, selectedGroup]);

  const allBrands = useMemo(() => {
    const set = new Set();
    products.forEach((p) => set.add(p.brand));
    return Array.from(set).sort();
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Group filter
      if (selectedGroup !== 'all' && p.categoryGroup !== selectedGroup) return false;
      // Category filter
      if (selectedCategory !== 'all' && p.categoryName !== selectedCategory) return false;
      // Brand filter
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
      // Avail filter
      if (availFilter !== 'all' && p.avail.toLowerCase() !== availFilter.toLowerCase()) return false;
      // Max price
      if (p.price > maxPrice) return false;
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      return 0; // featured default
    });
  }, [products, selectedGroup, selectedCategory, selectedBrand, availFilter, maxPrice, searchQuery, sortOption]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper pt-28 pb-20">
        {/* Banner */}
        <div className="bg-grad-ink text-cream py-12 mb-8 border-b border-line">
          <div className="container-a">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold mb-2">
                <span>Agari Catalogue</span>
                <span>•</span>
                <span>Doorstep Delivery Across Mangaluru</span>
              </div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-3">
                Shop Electronics &amp; Furniture
              </h1>
              <p className="text-cream/80 text-sm sm:text-base leading-relaxed">
                Explore brand-new appliances, kitchen essentials, and handcrafted home furniture.
                Every purchase includes free local delivery, verified brand warranty, and installation support.
              </p>
            </div>
          </div>
        </div>

        <div className="container-a">
          {/* Top Controls Bar */}
          <div className="bg-panel border border-line rounded-2xl p-4 mb-8 shadow-card flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Group Tabs */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {[
                { id: 'all', label: 'All Products' },
                { id: 'electronics', label: 'Electronics' },
                { id: 'kitchen', label: 'Kitchen Appliances' },
                { id: 'furniture', label: 'Furniture' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSelectedGroup(tab.id);
                    setSelectedCategory('all');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedGroup === tab.id
                      ? 'bg-ink text-panel shadow-sm'
                      : 'bg-panel-2 text-ink-soft hover:text-ink hover:bg-line/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search and Sort */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  placeholder="Search products or brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2 pl-8 focus:outline-none focus:ring-2 focus:ring-trace"
                />
                <svg className="w-4 h-4 text-ink-faint absolute left-2.5 top-2.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </div>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="text-xs bg-paper border border-line rounded-xl px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Category Filter */}
              <div className="bg-panel border border-line rounded-2xl p-5 shadow-sm">
                <h3 className="font-display font-semibold text-sm text-ink mb-3 uppercase tracking-wider text-xs">
                  Categories ({allCategories.length})
                </h3>
                <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedCategory === 'all' ? 'bg-trace-soft text-trace font-bold' : 'text-ink-soft hover:bg-panel-2'
                    }`}
                  >
                    All Categories
                  </button>
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedCategory === cat ? 'bg-trace-soft text-trace font-bold' : 'text-ink-soft hover:bg-panel-2'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="bg-panel border border-line rounded-2xl p-5 shadow-sm">
                <h3 className="font-display font-semibold text-sm text-ink mb-3 uppercase tracking-wider text-xs">
                  Brand Filter
                </h3>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-trace mb-2"
                >
                  <option value="all">All Brands ({allBrands.length})</option>
                  {allBrands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div className="bg-panel border border-line rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-ink">
                    Max Price
                  </h3>
                  <span className="text-xs font-bold text-copper-dark">{formatINR(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="60000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-copper cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-ink-faint mt-1">
                  <span>₹500</span>
                  <span>₹60,000+</span>
                </div>
              </div>

              {/* Stock Filter */}
              <div className="bg-panel border border-line rounded-2xl p-5 shadow-sm">
                <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-ink mb-3">
                  Availability
                </h3>
                <div className="flex gap-2">
                  {['all', 'in stock', 'on order'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setAvailFilter(st)}
                      className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg capitalize border ${
                        availFilter === st
                          ? 'border-trace bg-trace text-white'
                          : 'border-line bg-panel-2 text-ink-soft hover:bg-line/40'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Need help banner */}
              <div className="rounded-2xl p-5 bg-grad-copper text-white shadow-glow-copper text-center">
                <h4 className="font-display font-bold text-base mb-1">Looking for a Custom Quote?</h4>
                <p className="text-xs text-white/90 mb-3">
                  Bulk furniture for homes or institutions? We provide custom package rates!
                </p>
                <a
                  href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hi%20Agari%20Enterprises,%20I'd%20like%20to%20request%20a%20quote%20for%20products.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full py-2 px-4 rounded-xl bg-white text-copper-dark font-bold text-xs shadow-sm hover:bg-paper transition-colors"
                >
                  WhatsApp Quotation
                </a>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-ink-soft">
                  Showing <span className="font-bold text-ink">{filteredProducts.length}</span> products
                  {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                </p>
                {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedBrand('all');
                      setSearchQuery('');
                      setMaxPrice(60000);
                      setAvailFilter('all');
                    }}
                    className="text-xs text-copper-dark font-semibold hover:underline"
                  >
                    Reset all filters
                  </button>
                )}
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-panel border border-line rounded-2xl p-4 h-80 animate-pulse flex flex-col justify-between">
                      <div className="bg-panel-2 aspect-[4/3] rounded-xl w-full" />
                      <div className="h-4 bg-line/60 rounded w-3/4 mt-4" />
                      <div className="h-3 bg-line/40 rounded w-1/2" />
                      <div className="h-8 bg-line/50 rounded mt-4" />
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="bg-panel border border-line rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-panel-2 text-ink-soft flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink mb-1">No products match your criteria</h3>
                  <p className="text-xs text-ink-soft max-w-sm mx-auto mb-4">
                    Try clearing some filters or searching for another appliance or furniture item.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGroup('all');
                      setSelectedCategory('all');
                      setSelectedBrand('all');
                      setSearchQuery('');
                      setMaxPrice(60000);
                    }}
                    className="btn btn-sm btn-trace"
                  >
                    View All Products
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredProducts.map((p) => {
                    const wish = isWishlisted(p, p.categoryName);
                    const attrsList = Object.entries(p.attrs || {}).slice(0, 2);

                    return (
                      <div
                        key={p.id}
                        className="group bg-panel border border-line rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col"
                      >
                        {/* Image Wrap */}
                        <div className="relative aspect-[4/3] bg-panel-2 overflow-hidden">
                          <Link href={`/product/${p.slug || p.id}`} className="block w-full h-full">
                            <Image
                              src={p.imageUrl || categoryImage(p.categoryName)}
                              alt={p.name}
                              fill
                              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 300px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </Link>

                          {/* Wishlist Button */}
                          <button
                            type="button"
                            onClick={() => toggle(p, p.categoryName)}
                            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all"
                            aria-label="Wishlist"
                          >
                            <svg
                              className={`w-4 h-4 ${wish ? 'fill-copper stroke-copper' : 'fill-none stroke-ink-soft'}`}
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                          </button>

                          {/* Availability Badge */}
                          <span
                            className={`absolute bottom-2.5 left-2.5 badge ${
                              p.avail === 'In Stock' ? 'badge-stock' : 'badge-order'
                            }`}
                          >
                            {p.avail}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-1">
                          <div className="flex items-center justify-between text-[11px] font-mono text-ink-faint mb-1">
                            <span className="uppercase tracking-wider font-semibold text-trace">{p.brand}</span>
                            <span>{p.categoryName}</span>
                          </div>

                          <Link href={`/product/${p.slug || p.id}`}>
                            <h3 className="font-display font-semibold text-sm leading-snug text-ink mb-1 group-hover:text-copper transition-colors line-clamp-2">
                              {p.name}
                            </h3>
                          </Link>

                          {/* Specs Pills */}
                          {attrsList.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 my-2">
                              {attrsList.map(([k, v]) => (
                                <span key={k} className="text-[10px] bg-panel-2 text-ink-soft px-2 py-0.5 rounded-md border border-line/60">
                                  {k}: {v}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="mt-auto pt-3 border-t border-line flex items-center justify-between gap-2">
                            <div>
                              <div className="font-display font-bold text-lg text-ink">
                                {formatINR(p.price)}
                              </div>
                              {p.salePrice && (
                                <div className="text-[10px] text-ink-faint line-through">
                                  {formatINR(p.salePrice)}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5">
                              {/* WhatsApp Direct */}
                              <a
                                href={waLink(
                                  `Hi Agari Enterprises, I'm interested in *${p.brand} ${p.name}* (${p.categoryName}) for ${formatINR(p.price)}. Please confirm availability.`
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20b859] transition-colors"
                                title="Enquire on WhatsApp"
                              >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.94.55 3.75 1.49 5.29L2 22l4.86-1.44A9.95 9.95 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.46 14.18c-.23.64-1.33 1.23-1.84 1.3-.48.06-1.1.09-3.56-.91-3.14-1.28-5.16-4.47-5.32-4.68-.16-.21-1.27-1.69-1.27-3.23s.8-2.3 1.09-2.61c.28-.31.62-.39.83-.39.21 0 .41 0 .59.01.19.01.44-.07.69.53.25.62.86 2.11.94 2.27.08.16.13.35.03.56-.1.21-.16.34-.31.52-.16.18-.33.4-.47.54-.16.15-.32.32-.14.63.18.31.81 1.34 1.74 2.17 1.2 1.07 2.21 1.4 2.52 1.56.31.15.5.13.68-.08.19-.21.8-1.04 1.01-1.4.21-.36.42-.3.7-.19.28.1.1.77 3.86 2.08.41.22.48.33.55.57.07.24.07 1.39-.16 2.03z"/>
                                </svg>
                              </a>

                              {/* Add to Cart */}
                              <button
                                type="button"
                                onClick={() => addToCart(p, p.categoryName)}
                                className="btn btn-trace !py-1.5 !px-3 !text-xs !rounded-lg flex items-center gap-1"
                              >
                                <span>Add</span>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                  <path d="M12 5v14M5 12h14" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
