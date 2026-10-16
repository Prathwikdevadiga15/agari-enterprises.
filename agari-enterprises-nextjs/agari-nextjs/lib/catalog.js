// Product catalog — ported from the original single-file site.
// IMPORTANT: prices, stock and specs below are indicative sample listings
// to demonstrate the browsing experience, not live inventory.

function mkP(brand, name, attrs, price, note, avail) {
  return { brand, name, attrs: attrs || {}, price, note: note || '', avail: avail || 'In Stock' };
}

export const CATEGORY_GROUPS = [
  {
    id: 'electronics',
    label: 'Electronics',
    tileBg: 'trace-soft',
    tileFg: 'trace',
    categories: [
      'Washing Machine', 'Television', 'Refrigerator', 'AC', 'Air Cooler',
      'Fan', 'Inverter', 'Smart Phone', 'Water Purifier', 'Geyser', 'Speaker',
    ],
  },
  {
    id: 'kitchen',
    label: 'Kitchen Appliances',
    tileBg: 'copper-soft',
    tileFg: 'copper-dark',
    categories: [
      'Induction Stove', 'Pan', 'Chimney', 'Rice Pot', 'Gas Stove', 'Mixer', 'Oven',
    ],
  },
  {
    id: 'furniture',
    label: 'Furniture',
    tileBg: 'wood-soft',
    tileFg: 'wood',
    categories: [
      'TV Showcase', 'Center Table', 'Dining Table', 'Tipai', 'Bed and Cot',
      'Wooden Almirah', 'Metal Almirah', 'Computer Table', 'Plastic Chair',
      'Wooden Chair', 'Wooden Shoe Rack',
    ],
  },
];

export function categorySlug(cat) {
  return cat.toLowerCase().replace(/\s+/g, '-');
}

export function categoryImage(cat) {
  return `/images/categories/${categorySlug(cat)}.jpg`;
}

