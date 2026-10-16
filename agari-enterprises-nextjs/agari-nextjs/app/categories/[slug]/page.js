'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { CONFIG, waLink } from '@/lib/config';
import { categoryImage, categorySlug } from '@/lib/catalog';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function CategoryPage({ params }) {
  const { slug } = params;
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    async function fetchCategoryProducts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?category=${encodeURIComponent(slug)}&limit=50`);
        const data = await res.json();
        const prods = data.products || [];
        setProducts(prods);
        if (prods.length > 0) {
          setCategoryName(prods[0].categoryName || slug);
        } else {
          // Format readable name from slug
          const readable = slug
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
          setCategoryName(readable);
        }
      } catch (err) {
        console.error('Failed to load category products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategoryProducts();
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // featured
  });

  const handleAdd = (product) => {
    addToCart(product, 1);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper pt-28 pb-20">
        {/* Category Hero Banner */}
        <div className="bg-ink text-cream py-14 border-b border-copper/20 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(193,105,43,0.3) 0%, transparent 60%)',
            }}
          />
          <div className="container-a relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-cream/60 mb-4">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-gold font-medium">{categoryName || slug}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gold mb-2 block">
                  Category Collection
                </span>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cream">
                  {categoryName || 'Products'}
                </h1>
                <p className="text-cream/70 text-sm sm:text-base mt-2 max-w-xl">
                  Explore verified {categoryName.toLowerCase()} models available for direct purchase, express delivery and professional installation.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-cream/70">
                  {products.length} {products.length === 1 ? 'item' : 'items'}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-cream focus:outline-none focus:border-gold"
                >
                  <option value="featured" className="bg-ink text-cream">Sort: Featured</option>
                  <option value="price-asc" className="bg-ink text-cream">Price: Low to High</option>
                  <option value="price-desc" className="bg-ink text-cream">Price: High to Low</option>
                  <option value="name" className="bg-ink text-cream">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="container-a py-12">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-panel border border-line rounded-2xl p-4 animate-pulse">
                  <div className="aspect-square bg-line/50 rounded-xl mb-4" />
                  <div className="h-4 bg-line/60 rounded w-2/3 mb-2" />
                  <div className="h-5 bg-line/80 rounded w-1/3 mb-4" />
                  <div className="h-9 bg-line/50 rounded" />
                </div>
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-20 bg-panel border border-line rounded-2xl max-w-xl mx-auto p-8">
              <span className="text-4xl mb-4 block">📦</span>
              <h2 className="font-display text-xl font-bold text-ink mb-2">No products found in this category</h2>
              <p className="text-muted text-sm mb-6">
                We are constantly updating our live store inventory. You can enquire directly with our store team for specific models.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/shop" className="btn btn-outline text-xs">
                  View All Products
                </Link>
                <a
                  href={waLink(`Hi Agari Enterprises, I am looking for ${categoryName}. Can you share available options and pricing?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-copper text-xs"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedProducts.map((p) => {
                const img = categoryImage(p.categoryName);
                const wish = isWishlisted(p.id);

                return (
                  <div
                    key={p.id}
                    className="group bg-panel border border-line rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden bg-white/40">
                        <Link href={`/product/${p.id}`}>
                          <img
                            src={img}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </Link>

                        {/* Badges */}
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-ink/80 text-cream backdrop-blur-sm">
                            {p.brand}
                          </span>
                          {p.avail && (
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-full backdrop-blur-sm ${
                                p.avail === 'In Stock'
                                  ? 'bg-emerald-600/90 text-white'
                                  : 'bg-amber-600/90 text-white'
                              }`}
                            >
                              {p.avail}
                            </span>
                          )}
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={() => toggle(p)}
                          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center hover:scale-110 transition-transform"
                          aria-label="Wishlist"
                        >
                          <span className={wish ? 'text-red-500' : 'text-muted'}>
                            {wish ? '❤️' : '🤍'}
                          </span>
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <p className="text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
                          {p.categoryName}
                        </p>
                        <Link href={`/product/${p.id}`}>
                          <h3 className="font-semibold text-ink text-sm hover:text-copper transition-colors line-clamp-2 mb-2">
                            {p.name}
                          </h3>
                        </Link>
                        {p.model && (
                          <p className="text-xs text-muted/80 font-mono mb-2">
                            Model: {p.model}
                          </p>
                        )}
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-lg font-bold font-display text-ink">
                            {formatINR(p.price)}
                          </span>
                          {p.salePrice && (
                            <span className="text-xs text-muted line-through">
                              {formatINR(p.salePrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
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
                        href={waLink(`Hi Agari Enterprises, I'm interested in buying: ${p.name} (${formatINR(p.price)}). Is this available for delivery?`)}
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
        </div>
      </main>
      <Footer />
    </>
  );
}
