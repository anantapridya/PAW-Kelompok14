/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ['Poppins', 'sans-serif'],
        'heading': ['Poppins'],
      },
      colors: {
        'biru-tua': '#3F65FF',
        'biru-sedang': '#5FDFFF',
        'biru-muda': '#B2FCFF',
        'putih': '#ECFCFF'
      }
    },
  },
  plugins: [],
}