'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CONFIG, waLink } from '@/lib/config';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

const TIMELINE_STEPS = [
  { id: 'pending', label: 'Order Placed' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'processing', label: 'Preparing Items' },
  { id: 'shipped', label: 'Out for Delivery' },
  { id: 'delivered', label: 'Delivered' },
];

export default function OrderTrackingPage({ params }) {
  const { id } = params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      try {
        const res = await fetch(`/api/orders/${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error('Order not found');
        const data = await res.json();
        setOrder(data.order);
      } catch (err) {
        console.error('Failed to fetch order:', err);
        setError('We could not find an order with this reference number. Please check the ID and try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  const getStepIndex = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'delivered') return 4;
    if (s === 'shipped') return 3;
    if (s === 'processing') return 2;
    if (s === 'confirmed') return 1;
    return 0; // pending
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper pt-32 pb-24">
        <div className="container-a max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted mb-6">
            <Link href="/" className="hover:text-copper">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-copper">Shop</Link>
            <span>/</span>
            <span className="text-ink font-medium">Order #{order?.orderReference || id}</span>
          </div>

          {loading ? (
            <div className="bg-panel border border-line rounded-3xl p-8 sm:p-12 animate-pulse space-y-6">
              <div className="h-8 bg-line/60 rounded w-1/3" />
              <div className="h-4 bg-line/40 rounded w-1/2" />
              <div className="h-20 bg-line/30 rounded" />
              <div className="h-40 bg-line/30 rounded" />
            </div>
          ) : error || !order ? (
            <div className="bg-panel border border-line rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto">
              <span className="text-4xl mb-4 block">🔍</span>
              <h1 className="font-display text-2xl font-bold text-ink mb-2">Order Not Found</h1>
              <p className="text-muted text-sm mb-6">{error || 'Unable to locate order records.'}</p>
              <div className="flex justify-center gap-4">
                <Link href="/shop" className="btn btn-outline text-xs">
                  Continue Shopping
                </Link>
                <a
                  href={waLink(`Hi Agari Enterprises, I need help checking status for order ID: ${id}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-copper text-xs"
                >
                  Contact Support on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Top Banner Card */}
              <div className="bg-panel border border-line rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-muted block mb-1">
                      Order Tracking
                    </span>
                    <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                      Ref: <span className="text-copper">{order.orderReference}</span>
                    </h1>
                    <p className="text-xs text-muted mt-1 font-mono">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-copper/10 text-copper font-semibold border border-copper/20 capitalize">
                      {order.orderStatus}
                    </span>
                    <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                      Payment: {order.paymentMethod.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="pt-8 pb-4">
                  <div className="relative">
                    <div className="absolute top-4 left-0 right-0 h-1 bg-line -z-0" />
                    <div
                      className="absolute top-4 left-0 h-1 bg-copper transition-all duration-500 -z-0"
                      style={{
                        width: `${(getStepIndex(order.orderStatus) / (TIMELINE_STEPS.length - 1)) * 100}%`,
                      }}
                    />

                    <div className="grid grid-cols-5 text-center relative z-10">
                      {TIMELINE_STEPS.map((step, idx) => {
                        const currentIdx = getStepIndex(order.orderStatus);
                        const isDone = idx <= currentIdx;
                        const isCurrent = idx === currentIdx;

                        return (
                          <div key={step.id} className="flex flex-col items-center">
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                isDone
                                  ? 'bg-copper text-white shadow-md'
                                  : 'bg-panel border-2 border-line text-muted'
                              } ${isCurrent ? 'ring-4 ring-copper/20 scale-110' : ''}`}
                            >
                              {isDone ? '✓' : idx + 1}
                            </div>
                            <span
                              className={`text-[11px] sm:text-xs mt-2 font-medium ${
                                isDone ? 'text-ink font-semibold' : 'text-muted'
                              }`}
                            >
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details & Summary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Items List (2 cols) */}
                <div className="md:col-span-2 bg-panel border border-line rounded-3xl p-6 sm:p-8">
                  <h2 className="font-display text-lg font-bold text-ink mb-4">
                    Purchased Items ({order.items?.length || 0})
                  </h2>

                  <div className="divide-y divide-line">
                    {(order.items || []).map((item, idx) => (
                      <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-mono text-muted uppercase tracking-wider">
                            {item.brand} · {item.category}
                          </p>
                          <h3 className="font-semibold text-ink text-sm sm:text-base">
                            {item.productName}
                          </h3>
                          <p className="text-xs text-muted font-mono mt-0.5">
                            Qty: {item.quantity} × {formatINR(item.unitPrice)}
                          </p>
                        </div>
                        <div className="text-right font-display font-bold text-ink text-sm sm:text-base">
                          {formatINR(item.totalPrice)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-line mt-6 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-muted">
                      <span>Subtotal</span>
                      <span>{formatINR(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-muted">
                      <span>Delivery Fee (Dakshina Kannada)</span>
                      <span className="text-emerald-700 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-ink text-base pt-2 border-t border-line">
                      <span>Total Amount</span>
                      <span className="text-copper">{formatINR(order.totalAmount)}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery & Contact (1 col) */}
                <div className="space-y-6">
                  <div className="bg-panel border border-line rounded-3xl p-6">
                    <h2 className="font-display text-base font-bold text-ink mb-3">
                      Delivery Address
                    </h2>
                    <div className="text-xs sm:text-sm text-ink/80 space-y-1">
                      <p className="font-semibold text-ink">{order.customerName}</p>
                      <p className="font-mono text-xs">{order.customerPhone}</p>
                      {order.customerEmail && <p className="text-muted text-xs">{order.customerEmail}</p>}
                      <p className="mt-2 text-muted leading-relaxed whitespace-pre-line">{order.deliveryAddress}</p>
                      {order.city && <p className="font-medium text-xs mt-1">{order.city}</p>}
                    </div>
                  </div>

                  <div className="bg-panel border border-line rounded-3xl p-6">
                    <h2 className="font-display text-base font-bold text-ink mb-2">
                      Need Assistance?
                    </h2>
                    <p className="text-xs text-muted mb-4">
                      Our dispatch team is available from 9:00 AM to 9:00 PM every day for delivery schedule inquiries.
                    </p>
                    <a
                      href={waLink(`Hi Agari Enterprises, I have a question regarding my order: ${order.orderReference}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-copper w-full text-xs text-center block"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
