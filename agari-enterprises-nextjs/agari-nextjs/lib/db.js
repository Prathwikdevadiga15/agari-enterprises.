import fs from 'fs';
import path from 'path';
import { CATALOG_PRODUCTS, CATEGORY_GROUPS, categorySlug, categoryImage } from './catalog';
import { CONFIG } from './config';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'agari-db.json');

// In-memory cache to ensure speed across serverless invocations
let memoryDb = null;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch (e) {
      // In read-only environments (like some serverless containers), fallback to memory
    }
  }
}

function generateId(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
}

function generateOrderReference() {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `AG-ORD-${yy}${mm}-${rand}`;
}

function generateTicketNumber() {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const doy = String(Math.floor(diff / 86400000)).padStart(3, '0');
  const rand = String(Math.floor(100 + Math.random() * 900));
  return `AG-${yy}${doy}-${rand}`;
}

function buildInitialSeed() {
  const categories = [];
  const products = [];

  CATEGORY_GROUPS.forEach((group) => {
    group.categories.forEach((catName) => {
      const slug = categorySlug(catName);
      const catId = `cat_${slug}`;
      categories.push({
        id: catId,
        slug,
        name: catName,
        group: group.id,
        groupLabel: group.label,
        imageUrl: categoryImage(catName),
        isActive: true,
      });

      const prods = CATALOG_PRODUCTS[catName] || [];
      prods.forEach((p, idx) => {
        const prodSlug = `${slug}-${p.brand.toLowerCase()}-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`.replace(/^-|-$/g, '');
        products.push({
          id: `prod_${prodSlug}`,
          slug: prodSlug,
          categoryId: catId,
          categoryName: catName,
          categoryGroup: group.id,
          brand: p.brand,
          name: p.name,
          model: `${p.brand.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
          description: `${p.note || (p.brand + ' ' + p.name + ' with premium build and reliable performance.')}. Supplied with genuine brand warranty and doorstep installation from Agari Enterprises.`,
          price: p.price,
          salePrice: p.price > 10000 ? Math.round(p.price * 1.12) : null,
          stockQuantity: p.avail === 'On Order' ? 3 : Math.floor(6 + Math.random() * 18),
          warranty: '6-Month Store Warranty + Brand Warranty',
          attrs: p.attrs || {},
          note: p.note || '',
          avail: p.avail || 'In Stock',
          imageUrl: categoryImage(catName),
          isActive: true,
          createdAt: new Date(Date.now() - (idx + 1) * 86400000 * 3).toISOString(),
        });
      });
    });
  });

  const orders = [
    {
      id: 'ord_1',
      orderReference: 'AG-ORD-2609-5481',
      customerName: 'Ganesh Kulal',
      customerPhone: '9845112233',
      customerEmail: 'ganesh.k@example.com',
      deliveryAddress: 'Main Road, Near Bus Stand, Surathkal',
      city: 'Surathkal',
      orderStatus: 'delivered',
      paymentMethod: 'cod',
      paymentStatus: 'paid',
      subtotal: 18990,
      deliveryFee: 0,
      totalAmount: 18990,
      notes: 'Please call before arrival',
      items: [
        {
          productId: 'prod_washing-machine-lg-7-kg-fully-automatic-top-load',
          productName: '7 kg Fully Automatic Top Load',
          brand: 'LG',
          category: 'Washing Machine',
          unitPrice: 18990,
          quantity: 1,
          totalPrice: 18990,
        },
      ],
      createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    },
    {
      id: 'ord_2',
      orderReference: 'AG-ORD-2610-8192',
      customerName: 'Priya Shetty',
      customerPhone: '9448223344',
      customerEmail: 'priya.shetty@example.com',
      deliveryAddress: 'Flat 302, Kadri Hills, Mangalore',
      city: 'Mangalore',
      orderStatus: 'shipped',
      paymentMethod: 'upi_on_delivery',
      paymentStatus: 'pending',
      subtotal: 30980,
      deliveryFee: 0,
      totalAmount: 30980,
      notes: 'Second floor, elevator available',
      items: [
        {
          productId: 'prod_bed-and-cot-agari-home-queen-size-bed-without-storage',
          productName: 'Queen Size Bed without Storage',
          brand: 'Agari Home',
          category: 'Bed and Cot',
          unitPrice: 13990,
          quantity: 1,
          totalPrice: 13990,
        },
        {
          productId: 'prod_dining-table-agari-home-4-seater-dining-table-set',
          productName: '4-Seater Dining Table Set',
          brand: 'Agari Home',
          category: 'Dining Table',
          unitPrice: 16990,
          quantity: 1,
          totalPrice: 16990,
        },
      ],
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      id: 'ord_3',
      orderReference: 'AG-ORD-2610-9403',
      customerName: 'Mohammed Rameez',
      customerPhone: '9980556677',
      customerEmail: 'rameez.m@example.com',
      deliveryAddress: 'Opposite Jain Temple, Moodabidri',
      city: 'Moodabidri',
      orderStatus: 'confirmed',
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      subtotal: 24990,
      deliveryFee: 0,
      totalAmount: 24990,
      notes: 'Call on reaching Moodabidri circle',
      items: [
        {
          productId: 'prod_refrigerator-samsung-236-l-double-door-frost-free',
          productName: '236 L Double Door Frost-Free',
          brand: 'Samsung',
          category: 'Refrigerator',
          unitPrice: 24990,
          quantity: 1,
          totalPrice: 24990,
        },
      ],
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    },
  ];

  const repairTickets = [
    {
      id: 'rep_1',
      ticketNumber: 'AG-26288-412',
      customerName: 'Ramesh Shenoy',
      customerPhone: '9845778899',
      serviceCenter: 'Surathkal',
      appliance: 'TV',
      brand: 'Sony',
      issueDescription: 'Display backlight flickering after thunderstorm, sound is working normally.',
      serviceLocation: 'Doorstep',
      address: 'Near Govinda Dasa PU College, Surathkal',
      appointmentDate: new Date(Date.now() + 1 * 86400000).toISOString().slice(0, 10),
      repairStatus: 'in_progress', // requested -> scheduled -> diagnosing -> awaiting_approval -> in_progress -> completed
      technicianNotes: 'Power board tested OK. Inverter board replaced with genuine Sony component. Final burn-in test scheduled.',
      estimatedCost: 2450,
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 4 * 3600000).toISOString(),
      statusHistory: [
        { status: 'requested', date: new Date(Date.now() - 2 * 86400000).toISOString(), note: 'Online request submitted' },
        { status: 'scheduled', date: new Date(Date.now() - 1.5 * 86400000).toISOString(), note: 'Technician Naveen assigned for Surathkal area' },
        { status: 'diagnosing', date: new Date(Date.now() - 1 * 86400000).toISOString(), note: 'Technician visited, diagnosed inverter circuit fault' },
        { status: 'awaiting_approval', date: new Date(Date.now() - 0.8 * 86400000).toISOString(), note: 'Cost estimate ₹2,450 approved by customer' },
        { status: 'in_progress', date: new Date(Date.now() - 4 * 3600000).toISOString(), note: 'Replacement part fitted; bench testing underway' },
      ],
    },
    {
      id: 'rep_2',
      ticketNumber: 'AG-26287-105',
      customerName: 'Shobha Poojarthi',
      customerPhone: '9449887766',
      serviceCenter: 'Mangalore',
      appliance: 'Washing Machine',
      brand: 'Whirlpool',
      issueDescription: 'Spin tub not draining and vibrating heavily during spin cycle.',
      serviceLocation: 'Doorstep',
      address: 'Maryhill, Konchadi, Mangaluru',
      appointmentDate: new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10),
      repairStatus: 'completed',
      technicianNotes: 'Drain valve cleared of coin obstruction, spin balancer adjusted. 6-month warranty card issued.',
      estimatedCost: 850,
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      statusHistory: [
        { status: 'requested', date: new Date(Date.now() - 5 * 86400000).toISOString(), note: 'Service request booked' },
        { status: 'scheduled', date: new Date(Date.now() - 4.5 * 86400000).toISOString(), note: 'Technician assigned' },
        { status: 'diagnosing', date: new Date(Date.now() - 4 * 86400000).toISOString(), note: 'Drain obstruction identified' },
        { status: 'in_progress', date: new Date(Date.now() - 3.5 * 86400000).toISOString(), note: 'Valve serviced & balanced' },
        { status: 'completed', date: new Date(Date.now() - 3 * 86400000).toISOString(), note: 'Service completed, machine tested satisfactory' },
      ],
    },
    {
      id: 'rep_3',
      ticketNumber: 'AG-26289-771',
      customerName: 'Anil Bhat',
      customerPhone: '9980112244',
      serviceCenter: 'Moodabidre',
      appliance: 'Fridge',
      brand: 'LG',
      issueDescription: 'Cooling in freezer is normal but lower vegetable compartment is warm.',
      serviceLocation: 'Doorstep',
      address: 'Alangar, Moodabidri',
      appointmentDate: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
      repairStatus: 'scheduled',
      technicianNotes: 'Scheduled for technician inspection on Wednesday morning.',
      estimatedCost: null,
      createdAt: new Date(Date.now() - 6 * 3600000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
      statusHistory: [
        { status: 'requested', date: new Date(Date.now() - 6 * 3600000).toISOString(), note: 'Request received via website' },
        { status: 'scheduled', date: new Date(Date.now() - 2 * 3600000).toISOString(), note: 'Appointment scheduled with technician Sunil' },
      ],
    },
  ];

  const enquiries = [
    {
      id: 'enq_1',
      name: 'Dr. Sudhir Rao',
      phone: '9845998877',
      category: 'Furniture & Appliances',
      message: 'Looking for a complete bedroom set (King bed, 3-door almirah, dressing table) and a 43-inch TV for our new house near NITK.',
      resolved: false,
      createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    },
  ];

  const auditLogs = [
    {
      id: 'aud_1',
      actor: 'system',
      action: 'INIT_SEED',
      details: { products: products.length, categories: categories.length },
      timestamp: new Date().toISOString(),
    },
  ];

  return { categories, products, orders, repairTickets, enquiries, auditLogs };
}

function loadDatabase() {
  if (memoryDb) return memoryDb;
  ensureDataDir();

  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      memoryDb = JSON.parse(content);
      return memoryDb;
    } catch (e) {
      console.warn('Failed to parse agari-db.json, re-seeding:', e);
    }
  }

  memoryDb = buildInitialSeed();
  saveDatabase(memoryDb);
  return memoryDb;
}

function saveDatabase(data) {
  memoryDb = data;
  ensureDataDir();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    // Write may fail in certain read-only hosting environments; memory remains active
  }
}

// ──────────────────────────────────────────
// PUBLIC DATABASE API
// ──────────────────────────────────────────

export const db = {
  // Categories
  getCategories() {
    const data = loadDatabase();
    return data.categories.filter((c) => c.isActive !== false);
  },

  // Products
  getProducts({ category, search, minPrice, maxPrice, avail, sort = 'featured', limit = 100, page = 1 } = {}) {
    const data = loadDatabase();
    let prods = data.products.filter((p) => p.isActive !== false);

    if (category && category !== 'all') {
      const slug = categorySlug(category);
      prods = prods.filter(
        (p) =>
          categorySlug(p.categoryName) === slug ||
          p.categoryGroup === category ||
          p.categoryId === category
      );
    }

    if (search) {
      const q = search.trim().toLowerCase();
      prods = prods.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (minPrice != null && !isNaN(minPrice)) {
      prods = prods.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice != null && !isNaN(maxPrice)) {
      prods = prods.filter((p) => p.price <= Number(maxPrice));
    }

    if (avail && avail !== 'all') {
      prods = prods.filter((p) => p.avail.toLowerCase() === avail.toLowerCase());
    }

    // Sort
    if (sort === 'price-asc') prods.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') prods.sort((a, b) => b.price - a.price);
    else if (sort === 'name') prods.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'newest') prods.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const total = prods.length;
    const offset = (page - 1) * limit;
    const paginated = prods.slice(offset, offset + limit);

    return {
      products: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  getProductById(idOrSlug) {
    const data = loadDatabase();
    return (
      data.products.find(
        (p) => p.id === idOrSlug || p.slug === idOrSlug
      ) || null
    );
  },

  addProduct(productData) {
    const data = loadDatabase();
    const slug = productData.slug || `${categorySlug(productData.categoryName || 'item')}-${productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    const newProduct = {
      id: generateId('prod'),
      slug,
      categoryId: productData.categoryId || `cat_${categorySlug(productData.categoryName || 'general')}`,
      categoryName: productData.categoryName || 'General',
      categoryGroup: productData.categoryGroup || 'electronics',
      brand: productData.brand || 'Agari',
      name: productData.name,
      model: productData.model || `MOD-${Math.floor(1000 + Math.random() * 9000)}`,
      description: productData.description || '',
      price: Number(productData.price) || 0,
      salePrice: productData.salePrice ? Number(productData.salePrice) : null,
      stockQuantity: Number(productData.stockQuantity) || 10,
      warranty: productData.warranty || '6-month warranty',
      attrs: productData.attrs || {},
      note: productData.note || '',
      avail: productData.avail || 'In Stock',
      imageUrl: productData.imageUrl || categoryImage(productData.categoryName || 'Washing Machine'),
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    data.products.unshift(newProduct);
    saveDatabase(data);
    return newProduct;
  },

  updateProduct(id, updates) {
    const data = loadDatabase();
    const idx = data.products.findIndex((p) => p.id === id || p.slug === id);
    if (idx === -1) return null;
    data.products[idx] = { ...data.products[idx], ...updates, updatedAt: new Date().toISOString() };
    saveDatabase(data);
    return data.products[idx];
  },

  deleteProduct(id) {
    const data = loadDatabase();
    const idx = data.products.findIndex((p) => p.id === id || p.slug === id);
    if (idx === -1) return false;
    data.products[idx].isActive = false;
    saveDatabase(data);
    return true;
  },

  // Orders
  getOrders({ status, limit = 100 } = {}) {
    const data = loadDatabase();
    let list = [...data.orders];
    if (status && status !== 'all') {
      list = list.filter((o) => o.orderStatus === status);
    }
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return list.slice(0, limit);
  },

  getOrderById(idOrRef) {
    const data = loadDatabase();
    return (
      data.orders.find(
        (o) => o.id === idOrRef || o.orderReference === idOrRef
      ) || null
    );
  },

  createOrder(orderData) {
    const data = loadDatabase();
    const orderRef = generateOrderReference();

    const items = (orderData.items || []).map((item) => {
      const prod = data.products.find((p) => p.id === item.productId || p.slug === item.productId);
      const unitPrice = prod ? prod.price : item.price || 0;
      const qty = Math.max(1, item.qty || item.quantity || 1);
      return {
        productId: prod ? prod.id : item.productId,
        productName: item.name || (prod ? prod.name : 'Unknown Product'),
        brand: item.brand || (prod ? prod.brand : 'Agari'),
        category: item.cat || item.category || (prod ? prod.categoryName : 'Appliances'),
        unitPrice,
        quantity: qty,
        totalPrice: unitPrice * qty,
      };
    });

    const subtotal = items.reduce((sum, i) => sum + i.totalPrice, 0);
    const deliveryFee = 0; // Free delivery in Dakshina Kannada as per Agari policy
    const totalAmount = subtotal + deliveryFee;

    const newOrder = {
      id: generateId('ord'),
      orderReference: orderRef,
      customerName: orderData.customerName || 'Customer',
      customerPhone: orderData.customerPhone || '',
      customerEmail: orderData.customerEmail || '',
      deliveryAddress: orderData.deliveryAddress || '',
      city: orderData.city || 'Surathkal',
      orderStatus: 'confirmed',
      paymentMethod: orderData.paymentMethod || 'cod',
      paymentStatus: 'pending',
      subtotal,
      deliveryFee,
      totalAmount,
      notes: orderData.notes || '',
      items,
      createdAt: new Date().toISOString(),
    };

    // Update inventory
    items.forEach((item) => {
      const prod = data.products.find((p) => p.id === item.productId);
      if (prod && prod.stockQuantity > 0) {
        prod.stockQuantity = Math.max(0, prod.stockQuantity - item.quantity);
      }
    });

    data.orders.unshift(newOrder);
    saveDatabase(data);
    return newOrder;
  },

  updateOrderStatus(orderIdOrRef, status) {
    const data = loadDatabase();
    const order = data.orders.find((o) => o.id === orderIdOrRef || o.orderReference === orderIdOrRef);
    if (!order) return null;
    order.orderStatus = status;
    order.updatedAt = new Date().toISOString();
    saveDatabase(data);
    return order;
  },

  // Repair Tickets
  getRepairTickets({ status, limit = 100 } = {}) {
    const data = loadDatabase();
    let list = [...data.repairTickets];
    if (status && status !== 'all') {
      list = list.filter((r) => r.repairStatus === status);
    }
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return list.slice(0, limit);
  },

  getRepairTicketByNumber(ticketNumberOrId) {
    const data = loadDatabase();
    const query = ticketNumberOrId.trim().toUpperCase();
    return (
      data.repairTickets.find(
        (r) =>
          r.ticketNumber.toUpperCase() === query ||
          r.id === ticketNumberOrId ||
          r.customerPhone === ticketNumberOrId
      ) || null
    );
  },

  createRepairTicket(ticketData) {
    const data = loadDatabase();
    const ticketNumber = generateTicketNumber();

    const newTicket = {
      id: generateId('rep'),
      ticketNumber,
      customerName: ticketData.customerName || 'Customer',
      customerPhone: ticketData.customerPhone || '',
      customerEmail: ticketData.customerEmail || '',
      serviceCenter: ticketData.serviceCenter || 'Surathkal',
      appliance: ticketData.appliance || 'TV',
      brand: ticketData.brand || '',
      issueDescription: ticketData.issueDescription || '',
      serviceLocation: ticketData.serviceLocation || 'Doorstep',
      address: ticketData.address || '',
      appointmentDate: ticketData.appointmentDate || null,
      repairStatus: 'requested',
      technicianNotes: 'Ticket created, pending service assignment.',
      estimatedCost: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      statusHistory: [
        {
          status: 'requested',
          date: new Date().toISOString(),
          note: 'Repair request booked via Agari Enterprises portal.',
        },
      ],
    };

    data.repairTickets.unshift(newTicket);
    saveDatabase(data);
    return newTicket;
  },

  updateRepairTicket(ticketNumberOrId, { repairStatus, technicianNotes, estimatedCost }) {
    const data = loadDatabase();
    const ticket = data.repairTickets.find(
      (r) => r.ticketNumber === ticketNumberOrId || r.id === ticketNumberOrId
    );
    if (!ticket) return null;

    if (repairStatus && repairStatus !== ticket.repairStatus) {
      ticket.repairStatus = repairStatus;
      ticket.statusHistory = ticket.statusHistory || [];
      ticket.statusHistory.push({
        status: repairStatus,
        date: new Date().toISOString(),
        note: technicianNotes || `Status updated to ${repairStatus}`,
      });
    }

    if (technicianNotes !== undefined) ticket.technicianNotes = technicianNotes;
    if (estimatedCost !== undefined) ticket.estimatedCost = estimatedCost;
    ticket.updatedAt = new Date().toISOString();

    saveDatabase(data);
    return ticket;
  },

  // Enquiries
  getEnquiries() {
    const data = loadDatabase();
    return data.enquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  createEnquiry(enquiryData) {
    const data = loadDatabase();
    const newEnquiry = {
      id: generateId('enq'),
      name: enquiryData.name || 'Anonymous',
      phone: enquiryData.phone || '',
      email: enquiryData.email || '',
      category: enquiryData.category || 'General',
      message: enquiryData.message || '',
      resolved: false,
      createdAt: new Date().toISOString(),
    };
    data.enquiries.unshift(newEnquiry);
    saveDatabase(data);
    return newEnquiry;
  },

  // Overview and Reports
  getOverviewMetrics() {
    const data = loadDatabase();
    const totalOrders = data.orders.length;
    const netSales = data.orders
      .filter((o) => o.orderStatus !== 'cancelled')
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const openRepairs = data.repairTickets.filter(
      (r) => r.repairStatus !== 'completed' && r.repairStatus !== 'cancelled'
    ).length;
    const lowStockItems = data.products.filter(
      (p) => p.stockQuantity < 5 && p.isActive !== false
    ).length;

    // Recent activity timeline
    const recentActivity = [
      ...data.orders.slice(0, 5).map((o) => ({
        type: 'order',
        title: `Order #${o.orderReference}`,
        desc: `${o.customerName} ordered ${o.items.length} item(s) (₹${o.totalAmount.toLocaleString('en-IN')})`,
        time: o.createdAt,
        status: o.orderStatus,
      })),
      ...data.repairTickets.slice(0, 5).map((r) => ({
        type: 'repair',
        title: `Repair Ticket #${r.ticketNumber}`,
        desc: `${r.customerName} - ${r.appliance} (${r.repairStatus})`,
        time: r.createdAt,
        status: r.repairStatus,
      })),
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 8);

    return {
      totalOrders,
      netSales,
      openRepairs,
      lowStockItems,
      recentActivity,
    };
  },

  // CSV Report Generator
  generateReportCSV(reportType) {
    const data = loadDatabase();
    if (reportType === 'sales') {
      const headers = ['Order Reference', 'Date', 'Customer Name', 'Phone', 'City', 'Status', 'Payment', 'Amount (INR)'];
      const rows = data.orders.map((o) => [
        `"${o.orderReference}"`,
        `"${new Date(o.createdAt).toLocaleDateString('en-IN')}"`,
        `"${o.customerName}"`,
        `"${o.customerPhone}"`,
        `"${o.city || 'Surathkal'}"`,
        `"${o.orderStatus}"`,
        `"${o.paymentMethod}"`,
        o.totalAmount,
      ]);
      return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    }

    if (reportType === 'inventory') {
      const headers = ['Brand', 'Product Name', 'Category', 'Stock Qty', 'Price (INR)', 'Availability', 'Status'];
      const rows = data.products.map((p) => [
        `"${p.brand}"`,
        `"${p.name}"`,
        `"${p.categoryName}"`,
        p.stockQuantity,
        p.price,
        `"${p.avail}"`,
        p.stockQuantity < 5 ? '"LOW STOCK"' : '"HEALTHY"',
      ]);
      return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    }

    if (reportType === 'repairs') {
      const headers = ['Ticket Number', 'Date', 'Customer Name', 'Phone', 'Appliance', 'Brand', 'Center', 'Status', 'Est. Cost (INR)'];
      const rows = data.repairTickets.map((r) => [
        `"${r.ticketNumber}"`,
        `"${new Date(r.createdAt).toLocaleDateString('en-IN')}"`,
        `"${r.customerName}"`,
        `"${r.customerPhone}"`,
        `"${r.appliance}"`,
        `"${r.brand || '-'}"`,
        `"${r.serviceCenter}"`,
        `"${r.repairStatus}"`,
        r.estimatedCost || 0,
      ]);
      return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    }

    return '';
  },
};
