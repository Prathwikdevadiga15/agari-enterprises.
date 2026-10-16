'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';
import { CATEGORY_GROUPS, categoryImage, categorySlug, CATALOG_PRODUCTS } from '@/lib/catalog';
import { useCatalogUI } from '@/lib/catalog-context';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { waLink } from '@/lib/config';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

const PRODUCT_COUNTS = {
  'Washing Machine': 8, 'Television': 4, 'Refrigerator': 4, 'AC': 4, 'Air Cooler': 4,
  'Fan': 4, 'Inverter': 4, 'Smart Phone': 4, 'Water Purifier': 4, 'Geyser': 4,
  'Speaker': 4, 'Induction Stove': 4, 'Pan': 4, 'Chimney': 4, 'Rice Pot': 4,
  'Gas Stove': 4, 'Mixer': 4, 'Oven': 4, 'TV Showcase': 3, 'Center Table': 3,
  'Dining Table': 3, 'Tipai': 3, 'Bed and Cot': 3, 'Wooden Almirah': 3,
  'Metal Almirah': 3, 'Computer Table': 3, 'Plastic Chair': 3, 'Wooden Chair': 3,
  'Wooden Shoe Rack': 3,
};

const FEATURED_MODELS = [
  {
    name: 'Sony Bravia 55" 4K Google TV',
    cat: 'Television',
    brand: 'Sony',
    price: 52990,
    mrp: 64900,
    img: '/images/categories/television.jpg',
    tag: 'Best Seller',
    specs: '4K HDR · Dolby Atmos · 60Hz',
  },
  {
    name: 'Whirlpool 265L Frost-Free Double Door',
    cat: 'Refrigerator',
    brand: 'Whirlpool',
    price: 26490,
    mrp: 32000,
    img: '/images/categories/refrigerator.jpg',
    tag: 'Energy Saver',
    specs: '3-Star Inverter · Zeolite Tech',
  },
  {
    name: 'LG 7.5 kg Smart Inverter Top Load',
    cat: 'Washing Machine',
    brand: 'LG',
    price: 21990,
    mrp: 27500,
    img: '/images/categories/washing-machine.jpg',
    tag: 'Top Rated',
    specs: 'Smart Motion · TurboDrum',
  },
  {
    name: 'Teakwood 6-Seater Cushioned Dining Set',
    cat: 'Dining Table',
    brand: 'Agari Woodworks',
    price: 32500,
    mrp: 41000,
    img: '/images/categories/dining-table.jpg',
    tag: 'Handcrafted',
    specs: 'Solid Teak · Natural Polish',
  },
  {
    name: 'Kurl-On King Size Orthopaedic Storage Cot',
    cat: 'Bed and Cot',
    brand: 'Kurl-on',
    price: 24990,
    mrp: 31000,
    img: '/images/categories/bed-and-cot.jpg',
    tag: 'Premium Wood',
    specs: 'Hydraulic Lift · Treated Wood',
  },
  {
    name: 'Preethi Zodiac 750W 5-Jar Mixer Grinder',
    cat: 'Mixer',
    brand: 'Preethi',
    price: 8990,
    mrp: 11200,
    img: '/images/categories/mixer.jpg',
    tag: 'Chef Choice',
    specs: 'Vega W5 Motor · Master Chef Jar',
  },
];

const GROUP_STYLES = {
  electronics: {
    badge: 'bg-trace-soft text-trace',
    gradient: 'from-trace/20 to-transparent',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="15" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  kitchen: {
    badge: 'bg-copper-soft text-copper-dark',
    gradient: 'from-copper/15 to-transparent',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
  },
  furniture: {
    badge: 'bg-wood-soft text-wood',
    gradient: 'from-wood/15 to-transparent',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" /><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z" />
        <path d="M4 18v2M20 18v2" />
      </svg>
    ),
  },
};

const TABS = [
  { id: 'all', label: 'All 29 Categories' },
  { id: 'electronics', label: 'Electronics (11)' },
  { id: 'kitchen', label: 'Kitchen (7)' },
  { id: 'furniture', label: 'Furniture (11)' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 0.8, 0.24, 1] } },
};

function CategoryCard({ cat, style }) {
  const { openCategory } = useCatalogUI();
  const count = PRODUCT_COUNTS[cat] || 4;
  const slug = categorySlug(cat);

  return (
    <motion.div
      variants={cardVariants}
      className="group relative rounded-2xl overflow-hidden border border-line bg-panel shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      whileHover={{ y: -4 }}
    >
      <button
        type="button"
        onClick={() => openCategory(cat)}
        className="text-left w-full focus:outline-none"
        aria-label={`View ${cat} models`}
      >
        {/* Image with zoom */}
        <div className="relative aspect-[4/3] bg-panel-2 overflow-hidden product-img-wrap">
          <Image
            src={categoryImage(cat)}
            alt={cat}
            fill
            sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,16vw"
            className="object-cover group-hover:scale-108 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity" />
          
          <span className={`absolute top-2.5 right-2.5 badge ${style?.badge || 'badge-stock'} backdrop-blur-md`}>
            {count} models
          </span>
        </div>

        {/* Label */}
        <div className="p-3">
          <h4 className="font-display font-semibold text-sm leading-tight text-ink group-hover:text-copper transition-colors">
            {cat}
          </h4>
        </div>
      </button>

      {/* Quick Navigation Footer */}
      <div className="px-3 pb-3 pt-0 flex items-center justify-between text-[11px] font-mono text-muted border-t border-line/40 mt-1">
        <button
          type="button"
          onClick={() => openCategory(cat)}
          className="hover:text-copper transition-colors font-medium"
        >
          Quick View
        </button>
        <Link
          href={`/categories/${slug}`}
          className="text-copper hover:underline inline-flex items-center gap-0.5"
        >
          Page →
        </Link>
      </div>
    </motion.div>
  );
}

