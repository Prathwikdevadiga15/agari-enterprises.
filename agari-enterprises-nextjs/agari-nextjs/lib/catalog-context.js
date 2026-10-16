'use client';

import { createContext, useContext, useMemo, useState } from 'react';

const CatalogUIContext = createContext(null);

export function CatalogUIProvider({ children }) {
  const [state, setState] = useState({ open: false, mode: null, value: null });

  const api = useMemo(
    () => ({
      ...state,
      openCategory: (cat) => setState({ open: true, mode: 'category', value: cat }),
      openSearch: (query) => setState({ open: true, mode: 'search', value: query }),
      close: () => setState((s) => ({ ...s, open: false })),
    }),
    [state]
  );

  return <CatalogUIContext.Provider value={api}>{children}</CatalogUIContext.Provider>;
}

export function useCatalogUI() {
  const ctx = useContext(CatalogUIContext);
  if (!ctx) throw new Error('useCatalogUI must be used within CatalogUIProvider');
  return ctx;
}
