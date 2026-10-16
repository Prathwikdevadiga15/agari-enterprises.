'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';
import { CONFIG, SERVICE_CENTERS, waLink, generateTicketId } from '@/lib/config';

/* ── Repair issue types (from original index.html) ── */
const ISSUE_TYPES = [
  'TV', 'Fridge', 'Washing Machine', 'AC', 'Microwave', 'Mixer', 'Other',
];

/* ── Order product categories (from original index.html) ── */
const ORDER_CATEGORIES = {
  Electronics: [
    'Refrigerator', 'Washing Machine', 'Television', 'Smart Phone', 'Water Purifier',
    'Geyser', 'AC', 'Air Cooler', 'Fan', 'Inverter', 'Speaker',
  ],
  'Kitchen Appliances': [
    'Gas Stove', 'Mixer', 'Induction Stove', 'Pan', 'Chimney', 'Rice Pot', 'Oven',
  ],
  Furniture: [
    'Bed and Cot', 'Wooden Almirah', 'Metal Almirah', 'TV Showcase', 'Center Table',
    'Dining Table', 'Tipai', 'Computer Table', 'Plastic Chair', 'Wooden Chair', 'Wooden Shoe Rack',
  ],
};

const TABS = [
  {
    id: 'repair', label: 'Book a Repair', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: 'order', label: 'Order Now', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
];

function Field({ label, required, error, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="field-label">
        {label}
        {required && <span className="text-copper ml-1 text-xs">*</span>}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-error flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v5M12 16h.01" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
}

function ServiceCenterCards({ value, onChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Choose a service center">
      {Object.entries(SERVICE_CENTERS).map(([name, info]) => (
        <label
          key={name}
          className={`relative flex flex-col gap-1 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${value === name
              ? 'border-trace bg-trace-soft text-trace shadow-sm'
              : 'border-line bg-panel hover:border-trace/50'
            }`}
        >
          <input
            type="radio"
            name="serviceCenter"
            value={name}
            checked={value === name}
            onChange={() => onChange(name)}
            className="sr-only"
          />
          {value === name && (
            <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-trace flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
          )}
          <span className="font-semibold text-sm">{name} Center</span>
          <span className="text-xs text-ink-faint font-mono">{info.display}</span>
        </label>
      ))}
    </div>
  );
}

export default function RequestForm() {
  const [mode, setMode] = useState('repair');
  const [center, setCenter] = useState('Surathkal');
  const [sameAddress, setSameAddress] = useState(false);
  const [deliveryAddr, setDeliveryAddr] = useState('');
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});
  const addressRef = useRef(null);

  function handleSameAddress(checked) {
    setSameAddress(checked);
    if (checked && addressRef.current) {
      setDeliveryAddr(addressRef.current.value);
    }
  }

  /* Listen for data-set-mode clicks (from hero CTAs) */
  useEffect(() => {
    function onClick(e) {
      const el = e.target.closest('[data-set-mode]');
      if (el) setMode(el.dataset.setMode);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  function validate(form) {
    const errs = {};
    const name = form.fullName?.value?.trim();
    const phone = form.phone?.value?.trim();
    const address = form.address?.value?.trim();

    if (!name) errs.fullName = 'Please enter your full name.';
    if (!phone) errs.phone = 'Please enter your phone number.';
    else if (!/^[0-9+\s-]{7,15}$/.test(phone)) errs.phone = 'Please enter a valid phone number.';

    if (mode === 'repair') {
      if (!form.issueType?.value) errs.issueType = 'Please select an issue type.';
      const problem = form.problem?.value?.trim();
      if (!problem || problem.length < 10) errs.problem = 'Please describe the problem (at least 10 characters).';
    }

    if (mode === 'order') {
      if (!form.productCategory?.value) errs.productCategory = 'Please select a product category.';
      if (!form.productName?.value?.trim()) errs.productName = 'Please enter the product name.';
      const qty = parseInt(form.quantity?.value, 10);
      if (!qty || qty < 1) errs.quantity = 'Please enter a quantity of at least 1.';
      const dAddr = sameAddress ? deliveryAddr : (form.deliveryAddress?.value?.trim() || '');
      if (!dAddr) errs.deliveryAddress = 'Please provide a delivery address.';
    }

    if (!center) errs.serviceCenter = 'Please choose a service center.';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const ticket = generateTicketId();
    const name = form.fullName.value.trim();
    const phone = form.phone.value.trim();
    const address = form.address?.value?.trim();

    let lines = [];
    if (mode === 'repair') {
      const issueType = form.issueType.value;
      const problem = form.problem.value.trim();

      // Submit to backend database
      try {
        fetch('/api/repairs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ticketNumber: ticket,
            customerName: name,
            customerPhone: phone,
            serviceCenter: center,
            appliance: issueType,
            issueDescription: problem,
            address: address || 'Local area',
          }),
        }).catch(() => {});
      } catch (e) {}

      lines = [
        `Hi Agari Enterprises, I'd like to book a repair.`,
        `Ticket: ${ticket}`,
        `Name: ${name}`,
        `Phone: ${phone}`,
        address ? `Address: ${address}` : null,
        `Issue type: ${issueType}`,
        `Problem: ${problem}`,
        `Service center: ${center} (${SERVICE_CENTERS[center]?.display})`,
      ];
    } else {
      const productCategory = form.productCategory.value;
      const productName = form.productName.value.trim();
      const quantity = form.quantity.value;
      const deliveryAddress = sameAddress ? deliveryAddr : (form.deliveryAddress?.value?.trim() || deliveryAddr);
      const notes = form.notes?.value?.trim();

      // Submit to backend database
      try {
        fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: name,
            customerPhone: phone,
            deliveryAddress: deliveryAddress || 'Dakshina Kannada',
            city: center,
            notes: notes || '',
            items: [{ name: productName, cat: productCategory, brand: 'Agari', qty: parseInt(quantity, 10) || 1, price: 1000 }],
          }),
        }).catch(() => {});
      } catch (e) {}

      lines = [
        `Hi Agari Enterprises, I'd like to place an order.`,
        `Ticket: ${ticket}`,
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Category: ${productCategory}`,
        `Product: ${productName}`,
        `Quantity: ${quantity}`,
        `Delivery address: ${deliveryAddress}`,
        notes ? `Notes: ${notes}` : null,
        `Service center: ${center} (${SERVICE_CENTERS[center]?.display})`,
      ];
    }

    const message = lines.filter(Boolean).join('\n');
    const number = SERVICE_CENTERS[center]?.whatsapp || CONFIG.whatsappNumber;
    setSubmitted({ ticket, url: waLink(message, number), mode });
    form.reset();
  }

  return (
    <section className="section-pad bg-panel-2" id="request">
      <div className="container-a">
        <RevealOnScroll className="max-w-xl mx-auto text-center mb-10">
          <span className="eyebrow justify-center">Get started</span>
          <h2 className="text-3xl sm:text-4xl mb-3">Book a repair or place an order</h2>
          <p className="text-ink-soft">We&apos;ll open WhatsApp with your details pre-filled — just hit send.</p>
        </RevealOnScroll>

        <RevealOnScroll className="max-w-2xl mx-auto">
          <div className="card p-6 sm:p-8">
            {/* Mode toggle */}
            <div className="flex gap-1 p-1 bg-panel-2 rounded-xl border border-line mb-8">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => { setMode(tab.id); setSubmitted(null); setErrors({}); }}
                  className={`relative flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors`}
                >
                  {mode === tab.id && (
                    <motion.div
                      layoutId="formTab"
                      className="absolute inset-0 rounded-lg bg-grad-ink shadow-md"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-2 ${mode === tab.id ? 'text-panel' : 'text-ink-soft'}`}>
                    {tab.icon}
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-trace-soft flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-trace" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <p className="font-mono text-xs text-ink-faint mb-1">Ticket {submitted.ticket}</p>
                  <h3 className="font-display font-bold text-2xl mb-2">Almost done!</h3>
                  <p className="text-ink-soft text-sm mb-6 max-w-xs mx-auto">
                    Tap below to open WhatsApp with your request pre-filled and ready to send.
                  </p>
                    <a
                    href={submitted.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-copper w-full mb-3"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                    Open WhatsApp
                  </a>
                  {submitted.mode === 'repair' && (
                    <a
                      href="/repairs"
                      className="btn btn-panel w-full border border-line mb-3 text-xs"
                    >
                      Track This Repair Online →
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setSubmitted(null)}
                    className="text-xs text-ink-faint hover:underline block mx-auto"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key={mode}
                  initial={{ opacity: 0, x: mode === 'order' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: mode === 'order' ? -20 : 20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  {/* ── Shared fields ── */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full name" required error={errors.fullName}>
                      <input name="fullName" type="text" className="field-input" placeholder="e.g. Ramesh Shetty" />
                    </Field>
                    <Field label="Phone number" required error={errors.phone}>
                      <input name="phone" type="tel" className="field-input" placeholder="+91 98453 53412" />
                    </Field>
                  </div>
                  <Field label="Your address" error={errors.address}>
                    <input ref={addressRef} name="address" type="text" className="field-input" placeholder="House / flat / area, city" onChange={(e) => { if (sameAddress) setDeliveryAddr(e.target.value); }} />
                  </Field>

                  {/* ── Repair-only fields ── */}
                  {mode === 'repair' && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key="repair-fields"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-5"
                      >
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Field label="Issue type" required error={errors.issueType}>
                            <select name="issueType" className="field-input" defaultValue="">
                              <option value="" disabled>Select issue type</option>
                              {ISSUE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </Field>
                        </div>
                        <Field label="Problem description" required error={errors.problem}>
                          <textarea
                            name="problem"
                            className="field-input resize-none"
                            rows={3}
                            placeholder="Describe the issue — when it started, any error messages or sounds, etc."
                          />
                        </Field>
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {/* ── Order-only fields ── */}
                  {mode === 'order' && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key="order-fields"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-5"
                      >
                        <Field label="Product category" required error={errors.productCategory}>
                          <select name="productCategory" className="field-input" defaultValue="">
                            <option value="" disabled>Select product category</option>
                            {Object.entries(ORDER_CATEGORIES).map(([group, items]) => (
                              <optgroup key={group} label={group}>
                                {items.map((item) => <option key={item} value={item}>{item}</option>)}
                              </optgroup>
                            ))}
                          </select>
                        </Field>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <Field label="Product name" required error={errors.productName}>
                            <input
                              name="productName"
                              type="text"
                              className="field-input"
                              placeholder="e.g. LG 260L Double Door Fridge"
                            />
                          </Field>
                          <Field label="Quantity" required error={errors.quantity}>
                            <input
                              name="quantity"
                              type="number"
                              min="1"
                              step="1"
                              className="field-input"
                              placeholder="e.g. 1"
                              inputMode="numeric"
                            />
                          </Field>
                        </div>

                        <Field label="Delivery address" required error={errors.deliveryAddress}>
                          <input
                            name="deliveryAddress"
                            type="text"
                            className="field-input"
                            placeholder="Where should we deliver this?"
                            value={deliveryAddr}
                            onChange={(e) => setDeliveryAddr(e.target.value)}
                            disabled={sameAddress}
                          />
                        </Field>
                        <label className="flex items-center gap-2.5 text-sm cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={sameAddress}
                            onChange={(e) => handleSameAddress(e.target.checked)}
                            className="w-4 h-4 rounded border-line accent-trace cursor-pointer"
                          />
                          <span className="text-ink-soft group-hover:text-ink transition-colors">
                            Deliver to the same address as above
                          </span>
                        </label>

                        <Field label="Additional notes" error={errors.notes}>
                          <textarea
                            name="notes"
                            className="field-input resize-none"
                            rows={2}
                            placeholder="Colour, size, brand preference, or anything else we should know"
                          />
                        </Field>
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {/* ── Service center ── */}
                  <div>
                    <p className="field-label mb-2">
                      Choose a service center <span className="text-copper ml-1 text-xs">*</span>
                    </p>
                    <ServiceCenterCards value={center} onChange={setCenter} />
                    {errors.serviceCenter && (
                      <p className="text-xs text-error mt-1 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" /><path d="M12 8v5M12 16h.01" />
                        </svg>
                        {errors.serviceCenter}
                      </p>
                    )}
                  </div>

                  {/* ── Submit ── */}
                  <button type="submit" className="btn btn-copper w-full btn-lg mt-2">
                    {mode === 'repair' ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                        Submit Repair Request
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                          <rect x="9" y="3" width="6" height="4" rx="2" />
                        </svg>
                        Submit Order Request
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-ink-faint">
                    We don&apos;t store your data. This opens WhatsApp automatically with your details pre-filled.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
