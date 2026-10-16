import Image from 'next/image';
import RevealOnScroll from './RevealOnScroll';
import { ELECTRONICS_BRANDS, FURNITURE_BRANDS } from '@/lib/config';

function MarqueeRow({ brands }) {
  const doubled = [...brands, ...brands];
  return (
    <div className="overflow-hidden mask-fade">
      <div className="marquee-track gap-8 py-2">
        {doubled.map((b, i) => (
          <div key={`${b.slug}-${i}`} className="flex-shrink-0 w-[110px] h-[64px] rounded-md bg-panel border border-line flex items-center justify-center p-2">
            <Image src={b.image} alt={b.name} width={90} height={40} className="object-contain max-h-10 w-auto grayscale hover:grayscale-0 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BrandMarquee() {
  return (
    <section className="section-pad bg-panel-2 overflow-hidden">
      <div className="container-a">
        <RevealOnScroll className="mb-8 text-center max-w-xl mx-auto">
          <span className="eyebrow justify-center">Brands we carry &amp; service</span>
          <h2 className="text-3xl sm:text-4xl">Trusted names, genuine parts</h2>
        </RevealOnScroll>
      </div>
      <div className="space-y-6">
        <MarqueeRow brands={ELECTRONICS_BRANDS} />
        <MarqueeRow brands={FURNITURE_BRANDS} />
      </div>
    </section>
  );
}
