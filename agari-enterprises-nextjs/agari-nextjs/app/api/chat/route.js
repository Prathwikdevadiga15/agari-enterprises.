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

  if (msg.includes('repair') || msg.includes('service') || msg.includes('samasy') || msg.includes('kelasa madtilla') || msg.includes('not working') || msg.includes('broken')) {
    let appliance = 'appliance';
    if (msg.includes('tv') || msg.includes('television')) appliance = 'TV';
    else if (msg.includes('wash') || msg.includes('machine')) appliance = 'Washing Machine';
    else if (msg.includes('fridge') || msg.includes('refrigerator')) appliance = 'Refrigerator';
    else if (msg.includes('ac') || msg.includes('air condition')) appliance = 'Air Conditioner';
    else if (msg.includes('mixer') || msg.includes('grinder')) appliance = 'Mixer Grinder';

    return `Yes! We provide doorstep repair for ${appliance} across Surathkal, Mangalore, and Moodabidre. Every repair comes with genuine spare parts and our 6-month workmanship warranty. You can book a repair slot right here on our "Book a Repair" form or WhatsApp our service team directly at ${CONFIG.whatsappDisplay}. A technician will call you within 30 minutes!`;
  }

  // Delivery & EMI queries
  if (msg.includes('delivery') || msg.includes('charge') || msg.includes('shipping')) {
    return `We do NOT charge any delivery fees on products in our local service areas (Surathkal, Mangaluru, Moodabidri, and nearby Dakshina Kannada locations). Doorstep delivery is free!`;
  }

  if (msg.includes('emi') || msg.includes('finance') || msg.includes('installment') || msg.includes('loan')) {
    return `Yes! Easy EMI options and credit facility are available in our stores on electronics and furniture purchases. Visit our Surathkal, Mangalore or Moodabidre branch with your ID/card to get instant EMI approval.`;
  }

  // Founder & Story
  if (msg.includes('founder') || msg.includes('proprietor') || msg.includes('owner') || msg.includes('history') || msg.includes('1992') || msg.includes('who')) {
    return `Agari Enterprises was established in 1992 in Yedapadavu by our proprietor, ${CONFIG.proprietor}. Over the past three decades, we have expanded to 6 branches across Dakshina Kannada, providing trusted electronics repairs and quality home furniture.`;
  }

  // Contact, Hours & Location
  if (msg.includes('hours') || msg.includes('time') || msg.includes('timing') || msg.includes('open') || msg.includes('close')) {
    return `We are open every day from 9:00 AM to 9:00 PM. Our head showroom is located opposite Govinda Dasa PU College, Surathkal, Mangaluru. Call us at ${CONFIG.displayPhone} anytime!`;
  }

  if (msg.includes('location') || msg.includes('branch') || msg.includes('address') || msg.includes('where') || msg.includes('store')) {
    return `Our main showroom is opposite Govinda Dasa PU College in Surathkal. We also have branches and service centers in Mangalore (Prestige Tower/Kadri), Moodabidri, Yedapadavu, Shubagiri, and Kavoor. You can reach our helpdesk at ${CONFIG.displayPhone}.`;
  }

  // Product catalogue search
  const keywords = [
    'tv', 'television', 'washing machine', 'refrigerator', 'fridge', 'ac', 'cooler',
    'fan', 'inverter', 'phone', 'purifier', 'geyser', 'speaker', 'stove', 'pan',
    'chimney', 'mixer', 'oven', 'showcase', 'table', 'dining', 'bed', 'cot',
    'almirah', 'chair', 'rack', 'furniture', 'electronics',
  ];

  const matched = keywords.filter((k) => msg.includes(k));
  if (matched.length > 0) {
    const searchRes = db.getProducts({ search: matched[0], limit: 3 });
    if (searchRes.products.length > 0) {
      const prodList = searchRes.products
        .map((p) => `• ${p.brand} ${p.name} — ${formatINR(p.price)} (${p.avail})`)
        .join('\n');
      return `Here are some popular options for ${matched[0]} available at Agari Enterprises:\n\n${prodList}\n\nYou can browse full specifications on our Shop page or add them to your cart. We also provide doorstep delivery and installation! Would you like us to check availability for any specific model?`;
    }
  }

  // Default response
  return `Hello! Welcome to Agari Enterprises — Dakshina Kannada's trusted store for electronics, furniture sales, and doorstep repairs since 1992.\n\nWe provide:\n1. Doorstep appliance repairs (TV, Fridge, Washing Machine, AC) with a 6-month warranty\n2. Genuine brand appliances & custom solid wood furniture\n3. Free local delivery & zero delivery charges\n\nYou can book a repair or place an order directly on our site, or call us at ${CONFIG.displayPhone} / WhatsApp ${CONFIG.whatsappDisplay}!`;
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
