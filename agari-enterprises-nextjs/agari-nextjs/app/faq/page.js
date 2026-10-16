'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CONFIG, waLink } from '@/lib/config';

const FAQ_SECTIONS = [
  {
    category: 'Purchasing & Payment',
    items: [
      {
        q: 'Is there any EMI option available?',
        a: 'Yes, easy EMI facilities are available in our showrooms. You can avail credit card EMI, debit card EMI, or paper finance through leading financial partners during store visits.',
      },
      {
        q: 'Do you charge delivery charges on any products?',
        a: 'No, we provide free delivery on all major furniture and appliance purchases across Surathkal, Mangaluru, Moodabidre, and surrounding local areas in Dakshina Kannada.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm), Net Banking, and all major Credit/Debit Cards at our stores and upon delivery.',
      },
    ],
  },
  {
    category: 'Repair & Servicing',
    items: [
      {
        q: 'Who is responsible for servicing and repairing products?',
        a: 'We facilitate end-to-end repairs through authorized brand service centers and experienced technicians, ensuring genuine OEM parts and prompt servicing according to your specific requirements.',
      },
      {
        q: 'Do you provide doorstep repair visits?',
        a: 'Yes. For heavy appliances like Televisions, Refrigerators, Washing Machines, and Air Conditioners, our technicians visit your location for inspection, diagnosis, and servicing.',
      },
      {
        q: 'What is the repair warranty policy?',
        a: 'Every paid repair service completed by Agari Enterprises is backed by a 6-month warranty on the replaced parts and service workmanship.',
      },
      {
        q: 'How can I track my repair ticket?',
        a: 'You can track the live progress of your repair anytime by visiting our Repairs Tracking page (/repairs/track) and entering your unique Ticket Number (e.g., AG-26288-412) or registered phone number.',
      },
    ],
  },
  {
    category: 'Store Locations & Timings',
    items: [
      {
        q: 'What are the store working hours?',
        a: 'All Agari Enterprises branches are open every day from 9:00 AM to 9:00 PM, including Sundays.',
      },
      {
        q: 'Where are your branches located?',
        a: 'We have 6 branches across coastal Karnataka: Surathkal (Navodaya Complex, Opposite Govinda Dasa PU College), Shubagiri, Moodabidri (Town & New branch), Yedapadavu, and Maryhill (Konchadi, Mangaluru).',
      },
      {
        q: 'Who is the founder and proprietor of Agari Enterprises?',
        a: 'Agari Enterprises was established in 1992 by proprietor Agari Raghavendra Rao, built on three decades of community trust across Tulunadu.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState({});

  const toggle = (catIndex, itemIndex) => {
    const key = `${catIndex}-${itemIndex}`;
    setOpenIndex((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper pt-32 pb-24">
        <div className="container-a max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="eyebrow !text-copper mb-2 block">Help &amp; Answers</span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted text-sm sm:text-base max-w-2xl mx-auto">
              Find clear answers regarding store timings, free delivery, EMI options, doorstep appliance repair, and warranty policies.
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-12">
            {FAQ_SECTIONS.map((sec, catIdx) => (
              <div key={sec.category} className="bg-panel border border-line rounded-3xl p-6 sm:p-8 shadow-sm">
                <h2 className="font-display text-xl font-bold text-ink mb-6 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-copper" />
                  {sec.category}
                </h2>

                <div className="divide-y divide-line">
                  {sec.items.map((item, itemIdx) => {
                    const isOpen = !!openIndex[`${catIdx}-${itemIdx}`];

                    return (
                      <div key={item.q} className="py-4 first:pt-0 last:pb-0">
                        <button
                          type="button"
                          onClick={() => toggle(catIdx, itemIdx)}
                          className="w-full flex items-center justify-between text-left gap-4 py-2 hover:text-copper transition-colors"
                        >
                          <span className="font-semibold text-ink text-sm sm:text-base">
                            {item.q}
                          </span>
                          <span className="text-copper font-mono text-lg font-bold flex-shrink-0">
                            {isOpen ? '−' : '+'}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="mt-2 text-xs sm:text-sm text-muted leading-relaxed pr-8 animate-fadeIn">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions CTA */}
          <div className="mt-16 bg-ink text-cream rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(193,105,43,0.4) 0%, transparent 60%)',
              }}
            />
            <div className="relative z-10 max-w-xl mx-auto">
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                Still have questions?
              </h2>
              <p className="text-cream/70 text-sm mb-6">
                Our support team is available every day from 9:00 AM to 9:00 PM to help with product inquiries, price quotes, and service requests.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={waLink('Hi Agari Enterprises, I have a question about your products and services.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-copper text-xs"
                >
                  Ask on WhatsApp
                </a>
                <Link href="/contact" className="btn btn-outline !text-cream !border-cream/30 text-xs">
                  View Store Locations
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
