import RevealOnScroll from './RevealOnScroll';
import { CheckCircle, Truck, ShieldCheck, Award } from './icons';

const STEPS = [
  { n: '01', title: 'Tell us what you need', desc: 'Fill the form or WhatsApp us — repair, new purchase, or a quick question.' },
  { n: '02', title: 'We call you back', desc: 'Our team confirms details and gives you a fair, honest quote within 30 minutes.' },
  { n: '03', title: 'We get to work', desc: 'Doorstep pickup for repairs, or fast delivery for new electronics & furniture.' },
  { n: '04', title: 'You\u2019re covered', desc: 'Every repair comes with a 6-month warranty on our workmanship.' },
];

export function HowItWorks() {
  return (
    <section className="section-pad">
      <div className="container-a">
        <RevealOnScroll className="mb-10 max-w-xl">
          <span className="eyebrow">How it works</span>
          <h2 className="text-3xl sm:text-4xl">Simple, from call to completion</h2>
        </RevealOnScroll>
        <RevealOnScroll stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="relative pl-1">
              <span className="font-display font-bold text-4xl text-copper/30">{s.n}</span>
              <h3 className="font-display font-semibold text-lg mt-2 mb-1.5">{s.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}

const WHY = [
  { icon: Award, title: '30+ years in business', desc: 'Serving Dakshina Kannada since 1992, across seven branches.' },
  { icon: ShieldCheck, title: '6-month repair warranty', desc: 'Every repair job is backed by our workmanship guarantee.' },
  { icon: Truck, title: 'Doorstep pickup & delivery', desc: 'We come to you for repairs and deliver new purchases free.' },
  { icon: CheckCircle, title: 'Transparent pricing', desc: 'No hidden charges — you approve the quote before any work starts.' },
];

export function WhyUs() {
  return (
    <section className="section-pad bg-ink text-[#F5F1E6]">
      <div className="container-a">
        <RevealOnScroll className="mb-10 max-w-xl">
          <span className="eyebrow !text-[#E8A657]">Why Agari</span>
          <h2 className="text-3xl sm:text-4xl">Why customers stick with us</h2>
        </RevealOnScroll>
        <RevealOnScroll stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY.map(({ icon: IconEl, title, desc }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-md p-6">
              <span className="w-11 h-11 rounded-full bg-[#E8A657]/15 text-[#E8A657] flex items-center justify-center mb-4">
                <IconEl className="w-5 h-5" />
              </span>
              <h3 className="font-display font-semibold text-lg mb-1.5">{title}</h3>
              <p className="text-sm opacity-75 leading-relaxed">{desc}</p>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
