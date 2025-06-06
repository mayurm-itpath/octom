/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': 'white',
        'black': 'black',
        'blue': '#2563eb',
        'red': '#ef4444'
      }
    },
  },
  plugins: [],
}
