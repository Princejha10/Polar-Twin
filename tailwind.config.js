/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        polar: {
          bg: '#080D12',
          surface: '#0C1218',
          card: '#101820',
          'card-sec': '#121B23',
          'card-hover': '#16222C',
          border: 'rgba(190, 205, 215, 0.10)',
          'border-hover': 'rgba(190, 205, 215, 0.20)',
          accent: '#7895A8',
          'accent-sec': '#7F9FA5',
          'text-primary': '#E4E8EB',
          'text-secondary': '#9AA7B1',
          'text-muted': '#687681',
          normal: '#7D9B83',
          warning: '#B29A6A',
          critical: '#A87575',
          info: '#7895A8'
        }
      },
      boxShadow: {
        'subtle': '0 4px 20px 0 rgba(0, 0, 0, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      borderRadius: {
        'card': '10px',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Space Mono', 'ui-monospace', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 220ms ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
