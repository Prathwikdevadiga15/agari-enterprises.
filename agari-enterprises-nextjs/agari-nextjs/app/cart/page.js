'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-context';
import { categoryImage } from '@/lib/catalog';
import { CONFIG, waLink } from '@/lib/config';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function CartPage() {
  const { cart, count, total, changeQty, removeFromCart, clearCart } = useCart();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper pt-28 pb-20">
        <div className="container-a py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display font-bold text-3xl text-ink">Shopping Cart</h1>
              <p className="text-xs text-ink-soft mt-1">
                {count === 0 ? 'Your cart is currently empty' : `You have ${count} item(s) in your basket`}
              </p>
            </div>
            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-error hover:underline font-semibold"
              >
                Clear Cart
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="bg-panel border border-line rounded-3xl p-12 text-center max-w-lg mx-auto shadow-card">
              <div className="w-16 h-16 rounded-full bg-panel-2 text-ink-faint flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">Your cart is empty</h3>
              <p className="text-xs text-ink-soft mb-6 leading-relaxed">
                Discover our range of refrigerators, TVs, washing machines, sofas, dining tables, and kitchen accessories.
              </p>
              <Link href="/shop" className="btn btn-trace">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Items List */}
              <div className="lg:col-span-8 bg-panel border border-line rounded-3xl p-6 shadow-card space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.key}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b border-line last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-panel-2 flex-shrink-0 border border-line/60">
                        <Image
                          src={categoryImage(item.cat)}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-trace font-bold block">{item.brand}</span>
                        <h4 className="font-display font-semibold text-sm text-ink leading-snug">{item.name}</h4>
                        <span className="text-xs text-ink-faint">{item.cat}</span>
                        <div className="text-xs font-bold text-ink mt-1 sm:hidden">
                          {formatINR(item.price)} each
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      <div className="flex items-center border border-line rounded-xl bg-panel-2 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => changeQty(item.key, -1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-line/40 transition-colors font-bold text-ink"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold font-mono text-ink">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => changeQty(item.key, 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-line/40 transition-colors font-bold text-ink"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-[90px]">
                        <span className="font-display font-bold text-base text-ink block">
                          {formatINR(item.price * item.qty)}
                        </span>
                        <span className="text-[10px] text-ink-faint">
                          {formatINR(item.price)} / unit
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.key)}
                        className="text-ink-faint hover:text-error transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Column */}
              <div className="lg:col-span-4 bg-panel border border-line rounded-3xl p-6 shadow-card space-y-5">
                <h3 className="font-display font-bold text-lg text-ink">Order Summary</h3>

                <div className="space-y-3 text-xs text-ink-soft">
                  <div className="flex justify-between">
                    <span>Subtotal ({count} items)</span>
                    <span className="font-semibold text-ink">{formatINR(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Doorstep Delivery (Local)</span>
                    <span className="font-semibold text-trace">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Installation Assistance</span>
                    <span className="font-semibold text-trace">Included</span>
                  </div>
                  <div className="border-t border-line pt-3 flex justify-between text-sm font-bold text-ink">
                    <span>Total Estimated Amount</span>
                    <span className="text-lg text-copper-dark">{formatINR(total)}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <Link
                    href="/checkout"
                    className="w-full btn btn-copper btn-lg !rounded-xl text-center block"
                  >
                    Proceed to Checkout
                  </Link>

                  <a
                    href={waLink(
                      `Hi Agari Enterprises, I'm ready to place this order:\n${cart.map((i) => `• ${i.brand} ${i.name} x${i.qty}`).join('\n')}\nTotal: ${formatINR(total)}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#20b859] transition-all shadow-sm"
                  >
                    <span>Instant WhatsApp Checkout</span>
                  </a>

                  <Link
                    href="/shop"
                    className="block text-center text-xs text-ink-soft hover:text-ink font-semibold pt-2"
                  >
                    ← Continue Shopping
                  </Link>
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
