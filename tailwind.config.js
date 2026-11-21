/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '0px',
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
    },
    extend: {
      colors: {
        navy: {
          900: '#0B1A36',
          700: '#12244A',
          100: '#E3EAF5',
        },
        teal: {
          500: '#00B4C8',
          50: '#E6F7FA',
        },
        blue: {
          600: '#1F5FA8',
        },
        'bg-light': '#F2F6FC',
        surface: '#FFFFFF',
        border: '#D5DEEA',
        'text-muted': '#5A6B85',
        red: {
          600: '#D93A3A',
        },
        amber: {
          500: '#E8A317',
          50: '#FFF6E0',
        },
        green: {
          600: '#2E9E5B',
        },
        // Command theme tokens
        command: {
          bg: '#0B1A36',
          surface: '#13284F',
          border: '#24406E',
          text: '#E8EFFA',
          muted: '#9FB3D1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Telugu', 'Noto Sans Devanagari', 'sans-serif'],
      },
      fontSize: {
        display: ['40px', { lineHeight: '44px', fontWeight: '700' }],
        h1: ['32px', { lineHeight: '38px', fontWeight: '700' }],
        h2: ['24px', { lineHeight: '30px', fontWeight: '600' }],
        h3: ['20px', { lineHeight: '26px', fontWeight: '600' }],
        body: ['16px', { lineHeight: '24px', fontWeight: '400' }],
        small: ['14px', { lineHeight: '20px', fontWeight: '500' }],
        micro: ['12px', { lineHeight: '16px', fontWeight: '600', letterSpacing: '0.04em' }],
      },
      borderRadius: {
        chip: '999px',
        btn: '12px',
        input: '10px',
        card: '16px',
        sheet: '24px',
        hero: '20px',
      },
      boxShadow: {
        e1: '0 1px 2px rgba(11,26,54,.06)',
        e2: '0 8px 24px rgba(11,26,54,.10)',
        e3: '0 16px 40px rgba(11,26,54,.18)',
      },
    },
  },
  plugins: [],
}
