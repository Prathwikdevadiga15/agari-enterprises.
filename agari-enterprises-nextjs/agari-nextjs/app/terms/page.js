import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CONFIG } from '@/lib/config';

export const metadata = {
  title: 'Terms & Conditions | Agari Enterprises',
  description: 'Terms and conditions governing product sales, deliveries, and repair servicing at Agari Enterprises.',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper pt-32 pb-24">
        <div className="container-a max-w-3xl">
          <div className="mb-12">
            <span className="eyebrow !text-copper mb-2 block">Customer Agreement</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-muted text-xs font-mono">
              Effective Date: October 2026 · Agari Enterprises
            </p>
          </div>

          <div className="bg-panel border border-line rounded-3xl p-8 sm:p-12 space-y-8 text-sm text-ink/80 leading-relaxed">
            <section>
              <h2 className="font-display text-lg font-bold text-ink mb-2">1. Introduction</h2>
              <p>
                These terms govern the purchase of goods (electronics, home appliances, and furniture) and booking of appliance servicing from Agari Enterprises (&ldquo;Agari&rdquo;). By placing an order or booking a repair through our stores or digital platform, you agree to these terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink mb-2">2. Pricing &amp; Products</h2>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                <li>All prices listed on our platform are displayed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.</li>
                <li>Product photographs and specifications represent genuine manufacturer models. Minor natural wood grain variations may exist in solid wood furniture pieces.</li>
                <li>Stock availability is confirmed prior to dispatch. In the event an ordered item is temporarily out of stock, customers will be notified immediately with options for alternative models or full cancellation without penalty.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink mb-2">3. Free Delivery &amp; Installation</h2>
              <p>
                Agari Enterprises provides free doorstep delivery across our local service zones in Dakshina Kannada (including Surathkal, Mangaluru, and Moodabidre). Standard installation support is coordinated with manufacturer authorized technicians upon delivery of major electronics and kitchen appliances.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink mb-2">4. Appliance Repair &amp; 6-Month Warranty</h2>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                <li>Initial diagnosis is performed by qualified technicians either at your doorstep or our workshops.</li>
                <li>All genuine replacement parts installed by Agari Enterprises carry a 6-month service warranty from the date of completed repair.</li>
                <li>The warranty covers the specific components replaced and does not cover physical damage, water ingress, lightning/power surges, or unauthorized third-party tampering subsequent to service.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink mb-2">5. Cancellations &amp; Refunds</h2>
              <p>
                Orders may be cancelled prior to dispatch by calling our store team or contacting us on WhatsApp. For repairs, service appointments may be rescheduled or cancelled prior to technician dispatch with no cancellation charge.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink mb-2">6. Jurisdiction</h2>
              <p>
                Any disputes arising in connection with sales or services shall be subject to the exclusive jurisdiction of the competent courts in Mangaluru, Karnataka, India.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