export default function OrderCatalog() {
  const [activeTab, setActiveTab] = useState('all');
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [addedItem, setAddedItem] = useState(null);

  const visibleGroups = activeTab === 'all'
    ? CATEGORY_GROUPS
    : CATEGORY_GROUPS.filter((g) => g.id === activeTab);

  const handleQuickAdd = (item) => {
    addToCart({
      id: `feat_${categorySlug(item.name)}`,
      name: item.name,
      price: item.price,
      brand: item.brand,
      categoryName: item.cat,
    }, 1);
    setAddedItem(item.name);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <section className="section-pad bg-paper" id="order">
      <div className="container-a">
        {/* Section Header */}
        <RevealOnScroll className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-line pb-8">
            <div>
              <span className="eyebrow !text-copper mb-2 block">Premium Retail Showcase</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-2">
                Browse by Category &amp; Models
              </h2>
              <p className="text-muted max-w-xl text-sm sm:text-base leading-relaxed">
                Over 100+ branded appliances and handcrafted furniture designs with doorstep delivery across Dakshina Kannada.
              </p>
            </div>
            
            {/* Quick Metrics */}
            <div className="flex gap-6 sm:gap-8 flex-shrink-0">
              <div className="text-center">
                <div className="font-display font-bold text-2xl sm:text-3xl text-trace">29</div>
                <div className="text-[11px] text-muted font-mono uppercase tracking-wider">Categories</div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-2xl sm:text-3xl text-copper">100+</div>
                <div className="text-[11px] text-muted font-mono uppercase tracking-wider">Models</div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-2xl sm:text-3xl text-gold">₹0</div>
                <div className="text-[11px] text-muted font-mono uppercase tracking-wider">Free Delivery</div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Category Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="inline-flex flex-wrap gap-1 p-1 bg-panel-2 border border-line rounded-xl">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-white shadow-sm'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-grad-trace"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          <Link
            href="/shop"
            className="btn btn-outline text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 hover:border-copper hover:text-copper"
          >
            Explore Full Shop Catalogue →
          </Link>
        </div>

        {/* Category Groups Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {visibleGroups.map((group) => (
              <div key={group.id} className="mb-14 last:mb-0">
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${GROUP_STYLES[group.id]?.badge || 'bg-trace-soft text-trace'}`}>
                      {GROUP_STYLES[group.id]?.icon}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-ink">{group.label}</h3>
                      <p className="text-xs text-muted font-mono">{group.categories.length} categories available</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-muted hidden sm:inline">
                    Tap to view pricing &amp; specs
                  </span>
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
                >
                  {group.categories.map((cat) => (
                    <CategoryCard key={cat} cat={cat} style={GROUP_STYLES[group.id]} />
                  ))}
                </motion.div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 🌟 FEATURED MODELS & BEST SELLERS SHOWCASE 🌟 */}
        <div className="mt-20 pt-16 border-t border-line">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="eyebrow !text-copper mb-2 block">Handpicked Selections</span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink">
                Featured Best-Seller Models
              </h3>
              <p className="text-muted text-xs sm:text-sm mt-1">
                Top requested models in our showrooms with verified warranty and immediate dispatch availability.
              </p>
            </div>
            <Link href="/shop" className="text-xs font-mono text-copper hover:underline">
              View all 100+ models →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_MODELS.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-line bg-panel p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-panel-2 mb-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-ink/80 text-gold backdrop-blur-sm">
                        {item.tag}
                      </span>
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/90 text-ink shadow">
                        {item.brand}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
                    {item.cat}
                  </p>
                  <h4 className="font-semibold text-ink text-sm sm:text-base group-hover:text-copper transition-colors line-clamp-2 mb-1.5">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted font-mono mb-3">
                    {item.specs}
                  </p>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold font-display text-ink">
                      {formatINR(item.price)}
                    </span>
                    <span className="text-xs text-muted line-through font-mono">
                      {formatINR(item.mrp)}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">
                      Save {Math.round(((item.mrp - item.price) / item.mrp) * 100)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-line/60">
                  <button
                    onClick={() => handleQuickAdd(item)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                      addedItem === item.name
                        ? 'bg-emerald-600 text-white'
                        : 'btn-copper w-full'
                    }`}
                  >
                    {addedItem === item.name ? '✓ Added to Cart' : 'Add to Cart'}
                  </button>
                  <a
                    href={waLink(`Hi Agari Enterprises, I want to confirm price and stock for: ${item.name} (${formatINR(item.price)}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full py-2 px-3 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors border border-emerald-200"
                  >
                    Confirm via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
