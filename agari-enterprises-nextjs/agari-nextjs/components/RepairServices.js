'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';
import { Wrench, ShieldCheck, Clock, CheckCircle2 } from './icons';

const SERVICES = [
  {
    title: 'Television Repair',
    appliance: 'TV',
    desc: 'Panel repair, backlight replacement, power board, sound and Smart Android TV software diagnosis.',
    image: '/images/categories/television.jpg',
    tags: ['LED / OLED / 4K', 'Backlight', 'Display Panel'],
    estimate: 'Inspection from ₹299',
    badge: 'Popular Service',
  },
  {
    title: 'Refrigerator Servicing',
    appliance: 'Fridge',
    desc: 'Cooling failure, compressor replacement, gas charging, defrost timer and thermostat adjustment.',
    image: '/images/categories/refrigerator.jpg',
    tags: ['Single / Double Door', 'Gas Refill', 'Compressor'],
    estimate: 'Doorstep visit in 30m',
    badge: 'Same-day Visit',
  },
  {
    title: 'Washing Machine Repair',
    appliance: 'Washing Machine',
    desc: 'Drainage blockages, heavy spin vibration, drum bearing repair, water intake valves and motherboards.',
    image: '/images/categories/washing-machine.jpg',
    tags: ['Front & Top Load', 'Motor & Belt', 'Drain Pump'],
    estimate: 'Genuine OEM spares',
    badge: '6-Month Warranty',
  },
  {
    title: 'Air Conditioner Service',
    appliance: 'AC',
    desc: 'Deep jet cleaning, gas charging (R32 / R410A), indoor cooling coil repairs and annual maintenance.',
    image: '/images/categories/ac.jpg',
    tags: ['Split & Window AC', 'Gas Top-up', 'Jet Cleaning'],
    estimate: 'Beat the heat',
    badge: 'Expert Technicians',
  },
  {
    title: 'Microwave Oven Repair',
    appliance: 'Microwave',
    desc: 'Magnetron heating element replacement, touch membrane panel, turntable motor and door latch faults.',
    image: '/images/categories/oven.jpg',
    tags: ['Convection & Grill', 'Magnetron', 'Touch Panel'],
    estimate: 'Quick workshop turnaround',
    badge: 'Tested Spares',
  },
  {
    title: 'Mixer Grinder & Blender',
    appliance: 'Mixer Grinder',
    desc: 'Motor rewinding, coupler replacement, jar blade sharpening, bushing replacement and overload trip repair.',
    image: '/images/categories/mixer.jpg',
    tags: ['Couplers & Blades', 'Motor Rewind', 'Jar Alignment'],
    estimate: 'Express repair',
    badge: 'Counter Service',
  },
  {
    title: 'Water Purifier (RO/UV)',
    appliance: 'Water Purifier',
    desc: 'Membrane replacement, sediment and carbon filter replacement, booster pump repair and TDS calibration.',
    image: '/images/categories/water-purifier.jpg',
    tags: ['RO / UV / UF', 'Filter Kit', 'Pump Repair'],
    estimate: 'Healthy drinking water',
    badge: 'TDS Certified',
  },
  {
    title: 'Home Inverter & UPS',
    appliance: 'Inverter',
    desc: 'Charging circuit repair, battery acid check, MOSFET replacement, relay issues and load balancing.',
    image: '/images/categories/inverter.jpg',
    tags: ['Pure Sine Wave', 'Battery Health', 'Circuit Repair'],
    estimate: 'Emergency power backup',
    badge: 'Reliable Power',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.35, ease: [0.16, 0.8, 0.24, 1] },
  }),
};

export default function RepairServices() {
  return (
    <section className="section-pad bg-panel-2 relative overflow-hidden" id="repair">
      {/* Background glow accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none opacity-20 -z-0"
        style={{
          background: 'radial-gradient(circle, rgba(193,105,43,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="container-a relative z-10">
        <RevealOnScroll className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="eyebrow !text-copper mb-2 block">Professional Appliance Servicing</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-2">
                What We Repair
              </h2>
              <p className="text-muted max-w-xl text-sm sm:text-base leading-relaxed">
                From screen replacements to motor overhauls — our factory-trained technicians service all leading electronics with genuine parts and an ironclad 6-month warranty.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#request"
                data-set-mode="repair"
                className="btn btn-copper btn-lg shadow-[0_0_25px_rgba(193,105,43,0.35)]"
              >
                <Wrench className="w-4 h-4" />
                Book Doorstep Visit
              </a>
              <Link
                href="/repairs/track"
                className="btn btn-outline text-xs sm:text-sm py-2.5 px-4"
              >
                Track Ticket Status
              </Link>
            </div>
          </div>
        </RevealOnScroll>

        {/* Repair Cards Grid with REAL APPLIANCE PHOTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -6 }}
              className="group bg-panel border border-line rounded-2xl overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Real Appliance Image Showcase */}
                <div className="relative aspect-[4/3] overflow-hidden bg-panel-2 border-b border-line/60">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-80" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-ink/80 text-gold backdrop-blur-md border border-gold/30 font-medium">
                      {s.badge}
                    </span>
                  </div>

                  {/* 6-month warranty chip */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 text-[11px] font-medium text-cream drop-shadow">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                      6-Mo Warranty
                    </span>
                    <span className="text-[11px] font-mono text-gold-light bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      {s.estimate}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-ink mb-1.5 group-hover:text-copper transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed mb-3">
                    {s.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-paper border border-line text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <a
                  href="#request"
                  data-set-mode="repair"
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-trace-soft text-trace hover:bg-trace hover:text-white transition-all flex items-center justify-center gap-1.5 group-hover:shadow-md"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  Book {s.appliance} Repair
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Appliance Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-grad-ink text-cream flex flex-col md:flex-row items-center justify-between gap-6 border border-copper/30 shadow-lg">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 text-gold border border-gold/30">
              <Wrench className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-cream">
                Don&apos;t see your appliance listed?
              </h3>
              <p className="text-sm text-cream/75 mt-1">
                We repair audio speakers, fans, geysers, induction hobs, and commercial units across Dakshina Kannada.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <a
              href="#request"
              data-set-mode="repair"
              className="btn btn-copper py-3 px-6 text-xs sm:text-sm rounded-xl"
            >
              Request Custom Repair
            </a>
            <a
              href="tel:9845353412"
              className="btn glass !text-cream hover:!bg-white/20 py-3 px-5 text-xs sm:text-sm rounded-xl"
            >
              Call 9845353412
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
