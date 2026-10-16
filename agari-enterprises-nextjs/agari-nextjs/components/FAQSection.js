import RevealOnScroll from './RevealOnScroll';
import { FAQ } from '@/lib/config';

export default function FAQSection() {
  return (
    <section className="section-pad bg-panel-2" id="faq">
      <div className="container-a max-w-2xl">
        <RevealOnScroll className="mb-8 text-center">
          <span className="eyebrow justify-center">FAQ</span>
          <h2 className="text-3xl sm:text-4xl">Common questions</h2>
        </RevealOnScroll>
        <RevealOnScroll stagger className="space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="card p-5 group">
              <summary className="font-display font-semibold cursor-pointer list-none flex items-center justify-between gap-3">
                {f.q}
                <span className="text-copper text-xl leading-none group-open:rotate-45 transition-transform flex-shrink-0">+</span>
              </summary>
              <p className="text-sm text-ink-soft mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
