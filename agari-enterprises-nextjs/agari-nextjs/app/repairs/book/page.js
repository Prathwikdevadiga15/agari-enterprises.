import RepairsPage from '../page';

export const metadata = {
  title: 'Book a Repair Service | Agari Enterprises',
  description: 'Book doorstep repair service for TVs, Refrigerators, Washing Machines and ACs with genuine parts and 6-month warranty.',
};

export default function BookRepairPage() {
  return <RepairsPage initialTab="book" />;
}
