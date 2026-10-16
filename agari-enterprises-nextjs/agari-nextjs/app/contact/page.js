'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Locations from '@/components/Locations';
import { CONFIG, SERVICE_CENTERS, waLink } from '@/lib/config';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', category: 'General Enquiry', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError('Please provide your name, phone number, and a message.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setSuccess(true);
      setForm({ name: '', phone: '', email: '', category: 'General Enquiry', message: '' });
    } catch (err) {
      setError(err.message || 'Error submitting enquiry');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper pt-28 pb-20">
        {/* Banner */}
        <div className="bg-grad-ink text-cream py-14 mb-12 border-b border-line">
          <div className="container-a">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-gold mb-2 block">
                Connect With Us
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-3">
                Visit Our Showrooms or Contact Us
              </h1>
              <p className="text-cream/80 text-sm sm:text-base leading-relaxed">
                Open every day from 9:00 AM to 9:00 PM. We are always ready to assist with appliance queries, repair schedules, and custom furniture orders.
              </p>
            </div>
          </div>
        </div>

        <div className="container-a mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-panel border border-line rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="font-display font-bold text-lg text-ink">Head Office &amp; Showroom</h3>
                <p className="text-xs text-ink-soft leading-relaxed font-mono">
                  {CONFIG.address}
                </p>
                <div className="pt-2 border-t border-line text-xs font-mono space-y-2">
                  <div className="flex justify-between">
                    <span className="text-ink-faint">Call Helpline:</span>
                    <a href={`tel:+${CONFIG.phoneDigits}`} className="font-bold text-copper-dark hover:underline">
                      +91 {CONFIG.displayPhone}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-faint">WhatsApp Direct:</span>
                    <a href={waLink('Hi Agari Enterprises, I have an enquiry.')} target="_blank" rel="noopener noreferrer" className="font-bold text-trace hover:underline">
                      {CONFIG.whatsappDisplay}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-faint">Working Hours:</span>
                    <span className="text-ink">{CONFIG.hours}</span>
                  </div>
                </div>
              </div>

              {/* Service Centers */}
              <div className="bg-panel border border-line rounded-3xl p-6 shadow-sm">
                <h3 className="font-display font-bold text-base text-ink mb-3">Authorized Service Centers</h3>
                <div className="space-y-3 text-xs font-mono">
                  {Object.entries(SERVICE_CENTERS).map(([city, info]) => (
                    <div key={city} className="flex justify-between items-center p-2.5 rounded-xl bg-panel-2 border border-line/60">
                      <span className="font-bold text-ink">{city} Center</span>
                      <a href={`https://wa.me/${info.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-trace font-semibold hover:underline">
                        {info.display}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="lg:col-span-7 bg-panel border border-line rounded-3xl p-6 sm:p-10 shadow-card">
              <h2 className="font-display font-bold text-xl text-ink mb-2">Send an Enquiry</h2>
              <p className="text-xs text-ink-soft mb-6">
                Have a question about an appliance or looking for bulk furniture pricing? Leave a message below.
              </p>

              {success && (
                <div className="bg-trace-soft text-trace p-4 rounded-2xl text-xs font-semibold mb-4 border border-trace/30">
                  ✓ Thank you! Your message has been sent to our customer service desk. We will call you shortly.
                </div>
              )}

              {error && (
                <div className="bg-error-bg text-error p-3 rounded-xl text-xs mb-4 font-semibold">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Sudhir Shenoy"
                      className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 9845112233"
                      className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">Subject / Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Product Availability & Price">Product Availability &amp; Price</option>
                    <option value="Doorstep Appliance Repair">Doorstep Appliance Repair</option>
                    <option value="Custom Furniture Order">Custom Furniture Order</option>
                    <option value="Bulk / Institutional Order">Bulk / Institutional Order</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about the appliance model, furniture requirement or service question..."
                    className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn btn-trace btn-lg !rounded-xl"
                >
                  {loading ? 'Sending Message…' : 'Submit Enquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <Locations />
      </main>
      <Footer />
    </>
  );
}
