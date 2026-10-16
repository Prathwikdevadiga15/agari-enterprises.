// Lightweight inline SVG icons (stroke-based, matches the original site style).
// Keeping these as plain SVG avoids an extra icon-library dependency.

function Icon({ children, className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      {children}
    </svg>
  );
}

export const Phone = (p) => (
  <Icon {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </Icon>
);

export const ShoppingCart = (p) => (
  <Icon {...p}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </Icon>
);

export const Search = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </Icon>
);

export const Menu = (p) => (
  <Icon {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </Icon>
);

export const X = (p) => (
  <Icon {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Icon>
);

export const Wrench = (p) => (
  <Icon {...p}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </Icon>
);

export const ShoppingBag = (p) => (
  <Icon {...p}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
  </Icon>
);

export const MapPin = (p) => (
  <Icon {...p}>
    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

export const ShieldCheck = (p) => (
  <Icon {...p}>
    <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
    <path d="M9 12l2 2 4-4" />
  </Icon>
);

export const Truck = (p) => (
  <Icon {...p}>
    <path d="M3 12l2-2 7-7 7 7 2 2" />
    <path d="M5 10v10h14V10" />
  </Icon>
);

export const Clock = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </Icon>
);

export const Tv = (p) => (
  <Icon {...p}>
    <rect x="2.5" y="4" width="19" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </Icon>
);

export const Fridge = (p) => (
  <Icon {...p}>
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M5 9h14M8 5.5h.01M8 12.5h.01" />
  </Icon>
);

export const WashingMachine = (p) => (
  <Icon {...p}>
    <rect x="3" y="2.5" width="18" height="19" rx="2" />
    <circle cx="12" cy="14" r="5.2" />
    <circle cx="12" cy="14" r="1.6" />
  </Icon>
);

export const Snowflake = (p) => (
  <Icon {...p}>
    <rect x="2.5" y="6" width="19" height="8" rx="2" />
    <path d="M6 17l-1.5 3M18 17l1.5 3M12 14v3" />
  </Icon>
);

export const Microwave = (p) => (
  <Icon {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <rect x="5" y="7.5" width="11" height="9" rx="1" />
    <path d="M19 8h.01M19 11h.01" />
  </Icon>
);

export const Blender = (p) => (
  <Icon {...p}>
    <path d="M8 3h8l-1.5 10h-5L8 3z" />
    <path d="M8.5 13h7l-.7 5a2 2 0 0 1-2 1.7h-1.6a2 2 0 0 1-2-1.7l-.7-5z" />
    <path d="M10 21h4" />
  </Icon>
);

export const HelpCircle = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12h8M12 8v8" />
  </Icon>
);

export const CheckCircle = (p) => (
  <Icon {...p} strokeWidth="3">
    <path d="M20 6L9 17l-5-5" />
  </Icon>
);

export const Bolt = (p) => (
  <Icon {...p}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
  </Icon>
);

export const Award = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="5" />
    <path d="M8.5 12.5 7 22l5-3 5 3-1.5-9.5" />
  </Icon>
);

export const ChevronLeft = (p) => (
  <Icon {...p}>
    <path d="M15 18l-6-6 6-6" />
  </Icon>
);

export const ChevronRight = (p) => (
  <Icon {...p}>
    <path d="M9 18l6-6-6-6" />
  </Icon>
);

export const Star = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={p.className || 'w-5 h-5'}>
    <path d="M12 2l2.9 6.4 7 .6-5.3 4.6 1.6 6.9L12 16.9l-6.2 3.6 1.6-6.9L2 8.9l7-.6L12 2z" />
  </svg>
);

export const StarOutline = (p) => (
  <Icon {...p} strokeWidth="1.5">
    <path d="M12 2l2.9 6.4 7 .6-5.3 4.6 1.6 6.9L12 16.9l-6.2 3.6 1.6-6.9L2 8.9l7-.6L12 2z" />
  </Icon>
);

export const MessageCircle = (p) => (
  <Icon {...p}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </Icon>
);

export const Send = (p) => (
  <Icon {...p}>
    <path d="m22 2-7 20-4-9-9-4 20-7z" />
  </Icon>
);

export const Mail = (p) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Icon>
);

export const AlertCircle = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v5M12 16h.01" />
  </Icon>
);

export const Minus = (p) => (
  <Icon {...p}>
    <path d="M5 12h14" />
  </Icon>
);

export const Plus = (p) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const Trash = (p) => (
  <Icon {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Icon>
);
