/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./scr/**/*.{html,js, jsx, ts, tsx}",
    "./app/**/*.{html,js,ts,jsx,tsx}",
    "./app/login/*.{html,js,ts,jsx,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
      darkGray: '#292933',
    }
  },
  },
  plugins: [],
}

