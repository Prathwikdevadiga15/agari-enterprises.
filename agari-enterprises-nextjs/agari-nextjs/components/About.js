import RevealOnScroll from './RevealOnScroll';
import { Clock, ShieldCheck, MapPin } from './icons';

export default function About() {
  return (
    <section className="section-pad" id="about">
      <div className="container-a">
        <RevealOnScroll className="mb-10">
          <span className="eyebrow">Our story</span>
          <h2 className="text-3xl sm:text-4xl max-w-xl">Three decades of trusted service</h2>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
          <RevealOnScroll className="space-y-4 text-[1.02rem] leading-relaxed text-ink-soft">
            <p>
              Agari Enterprises, led by Agari Raghavendra Rao, was established in 1992 in Yedapadavu. The business
              began by offering electricity payment services, cable network payment services, and retail sales of
              furniture and electronics.
            </p>
            <p>
              Over the years, the company has grown steadily by focusing on excellent service and customer
              satisfaction. Today, Agari Enterprises is a leading electronics and furniture retail store in D.K.,
              known for quality products, competitive prices, and trusted service. We continue to serve our loyal
              customers with care and commitment.
            </p>
          </RevealOnScroll>

          <RevealOnScroll stagger className="grid gap-4">
            <div className="card p-5 flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-trace-soft text-trace flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </span>
              <span>
                <strong className="block font-display">Since 1992</strong>
                <span className="text-sm text-ink-soft">Founded in Yedapadavu</span>
              </span>
            </div>
            <div className="card p-5 flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-copper-soft text-copper-dark flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <span>
                <strong className="block font-display">Agari Raghavendra Rao</strong>
                <span className="text-sm text-ink-soft">Founder &amp; proprietor</span>
              </span>
            </div>
            <div className="card p-5 flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-wood-soft text-wood flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </span>
              <span>
                <strong className="block font-display">Leading retailer in D.K.</strong>
                <span className="text-sm text-ink-soft">Electronics &amp; furniture</span>
              </span>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
