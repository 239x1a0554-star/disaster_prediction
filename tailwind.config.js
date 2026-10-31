/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: {
          900: '#061121',
          800: '#0B1F3A', // Primary background
          700: '#112D55',
          600: '#173B70',
        },
        skyBlue: {
          500: '#38BDF8', // Accent
          400: '#7DD3FC',
        },
        glass: 'rgba(255, 255, 255, 0.05)',
        glassBorder: 'rgba(255, 255, 255, 0.1)',
      },
      borderRadius: {
        'xl': '16px', // 16px rounded cards
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'md': '10px',
      }
    },
  },
  plugins: [],
}
