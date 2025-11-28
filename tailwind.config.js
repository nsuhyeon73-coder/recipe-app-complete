/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#f3bf0f',
          500: '#d4a106',
          600: '#b58900',
          700: '#92670a',
          800: '#78530f',
          900: '#633f10',
        },
        wine: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#aa1f4a',
          600: '#9d174d',
          700: '#831843',
          800: '#6b1739',
          900: '#581632',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
