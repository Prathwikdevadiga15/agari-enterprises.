'use client';

import { useState } from 'react';
import RevealOnScroll from './RevealOnScroll';
import { AGARI_LOCATIONS } from '@/lib/config';

export default function Locations() {
  const [active, setActive] = useState(0);
  const loc = AGARI_LOCATIONS[active];

  return (
    <section className="section-pad bg-panel-2">
      <div className="container-a">
        <RevealOnScroll className="mb-8 max-w-xl">
          <span className="eyebrow">Seven branches</span>
          <h2 className="text-3xl sm:text-4xl mb-2">Find your nearest Agari</h2>
          <p className="text-ink-soft">Across Dakshina Kannada, ready to help in person.</p>
        </RevealOnScroll>

        <RevealOnScroll className="flex flex-wrap gap-2 mb-6">
          {AGARI_LOCATIONS.map((l, i) => (
            <button
              key={l.name}
              type="button"
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                i === active ? 'bg-ink text-panel border-ink' : 'bg-panel border-line text-ink-soft hover:border-ink'
              }`}
            >
              {l.name}
            </button>
          ))}
        </RevealOnScroll>

        <RevealOnScroll className="card overflow-hidden">
          <iframe
            key={loc.query}
            title={loc.name}
            src={`https://www.google.com/maps?q=${encodeURIComponent(loc.query)}&output=embed`}
            className="w-full h-[380px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
