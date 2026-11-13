/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./national-debt/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        uknavy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
          950: '#071829',
        },
        ukred: {
          500: '#cf102d',
          600: '#a60a22',
        }
      }
    },
  },
  plugins: [],
}

