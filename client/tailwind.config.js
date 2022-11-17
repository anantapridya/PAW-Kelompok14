/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'fold': '280px'
      },
      fontFamily: {
        'body': ['Poppins', 'sans-serif'],
        'heading': ['Poppins'],
      },
      fontSize: {
        '2xs': '9px'
      },
      colors: {
        'biru-tua': '#3F65FF',
        'biru-sedang': '#5FDFFF',
        'biru-muda': '#B2FCFF',
        'putih': '#ECFCFF'
      },
      boxShadow: {
        '3xl': '0px 4px 4px rgba(0, 0, 0, 0.25)',
        '4xl': '-3px 25px 25px 5px rgba(63,101,255,0.1)',
        '5xl': '0 0 10px 5px rgba(63,101,255,0.2)',
        '6xl': '5px 8px 25px 5px rgba(63,101,255,0.1)'
      },
      dropShadow: {
        '3xl': '0px 0px 5px rgba(63, 101, 255, 0.4)',
        '4xl': '2px 3px 2px rgba(63, 101, 255, .4)'
      },
      gridTemplateColumns: {
        'desc-page': '1fr 600px'
      },
      gridTemplateRows: {
        'desc-page': '1fr'
      }
    },
  },
  plugins: [],
}