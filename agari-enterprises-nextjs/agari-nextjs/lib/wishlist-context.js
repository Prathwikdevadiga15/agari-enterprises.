'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('agari_wishlist') || '[]');
      setWishlist(stored);
    } catch {}
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('agari_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  function toggle(product, cat) {
    setWishlist((prev) => {
      const key = `${cat}-${product.brand}-${product.name}`;
      const exists = prev.some((w) => w.key === key);
      if (exists) return prev.filter((w) => w.key !== key);
      return [...prev, { ...product, cat, key }];
    });
  }

  function isWishlisted(product, cat) {
    const key = `${cat}-${product.brand}-${product.name}`;
    return wishlist.some((w) => w.key === key);
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWishlisted, count: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
}
