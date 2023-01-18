/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class'],
  theme: {
    
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
}