export const CATALOG_PRODUCTS = {
  'Washing Machine': [
    mkP('LG', '7 kg Fully Automatic Top Load', { Type: 'Fully Automatic Top Load', Capacity: '7 kg', Colour: 'White' }, 18990, 'Rat-away protection, 3D wash technology'),
    mkP('Samsung', '7.5 kg Fully Automatic Front Load', { Type: 'Fully Automatic Front Load', Capacity: '7.5 kg', Colour: 'Silver' }, 32990, 'Digital inverter motor, hygiene steam wash'),
    mkP('Whirlpool', '7 kg Semi Automatic Top Load', { Type: 'Semi Automatic Top Load', Capacity: '7 kg', Colour: 'Grey' }, 10990, 'Spin shower rinse, sturdy twin-tub build'),
    mkP('Lloyd', '8 kg Twin Tub', { Type: 'Twin Tub', Capacity: '8 kg', Colour: 'Blue/White' }, 11490, 'Separate wash & spin tubs for quick loads'),
    mkP('Onida', '6.5 kg Single Tub', { Type: 'Single Tub', Capacity: '6.5 kg', Colour: 'White' }, 7990, 'Compact, budget-friendly single tub'),
    mkP('Haier', '6 kg Compact Washing Machine', { Type: 'Compact Washing Machine', Capacity: '6 kg', Colour: 'White' }, 13990, 'Space-saving design for small households'),
    mkP('IFB', '8 kg Inverter Washing Machine', { Type: 'Inverter Washing Machine', Capacity: '8 kg', Colour: 'Silver' }, 28990, 'Inverter motor for lower power bills', 'On Order'),
    mkP('Bosch', '8 kg Smart Washing Machine', { Type: 'Smart Washing Machine', Capacity: '8 kg', Colour: 'White' }, 36990, 'App-controlled wash cycles, Wi-Fi enabled', 'On Order'),
  ],
  'Television': [
    mkP('Samsung', '32-inch HD Ready Smart LED TV', { Size: '32-inch', Type: 'HD Smart LED' }, 13990, 'Built-in streaming apps, slim bezel'),
    mkP('LG', '43-inch Full HD Smart TV', { Size: '43-inch', Type: 'Full HD Smart LED' }, 22990, 'WebOS smart platform, clear voice'),
    mkP('Mi', '50-inch 4K Ultra HD Smart TV', { Size: '50-inch', Type: '4K Smart LED' }, 32990, 'Dolby Vision & Atmos support'),
    mkP('Sony', '55-inch 4K Ultra HD Smart TV', { Size: '55-inch', Type: '4K Smart LED' }, 52990, 'Premium picture processor, wide viewing angle'),
  ],
  'Refrigerator': [
    mkP('Godrej', '190 L Single Door Refrigerator', { Type: 'Single Door', Capacity: '190 L' }, 14990, 'Direct cool, toughened glass shelves'),
    mkP('Samsung', '236 L Double Door Frost-Free', { Type: 'Double Door', Capacity: '236 L' }, 24990, 'Digital inverter compressor, 10-yr warranty on compressor'),
    mkP('LG', '260 L Double Door Frost-Free', { Type: 'Double Door', Capacity: '260 L' }, 27990, 'Smart inverter compressor, door cooling+'),
    mkP('Whirlpool', '340 L Side-by-Side', { Type: 'Side-by-Side', Capacity: '340 L' }, 54990, 'Large family capacity, water dispenser', 'On Order'),
  ],
  'AC': [
    mkP('Voltas', '1 Ton 3 Star Split AC', { Capacity: '1 Ton', Type: 'Split', Star: '3 Star' }, 28990, 'Copper condenser, fast cooling'),
    mkP('Blue Star', '1.5 Ton 3 Star Split AC', { Capacity: '1.5 Ton', Type: 'Split', Star: '3 Star' }, 34990, 'Turbo cool mode, dust filter'),
    mkP('Daikin', '1.5 Ton 5 Star Inverter Split AC', { Capacity: '1.5 Ton', Type: 'Inverter Split', Star: '5 Star' }, 44990, 'Lowest running cost, whisper-quiet'),
    mkP('LG', '2 Ton Window AC', { Capacity: '2 Ton', Type: 'Window', Star: '3 Star' }, 31990, 'Compact fit, easy install'),
  ],
  'Air Cooler': [
    mkP('Symphony', '70 L Desert Air Cooler', { Capacity: '70 L', Type: 'Desert Cooler' }, 10990, 'i-Pure filtration, large throw distance'),
    mkP('Bajaj', '36 L Personal Air Cooler', { Capacity: '36 L', Type: 'Personal Cooler' }, 6490, 'Compact for bedrooms, castor wheels'),
    mkP('Crompton', '50 L Tower Air Cooler', { Capacity: '50 L', Type: 'Tower Cooler' }, 8990, 'Slim footprint, honeycomb pads'),
    mkP('Orient Electric', '20 L Window Air Cooler', { Capacity: '20 L', Type: 'Window Cooler' }, 5490, 'Fixed window fit, low power draw'),
  ],
  'Fan': [
    mkP('Havells', '1200 mm Ceiling Fan', { Type: 'Ceiling Fan', Size: '1200 mm', Colour: 'Brown' }, 1990, 'High air delivery, rust-proof grill'),
    mkP('Crompton', '400 mm High Speed Table Fan', { Type: 'Table Fan', Size: '400 mm', Colour: 'White' }, 1690, '3-speed control, portable'),
    mkP('Orient Electric', '300 mm Wall Fan', { Type: 'Wall Fan', Size: '300 mm', Colour: 'White' }, 1590, 'Space-saving wall mount'),
    mkP('Usha', '450 mm Pedestal Fan', { Type: 'Pedestal Fan', Size: '450 mm', Colour: 'Grey' }, 2290, 'Adjustable height, oscillation'),
  ],
  'Inverter': [
    mkP('Luminous', '1100 VA Pure Sine Wave Inverter', { Capacity: '1100 VA' }, 6990, 'Pure sine wave output, safe for electronics'),
    mkP('Microtek', '850 VA Inverter', { Capacity: '850 VA' }, 5490, 'Compact home inverter'),
    mkP('V-Guard', '1600 VA Inverter', { Capacity: '1600 VA' }, 9990, 'Higher backup load capacity'),
    mkP('Su-Kam', '2000 VA Inverter', { Capacity: '2000 VA' }, 12990, 'For larger homes with more appliances', 'On Order'),
  ],
  'Smart Phone': [
    mkP('Samsung', 'Galaxy series, 128 GB', { Storage: '128 GB', Colour: 'Black' }, 15990, 'AMOLED display, dual camera'),
    mkP('Redmi', 'Note series, 128 GB', { Storage: '128 GB', Colour: 'Blue' }, 13990, 'Large battery, fast charging'),
    mkP('realme', 'Narzo series, 128 GB', { Storage: '128 GB', Colour: 'Green' }, 11990, 'Gaming-friendly processor'),
    mkP('Vivo', 'Y series, 128 GB', { Storage: '128 GB', Colour: 'Silver' }, 16990, 'Slim design, good low-light camera'),
  ],
  'Water Purifier': [
    mkP('Kent', 'RO + UV + UF Water Purifier', { Type: 'RO+UV+UF', Capacity: '8 L' }, 12990, 'Mineral RO technology'),
    mkP('Aquaguard', 'RO + UV Water Purifier', { Type: 'RO+UV', Capacity: '7 L' }, 10990, 'Active copper technology'),
    mkP('Livpure', 'RO Water Purifier', { Type: 'RO', Capacity: '7 L' }, 8990, 'Compact wall-mount design'),
    mkP('Pureit', 'RO + MF Water Purifier', { Type: 'RO+MF', Capacity: '6 L' }, 7990, 'Budget-friendly daily use'),
  ],
  'Geyser': [
    mkP('Racold', '15 L Storage Water Heater', { Type: 'Storage', Capacity: '15 L' }, 8990, 'Glass-lined tank, rust-proof'),
    mkP('Bajaj', '3 L Instant Water Heater', { Type: 'Instant', Capacity: '3 L' }, 2990, 'Compact, quick heating'),
    mkP('Havells', '25 L Storage Water Heater', { Type: 'Storage', Capacity: '25 L' }, 12990, 'Whole-home hot water supply'),
    mkP('V-Guard', '6 L Instant Water Heater', { Type: 'Instant', Capacity: '6 L' }, 4490, 'Wall-mount, kitchen or bath use'),
  ],
  'Speaker': [
    mkP('boAt', 'Bluetooth Party Speaker', { Type: 'Bluetooth Party Speaker' }, 3490, 'Deep bass, party lights'),
    mkP('JBL', 'Portable Bluetooth Speaker', { Type: 'Portable Bluetooth' }, 4990, 'Rich, clear JBL sound signature'),
    mkP('Zebronics', 'Home Theatre Speaker System', { Type: 'Home Theatre' }, 5990, 'Multi-speaker surround setup'),
    mkP('Sony', 'Soundbar', { Type: 'Soundbar' }, 8990, 'Sleek design, punchy bass'),
  ],
  'Induction Stove': [
    mkP('Prestige', '2000 W Induction Cooktop', { Power: '2000 W' }, 2490, 'Auto shut-off, touch panel'),
    mkP('Bajaj', '1600 W Induction Cooktop', { Power: '1600 W' }, 1990, 'Preset cooking menus'),
    mkP('Philips', '2100 W Induction Cooktop', { Power: '2100 W' }, 2990, 'Sturdy ceramic glass top'),
    mkP('Pigeon', '1800 W Induction Cooktop', { Power: '1800 W' }, 1790, 'Compact and lightweight'),
  ],
  'Pan': [
    mkP('Prestige', 'Non-Stick Frying Pan, 26 cm', { Size: '26 cm' }, 990, 'Even heat distribution'),
    mkP('Hawkins', 'Hard Anodised Fry Pan, 24 cm', { Size: '24 cm' }, 1190, 'Durable hard-anodised build'),
    mkP('Pigeon', 'Non-Stick Tawa, 28 cm', { Size: '28 cm' }, 690, 'Great for dosa and roti'),
    mkP('Wonderchef', 'Granite Non-Stick Pan, 24 cm', { Size: '24 cm' }, 1490, 'Scratch-resistant coating'),
  ],
  'Chimney': [
    mkP('Faber', '60 cm Auto-Clean Chimney', { Size: '60 cm', Type: 'Auto-Clean' }, 8990, 'Low maintenance, strong suction'),
    mkP('Elica', '90 cm Curved Glass Chimney', { Size: '90 cm', Type: 'Filterless' }, 12990, 'Wide coverage for large hobs'),
    mkP('Hindware', '60 cm Straight Line Chimney', { Size: '60 cm', Type: 'Baffle Filter' }, 6990, 'Budget-friendly everyday pick'),
    mkP('Kaff', '90 cm Island Chimney', { Size: '90 cm', Type: 'Island' }, 15990, 'For island-style kitchen counters', 'On Order'),
  ],
  'Rice Pot': [
    mkP('Prestige', '1.8 L Electric Rice Cooker', { Capacity: '1.8 L' }, 1690, 'Keep-warm function'),
    mkP('Panasonic', '2.2 L Electric Rice Cooker', { Capacity: '2.2 L' }, 2490, 'Non-stick inner pot'),
    mkP('Bajaj', '1 L Electric Rice Cooker', { Capacity: '1 L' }, 1290, 'Compact, ideal for singles'),
    mkP('Pigeon', '1.8 L Electric Rice Cooker', { Capacity: '1.8 L' }, 1490, 'Simple one-touch cooking'),
  ],
  'Gas Stove': [
    mkP('Prestige', '2 Burner Glass Top Gas Stove', { Burners: '2' }, 2490, 'Toughened glass, sturdy pan supports'),
    mkP('Sunflame', '3 Burner Gas Stove', { Burners: '3' }, 3490, 'Powder-coated body'),
    mkP('Butterfly', '4 Burner Glass Top Gas Stove', { Burners: '4' }, 4990, 'For bigger families'),
    mkP('Elica', '3 Burner Auto-Ignition Gas Stove', { Burners: '3' }, 3990, 'Auto ignition, no matchbox needed'),
  ],
  'Mixer': [
    mkP('Preethi', '750 W Mixer Grinder, 3 Jars', { Power: '750 W', Jars: '3' }, 3490, 'Powerful motor for daily grinding'),
    mkP('Bajaj', '500 W Mixer Grinder, 3 Jars', { Power: '500 W', Jars: '3' }, 2490, 'Compact and reliable'),
    mkP('Butterfly', '750 W Mixer Grinder, 4 Jars', { Power: '750 W', Jars: '4' }, 3990, 'Extra chutney jar included'),
    mkP('Philips', '500 W Mixer Grinder, 3 Jars', { Power: '500 W', Jars: '3' }, 2790, 'Advanced airflow motor'),
  ],
  'Oven': [
    mkP('Bajaj', '25 L Oven Toaster Griller', { Type: 'OTG', Capacity: '25 L' }, 3990, 'Bake, toast & grill in one'),
    mkP('Morphy Richards', '30 L Oven Toaster Griller', { Type: 'OTG', Capacity: '30 L' }, 5990, 'Larger cavity for family baking'),
    mkP('IFB', '20 L Solo Microwave Oven', { Type: 'Solo Microwave', Capacity: '20 L' }, 6990, 'Everyday reheating and cooking'),
    mkP('LG', '28 L Convection Microwave Oven', { Type: 'Convection Microwave', Capacity: '28 L' }, 10990, 'Bake, grill, and microwave combo'),
  ],
  'TV Showcase': [
    mkP('Agari Home', '4 ft Engineered Wood TV Unit', { Material: 'Engineered Wood', Size: '4 ft' }, 6990, 'Clean lines, cable-management back panel'),
    mkP('Agari Home', '5 ft TV Showcase with Storage', { Material: 'Engineered Wood', Size: '5 ft' }, 9990, 'Closed cabinets for set-top boxes'),
    mkP('Agari Home', 'Wall-Mount TV Console', { Material: 'MDF', Size: '4.5 ft' }, 7990, 'Floating design, space-saving'),
  ],
  'Center Table': [
    mkP('Agari Home', 'Sheesham Wood Center Table', { Material: 'Sheesham Wood' }, 5990, 'Solid wood grain finish'),
    mkP('Agari Home', 'Glass-Top Center Table', { Material: 'Glass + Metal' }, 6490, 'Modern living room centrepiece'),
    mkP('Agari Home', 'Engineered Wood Center Table', { Material: 'Engineered Wood' }, 3990, 'Budget-friendly everyday pick'),
  ],
  'Dining Table': [
    mkP('Agari Home', '4-Seater Dining Table Set', { Seats: '4', Material: 'Sheesham Wood' }, 16990, 'Solid wood, sturdy joinery'),
    mkP('Agari Home', '6-Seater Dining Table Set', { Seats: '6', Material: 'Engineered Wood' }, 24990, 'Great for bigger families'),
    mkP('Agari Home', '4-Seater Glass-Top Dining Set', { Seats: '4', Material: 'Glass + Metal' }, 18990, 'Contemporary look'),
  ],
  'Tipai': [
    mkP('Agari Home', 'Wooden Tipai Stool', { Material: 'Solid Wood' }, 1290, 'Compact, everyday utility stool'),
    mkP('Agari Home', 'Cushioned Tipai Stool', { Material: 'Wood + Foam' }, 1690, 'Extra comfort for longer use'),
    mkP('Agari Home', 'Folding Tipai Stool', { Material: 'Solid Wood' }, 990, 'Folds flat for easy storage'),
  ],
  'Bed and Cot': [
    mkP('Agari Home', 'Queen Size Bed without Storage', { Size: 'Queen', Material: 'Engineered Wood' }, 13990, 'Clean modern headboard'),
    mkP('Agari Home', 'King Size Storage Bed', { Size: 'King', Material: 'Sheesham Wood' }, 24990, 'Hydraulic storage underneath'),
    mkP('Agari Home', 'Single Cot', { Size: 'Single', Material: 'Solid Wood' }, 7990, "Compact for kids' or guest rooms"),
  ],
  'Wooden Almirah': [
    mkP('Agari Home', '2-Door Wooden Almirah', { Doors: '2', Material: 'Engineered Wood' }, 14990, 'Spacious hanging + shelf space'),
    mkP('Agari Home', '3-Door Wooden Almirah', { Doors: '3', Material: 'Sheesham Wood' }, 21990, 'Extra locker compartment'),
    mkP('Agari Home', '2-Door Almirah with Mirror', { Doors: '2', Material: 'Engineered Wood' }, 16990, 'Full-length mirror on one door'),
  ],
  'Metal Almirah': [
    mkP('Agari Home', 'Single Door Metal Almirah', { Doors: '1', Colour: 'Grey' }, 6490, 'Compact, sturdy steel build'),
    mkP('Agari Home', 'Double Door Metal Almirah with Locker', { Doors: '2', Colour: 'Blue' }, 9990, 'Built-in safety locker'),
    mkP('Agari Home', 'Double Door Metal Almirah', { Doors: '2', Colour: 'Cream' }, 8990, 'Rust-resistant powder coating'),
  ],
  'Computer Table': [
    mkP('Agari Home', 'Study & Computer Table', { Material: 'Engineered Wood' }, 3990, 'Simple, sturdy work desk'),
    mkP('Agari Home', 'L-Shape Computer Table', { Material: 'Engineered Wood' }, 5990, 'Extra corner workspace'),
    mkP('Agari Home', 'Compact Computer Table with Shelf', { Material: 'MDF' }, 2990, 'Built-in CPU and book shelf'),
  ],
  'Plastic Chair': [
    mkP('Agari Home', 'Plastic Armchair', { Colour: 'White' }, 890, 'Durable, weatherproof finish'),
    mkP('Agari Home', 'Plastic Chair without Arms', { Colour: 'Blue' }, 690, 'Light and stackable'),
    mkP('Agari Home', 'Stackable Plastic Chair', { Colour: 'Green' }, 590, 'Easy to store, space-saving'),
  ],
  'Wooden Chair': [
    mkP('Agari Home', 'Solid Wood Dining Chair', { Material: 'Sheesham Wood' }, 2490, 'Sturdy joinery, classic finish'),
    mkP('Agari Home', 'Cushioned Wooden Chair', { Material: 'Sheesham Wood + Foam' }, 3490, 'Extra seating comfort'),
    mkP('Agari Home', 'Wooden Armchair', { Material: 'Teak Finish' }, 3990, 'Statement piece for living rooms'),
  ],
  'Wooden Shoe Rack': [
    mkP('Agari Home', '3-Tier Wooden Shoe Rack', { Tiers: '3', Material: 'Engineered Wood' }, 1990, 'Compact entryway fit'),
    mkP('Agari Home', '5-Tier Wooden Shoe Rack', { Tiers: '5', Material: 'Engineered Wood' }, 2990, "Holds a full family's footwear"),
    mkP('Agari Home', 'Shoe Rack with Cabinet', { Tiers: '4', Material: 'MDF' }, 3990, 'Closed cabinet hides clutter'),
  ],
};

export function allCategories() {
  return Object.keys(CATALOG_PRODUCTS);
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results = [];
  for (const cat of Object.keys(CATALOG_PRODUCTS)) {
    for (const p of CATALOG_PRODUCTS[cat]) {
      if (`${p.brand} ${p.name} ${cat}`.toLowerCase().includes(q)) {
        results.push({ ...p, cat });
      }
    }
  }
  return results;
}
