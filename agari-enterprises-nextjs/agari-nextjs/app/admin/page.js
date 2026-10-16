'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CONFIG } from '@/lib/config';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('overview'); // overview, orders, repairs, products, reports
  const [overview, setOverview] = useState(null);
  const [orders, setOrders] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [products, setProducts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // New Product Modal State
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProd, setNewProd] = useState({
    name: '',
    brand: 'Agari',
    categoryName: 'Washing Machine',
    price: '',
    stockQuantity: '10',
    avail: 'In Stock',
    description: '',
  });

  // Check initial authentication
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth');
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
        }
      } catch (e) {
        // Not authenticated
      } finally {
        setAuthLoading(false);
      }
    }
    checkAuth();
  }, []);

  // Fetch admin data once authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchData() {
      setLoadingData(true);
      try {
        const [ovRes, ordRes, repRes, prodRes, enqRes] = await Promise.all([
          fetch('/api/admin/overview'),
          fetch('/api/orders?limit=100'),
          fetch('/api/repairs?limit=100'),
          fetch('/api/products?limit=150'),
          fetch('/api/enquiries'),
        ]);

        const ovData = await ovRes.json();
        const ordData = await ordRes.json();
        const repData = await repRes.json();
        const prodData = await prodRes.json();
        const enqData = await enqRes.json();

        setOverview(ovData);
        setOrders(ordData.orders || []);
        setRepairs(repData.tickets || []);
        setProducts(prodData.products || []);
        setEnquiries(enqData.enquiries || []);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoadingData(false);
      }
    }

    fetchData();
  }, [isAuthenticated]);

  // Handle Login
  async function handleLogin(e) {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passcode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid passcode');
      setIsAuthenticated(true);
    } catch (err) {
      setAuthError(err.message);
    }
  }

  // Handle Logout
  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
  }

  // Handle Order Status Update
  async function handleOrderStatusChange(orderRef, newStatus) {
    try {
      const res = await fetch(`/api/orders/${orderRef}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.orderReference === orderRef ? { ...o, orderStatus: newStatus } : o))
        );
      }
    } catch (err) {
      alert('Failed to update order status');
    }
  }

  // Handle Repair Status Update
  async function handleRepairStatusChange(ticketNum, newStatus) {
    try {
      const res = await fetch(`/api/repairs/${ticketNum}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repairStatus: newStatus }),
      });
      if (res.ok) {
        setRepairs((prev) =>
          prev.map((r) => (r.ticketNumber === ticketNum ? { ...r, repairStatus: newStatus } : r))
        );
      }
    } catch (err) {
      alert('Failed to update repair status');
    }
  }

  // Handle Stock Update
  async function handleStockChange(productId, newQty) {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stockQuantity: parseInt(newQty, 10) }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? { ...p, stockQuantity: parseInt(newQty, 10) } : p))
        );
      }
    } catch (err) {
      alert('Failed to update stock');
    }
  }

  // Handle Add Product Submit
  async function handleAddProductSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProd,
          price: parseInt(newProd.price, 10),
          stockQuantity: parseInt(newProd.stockQuantity, 10),
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setProducts((prev) => [created, ...prev]);
        setShowAddProduct(false);
        setNewProd({
          name: '',
          brand: 'Agari',
          categoryName: 'Washing Machine',
          price: '',
          stockQuantity: '10',
          avail: 'In Stock',
          description: '',
        });
      }
    } catch (err) {
      alert('Failed to add product');
    }
  }

  // Loading Screen
  if (authLoading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center font-mono text-xs text-ink-faint">
        Authenticating…
      </div>
    );
  }

  // Passcode Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-grad-ink flex items-center justify-center p-4">
        <div className="bg-panel border border-line rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
          <div className="w-14 h-14 rounded-full bg-copper-soft text-copper-dark flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="font-display font-bold text-xl text-ink mb-1">Agari Store Admin</h1>
          <p className="text-xs text-ink-soft mb-6">Enter administrative passkey to access operational dashboard</p>

          {authError && (
            <div className="bg-error-bg text-error p-2.5 rounded-xl text-xs mb-4 font-semibold">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              required
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter admin password (hint: agari1992)"
              className="w-full text-xs bg-paper border border-line rounded-xl px-4 py-3 font-mono text-ink text-center focus:outline-none focus:ring-2 focus:ring-copper"
            />
            <button type="submit" className="w-full btn btn-copper !rounded-xl text-xs">
              Sign In to Dashboard
            </button>
          </form>

          <Link href="/" className="inline-block text-xs text-ink-faint hover:text-ink mt-6 font-mono">
            ← Return to Storefront
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* Admin Top Header */}
      <header className="bg-ink text-cream px-6 py-4 border-b border-line flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-display font-bold text-lg text-cream flex items-center gap-2">
            <span>Agari Enterprises</span>
            <span className="text-[10px] font-mono uppercase bg-gold/20 text-gold px-2 py-0.5 rounded-full">
              Admin Portal
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <Link href="/" target="_blank" className="text-cream/80 hover:text-gold transition-colors hidden sm:inline">
            View Live Store ↗
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-error bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 container-a py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-line pb-4 mb-8">
          {[
            { id: 'overview', label: 'Overview & Metrics' },
            { id: 'orders', label: `Orders (${orders.length})` },
            { id: 'repairs', label: `Repair Tickets (${repairs.length})` },
            { id: 'products', label: `Products & Stock (${products.length})` },
            { id: 'enquiries', label: `Enquiries (${enquiries.length})` },
            { id: 'reports', label: 'Reports & CSV Export' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-ink text-panel shadow-sm font-bold'
                  : 'bg-panel text-ink-soft hover:bg-line/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && overview && (
          <div className="space-y-8 animate-fade-in">
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-panel border border-line rounded-2xl p-5 shadow-sm">
                <span className="text-[10px] font-mono uppercase tracking-wider text-ink-faint block mb-1">
                  Total Orders
                </span>
                <div className="font-display font-bold text-3xl text-ink">{overview.totalOrders}</div>
                <span className="text-[11px] text-trace font-semibold mt-1 block">Live across all branches</span>
              </div>

              <div className="bg-panel border border-line rounded-2xl p-5 shadow-sm">
                <span className="text-[10px] font-mono uppercase tracking-wider text-ink-faint block mb-1">
                  Net Sales
                </span>
                <div className="font-display font-bold text-3xl text-copper-dark">
                  {formatINR(overview.netSales)}
                </div>
                <span className="text-[11px] text-ink-faint font-semibold mt-1 block">Verified customer orders</span>
              </div>

              <div className="bg-panel border border-line rounded-2xl p-5 shadow-sm">
                <span className="text-[10px] font-mono uppercase tracking-wider text-ink-faint block mb-1">
                  Open Repairs
                </span>
                <div className="font-display font-bold text-3xl text-trace">{overview.openRepairs}</div>
                <span className="text-[11px] text-trace font-semibold mt-1 block">In service or diagnosis</span>
              </div>

              <div className="bg-panel border border-line rounded-2xl p-5 shadow-sm">
                <span className="text-[10px] font-mono uppercase tracking-wider text-ink-faint block mb-1">
                  Low-Stock Items
                </span>
                <div className="font-display font-bold text-3xl text-error">{overview.lowStockItems}</div>
                <span className="text-[11px] text-error font-semibold mt-1 block">Below 5 units threshold</span>
              </div>
            </div>

            {/* Recent Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Activity Timeline */}
              <div className="lg:col-span-8 bg-panel border border-line rounded-3xl p-6 shadow-card">
                <h3 className="font-display font-bold text-base text-ink mb-4 pb-2 border-b border-line">
                  Recent Store Activity
                </h3>
                <div className="space-y-4">
                  {overview.recentActivity.map((act, i) => (
                    <div key={i} className="flex items-start justify-between text-xs pb-3 border-b border-line last:border-0">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                            act.type === 'order'
                              ? 'bg-copper-soft text-copper-dark'
                              : 'bg-trace-soft text-trace'
                          }`}
                        >
                          {act.type === 'order' ? 'ORD' : 'REP'}
                        </span>
                        <div>
                          <span className="font-semibold text-ink block">{act.title}</span>
                          <span className="text-ink-soft text-[11px]">{act.desc}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-[10px] text-ink-faint block">
                          {new Date(act.time).toLocaleDateString('en-IN')}
                        </span>
                        <span className="text-[10px] font-bold uppercase text-trace">{act.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="lg:col-span-4 bg-panel border border-line rounded-3xl p-6 shadow-card space-y-4">
                <h3 className="font-display font-bold text-base text-ink mb-2">Operational Shortcuts</h3>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('products');
                    setShowAddProduct(true);
                  }}
                  className="w-full btn btn-trace !rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <span>+ Add New Product</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('reports')}
                  className="w-full btn btn-panel !rounded-xl text-xs border border-line text-ink flex items-center justify-center gap-2"
                >
                  <span>Download Sales Report (CSV)</span>
                </button>
                <div className="bg-panel-2 p-4 rounded-xl border border-line text-xs space-y-2 mt-4 text-ink-soft">
                  <span className="font-bold text-ink block">Store Helplines:</span>
                  <p>Surathkal: {CONFIG.displayPhone}</p>
                  <p>WhatsApp: {CONFIG.whatsappDisplay}</p>
                  <p>Service Center: Moodabidri, Mangalore</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-panel border border-line rounded-3xl p-6 shadow-card overflow-x-auto animate-fade-in">
            <h3 className="font-display font-bold text-lg text-ink mb-4">Customer Orders</h3>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-line text-ink-faint font-mono">
                  <th className="pb-3">Reference</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Phone</th>
                  <th className="pb-3">City / Area</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-panel-2 transition-colors">
                    <td className="py-3 font-mono font-bold text-copper-dark">{o.orderReference}</td>
                    <td className="py-3 font-semibold text-ink">{o.customerName}</td>
                    <td className="py-3 font-mono text-ink-soft">{o.customerPhone}</td>
                    <td className="py-3 text-ink-soft">{o.city || 'Surathkal'}</td>
                    <td className="py-3 text-ink-soft">{o.items?.length || 1} item(s)</td>
                    <td className="py-3 font-bold text-ink">{formatINR(o.totalAmount)}</td>
                    <td className="py-3">
                      <select
                        value={o.orderStatus}
                        onChange={(e) => handleOrderStatusChange(o.orderReference, e.target.value)}
                        className="bg-paper border border-line rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-trace"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: REPAIR TICKETS MANAGEMENT */}
        {activeTab === 'repairs' && (
          <div className="bg-panel border border-line rounded-3xl p-6 shadow-card overflow-x-auto animate-fade-in">
            <h3 className="font-display font-bold text-lg text-ink mb-4">Service &amp; Repair Tickets</h3>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-line text-ink-faint font-mono">
                  <th className="pb-3">Ticket ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Appliance</th>
                  <th className="pb-3">Center</th>
                  <th className="pb-3">Problem / Notes</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {repairs.map((r) => (
                  <tr key={r.id} className="hover:bg-panel-2 transition-colors">
                    <td className="py-3 font-mono font-bold text-trace">{r.ticketNumber}</td>
                    <td className="py-3 font-semibold text-ink">
                      {r.customerName}
                      <span className="block font-mono text-[10px] text-ink-faint">{r.customerPhone}</span>
                    </td>
                    <td className="py-3 text-ink">
                      {r.appliance} <span className="text-[10px] text-ink-faint">({r.brand || 'Brand'})</span>
                    </td>
                    <td className="py-3 font-semibold text-ink">{r.serviceCenter}</td>
                    <td className="py-3 text-ink-soft max-w-xs truncate" title={r.issueDescription}>
                      {r.issueDescription}
                    </td>
                    <td className="py-3">
                      <select
                        value={r.repairStatus}
                        onChange={(e) => handleRepairStatusChange(r.ticketNumber, e.target.value)}
                        className="bg-paper border border-line rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-trace"
                      >
                        <option value="requested">Requested</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="diagnosing">Diagnosing</option>
                        <option value="awaiting_approval">Awaiting Approval</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: PRODUCTS & INVENTORY MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-panel border border-line rounded-3xl p-6 shadow-card animate-fade-in space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-line">
              <h3 className="font-display font-bold text-lg text-ink">Live Product Inventory</h3>
              <button
                type="button"
                onClick={() => setShowAddProduct(true)}
                className="btn btn-sm btn-trace"
              >
                + Add New Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-line text-ink-faint font-mono">
                    <th className="pb-3">Brand</th>
                    <th className="pb-3">Product Name</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Stock Units</th>
                    <th className="pb-3">Availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-panel-2 transition-colors">
                      <td className="py-3 font-bold text-trace uppercase">{p.brand}</td>
                      <td className="py-3 font-semibold text-ink">{p.name}</td>
                      <td className="py-3 text-ink-soft">{p.categoryName}</td>
                      <td className="py-3 font-mono font-bold text-ink">{formatINR(p.price)}</td>
                      <td className="py-3">
                        <input
                          type="number"
                          defaultValue={p.stockQuantity}
                          onBlur={(e) => handleStockChange(p.id, e.target.value)}
                          className={`w-16 px-2 py-1 border rounded-lg text-xs font-mono font-bold ${
                            p.stockQuantity < 5
                              ? 'border-error bg-error-bg text-error'
                              : 'border-line bg-paper text-ink'
                          }`}
                        />
                      </td>
                      <td className="py-3">
                        <span
                          className={`badge ${
                            p.avail === 'In Stock' ? 'badge-stock' : 'badge-order'
                          }`}
                        >
                          {p.avail}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="bg-panel border border-line rounded-3xl p-6 shadow-card animate-fade-in space-y-4">
            <h3 className="font-display font-bold text-lg text-ink mb-4">Customer Enquiries</h3>
            <div className="space-y-3">
              {enquiries.length === 0 ? (
                <p className="text-xs text-ink-faint">No open enquiries.</p>
              ) : (
                enquiries.map((enq) => (
                  <div key={enq.id} className="bg-panel-2 border border-line rounded-2xl p-4 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-ink text-sm">{enq.name}</span>
                      <span className="font-mono text-ink-faint text-[10px]">
                        {new Date(enq.createdAt).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="text-copper-dark font-mono font-semibold">Phone: {enq.phone}</div>
                    <p className="text-ink-soft leading-relaxed pt-1">{enq.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 6: REPORTS & CSV EXPORT */}
        {activeTab === 'reports' && (
          <div className="bg-panel border border-line rounded-3xl p-6 sm:p-10 shadow-card animate-fade-in space-y-8">
            <div>
              <h3 className="font-display font-bold text-2xl text-ink mb-2">Export Business Reports</h3>
              <p className="text-xs text-ink-soft">
                Download verified real-time CSV spreadsheets for local accounting, inventory replenishment, and service analysis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sales Report */}
              <div className="bg-panel-2 border border-line rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-base text-ink mb-1">Sales &amp; Orders Report</h4>
                  <p className="text-xs text-ink-soft mb-4">
                    Complete records of all orders, customer contact information, cities, delivery notes, and verified order amounts.
                  </p>
                </div>
                <a
                  href="/api/admin/reports?type=sales&format=csv"
                  download
                  className="btn btn-copper w-full !rounded-xl text-xs text-center block"
                >
                  Download Sales CSV
                </a>
              </div>

              {/* Inventory Report */}
              <div className="bg-panel-2 border border-line rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-base text-ink mb-1">Product Inventory Report</h4>
                  <p className="text-xs text-ink-soft mb-4">
                    Full product roster, active categories, live warehouse stock levels, pricing, and re-order threshold flags.
                  </p>
                </div>
                <a
                  href="/api/admin/reports?type=inventory&format=csv"
                  download
                  className="btn btn-trace w-full !rounded-xl text-xs text-center block"
                >
                  Download Inventory CSV
                </a>
              </div>

              {/* Repairs Report */}
              <div className="bg-panel-2 border border-line rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-base text-ink mb-1">Service &amp; Repairs Report</h4>
                  <p className="text-xs text-ink-soft mb-4">
                    All repair tickets, appliances repaired, service center workloads (Surathkal, Mangalore, Moodabidri), and costs.
                  </p>
                </div>
                <a
                  href="/api/admin/reports?type=repairs&format=csv"
                  download
                  className="btn btn-panel border border-line w-full !rounded-xl text-xs text-center block text-ink hover:bg-white"
                >
                  Download Repairs CSV
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-panel border border-line rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-line">
              <h3 className="font-display font-bold text-lg text-ink">Add New Catalogue Item</h3>
              <button
                type="button"
                onClick={() => setShowAddProduct(false)}
                className="text-ink-faint hover:text-ink text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-ink mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="e.g. 8 kg Fully Automatic Front Load"
                  className="w-full bg-paper border border-line rounded-xl px-3 py-2 text-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={newProd.brand}
                    onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                    className="w-full bg-paper border border-line rounded-xl px-3 py-2 text-ink"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink mb-1">Category</label>
                  <select
                    value={newProd.categoryName}
                    onChange={(e) => setNewProd({ ...newProd, categoryName: e.target.value })}
                    className="w-full bg-paper border border-line rounded-xl px-3 py-2 text-ink"
                  >
                    {['Washing Machine', 'Television', 'Refrigerator', 'AC', 'Fan', 'Mixer', 'Dining Table', 'Bed and Cot', 'Wooden Almirah'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink mb-1">Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    placeholder="24990"
                    className="w-full bg-paper border border-line rounded-xl px-3 py-2 text-ink"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink mb-1">Initial Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={newProd.stockQuantity}
                    onChange={(e) => setNewProd({ ...newProd, stockQuantity: e.target.value })}
                    className="w-full bg-paper border border-line rounded-xl px-3 py-2 text-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-ink mb-1">Description / Notes</label>
                <textarea
                  rows={2}
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  placeholder="Key features and specifications..."
                  className="w-full bg-paper border border-line rounded-xl px-3 py-2 text-ink"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="flex-1 btn btn-panel border border-line !rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn btn-trace !rounded-xl">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
