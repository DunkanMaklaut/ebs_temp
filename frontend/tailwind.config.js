/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./app/**/*.{html,js,ts,jsx,tsx}",
    "./app/login/*.{html,js,ts,jsx,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        "dark-gray": "#292933",
        "primary-background": "#F6F7F8",
        "secondary-background": "#FFFFFF",
        "primary-text": "#121212",
        "secondary-text": "#838C98",
        "primary-line": "#1ED760",
        "secondary-line": "rgba(0, 0, 0, 0.3)",
        "element-background": "#F6F7F8",
        "element-text": "#000000",
        "primary-button": "#4285f4",
        "primary-button-text": "#FFFFFF",
        "secondary-button": "#292933",
        "secondary-button-text": "#FFFFFF"
    }
  },
  },
  plugins: [],
}

