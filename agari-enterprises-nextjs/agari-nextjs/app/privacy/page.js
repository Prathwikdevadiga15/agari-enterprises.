import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CONFIG } from '@/lib/config';

export const metadata = {
  title: 'Privacy Policy | Agari Enterprises',
  description: 'Privacy policy and data protection standards for Agari Enterprises retail sales and repair services.',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper pt-32 pb-24">
        <div className="container-a max-w-3xl">
          <div className="mb-12">
            <span className="eyebrow !text-copper mb-2 block">Legal &amp; Compliance</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted text-xs font-mono">
              Last updated: October 2026 · Agari Enterprises (Est. 1992)
            </p>
          </div>

          <div className="bg-panel border border-line rounded-3xl p-8 sm:p-12 space-y-8 text-sm text-ink/80 leading-relaxed">
            <section>
              <h2 className="font-display text-lg font-bold text-ink mb-2">1. Overview</h2>
              <p>
                Agari Enterprises (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), founded by Agari Raghavendra Rao in 1992, respects the privacy of our customers and visitors across our showrooms in coastal Karnataka and our online platform. This Privacy Policy details how we handle personal information collected when you order furniture or electronics, request repair services, or contact our customer support.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink mb-2">2. Information We Collect</h2>
              <p className="mb-2">We collect only necessary information required to fulfil sales, deliveries, and servicing:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                <li><strong>Contact details:</strong> Name, mobile phone number, and email address.</li>
                <li><strong>Delivery &amp; Service address:</strong> Physical address and locality for doorstep product delivery or appliance repair appointments.</li>
                <li><strong>Service data:</strong> Appliance brand, model, description of faults, and repair ticket histories.</li>
                <li><strong>Order data:</strong> Product items purchased, billing details, and payment mode preference.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink mb-2">3. How Your Information is Used</h2>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                <li>To confirm and process product purchases and dispatch orders to your address.</li>
                <li>To coordinate technician visits for appliance repair and provide ticket updates.</li>
                <li>To honor 6-month repair warranties and manufacturer product guarantees.</li>
                <li>To communicate via WhatsApp or phone call regarding delivery timing and status.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink mb-2">4. Data Sharing &amp; Security</h2>
              <p>
                We do not sell, rent, or trade customer information to any third-party marketing companies. Personal details are shared strictly with authorized logistics partners and brand technicians solely to complete the requested delivery or repair.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink mb-2">5. Contact Information</h2>
              <p>
                For any questions or requests regarding your personal information, contact us at:
              </p>
              <div className="mt-3 p-4 bg-paper rounded-xl border border-line font-mono text-xs space-y-1">
                <p><strong>Agari Enterprises</strong></p>
                <p>Address: {CONFIG.address}</p>
                <p>Email: {CONFIG.email}</p>
                <p>Phone: +91 {CONFIG.displayPhone}</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
