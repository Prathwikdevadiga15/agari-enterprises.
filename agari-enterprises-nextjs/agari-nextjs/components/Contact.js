import RevealOnScroll from './RevealOnScroll';
import { CONFIG, telHref, waLink } from '@/lib/config';
import { Phone, MapPin, Clock, MessageCircle, Mail } from './icons';

export default function Contact() {
  const items = [
    { icon: Phone, label: 'Phone', value: CONFIG.displayPhone, href: telHref() },
    { icon: MessageCircle, label: 'WhatsApp', value: CONFIG.whatsappDisplay, href: waLink("Hi Agari Enterprises, I have a question.") },
    { icon: Mail, label: 'Email', value: CONFIG.email, href: `mailto:${CONFIG.email}` },
    { icon: MapPin, label: 'Address', value: CONFIG.address, href: null },
    { icon: Clock, label: 'Hours', value: CONFIG.hours, href: null },
  ];

  return (
    <section className="section-pad" id="contact">
      <div className="container-a grid lg:grid-cols-2 gap-10 items-start">
        <RevealOnScroll>
          <span className="eyebrow">Get in touch</span>
          <h2 className="text-3xl sm:text-4xl mb-2">We&apos;re here to help</h2>
          <p className="text-ink-soft mb-6 max-w-md">
            Call, WhatsApp, or drop by any of our seven branches across Dakshina Kannada.
          </p>
          <div className="space-y-4">
            {items.map(({ icon: IconEl, label, value, href }) => {
              const content = (
                <div className="flex items-start gap-3">
                  <span className="w-10 h-10 rounded-full bg-trace-soft text-trace flex items-center justify-center flex-shrink-0">
                    <IconEl className="w-[18px] h-[18px]" />
                  </span>
                  <span>
                    <span className="block text-xs font-mono uppercase text-ink-faint">{label}</span>
                    <span className="font-medium">{value}</span>
                  </span>
                </div>
              );
              return href ? (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
                  {content}
                </a>
              ) : (
                <div key={label}>{content}</div>
              );
            })}
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="card overflow-hidden">
          <iframe
            title="Agari Enterprises location"
            src={`https://www.google.com/maps?q=${encodeURIComponent('Agari Enterprises, Navodaya Complex, Surathkal, Mangaluru, Karnataka')}&output=embed`}
            className="w-full h-[360px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
