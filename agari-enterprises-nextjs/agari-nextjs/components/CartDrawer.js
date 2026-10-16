'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { categoryImage } from '@/lib/catalog';
import { CONFIG, waLink } from '@/lib/config';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

function CartItem({ item, changeQty, removeFromCart }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20, height: 0, margin: 0 }}
      transition={{ duration: 0.2 }}
      className="flex gap-3 py-4 border-b border-line last:border-0"
    >
      {/* Image */}
      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-panel-2 flex-shrink-0">
        <Image
          src={categoryImage(item.cat)}
          alt={item.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-mono uppercase tracking-wider text-ink-faint">{item.brand}</p>
        <h4 className="font-semibold text-sm leading-tight truncate">{item.name}</h4>
        <p className="text-[11px] text-ink-soft">{item.cat}</p>
        <div className="flex items-center justify-between mt-2">
          {/* Qty controls */}
          <div className="flex items-center gap-1 bg-panel-2 rounded-lg border border-line overflow-hidden">
            <button
              type="button"
              onClick={() => changeQty(item.key, -1)}
              className="w-7 h-7 flex items-center justify-center text-ink-soft hover:text-ink hover:bg-panel transition-colors"
              aria-label="Decrease quantity"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M5 12h14" />
              </svg>
            </button>
            <span className="w-7 text-center text-sm font-semibold">{item.qty}</span>
            <button
              type="button"
              onClick={() => changeQty(item.key, 1)}
              className="w-7 h-7 flex items-center justify-center text-ink-soft hover:text-ink hover:bg-panel transition-colors"
              aria-label="Increase quantity"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
          <span className="font-display font-bold text-sm">{formatINR(item.price * item.qty)}</span>
        </div>
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={() => removeFromCart(item.key)}
        className="flex-shrink-0 w-7 h-7 rounded-full hover:bg-error-bg hover:text-error transition-colors flex items-center justify-center self-start mt-1"
        aria-label="Remove item"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}

export default function CartDrawer() {
  const { cart, count, total, changeQty, removeFromCart, clearCart, drawerOpen, closeDrawer } = useCart();

  function checkoutWhatsApp() {
    if (cart.length === 0) return;
    const lines = [
      "Hi Agari Enterprises, I'd like to place the following order:",
      '',
      ...cart.map((i) => `• ${i.brand} ${i.name} (${i.cat}) × ${i.qty} — ${formatINR(i.price * i.qty)}`),
      '',
      `Total (est.): ${formatINR(total)}`,
      '',
      'Please confirm availability, final price and delivery details.',
    ];
    window.open(waLink(lines.join('\n'), CONFIG.whatsappNumber), '_blank');
  }

  return (
    <AnimatePresence>
      {drawerOpen && (
        <div className="fixed inset-0 z-[80] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-ink/55 backdrop-blur-[3px]"
            onClick={closeDrawer}
            aria-label="Close cart"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36 }}
            className="relative w-full max-w-md h-full bg-panel shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cartTitle"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-line flex-shrink-0">
              <div>
                <h3 id="cartTitle" className="font-display font-bold text-xl">Your Cart</h3>
                <p className="text-xs text-ink-soft mt-0.5">{count} {count === 1 ? 'item' : 'items'}</p>
              </div>
              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-error hover:underline"
                  >
                    Clear all
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-panel-2 transition-colors"
                  aria-label="Close cart"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Info note */}
            <div className="px-5 py-2.5 bg-trace-soft border-b border-trace/20 flex-shrink-0">
              <p className="text-xs text-trace flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v5M12 16h.01" />
                </svg>
                Review your picks, then send to our team on WhatsApp to confirm price &amp; stock.
              </p>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto px-5">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
                  <div className="w-20 h-20 rounded-2xl bg-panel-2 flex items-center justify-center">
                    <svg className="w-10 h-10 text-ink-faint" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display font-bold text-lg">Your cart is empty</p>
                    <p className="text-sm text-ink-soft mt-1">Browse categories and add products to get started</p>
                  </div>
                  <button
                    type="button"
                    onClick={closeDrawer}
                    className="btn btn-trace"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <motion.div layout>
                  <AnimatePresence>
                    {cart.map((item) => (
                      <CartItem
                        key={item.key}
                        item={item}
                        changeQty={changeQty}
                        removeFromCart={removeFromCart}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* Footer with total and checkout */}
            {cart.length > 0 && (
              <div className="px-5 py-5 border-t border-line bg-panel flex-shrink-0 space-y-3">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-soft font-medium">Estimated Total</span>
                  <span className="font-display font-bold text-xl text-ink">{formatINR(total)}</span>
                </div>
                <p className="text-[11px] text-ink-faint">
                  + Free doorstep delivery · Final price confirmed by our team
                </p>

                {/* Online Checkout */}
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="w-full btn btn-copper !py-3.5 !rounded-xl text-sm flex items-center justify-center gap-2 font-bold shadow-md"
                >
                  Proceed to Online Checkout
                </Link>

                {/* WhatsApp checkout */}
                <button
                  type="button"
                  onClick={checkoutWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white text-xs
                    bg-[#25D366] hover:bg-[#22c55e] active:scale-[.98] transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  Checkout via WhatsApp
                </button>

                <a
                  href="#request"
                  onClick={closeDrawer}
                  className="w-full btn btn-ghost !py-3 text-sm"
                >
                  Place a Custom Order Instead
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
