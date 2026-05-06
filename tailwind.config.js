/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green:        '#166152',
          'green-dark': '#0D3D32',
          'green-deep': '#092B23',
          'green-mid':  '#1E8066',
          'green-light':'#22A98A',
          'green-pale': '#E8F4F1',
          gray:         '#F5F8F7',
          'gray-mid':   '#7A9690',
          'gray-dark':  '#2E4A44',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Sora"', 'sans-serif'],
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'progress': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out both',
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
        'slide-in-left': 'slide-in-left 0.6s ease-out both',
        'progress': 'progress linear both',
      },
    },
  },
  plugins: [],
}