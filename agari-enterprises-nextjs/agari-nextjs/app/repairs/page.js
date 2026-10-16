'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CONFIG, SERVICE_CENTERS, waLink } from '@/lib/config';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

const APPLIANCES = [
  'TV', 'Fridge', 'Washing Machine', 'AC', 'Microwave', 'Mixer Grinder', 'Water Purifier', 'Inverter', 'Other',
];

const STATUS_STEPS = [
  { id: 'requested', label: 'Requested' },
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'diagnosing', label: 'Diagnosing' },
  { id: 'awaiting_approval', label: 'Awaiting Approval' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
];

export default function RepairsPage({ initialTab = 'book' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'book' or 'track'

  // Booking Form State
  const [bookForm, setBookForm] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    appliance: 'TV',
    brand: '',
    issueDescription: '',
    serviceCenter: 'Surathkal',
    serviceLocation: 'Doorstep',
    address: '',
    appointmentDate: '',
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookingError, setBookingError] = useState('');

  // Tracking State
  const [trackQuery, setTrackQuery] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackedTicket, setTrackedTicket] = useState(null);
  const [trackError, setTrackError] = useState('');

  // Handle book repair
  async function handleBookSubmit(e) {
    e.preventDefault();
    if (!bookForm.customerName.trim() || !bookForm.customerPhone.trim() || !bookForm.issueDescription.trim()) {
      setBookingError('Please provide your name, phone number, and a description of the issue.');
      return;
    }

    setBookingError('');
    setBookingLoading(true);

    try {
      const res = await fetch('/api/repairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit booking');

      setBookingSuccess(data.ticket);
    } catch (err) {
      setBookingError(err.message || 'Error booking repair');
    } finally {
      setBookingLoading(false);
    }
  }

  // Handle track ticket
  async function handleTrackSubmit(e) {
    e?.preventDefault();
    const q = trackQuery.trim();
    if (!q) {
      setTrackError('Please enter your repair ticket number (e.g. AG-26288-412).');
      return;
    }

    setTrackError('');
    setTrackingLoading(true);
    setTrackedTicket(null);

    try {
      const res = await fetch(`/api/repairs/${encodeURIComponent(q)}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Ticket not found. Please verify your ticket number.');
      }
      setTrackedTicket(data.ticket);
    } catch (err) {
      setTrackError(err.message || 'Ticket not found');
    } finally {
      setTrackingLoading(false);
    }
  }

  // Get current step index
  const currentStepIndex = trackedTicket
    ? STATUS_STEPS.findIndex((s) => s.id === trackedTicket.repairStatus)
    : -1;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper pt-28 pb-20">
        {/* Banner */}
        <div className="bg-grad-ink text-cream py-12 mb-8 border-b border-line">
          <div className="container-a">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-gold mb-2 block">
                Agari Repair Services · Since 1992
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-3">
                Expert Electronics &amp; Appliance Repairs
              </h1>
              <p className="text-cream/80 text-sm sm:text-base leading-relaxed">
                TVs, refrigerators, washing machines, microwaves, and mixers.
                Fast doorstep inspection with genuine parts and a 6-month service warranty.
              </p>
            </div>
          </div>
        </div>

        <div className="container-a">
          {/* Mode Switcher Tabs */}
          <div className="flex justify-center mb-10">
            <div className="bg-panel border border-line rounded-2xl p-1.5 shadow-sm inline-flex">
              <button
                type="button"
                onClick={() => setActiveTab('book')}
                className={`px-6 py-2.5 rounded-xl font-display font-semibold text-xs sm:text-sm transition-all ${
                  activeTab === 'book'
                    ? 'bg-copper text-white shadow-glow-copper'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                Book a Repair Request
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('track')}
                className={`px-6 py-2.5 rounded-xl font-display font-semibold text-xs sm:text-sm transition-all ${
                  activeTab === 'track'
                    ? 'bg-trace text-white shadow-glow-trace'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                Track Live Repair Status
              </button>
            </div>
          </div>

          {/* TAB 1: BOOK A REPAIR */}
          {activeTab === 'book' && (
            <div className="max-w-3xl mx-auto">
              {bookingSuccess ? (
                <div className="bg-panel border border-line rounded-3xl p-8 sm:p-12 text-center shadow-card animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-trace-soft text-trace flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-trace font-bold block mb-1">
                    Booking Confirmed
                  </span>
                  <h2 className="font-display font-bold text-2xl text-ink mb-2">
                    Repair Ticket Generated
                  </h2>
                  <p className="text-xs text-ink-soft mb-6 max-w-md mx-auto">
                    Our service center has received your request. A technician will contact you within 30 minutes.
                  </p>

                  <div className="bg-panel-2 border border-line rounded-2xl p-5 mb-8 max-w-md mx-auto font-mono text-xs text-left space-y-2">
                    <div className="flex justify-between border-b border-line pb-2">
                      <span className="text-ink-faint">Ticket Number:</span>
                      <span className="font-bold text-copper-dark text-sm">{bookingSuccess.ticketNumber}</span>
                    </div>
                    <div className="flex justify-between border-b border-line pb-2">
                      <span className="text-ink-faint">Appliance:</span>
                      <span className="font-semibold text-ink">{bookingSuccess.appliance} ({bookingSuccess.brand || 'General'})</span>
                    </div>
                    <div className="flex justify-between border-b border-line pb-2">
                      <span className="text-ink-faint">Assigned Center:</span>
                      <span className="font-semibold text-ink">{bookingSuccess.serviceCenter}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-ink-faint">Initial Status:</span>
                      <span className="font-bold text-trace uppercase">{bookingSuccess.repairStatus}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setTrackQuery(bookingSuccess.ticketNumber);
                        setActiveTab('track');
                        setTimeout(() => handleTrackSubmit(), 100);
                      }}
                      className="btn btn-trace !rounded-xl text-xs"
                    >
                      Track This Repair Online
                    </button>

                    <a
                      href={waLink(
                        `Hi Agari Enterprises, I booked repair ticket *#${bookingSuccess.ticketNumber}* for my ${bookingSuccess.appliance}. Please confirm technician appointment.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-xs flex items-center justify-center gap-1.5"
                    >
                      <span>WhatsApp Confirmation</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-panel border border-line rounded-3xl p-6 sm:p-10 shadow-card">
                  <h2 className="font-display font-bold text-xl text-ink mb-2">Book a Service Visit</h2>
                  <p className="text-xs text-ink-soft mb-6">
                    Enter your appliance details below. We offer same-day doorstep diagnosis across Dakshina Kannada.
                  </p>

                  {bookingError && (
                    <div className="bg-error-bg text-error p-3 rounded-xl text-xs mb-4 font-semibold">
                      {bookingError}
                    </div>
                  )}

                  <form onSubmit={handleBookSubmit} className="space-y-4">
                    {/* Appliance & Brand */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1">
                          Appliance Type <span className="text-error">*</span>
                        </label>
                        <select
                          value={bookForm.appliance}
                          onChange={(e) => setBookForm({ ...bookForm, appliance: e.target.value })}
                          className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                        >
                          {APPLIANCES.map((a) => (
                            <option key={a} value={a}>{a}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1">
                          Brand &amp; Model (Optional)
                        </label>
                        <input
                          type="text"
                          value={bookForm.brand}
                          onChange={(e) => setForm({ ...bookForm, brand: e.target.value })}
                          placeholder="e.g. LG, Samsung, Sony, Whirlpool"
                          className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                        />
                      </div>
                    </div>

                    {/* Issue Description */}
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1">
                        Describe the Problem <span className="text-error">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={bookForm.issueDescription}
                        onChange={(e) => setBookForm({ ...bookForm, issueDescription: e.target.value })}
                        placeholder="e.g. No display on screen / washing machine vibrating violently during spin cycle / water leakage..."
                        className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                      />
                    </div>

                    {/* Service Center Selection */}
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-2">
                        Preferred Service Center
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {Object.entries(SERVICE_CENTERS).map(([name, info]) => (
                          <label
                            key={name}
                            className={`p-3 rounded-xl border-2 cursor-pointer flex flex-col gap-0.5 transition-all ${
                              bookForm.serviceCenter === name
                                ? 'border-trace bg-trace-soft text-trace'
                                : 'border-line bg-panel-2 hover:border-trace/40'
                            }`}
                          >
                            <input
                              type="radio"
                              name="serviceCenter"
                              value={name}
                              checked={bookForm.serviceCenter === name}
                              onChange={() => setBookForm({ ...bookForm, serviceCenter: name })}
                              className="sr-only"
                            />
                            <span className="font-bold text-xs">{name}</span>
                            <span className="text-[10px] text-ink-faint font-mono">{info.display}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1">
                          Your Full Name <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={bookForm.customerName}
                          onChange={(e) => setBookForm({ ...bookForm, customerName: e.target.value })}
                          placeholder="e.g. Anand Kamath"
                          className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1">
                          Phone Number <span className="text-error">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={bookForm.customerPhone}
                          onChange={(e) => setBookForm({ ...bookForm, customerPhone: e.target.value })}
                          placeholder="e.g. 9845112233"
                          className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                        />
                      </div>
                    </div>

                    {/* Address & Preferred Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1">
                          Doorstep Service Address <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={bookForm.address}
                          onChange={(e) => setBookForm({ ...bookForm, address: e.target.value })}
                          placeholder="Street, landmark, town..."
                          className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1">
                          Preferred Date (Optional)
                        </label>
                        <input
                          type="date"
                          value={bookForm.appointmentDate}
                          onChange={(e) => setBookForm({ ...bookForm, appointmentDate: e.target.value })}
                          className="w-full text-xs bg-paper border border-line rounded-xl px-3 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="w-full btn btn-copper btn-lg !rounded-xl mt-4"
                    >
                      {bookingLoading ? 'Submitting Booking…' : 'Submit Repair Request & Generate Ticket'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TRACK LIVE REPAIR STATUS */}
          {activeTab === 'track' && (
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Search Box */}
              <div className="bg-panel border border-line rounded-3xl p-6 sm:p-8 shadow-card">
                <h2 className="font-display font-bold text-xl text-ink mb-2">Live Repair Status Tracker</h2>
                <p className="text-xs text-ink-soft mb-6">
                  Enter your Agari Service Ticket Number (or mobile number) to view current diagnosis, assigned technician, and progress.
                </p>

                <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={trackQuery}
                    onChange={(e) => setTrackQuery(e.target.value)}
                    placeholder="Enter Ticket ID (e.g. AG-26288-412)"
                    className="flex-1 text-xs bg-paper border border-line rounded-xl px-4 py-3 font-mono text-ink focus:outline-none focus:ring-2 focus:ring-trace"
                  />
                  <button
                    type="submit"
                    disabled={trackingLoading}
                    className="btn btn-trace !rounded-xl text-xs sm:px-6"
                  >
                    {trackingLoading ? 'Searching…' : 'Track Status'}
                  </button>
                </form>

                {trackError && (
                  <p className="text-xs text-error mt-3 font-semibold">{trackError}</p>
                )}

                {/* Quick Hint */}
                <div className="mt-4 pt-3 border-t border-line text-[11px] text-ink-faint">
                  <span>Sample tickets in system: </span>
                  <button
                    type="button"
                    onClick={() => {
                      setTrackQuery('AG-26288-412');
                      setTimeout(() => handleTrackSubmit(), 50);
                    }}
                    className="text-copper-dark font-mono font-bold hover:underline mx-1"
                  >
                    AG-26288-412
                  </button>
                  <span> or </span>
                  <button
                    type="button"
                    onClick={() => {
                      setTrackQuery('AG-26287-105');
                      setTimeout(() => handleTrackSubmit(), 50);
                    }}
                    className="text-copper-dark font-mono font-bold hover:underline mx-1"
                  >
                    AG-26287-105
                  </button>
                </div>
              </div>

              {/* Status Result Display */}
              {trackedTicket && (
                <div className="bg-panel border border-line rounded-3xl p-6 sm:p-10 shadow-card animate-fade-in space-y-8">
                  {/* Header Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-line gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink-faint block">
                        Service Ticket Details
                      </span>
                      <h3 className="font-display font-bold text-2xl text-ink font-mono">
                        {trackedTicket.ticketNumber}
                      </h3>
                      <p className="text-xs text-ink-soft mt-0.5">
                        Customer: <span className="font-semibold text-ink">{trackedTicket.customerName}</span> ({trackedTicket.customerPhone})
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-trace text-white">
                        Status: {trackedTicket.repairStatus.replace(/_/g, ' ')}
                      </span>
                      <span className="block text-[11px] text-ink-faint mt-1">
                        Booked: {new Date(trackedTicket.createdAt).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Multi-Step Timeline */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-ink-faint mb-4">
                      Service Progress Timeline
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                      {STATUS_STEPS.map((step, idx) => {
                        const isDone = currentStepIndex >= idx;
                        const isCurrent = currentStepIndex === idx;

                        return (
                          <div
                            key={step.id}
                            className={`p-3 rounded-xl border text-center transition-all ${
                              isCurrent
                                ? 'border-copper bg-copper-soft text-copper-dark font-bold shadow-sm'
                                : isDone
                                ? 'border-trace bg-trace-soft text-trace'
                                : 'border-line/70 bg-panel-2 text-ink-faint'
                            }`}
                          >
                            <div className="text-base mb-1">
                              {isDone ? '✓' : idx + 1}
                            </div>
                            <div className="text-[10px] font-semibold leading-tight">
                              {step.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Diagnostic & Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="bg-panel-2 p-4 rounded-2xl border border-line space-y-2">
                      <span className="text-ink-faint block text-[10px] uppercase font-bold">Appliance Info</span>
                      <p><strong className="text-ink">Type:</strong> {trackedTicket.appliance}</p>
                      <p><strong className="text-ink">Brand:</strong> {trackedTicket.brand || 'Not specified'}</p>
                      <p><strong className="text-ink">Center:</strong> {trackedTicket.serviceCenter} Branch</p>
                      <p><strong className="text-ink">Location:</strong> {trackedTicket.serviceLocation} ({trackedTicket.address})</p>
                    </div>

                    <div className="bg-panel-2 p-4 rounded-2xl border border-line space-y-2">
                      <span className="text-ink-faint block text-[10px] uppercase font-bold">Technician Notes &amp; Cost</span>
                      <p className="text-ink italic leading-relaxed">"{trackedTicket.technicianNotes || 'Initial inspection scheduled.'}"</p>
                      {trackedTicket.estimatedCost && (
                        <p className="text-sm pt-1 border-t border-line font-bold text-ink">
                          Estimated Cost: {formatINR(trackedTicket.estimatedCost)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status History Events */}
                  {trackedTicket.statusHistory && trackedTicket.statusHistory.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-ink-faint mb-3">
                        Activity Log
                      </h4>
                      <div className="space-y-2 border-l-2 border-line pl-4 ml-2">
                        {trackedTicket.statusHistory.map((h, i) => (
                          <div key={i} className="text-xs">
                            <span className="font-mono text-[10px] text-ink-faint">
                              {new Date(h.date).toLocaleString('en-IN')}
                            </span>
                            <p className="font-semibold text-ink">{h.note}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Support */}
                  <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-ink-soft">Need to speak with our service technician?</span>
                    <a
                      href={`tel:+${CONFIG.phoneDigits}`}
                      className="btn btn-sm btn-trace !rounded-xl"
                    >
                      Call Service Desk ({CONFIG.displayPhone})
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
