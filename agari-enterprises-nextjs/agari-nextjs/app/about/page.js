import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Locations from '@/components/Locations';
import { CONFIG, waLink } from '@/lib/config';

export const metadata = {
  title: 'About Agari Enterprises | Established 1992 in Yedapadavu',
  description: 'Three decades of trusted electronics repair and quality home furniture across Surathkal, Mangaluru, and coastal Karnataka.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper pt-28 pb-20">
        {/* Editorial Top Hero Banner */}
        <section className="relative bg-grad-ink text-cream py-16 sm:py-24 overflow-hidden border-b border-copper/20">
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(232,166,87,0.25) 0%, transparent 60%)',
            }}
          />
          <div className="container-a relative z-10">
            <div className="max-w-3xl">
              <span className="eyebrow !text-gold mb-3 inline-block">
                Established 1992 · Tulunadu Heritage
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] mb-6">
                Three Decades of Trust, <br />
                <span className="bg-grad-gold bg-clip-text text-transparent">Craftsmanship &amp; Service.</span>
              </h1>
              <p className="text-cream/85 text-base sm:text-lg leading-relaxed mb-8">
                From a humble service desk founded in 1992 in Yedapadavu by Sri Agari Raghavendra Rao,
                to 6 premier retail showrooms and authorized service centers across coastal Karnataka.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#yakshagana-feature"
                  className="btn btn-copper py-3 px-6 text-sm rounded-xl shadow-[0_0_25px_rgba(193,105,43,0.35)]"
                >
                  Explore Our Cultural Heritage ↓
                </a>
                <Link
                  href="/shop"
                  className="btn glass !text-cream hover:!bg-white/20 py-3 px-6 text-sm rounded-xl"
                >
                  Browse Store Collection
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 🌟 BIG YAKSHAGANA PHOTO FEATURE SECTION 🌟 */}
        <section id="yakshagana-feature" className="py-20 sm:py-28 bg-panel-2 border-b border-line relative overflow-hidden">
          <div className="container-a">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Big Majestic Photo Showcase */}
              <div className="lg:col-span-7 relative">
                {/* Ornate Gold Border Frame */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-gold/40 group">
                  <div className="aspect-[4/3] sm:aspect-[16/10] relative">
                    <img
                      src="/images/yakshagana.jpg"
                      alt="Yakshagana artist in regal traditional Tulunadu attire — Agari Enterprises Heritage"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  {/* Floating Gold Plaque on Photo */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass text-cream backdrop-blur-md border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-3 h-3 rounded-full bg-gold animate-pulse" />
                      <span className="text-xs font-mono tracking-widest uppercase text-gold">
                        Tulunadu Tradition · Since 1992
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-cream">
                      The Art of Yakshagana
                    </h3>
                    <p className="text-xs sm:text-sm text-cream/80 mt-1 leading-relaxed">
                      Representing devotion, rhythm, and timeless cultural integrity — values that guide our customer relationships every day.
                    </p>
                  </div>
                </div>

                {/* Decorative background aura */}
                <div
                  className="absolute -inset-4 bg-gradient-to-r from-gold/20 via-copper/20 to-transparent rounded-3xl blur-2xl -z-10 opacity-70"
                />
              </div>

              {/* Story Narrative */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-copper/10 border border-copper/25 text-copper text-xs font-mono uppercase tracking-wider">
                  <span>🎭</span> The Spirit of Coastal Karnataka
                </div>

                <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink leading-tight">
                  Deeply Rooted in the Soil of <span className="text-copper">Tulunadu</span>
                </h2>

                <p className="text-muted text-sm sm:text-base leading-relaxed">
                  In coastal Karnataka, trust is not built overnight — it is earned through generations of honesty, fair pricing, and standing by every word.
                </p>

                <p className="text-muted text-sm sm:text-base leading-relaxed">
                  Just as the divine theatre of Yakshagana has preserved coastal heritage for centuries, Agari Enterprises has preserved the golden standard of customer care since 1992.
                </p>

                {/* Core Pillars */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-line">
                  <div className="p-4 rounded-xl bg-panel border border-line">
                    <span className="text-2xl font-display font-bold text-copper block mb-1">1992</span>
                    <span className="text-xs font-semibold text-ink block">Founded</span>
                    <span className="text-[11px] text-muted">In Yedapadavu, D.K.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-panel border border-line">
                    <span className="text-2xl font-display font-bold text-gold block mb-1">6 Stores</span>
                    <span className="text-xs font-semibold text-ink block">Branches</span>
                    <span className="text-[11px] text-muted">Across Mangaluru region</span>
                  </div>
                  <div className="p-4 rounded-xl bg-panel border border-line">
                    <span className="text-2xl font-display font-bold text-emerald-600 block mb-1">100%</span>
                    <span className="text-xs font-semibold text-ink block">Genuine Parts</span>
                    <span className="text-[11px] text-muted">Direct brand sourcing</span>
                  </div>
                  <div className="p-4 rounded-xl bg-panel border border-line">
                    <span className="text-2xl font-display font-bold text-ink block mb-1">6 Months</span>
                    <span className="text-xs font-semibold text-ink block">Warranty</span>
                    <span className="text-[11px] text-muted">On all repair services</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder & Business Philosophy */}
        <section className="py-20 bg-paper border-b border-line">
          <div className="container-a max-w-4xl text-center">
            <span className="eyebrow !text-copper mb-2 block">Proprietor&apos;s Vision</span>
            <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl italic text-ink font-semibold my-6 leading-snug">
              &ldquo;Offer is yours. Rate is ours.&rdquo;
            </blockquote>
            <p className="text-base sm:text-lg text-ink/80 font-medium max-w-2xl mx-auto mb-4">
              Sri Agari Raghavendra Rao
            </p>
            <p className="text-sm font-mono text-muted mb-8">
              Founder &amp; Proprietor — Agari Enterprises
            </p>
            <div className="bg-panel border border-line rounded-3xl p-8 sm:p-10 text-left text-sm sm:text-base text-muted space-y-4 leading-relaxed shadow-sm">
              <p>
                Agari Enterprises was established in 1992 in Yedapadavu. The business began by providing essential community utility services — electricity payment counters, cable network operations, and localized electronics repair.
              </p>
              <p>
                By focusing on uncompromised repair quality, transparent diagnosis, and honest pricing, word of mouth quickly spread. Over three decades, that single counter grew into a full-fledged retail network offering state-of-the-art televisions, refrigerators, washing machines, air conditioners, and solid wood furniture.
              </p>
              <p className="font-medium text-ink">
                Today, Agari Enterprises stands tall as a household name across Surathkal, Mangaluru, and Moodabidri — blending traditional Tulunadu warmth with modern technology and doorstep service.
              </p>
            </div>
          </div>
        </section>

        {/* Real Showroom Gallery Showcase */}
        <section className="py-20 bg-panel border-b border-line">
          <div className="container-a">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="eyebrow !text-copper mb-2 block">Storefronts &amp; Showrooms</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink">
                Visit Us in Person Across Coastal Karnataka
              </h2>
              <p className="text-muted text-sm sm:text-base mt-2">
                Spacious showrooms featuring live product demonstrations, friendly consultation, and instant delivery booking.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Surathkal Main Showroom', loc: 'Navodaya Complex, Opp. Govinda Dasa PU College', img: '/images/gallery/01-surathkal-storefront.jpg' },
                { title: 'Evening Showroom View', loc: 'Surathkal Highway Junction', img: '/images/gallery/02-showroom-evening.jpg' },
                { title: 'Prestige Tower Branch', loc: 'Maryhill, Konchadi, Mangaluru', img: '/images/gallery/03-prestige-tower-branch.jpg' },
                { title: 'Moodabidre Town Showroom', loc: 'Main Commercial Hub, Moodabidri', img: '/images/gallery/04-moodabidre-showroom.jpg' },
                { title: 'Festive Electronics Display', loc: 'Dasara & Deepavali Mega Showcase', img: '/images/gallery/07-festive-sale.jpg' },
                { title: 'Customer Experience Center', loc: 'Head Office & Technical Workshop', img: '/images/gallery/06-head-office.jpg' },
              ].map((item, idx) => (
                <div key={idx} className="group rounded-2xl overflow-hidden border border-line bg-panel shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[16/10] overflow-hidden relative bg-line/30">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-base text-ink group-hover:text-copper transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted font-mono mt-1">
                      {item.loc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Store Locations Component */}
        <Locations />

        {/* Bottom Banner */}
        <div className="container-a mt-16 text-center">
          <div className="p-10 rounded-3xl bg-ink text-cream relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(232,166,87,0.4) 0%, transparent 60%)',
              }}
            />
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                Experience the Agari difference today
              </h2>
              <p className="text-sm text-cream/75">
                Whether you need a quick repair for your refrigerator or want to furnish your entire home, our team is always ready to assist.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <a
                  href={waLink('Hi Agari Enterprises, I read your story and would like to enquire about your products.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-copper text-xs py-2.5 px-6 rounded-xl"
                >
                  Connect on WhatsApp
                </a>
                <Link href="/contact" className="btn btn-outline !text-cream !border-cream/30 text-xs py-2.5 px-6 rounded-xl">
                  Contact Showrooms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
