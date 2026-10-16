/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── brand palette ── */
        paper: '#EEF0E6',
        panel: '#FBFBF5',
        'panel-2': '#F2F1E7',
        ink: '#1C2B2A',
        'ink-soft': '#48594F',
        'ink-faint': '#8B9389',
        copper: '#C1692B',
        'copper-dark': '#8F4E20',
        'copper-soft': '#F3E3D3',
        trace: '#2E6B58',
        'trace-soft': '#E3EEE7',
        'trace-dark': '#1E4A3D',
        wood: '#8A5A2B',
        'wood-soft': '#EFE1CB',
        steel: '#5C6D66',
        'steel-soft': '#E7ECE8',
        line: '#D9DACB',
        error: '#B3261E',
        'error-bg': '#FBEAE8',
        /* ── premium gold accent ── */
        gold: '#E8A657',
        'gold-light': '#F0C989',
        'gold-soft': '#FDF3E3',
        /* ── deep green brand ── */
        'green-deep': '#0B1613',
        'green-mid': '#132521',
        cream: '#F5F1E6',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(28,43,42,.07), 0 1px 1px rgba(28,43,42,.05)',
        md: '0 18px 40px -18px rgba(28,43,42,.35)',
        lg: '0 32px 64px -24px rgba(28,43,42,.45)',
        'glow-copper': '0 18px 40px -16px rgba(193,105,43,.5)',
        'glow-trace': '0 18px 40px -16px rgba(46,107,88,.4)',
        'glow-gold': '0 12px 32px -10px rgba(232,166,87,.55)',
        card: '0 4px 24px -4px rgba(28,43,42,.12)',
        'card-hover': '0 16px 40px -8px rgba(28,43,42,.22)',
        glass: '0 8px 32px rgba(28,43,42,.12), inset 0 1px 0 rgba(255,255,255,.6)',
      },
      backgroundImage: {
        'grad-copper': 'linear-gradient(135deg,#DA8C48 0%, #8F4E20 100%)',
        'grad-ink': 'linear-gradient(160deg,#24403A 0%, #1C2B2A 70%)',
        'grad-gold': 'linear-gradient(120deg,#F0C989 10%,#DA8C48 90%)',
        'grad-trace': 'linear-gradient(135deg,#3D8A70 0%, #1E4A3D 100%)',
        'grad-hero': 'linear-gradient(180deg,rgba(9,17,15,.74) 0%,rgba(9,17,15,.42) 42%,rgba(9,17,15,.88) 100%)',
        'grad-card': 'linear-gradient(135deg,rgba(255,255,255,.08) 0%,rgba(255,255,255,0) 100%)',
      },
      maxWidth: {
        container: '1180px',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulse: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        cartBump: {
          '0%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.55)' },
          '100%': { transform: 'scale(1)' },
        },
        bannerSlide: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '20%': { transform: 'translateY(0)', opacity: '1' },
          '25%': { transform: 'translateY(-100%)', opacity: '0' },
          '30%': { transform: 'translateY(100%)', opacity: '0' },
          '35%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        fadeIn: 'fadeIn .22s ease forwards',
        slideUp: 'slideUp .35s cubic-bezier(.16,.8,.24,1) forwards',
        slideDown: 'slideDown .22s ease forwards',
        slideInRight: 'slideInRight .28s cubic-bezier(.16,.8,.24,1) forwards',
        scaleIn: 'scaleIn .22s ease forwards',
        shimmer: 'shimmer 1.8s linear infinite',
        pulse: 'pulse 2s cubic-bezier(.4,0,.6,1) infinite',
        cartBump: 'cartBump .35s cubic-bezier(.36,1.8,.4,1)',
      },
    },
  },
  plugins: [],
};
