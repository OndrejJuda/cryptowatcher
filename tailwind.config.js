/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eerie': {
          DEFAULT: '#0f1624',
          50: '#e7e8e9',
          100: '#b7b9bd',
          200: '#878b92',
          300: '#575c66',
          400: '#272d3a',
          500: '#0f1624',
          600: '#0e1420',
          700: '#0b0f19',
          800: '#080b12',
          900: '#04070b',
        }
      }
    },

  },
  plugins: [],
  darkMode: 'class',
}
