'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'agariCart';
const CART_DRAWER_EVENT = 'agari:open-cart';

function readCart() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(readCart());
    setHydrated(true);
    const openHandler = () => setDrawerOpen(true);
    window.addEventListener(CART_DRAWER_EVENT, openHandler);
    return () => window.removeEventListener(CART_DRAWER_EVENT, openHandler);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable */
    }
  }, [cart, hydrated]);

  const api = useMemo(() => {
    const addToCart = (product, cat) => {
      setCart((prev) => {
        const key = `${cat}|${product.brand}|${product.name}`;
        const existing = prev.find((i) => i.key === key);
        if (existing) {
          return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
        }
        return [...prev, { key, cat, brand: product.brand, name: product.name, price: product.price, qty: 1 }];
      });
      setDrawerOpen(true);
    };
    const changeQty = (key, delta) => {
      setCart((prev) =>
        prev
          .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
          .filter((i) => i.qty > 0)
      );
    };
    const removeFromCart = (key) => setCart((prev) => prev.filter((i) => i.key !== key));
    const clearCart = () => setCart([]);
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);
    return {
      cart,
      count,
      total,
      addToCart,
      changeQty,
      removeFromCart,
      clearCart,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    };
  }, [cart, drawerOpen]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
