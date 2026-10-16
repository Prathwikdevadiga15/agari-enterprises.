// Business configuration — edit these values for your business.
// whatsappNumber: country code + number, digits only, no "+", no spaces, no leading 0.

export const CONFIG = {
  businessName: 'Agari Enterprises',
  tagline:
    "Agari Enterprises is your local shop for electronics repair and home essentials — from TVs and refrigerators to furniture for every room. Doorstep service, genuine parts, and a 6-month warranty on every repair.",
  displayPhone: '9845353412',
  phoneDigits: '919845353412',
  whatsappNumber: '919980219407',
  whatsappDisplay: '+91 99802 19407',
  address: 'Opposite to Govinda Dasa PU College, Surathkal, Mangaluru, Karnataka',
  hours: 'Every day, 9:00 AM – 9:00 PM',
  email: 'agarienterprises.official@gmail.com',
  founded: 1992,
  proprietor: 'Agari Raghavendra Rao',
};

export const SERVICE_CENTERS = {
  Surathkal: { whatsapp: '917022604416', display: '+91 70226 04416' },
  Mangalore: { whatsapp: '919449866088', display: '94498 66088' },
  Moodabidre: { whatsapp: '919449866081', display: '94498 66081' },
};

export const AGARI_LOCATIONS = [
  { name: 'Surathkal — Navodaya Complex', query: 'Agari Enterprises, Navodaya Complex, Surathkal, Mangaluru, Karnataka' },
  { name: 'Shubagiri', query: 'Agari Enterprises, Shubagiri, Karnataka' },
  { name: 'Moodabidri', query: 'Agari Enterprises, Moodabidri, Karnataka' },
  { name: 'Moodabidri (New)', query: 'Agari Enterprises, New Moodabidri, Karnataka' },
  { name: 'Yedapadavu', query: 'Agari Enterprises, Yedapadavu, Karnataka' },
  { name: 'Maryhill, Konchadi', query: 'Agari Enterprises, Maryhill, Konchadi, Mangaluru, Karnataka' },
  { name: 'Kavoor', query: 'Agari Enterprises, Kavoor, Mangaluru, Karnataka' },
];

export const ELECTRONICS_BRANDS = [
  'symphony', 'ifb', 'racold', 'vijayalakshmi', 'vivo', 'panasonic', 'whirlpool',
  'v-guard', 'usha', 'preethi', 'crompton', 'apple', 'samsung', 'lg', 'lloyd',
  'bajaj-electricals', 'philips',
].map((slug) => ({
  slug,
  name: slug
    .split('-')
    .map((w) => (w === 'lg' || w === 'ifb' || w === 'v' ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(' ')
    .replace('V Guard', 'V-Guard'),
  image: `/images/brands/electronics-${slug}.jpg`,
}));

export const FURNITURE_BRANDS = [
  'kurl-on', 'nilkamal', 'deccan', 'restolex', 'okra-smart-furniture',
].map((slug) => ({
  slug,
  name: slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' '),
  image: `/images/brands/furniture-${slug}.jpg`,
}));

export const FAQ = [
  { q: 'Is there any EMI option?', a: 'Yes, facility is present in our shop.' },
  {
    q: 'Who is responsible for service of repairing the product?',
    a: 'It is responsible of companies to provide the repair services, we just give the product to company which need to be fixed according to your demand.',
  },
  { q: 'Who is the proprietor of the firm?', a: 'Agari Raghavendra Rao' },
  { q: 'Do we charge delivery charges on any products?', a: "No, we don't." },
];

export const REVIEWS = [
  {
    stars: 5,
    text: 'Our washing machine stopped mid-cycle on a Sunday and their technician still came by evening and fixed it. Fair price, genuine part, no upselling.',
    avatar: 'GK',
    name: 'Ganesh K.',
    meta: 'Verified customer — Surathkal',
  },
  {
    stars: 5,
    text: 'Bought a wooden dining set from Agari. Delivery was on time and the finish looks exactly like what we saw in the showroom. Very happy with the quality.',
    avatar: 'PS',
    name: 'Priya S.',
    meta: 'Verified customer — Mangalore',
  },
  {
    stars: 4,
    text: 'Good service for my TV repair, picked up and dropped back home. Took a day longer than promised, but the work itself was solid.',
    avatar: 'MR',
    name: 'Mohammed R.',
    meta: 'Verified customer — Moodabidre',
  },
  {
    stars: 5,
    text: 'Ordered a refrigerator here after checking prices elsewhere — Agari matched the best deal and threw in free doorstep installation. Would recommend.',
    avatar: 'AD',
    name: "Anitha D'Souza",
    meta: 'Verified customer — Surathkal',
  },
  {
    stars: 4,
    text: 'AC servicing before summer was quick and the technician explained what was wrong instead of just charging a flat fee. Slightly delayed but worth the wait.',
    avatar: 'SP',
    name: 'Suresh Poojary',
    meta: 'Verified customer — Konchadi',
  },
  {
    stars: 5,
    text: 'The almirah we ordered is sturdy and well finished. The team was patient while we compared a few designs before deciding. Great experience overall.',
    avatar: 'DS',
    name: 'Divya Shetty',
    meta: 'Verified customer — Mangalore',
  },
];

export const GALLERY = [
  { file: '01-surathkal-storefront', caption: 'Agari Enterprises — Surathkal storefront' },
  { file: '02-showroom-evening', caption: 'Our flagship showroom, lit up in the evening' },
  { file: '03-prestige-tower-branch', caption: 'Agari Enterprises — Prestige Tower branch' },
  { file: '04-moodabidre-showroom', caption: 'Inside our Mudbidri (Moodabidre) showroom' },
  { file: '05-branches', caption: 'Our branches — Surathkal, Mangalore & Moodabidre' },
  { file: '06-head-office', caption: 'Three decades of trust, honoured at our head office' },
  { file: '07-festive-sale', caption: 'Festive electronics sale — easy EMI options' },
  { file: '08-dasara-deepavali', caption: 'Dasara & Deepavali offers on furniture and appliances' },
  { file: '09-new-year', caption: 'Celebrating the New Year with our customers' },
  { file: '10-scan-share', caption: 'Scan & share your experience with us' },
].map((g) => ({ ...g, image: `/images/gallery/${g.file}.jpg` }));

export function waLink(message, number) {
  return `https://wa.me/${number || CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function telHref() {
  return `tel:+${CONFIG.phoneDigits}`;
}

export function generateTicketId() {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const doy = String(Math.floor(diff / 86400000)).padStart(3, '0');
  const rand = String(Math.floor(100 + Math.random() * 900));
  return `AG-${yy}${doy}-${rand}`;
}
