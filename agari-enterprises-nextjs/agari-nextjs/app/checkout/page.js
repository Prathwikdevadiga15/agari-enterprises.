'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-context';
import { CONFIG, waLink } from '@/lib/config';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

const CITIES = [
  'Surathkal', 'Mangalore', 'Moodabidri', 'Yedapadavu', 'Shubagiri', 'Maryhill / Konchadi', 'Kavoor', 'Other Dakshina Kannada',
];

export default function CheckoutPage() {
  const { cart, total, count, clearCart } = useCart();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Surathkal',
    paymentMethod: 'cod',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError('Please fill in your name, phone number, and delivery address.');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty. Please add items before placing an order.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const payload = {
        customerName: form.name.trim(),
        customerPhone: form.phone.trim(),
        customerEmail: form.email.trim(),
        deliveryAddress: form.address.trim(),
        city: form.city,
        paymentMethod: form.paymentMethod,
        notes: form.notes.trim(),
        items: cart.map((i) => ({
          productId: i.key,
          name: i.name,
          brand: i.brand,
          cat: i.cat,
          price: i.price,
          qty: i.qty,
        })),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit order');
      }

      setConfirmedOrder(data.order);
      clearCart();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Confirmation view
  if (confirmedOrder) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-paper pt-36 pb-20">
          <div className="container-a max-w-xl mx-auto">
            <div className="bg-panel border border-line rounded-3xl p-8 sm:p-12 text-center shadow-card animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-trace-soft text-trace flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-trace font-bold block mb-1">
                Order Received
              </span>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-3">
                Thank You, {confirmedOrder.customerName}!
              </h1>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mb-6">
                Your order has been recorded in our system. Our store executive will call you within 30 minutes to confirm delivery timing and installation.
              </p>

              {/* Order Reference Box */}
              <div className="bg-panel-2 border border-line rounded-2xl p-5 mb-8 text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-line pb-2">
                  <span className="text-ink-faint">Order Reference:</span>
                  <span className="font-bold text-copper-dark text-sm">{confirmedOrder.orderReference}</span>
                </div>
                <div className="flex justify-between items-center border-b border-line pb-2">
                  <span className="text-ink-faint">Delivery To:</span>
                  <span className="font-semibold text-ink text-right max-w-xs truncate">{confirmedOrder.deliveryAddress}, {confirmedOrder.city}</span>
                </div>
                <div className="flex justify-between items-center border-b border-line pb-2">
                  <span className="text-ink-faint">Payment Mode:</span>
                  <span className="font-semibold text-ink uppercase">{confirmedOrder.paymentMethod.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex justify-between items-center pt-1 font-sans text-sm">
                  <span className="font-bold text-ink">Total Amount:</span>
                  <span className="font-display font-bold text-lg text-ink">{formatINR(confirmedOrder.totalAmount)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <a
                  href={waLink(
                    `Hi Agari Enterprises! I just placed order *#${confirmedOrder.orderReference}* for total ${formatINR(confirmedOrder.totalAmount)}. Please confirm delivery to ${confirmedOrder.deliveryAddress}, ${confirmedOrder.city}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#20b859] transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.94.55 3.75 1.49 5.29L2 22l4.86-1.44A9.95 9.95 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.46 14.18c-.23.64-1.33 1.23-1.84 1.3-.48.06-1.1.09-3.56-.91-3.14-1.28-5.16-4.47-5.32-4.68-.16-.21-1.27-1.69-1.27-3.23s.8-2.3 1.09-2.61c.28-.31.62-.39.83-.39.21 0 .41 0 .59.01.19.01.44-.07.69.53.25.62.86 2.11.94 2.27.08.16.13.35.03.56-.1.21-.16.34-.31.52-.16.18-.33.4-.47.54-.16.15-.32.32-.14.63.18.31.81 1.34 1.74 2.17 1.2 1.07 2.21 1.4 2.52 1.56.31.15.5.13.68-.08.19-.21.8-1.04 1.01-1.4.21-.36.42-.3.7-.19.28.1.1.77 3.86 2.08.41.22.48.33.55.57.07.24.07 1.39-.16 2.03z"/>
                  </svg>
                  <span>Share Order Confirmation on WhatsApp</span>
                </a>

                <Link href="/shop" className="btn btn-panel w-full !rounded-xl text-xs block text-center">
                  Continue Browsing Catalog
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper pt-28 pb-20">
        <div className="container-a py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display font-bold text-3xl text-ink mb-2">Checkout &amp; Delivery</h1>
            <p className="text-xs text-ink-soft mb-8">
              Confirm your delivery address in Dakshina Kannada. Doorstep delivery is completely free.
            </p>

            {cart.length === 0 ? (
              <div className="bg-panel border border-line rounded-3xl p-8 text-center">
                <p className="text-sm text-ink-soft mb-4">Your cart is empty.</p>
                <Link href="/shop" className="btn btn-trace">Go to Shop</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Form Column */}
                <div className="lg:col-span-7 bg-panel border border-line rounded-3xl p-6 sm:p-8 shadow-card">
                  <h2 className="font-display font-bold text-lg text-ink mb-4 pb-3 border-b border-line">
                    1. Delivery Details
                  </h2>

                  {error && (
                    <div className="bg-error-bg text-error p-3 rounded-xl text-xs mb-4 font-semibold">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">
                        Full Name <span className="text-error">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Ramesh Hegde"
                        className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1">
                          Phone Number <span className="text-error">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="e.g. 9845123456"
                          className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1">
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">
                        Town / Area <span className="text-error">*</span>
                      </label>
                      <select
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                      >
                        {CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">
                        Doorstep Delivery Address <span className="text-error">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="House / flat number, street, landmark..."
                        className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">
                        Special Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder="e.g. Preferred delivery in morning / lift available"
                        className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                      />
                    </div>

                    <div className="pt-4 border-t border-line">
                      <h2 className="font-display font-bold text-lg text-ink mb-3">
                        2. Payment Method
                      </h2>
                      <div className="space-y-2.5">
                        {[
                          { id: 'cod', label: 'Cash on Doorstep Delivery', desc: 'Pay cash to our delivery team upon receiving goods' },
                          { id: 'upi_on_delivery', label: 'UPI / QR Code on Delivery', desc: 'Scan and pay via GPay, PhonePe, or Paytm at your doorstep' },
                          { id: 'store_pickup', label: 'In-Store Pickup & Payment', desc: 'Collect and pay directly at our Surathkal / Mangalore showroom' },
                        ].map((pm) => (
                          <label
                            key={pm.id}
                            className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                              form.paymentMethod === pm.id
                                ? 'border-trace bg-trace-soft text-trace'
                                : 'border-line bg-panel-2 hover:border-trace/40'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={pm.id}
                              checked={form.paymentMethod === pm.id}
                              onChange={() => setForm({ ...form, paymentMethod: pm.id })}
                              className="mt-0.5 accent-trace"
                            />
                            <div>
                              <span className="font-bold text-xs block text-ink">{pm.label}</span>
                              <span className="text-[11px] text-ink-soft block">{pm.desc}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn btn-copper btn-lg !rounded-xl mt-6 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Recording Order…</span>
                      ) : (
                        <span>Confirm &amp; Place Order ({formatINR(total)})</span>
                      )}
                    </button>
                  </form>
                </div>

                {/* Items Summary Column */}
                <div className="lg:col-span-5 bg-panel border border-line rounded-3xl p-6 shadow-card space-y-4">
                  <h3 className="font-display font-bold text-base text-ink pb-3 border-b border-line">
                    Order Items ({count})
                  </h3>

                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.key} className="flex justify-between items-center text-xs">
                        <div>
                          <span className="font-semibold text-ink block">{item.name}</span>
                          <span className="text-[10px] text-ink-faint">{item.brand} • Qty: {item.qty}</span>
                        </div>
                        <span className="font-bold text-ink">{formatINR(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-line pt-4 space-y-2 text-xs">
                    <div className="flex justify-between text-ink-soft">
                      <span>Subtotal</span>
                      <span className="font-semibold text-ink">{formatINR(total)}</span>
                    </div>
                    <div className="flex justify-between text-ink-soft">
                      <span>Doorstep Delivery</span>
                      <span className="font-semibold text-trace">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-ink pt-2 border-t border-line">
                      <span>Total Payable</span>
                      <span className="text-copper-dark">{formatINR(total)}</span>
                    </div>
                  </div>

                  <div className="bg-panel-2 p-3.5 rounded-xl border border-line text-[11px] text-ink-soft space-y-1">
                    <span className="font-bold text-ink block">Agari Trust Guarantee:</span>
                    <p>• 6-Month Workmanship Warranty on all goods</p>
                    <p>• 30-Minute Callback from store team</p>
                    <p>• Verified genuine parts &amp; local service</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
