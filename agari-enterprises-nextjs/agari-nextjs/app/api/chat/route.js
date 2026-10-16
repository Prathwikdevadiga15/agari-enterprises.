import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { CONFIG, SERVICE_CENTERS, FAQ } from '@/lib/config';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

// Local conversational intelligence fallback when LLM API key is not supplied
function getSmartFallbackReply(userMessage) {
  const msg = userMessage.toLowerCase().trim();

  // Kannada greetings & queries
  if (msg.includes('namaskara') || msg.includes('hegiddira') || msg.includes('hegiddeera') || msg.includes('namaste')) {
    return `ನಮಸ್ಕಾರ! ಅಗರಿ ಎಂಟರ್‌ಪ್ರೈಸಸ್‌ಗೆ ಸ್ವಾಗತ (Agari Enterprises). ನಾವು 1992 ರಿಂದ ಟಿವಿ, ರೆಫ್ರಿಜರೇಟರ್, ವಾಷಿಂಗ್ ಮೆಷಿನ್ ರಿಪೇರಿ ಮತ್ತು ಹೊಸ ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ & ಪೀಠೋಪಕರಣಗಳ ಮಾರಾಟದಲ್ಲಿ ನಂಬಿಕಸ್ಥ ಸೇವೆಯನ್ನು ನೀಡುತ್ತಿದ್ದೇವೆ. ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು? ನೀವು ರಿಪೇರಿ ಬುಕ್ ಮಾಡಲು ಅಥವಾ ಪ್ರಾಡಕ್ಟ್ ಆರ್ಡರ್ ಮಾಡಲು ನಮ್ಮ ವೆಬ್‌ಸೈಟ್ ಬಳಸಬಹುದು ಅಥವಾ ನೇರವಾಗಿ WhatsApp ಮಾಡಿ: ${CONFIG.whatsappDisplay}`;
  }

  // Repair & Service queries
  if (msg.includes('repair') || msg.includes('service') || msg.includes('samasy') || msg.includes('kelasa madtilla') || msg.includes('not working') || msg.includes('broken') || msg.includes('technician') || msg.includes('warranty')) {
    let appliance = 'Home Appliance';
    if (msg.includes('tv') || msg.includes('television')) appliance = 'LED/Smart TV';
    else if (msg.includes('wash') || msg.includes('machine')) appliance = 'Washing Machine';
    else if (msg.includes('fridge') || msg.includes('refrigerator')) appliance = 'Refrigerator';
    else if (msg.includes('ac') || msg.includes('air condition')) appliance = 'Air Conditioner';
    else if (msg.includes('mixer') || msg.includes('grinder')) appliance = 'Mixer / Grinder';
    else if (msg.includes('chimney') || msg.includes('stove')) appliance = 'Kitchen Chimney / Stove';

    return `🔧 **Agari Doorstep Repair Service**:
• **Appliance**: ${appliance}
• **Coverage**: Surathkal, Mangalore, Moodabidri, Mulki, Kinnigoli, and Dakshina Kannada.
• **Warranty**: 6 months written warranty on all replaced genuine spare parts and technician workmanship.
• **Response**: A verified technician calls you within 30 minutes of booking.
• **How to Book**: Visit our "/#repairs" section, submit the quick form, or WhatsApp us directly at ${CONFIG.whatsappDisplay}.`;
  }

  // Delivery & Shipping Policy
  if (msg.includes('delivery') || msg.includes('shipping') || msg.includes('charges') || msg.includes('free delivery') || msg.includes('pincode') || msg.includes('transport')) {
    return `🚚 **Agari Delivery Policy**:
• **Zero Delivery Charges**: We do NOT charge any delivery fees within our local service areas (Surathkal, Mangalore, Moodabidri, Yedapadavu, and surrounding Dakshina Kannada districts).
• **Timeline**: Same-day or next-day delivery for in-stock appliances and ready furniture.
• **Careful Handling**: Delivered directly to your home room of choice by our experienced staff.`;
  }

  // Payments, COD, EMI & Discounts
  if (msg.includes('payment') || msg.includes('cod') || msg.includes('cash on delivery') || msg.includes('upi') || msg.includes('card') || msg.includes('razorpay')) {
    return `💳 **Accepted Payment Methods**:
1. **Cash on Delivery (COD)**: Pay securely upon physical inspection at your doorstep.
2. **UPI / QR Code**: Google Pay, PhonePe, Paytm upon delivery or in-store.
3. **Credit / Debit Cards**: All major Visa, Mastercard, and RuPay cards accepted at branches.
4. **Zero-cost / Easy EMI**: Available in-store through leading finance partners (Bajaj, HDB, Credit cards).
5. No online payments without full transparency and physical confirmation.`;
  }

  // EMI & Financing
  if (msg.includes('emi') || msg.includes('finance') || msg.includes('installment') || msg.includes('loan')) {
    return `💰 **EMI & Store Financing**:
Yes! Easy EMI options are available on major electronics, refrigerators, TVs, and solid wood furniture sets.
• Instant approval at our Surathkal, Mangalore, and Moodabidre showrooms with valid Aadhaar/PAN or credit card.
• Low down payment schemes available during festive seasons.`;
  }

  // Return & Exchange Policy
  if (msg.includes('return') || msg.includes('exchange') || msg.includes('refund') || msg.includes('damaged') || msg.includes('replacement')) {
    return `🛡️ **Returns & Replacement Policy**:
• We inspect every appliance and furniture item before dispatch.
• If any product arrives damaged during transport or has a manufacturing defect, report it within **7 days** for a prompt replacement or service visit.
• For immediate return or warranty support, call our manager at ${CONFIG.displayPhone} or email contact@agarienterprises.com.`;
  }

  // Orders & Order Status Tracking
  if (msg.includes('order') || msg.includes('track') || msg.includes('status') || msg.includes('cancel')) {
    return `📦 **Order & Tracking Information**:
• To track or place an order, view your active Cart and proceed to Checkout.
• For existing orders, our dispatch desk confirms delivery appointments by phone.
• Need instant order status? WhatsApp your order reference or phone number to ${CONFIG.whatsappDisplay} and our desk will update you in minutes.`;
  }

  // Founder & Story
  if (msg.includes('founder') || msg.includes('proprietor') || msg.includes('owner') || msg.includes('history') || msg.includes('1992') || msg.includes('who') || msg.includes('raghavendra')) {
    return `🏛️ **Agari Enterprises Heritage**:
Agari Enterprises was established in 1992 in Yedapadavu by our proprietor, **${CONFIG.proprietor}**.
Starting as a dedicated repair hub for CRT televisions and radios, Sri Raghavendra Rao built the enterprise over 34+ years into Dakshina Kannada's premier sales and multi-brand service destination across 6 branches, committed to honest pricing and Yakshagana cultural patronage.`;
  }

  // Contact, Hours & Showroom Locations
  if (msg.includes('hours') || msg.includes('time') || msg.includes('timing') || msg.includes('open') || msg.includes('close')) {
    return `⏰ **Showroom Working Hours**:
• Open **Every Day**: 9:00 AM – 9:00 PM (Monday through Sunday).
• Phone Helpline: ${CONFIG.displayPhone}
• WhatsApp Support: ${CONFIG.whatsappDisplay}`;
  }

  if (msg.includes('location') || msg.includes('branch') || msg.includes('address') || msg.includes('where') || msg.includes('store') || msg.includes('showroom')) {
    return `📍 **Agari Enterprises Branches**:
1. **Surathkal Main Showroom**: Opp. Govinda Dasa PU College, NH 66, Surathkal.
2. **Mangalore Kadri Branch**: Near Shivabagh / Kadri Road, Mangaluru.
3. **Moodabidri Branch**: Near Bus Stand Road, Moodabidri.
4. **Yedapadavu Original Hub**: Central Junction, Yedapadavu (Est. 1992).
5. **Kavoor & Shubagiri Service Points**: Dedicated repair & parts dispatch.
Helpline: ${CONFIG.displayPhone}`;
  }

  // Product catalogue search
  const SYNONYM_MAP = {
    sofa: 'chair',
    couch: 'chair',
    fridge: 'refrigerator',
    tv: 'television',
    cot: 'bed',
    beds: 'bed',
    wardrobe: 'almirah',
    grinder: 'mixer',
    cooler: 'air cooler',
  };

  const keywords = [
    'sofa', 'couch', 'bed', 'beds', 'cot', 'dining', 'table', 'wardrobe', 'almirah', 'chair',
    'tv', 'television', 'washing machine', 'refrigerator', 'fridge', 'ac', 'cooler',
    'chimney', 'mixer', 'grinder', 'stove', 'gas', 'oven', 'microwave', 'purifier',
    'geyser', 'fan', 'inverter', 'electronics', 'furniture', 'kitchen'
  ];

  const matched = keywords.filter((k) => msg.includes(k));
  if (matched.length > 0) {
    const rawKey = matched[0];
    const searchTerm = SYNONYM_MAP[rawKey] || rawKey;
    const searchRes = db.getProducts({ search: searchTerm, limit: 4 });

    if (searchRes.products && searchRes.products.length > 0) {
      const prodList = searchRes.products
        .map((p) => `• **${p.brand} ${p.name}** — ${formatINR(p.price)} (${p.avail})`)
        .join('\n');

      const extraNote = rawKey === 'sofa' || rawKey === 'couch'
        ? `\n\n🛋️ *Note: We also craft custom teak and solid timber 3+1+1 and L-shape sofa sets to exact room measurements with 5-year wood guarantee at our Surathkal workshop.*`
        : '';

      return `Here are genuine in-stock items related to **${rawKey}** from our store catalogue:\n\n${prodList}${extraNote}\n\n✨ All purchases include **free doorstep delivery** across Dakshina Kannada. Browse full specs on our Shop page or visit our Surathkal, Mangalore, or Moodabidre branches to view display models!`;
    }
  }

  // Default welcome response
  return `Hello! Welcome to **Agari Enterprises** — Dakshina Kannada's trusted destination for electronics, solid wood furniture, and certified doorstep appliance repairs since 1992.

How can I help you today?
• 🔧 **Book a Repair**: TV, Refrigerator, Washing Machine, AC
• 🛋️ **Browse Products**: Furniture, Smart TVs, Kitchen appliances
• 🚚 **Delivery & Orders**: Free doorstep delivery within Dakshina Kannada
• 📞 **Direct Support**: Call ${CONFIG.displayPhone} or WhatsApp ${CONFIG.whatsappDisplay}`;
}

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided.' }, { status: 400 });
    }

    const lastUserMsg = messages[messages.length - 1]?.content || '';
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (apiKey) {
      try {
        const anthropic = new Anthropic({ apiKey });
        const trimmed = messages.slice(-8).map((m) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: String(m.content || '').slice(0, 1500),
        }));

        const systemPrompt = `You are the AI assistant for ${CONFIG.businessName}, founded in 1992 in Yedapadavu by ${CONFIG.proprietor}.
Dakshina Kannada branches: Surathkal (Opp. Govinda Dasa PU College), Mangalore, Moodabidri, Yedapadavu, Kavoor.
Working Hours: ${CONFIG.hours}. Phone: ${CONFIG.displayPhone}. WhatsApp: ${CONFIG.whatsappDisplay}.
Repairs: TVs, Refrigerators, Washing Machines, ACs, Microwaves, Mixers. 6-month warranty on workmanship. Doorstep service within 30 min callback.
Delivery: Free delivery in local area, no delivery charges. EMI available in-store.
Always be warm, professional, and accurate. If answering in Kannada or English, keep it concise and helpful.`;

        const response = await anthropic.messages.create({
          model: 'claude-3-haiku-20240307',
          max_tokens: 350,
          system: systemPrompt,
          messages: trimmed,
        });

        const reply = response.content
          .filter((block) => block.type === 'text')
          .map((block) => block.text)
          .join('\n')
          .trim();

        if (reply) {
          return NextResponse.json({ reply, configured: true });
        }
      } catch (err) {
        console.warn('Anthropic API call failed, falling back to smart local knowledge engine:', err.message);
      }
    }

    // Smart local knowledge reply
    const reply = getSmartFallbackReply(lastUserMsg);
    return NextResponse.json({ reply, configured: true, localKnowledge: true });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json(
      {
        reply: `Welcome to Agari Enterprises! For immediate assistance, repair booking or product quotes, please call us at ${CONFIG.displayPhone} or WhatsApp ${CONFIG.whatsappDisplay}.`,
        configured: true,
      },
      { status: 200 }
    );
  }
}
