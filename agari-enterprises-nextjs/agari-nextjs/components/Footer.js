import Image from 'next/image';
import Link from 'next/link';
import { CONFIG, AGARI_LOCATIONS, telHref, waLink } from '@/lib/config';
import { CATEGORY_GROUPS, categorySlug } from '@/lib/catalog';

const QUICK_LINKS = [
  { href: '/shop', label: 'Shop Catalogue' },
  { href: '/repairs/book', label: 'Book a Repair' },
  { href: '/repairs/track', label: 'Track Repair Status' },
  { href: '/about', label: 'About Us & Heritage' },
  { href: '/contact', label: 'Contact & Branches' },
  { href: '/faq', label: 'FAQs & Policies' },
  { href: '/admin', label: 'Admin Portal' },
];

export default function Footer() {
  return (
    <footer className="relative bg-green-deep text-cream overflow-hidden">
      {/* Decorative background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 10% 90%, rgba(46,107,88,.15) 0%, transparent 60%),' +
            'radial-gradient(ellipse 40% 40% at 90% 20%, rgba(232,166,87,.08) 0%, transparent 50%)',
        }}
      />
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.8) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      {/* Top CTA strip */}
      <div className="bg-trace relative z-10">
        <div className="container-a py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-lg text-white">Ready to get started?</p>
            <p className="text-sm text-white/70">Book a repair or order your next appliance today.</p>
          </div>
          <div className="flex gap-3">
            <a
              href="#request"
              data-set-mode="repair"
              className="btn bg-white text-trace hover:bg-cream border-0 !py-2.5 !px-5 text-sm"
            >
              Book Repair
            </a>
            <a
              href={waLink('Hi Agari Enterprises, I have a question.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[#25D366] text-white border-0 !py-2.5 !px-5 text-sm hover:bg-[#22c55e]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container-a pt-14 pb-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <span className="h-10 w-auto inline-flex items-center justify-center rounded-xl bg-white p-1.5 shadow-md">
              <Image src="/images/logo.png" alt="Agari Enterprises" width={80} height={28} className="h-7 w-auto object-contain" />
            </span>
            <div>
              <div className="font-display font-bold text-base leading-tight">{CONFIG.businessName}</div>
              <div className="text-[10px] font-mono text-cream/50">Est. {CONFIG.founded}</div>
            </div>
          </div>
          <p className="text-sm text-cream/65 leading-relaxed mb-5">
            Your trusted local shop for electronics repair, new appliances and furniture across Dakshina Kannada since {CONFIG.founded}.
          </p>
          {/* Contact info */}
          <ul className="space-y-2.5">
            <li className="flex items-center gap-2 text-sm text-cream/70">
              <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a href={telHref()} className="hover:text-gold transition-colors">{CONFIG.displayPhone}</a>
            </li>
            <li className="flex items-start gap-2 text-sm text-cream/70">
              <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <span>{CONFIG.address}</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-cream/70">
              <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
              </svg>
              <span>{CONFIG.hours}</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-cream/70">
              <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
              </svg>
              <a href={`mailto:${CONFIG.email}`} className="hover:text-gold transition-colors break-all">{CONFIG.email}</a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-cream/50 mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="flex items-center gap-2 text-sm text-cream/70 hover:text-gold transition-colors group"
                >
                  <svg className="w-3.5 h-3.5 text-trace group-hover:text-gold transition-colors" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-cream/50 mb-4">Categories</h4>
          <div className="space-y-4">
            {CATEGORY_GROUPS.map((g) => (
              <div key={g.id}>
                <p className="text-xs font-mono text-cream/40 uppercase tracking-wider mb-1.5">{g.label}</p>
                <ul className="space-y-1.5">
                  {g.categories.slice(0, 4).map((cat) => (
                    <li key={cat}>
                      <Link href={`/categories/${categorySlug(cat)}`} className="text-sm text-cream/65 hover:text-gold transition-colors">
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-cream/50 mb-4">Our Locations</h4>
          <ul className="space-y-2.5 mb-6">
            {AGARI_LOCATIONS.map((loc) => (
              <li key={loc.name}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-cream/70 hover:text-gold transition-colors group"
                >
                  <svg className="w-3.5 h-3.5 text-trace group-hover:text-gold transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {loc.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Proprietor */}
          <div className="border-t border-white/10 pt-4">
            <p className="text-xs text-cream/40 font-mono uppercase tracking-wider mb-1">Proprietor</p>
            <p className="text-sm text-cream/70 font-medium">{CONFIG.proprietor}</p>
            <p className="text-xs text-cream/40 italic mt-1">&ldquo;Offer is yours. Rate is ours.&rdquo;</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container-a py-5 flex flex-col sm:flex-row items-center gap-4 justify-between text-xs text-cream/50">
          <div>
            <span>© {new Date().getFullYear()} {CONFIG.businessName}. All rights reserved.</span>
            <span className="mx-2">·</span>
            <span>Est. 1992 in Yedapadavu</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
            <span>·</span>
            <Link href="/admin" className="hover:text-gold transition-colors">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
