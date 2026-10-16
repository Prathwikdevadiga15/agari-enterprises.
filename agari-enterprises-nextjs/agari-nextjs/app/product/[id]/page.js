'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { CONFIG, waLink } from '@/lib/config';
import { categoryImage } from '@/lib/catalog';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setProduct(data.product);
        setRelated(data.related || []);
      } catch (e) {
        console.error('Failed to load product:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-paper pt-36 pb-20 container-a">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
            <div className="aspect-square bg-panel rounded-3xl" />
            <div className="space-y-4">
              <div className="h-4 bg-line/60 rounded w-1/4" />
              <div className="h-8 bg-line rounded w-3/4" />
              <div className="h-6 bg-line/80 rounded w-1/3" />
              <div className="h-24 bg-line/40 rounded w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-paper pt-36 pb-20 container-a text-center">
          <div className="max-w-md mx-auto bg-panel border border-line rounded-3xl p-8 shadow-card">
            <h1 className="font-display font-bold text-2xl mb-2 text-ink">Product Not Found</h1>
            <p className="text-xs text-ink-soft mb-6">The item you are looking for may have been updated or moved.</p>
            <Link href="/shop" className="btn btn-trace">
              Back to Catalog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const wish = isWishlisted(product, product.categoryName);

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) {
      addToCart(product, product.categoryName);
    }
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push('/checkout');
  }

  function orderWhatsApp() {
    const msg = `Hi Agari Enterprises! I would like to purchase:\n\n*${product.brand} ${product.name}*\nCategory: ${product.categoryName}\nModel: ${product.model}\nPrice: ${formatINR(product.price)}\nQuantity: ${qty}\nTotal (est.): ${formatINR(product.price * qty)}\n\nPlease let me know availability and delivery schedule.`;
    window.open(waLink(msg), '_blank');
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper pt-28 pb-20">
        {/* Breadcrumbs */}
        <div className="container-a py-4 text-xs font-mono text-ink-faint flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-copper transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-copper transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${encodeURIComponent(product.categoryName)}`} className="hover:text-copper transition-colors">
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        <div className="container-a">
          {/* Main Product Showcase */}
          <div className="bg-panel border border-line rounded-3xl p-6 sm:p-10 shadow-card mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Product Image Column */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative aspect-[4/3] sm:aspect-square bg-panel-2 rounded-2xl overflow-hidden border border-line/60">
                  <Image
                    src={product.imageUrl || categoryImage(product.categoryName)}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width:1024px) 100vw, 600px"
                    className="object-cover"
                  />
                  <span
                    className={`absolute top-4 left-4 badge text-xs ${
                      product.avail === 'In Stock' ? 'badge-stock' : 'badge-order'
                    }`}
                  >
                    {product.avail}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggle(product, product.categoryName)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
                    aria-label="Wishlist"
                  >
                    <svg
                      className={`w-5 h-5 ${wish ? 'fill-copper stroke-copper' : 'fill-none stroke-ink-soft'}`}
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                {/* Micro Guarantee Row */}
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-ink-soft pt-2">
                  <div className="bg-panel-2 p-2.5 rounded-xl border border-line/50">
                    <span className="block text-trace font-bold">Free Delivery</span>
                    <span>Surathkal &amp; Mangaluru</span>
                  </div>
                  <div className="bg-panel-2 p-2.5 rounded-xl border border-line/50">
                    <span className="block text-copper-dark font-bold">6-Month Warranty</span>
                    <span>Store Backed</span>
                  </div>
                  <div className="bg-panel-2 p-2.5 rounded-xl border border-line/50">
                    <span className="block text-ink font-bold">100% Genuine</span>
                    <span>Brand Authorized</span>
                  </div>
                </div>
              </div>

              {/* Product Info Column */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest px-2.5 py-1 rounded-md bg-trace-soft text-trace font-bold">
                    {product.brand}
                  </span>
                  <span className="text-xs text-ink-faint font-mono">Model: {product.model}</span>
                </div>

                <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink leading-tight mb-3">
                  {product.name}
                </h1>

                {/* Rating & Heritage */}
                <div className="flex items-center gap-3 text-xs text-ink-soft mb-5">
                  <div className="flex text-amber-500">
                    {'★'.repeat(5)}
                  </div>
                  <span>4.9 / 5.0 (Customer Verified)</span>
                  <span>•</span>
                  <span className="text-trace font-medium">Dakshina Kannada Delivery</span>
                </div>

                {/* Price Display */}
                <div className="bg-panel-2 p-4 rounded-2xl border border-line mb-6 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-ink-faint uppercase block">Offer Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-bold text-3xl sm:text-4xl text-ink">
                        {formatINR(product.price)}
                      </span>
                      {product.salePrice && (
                        <span className="text-sm text-ink-faint line-through">
                          {formatINR(product.salePrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-[10px] font-mono bg-trace text-white px-2 py-0.5 rounded-full font-bold">
                      IN STOCK: {product.stockQuantity} UNITS
                    </span>
                    <span className="block text-[11px] text-ink-faint mt-1">Zero delivery fees</span>
                  </div>
                </div>

                <p className="text-sm text-ink-soft leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Quantity and Actions */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-ink font-mono">Quantity:</span>
                    <div className="flex items-center border border-line rounded-xl bg-panel overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-9 h-9 flex items-center justify-center hover:bg-panel-2 transition-colors font-bold text-ink"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-ink font-mono">{qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty((q) => q + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-panel-2 transition-colors font-bold text-ink"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="flex-1 btn btn-trace btn-lg !rounded-xl flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      <span>Add to Cart</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleBuyNow}
                      className="flex-1 btn btn-copper btn-lg !rounded-xl"
                    >
                      Buy Now
                    </button>
                  </div>

                  {/* WhatsApp Enquiry Button */}
                  <button
                    type="button"
                    onClick={orderWhatsApp}
                    className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#20b859] transition-all shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.94.55 3.75 1.49 5.29L2 22l4.86-1.44A9.95 9.95 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.46 14.18c-.23.64-1.33 1.23-1.84 1.3-.48.06-1.1.09-3.56-.91-3.14-1.28-5.16-4.47-5.32-4.68-.16-.21-1.27-1.69-1.27-3.23s.8-2.3 1.09-2.61c.28-.31.62-.39.83-.39.21 0 .41 0 .59.01.19.01.44-.07.69.53.25.62.86 2.11.94 2.27.08.16.13.35.03.56-.1.21-.16.34-.31.52-.16.18-.33.4-.47.54-.16.15-.32.32-.14.63.18.31.81 1.34 1.74 2.17 1.2 1.07 2.21 1.4 2.52 1.56.31.15.5.13.68-.08.19-.21.8-1.04 1.01-1.4.21-.36.42-.3.7-.19.28.1.1.77 3.86 2.08.41.22.48.33.55.57.07.24.07 1.39-.16 2.03z"/>
                    </svg>
                    <span>Instant WhatsApp Order &amp; Enquiries</span>
                  </button>

                  {addedNotice && (
                    <div className="bg-trace-soft text-trace border border-trace/30 p-2.5 rounded-xl text-xs font-semibold text-center animate-fade-in">
                      ✓ Added {qty} item(s) to cart!
                    </div>
                  )}
                </div>

                {/* Service Highlights Box */}
                <div className="border-t border-line pt-4 text-xs text-ink-soft space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-trace" />
                    <span>Free installation assistance in Surathkal, Mangaluru &amp; Moodabidri</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-trace" />
                    <span>Pay online, or choose Cash / UPI on Doorstep Delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Tab */}
            <div className="mt-12 border-t border-line pt-8">
              <div className="flex gap-4 border-b border-line pb-3 mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('specs')}
                  className={`text-sm font-display font-semibold transition-colors pb-2 border-b-2 -mb-3.5 ${
                    activeTab === 'specs' ? 'border-copper text-copper-dark' : 'border-transparent text-ink-soft'
                  }`}
                >
                  Technical Specifications
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('warranty')}
                  className={`text-sm font-display font-semibold transition-colors pb-2 border-b-2 -mb-3.5 ${
                    activeTab === 'warranty' ? 'border-copper text-copper-dark' : 'border-transparent text-ink-soft'
                  }`}
                >
                  Warranty &amp; Service Terms
                </button>
              </div>

              {activeTab === 'specs' ? (
                <div className="max-w-2xl bg-panel-2 rounded-2xl border border-line overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <tbody>
                      <tr className="border-b border-line">
                        <td className="p-3 font-semibold text-ink-faint font-mono w-1/3">Brand</td>
                        <td className="p-3 font-bold text-ink">{product.brand}</td>
                      </tr>
                      <tr className="border-b border-line">
                        <td className="p-3 font-semibold text-ink-faint font-mono">Category</td>
                        <td className="p-3 text-ink">{product.categoryName}</td>
                      </tr>
                      <tr className="border-b border-line">
                        <td className="p-3 font-semibold text-ink-faint font-mono">Model Number</td>
                        <td className="p-3 text-ink font-mono">{product.model}</td>
                      </tr>
                      {Object.entries(product.attrs || {}).map(([key, val]) => (
                        <tr key={key} className="border-b border-line last:border-0">
                          <td className="p-3 font-semibold text-ink-faint font-mono">{key}</td>
                          <td className="p-3 text-ink">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="max-w-2xl text-xs text-ink-soft leading-relaxed space-y-3">
                  <p>
                    <strong>Agari 6-Month Workmanship Warranty:</strong> If you experience any functional or installation issues within 6 months of delivery, our local service technicians will inspect and address it at zero service charge.
                  </p>
                  <p>
                    <strong>Manufacturer Warranty:</strong> Electronics, compressors, and motor components are covered by original manufacturer warranties (ranging from 1 year to 10 years depending on brand and model).
                  </p>
                  <p>
                    <strong>Repair &amp; Spare Parts:</strong> Agari Enterprises maintains direct relationships with authorized brand service centres across Dakshina Kannada to source genuine spare parts.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display font-bold text-xl text-ink mb-6">
                Similar Products in {product.categoryName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug || item.id}`}
                    className="group bg-panel border border-line rounded-2xl overflow-hidden shadow-sm hover:shadow-card hover:-translate-y-1 transition-all p-3 flex flex-col"
                  >
                    <div className="relative aspect-[4/3] bg-panel-2 rounded-xl overflow-hidden mb-3">
                      <Image
                        src={item.imageUrl || categoryImage(item.categoryName)}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-trace font-bold">{item.brand}</span>
                    <h4 className="font-display font-semibold text-xs text-ink leading-tight mb-2 line-clamp-2">
                      {item.name}
                    </h4>
                    <div className="mt-auto pt-2 border-t border-line flex items-center justify-between">
                      <span className="font-bold text-sm text-ink">{formatINR(item.price)}</span>
                      <span className="text-[10px] text-trace font-semibold">View Details →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
