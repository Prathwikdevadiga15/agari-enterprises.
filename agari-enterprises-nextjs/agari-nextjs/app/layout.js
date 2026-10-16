import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { CatalogUIProvider } from '@/lib/catalog-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import CartDrawer from '@/components/CartDrawer';
import CatalogDrawer from '@/components/CatalogDrawer';
import ChatWidget from '@/components/ChatWidget';
import ScrollTools from '@/components/ScrollTools';

export const metadata = {
  title: 'Agari Enterprises | Electronics & Furniture — Sales & Repair',
  description:
    'Agari Enterprises — your trusted local shop since 1992 for electronics repair, new appliances, and furniture. Doorstep service, genuine parts, 6-month warranty. Serving Surathkal, Mangaluru & Moodabidre.',
  keywords: [
    'electronics repair Mangaluru', 'washing machine repair Surathkal', 'furniture Moodabidre',
    'TV repair', 'refrigerator repair', 'AC repair', 'Agari Enterprises',
  ],
  openGraph: {
    title: 'Agari Enterprises | Electronics & Furniture',
    description: 'Trusted since 1992 — repair, order & doorstep delivery across Mangaluru.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agari Enterprises',
    description: 'Electronics repair & furniture — doorstep service, 6-month warranty.',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B1613',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Agari Enterprises',
  description: 'Electronics repair and new appliance & furniture sales since 1992.',
  telephone: '+919845353412',
  email: 'agarienterprises.official@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Opposite to Govinda Dasa PU College, Surathkal',
    addressLocality: 'Mangaluru',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  openingHours: 'Mo-Su 09:00-21:00',
  priceRange: '₹₹',
  foundingDate: '1992',
  sameAs: [],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <WishlistProvider>
          <CartProvider>
            <CatalogUIProvider>
              {children}
              <CartDrawer />
              <CatalogDrawer />
              <ChatWidget />
              <ScrollTools />
            </CatalogUIProvider>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
