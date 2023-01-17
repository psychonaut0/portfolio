/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "sans": ['Raleway'],
        "mono": ['IBM Plex Mono'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
