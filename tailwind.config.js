/* eslint-disable global-require */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        OpenSans: ['Open Sans', 'sans-serif'],
        DancingScript: ['Dancing Script', 'cursive'],
        PlayfairDisplay: ['Playfair Display', 'serif'],
      },
      colors: {
        blacklight: '#171722',
        blueSage: '#67E5D0',
        grayMirage: '#32323D',
        orangeLight: '#FDAF75',
        yellowLight: '#EAEA7F',
        roseLight: '#F24A72',
        blueDark: '#333C83',
      },
    },
  },
  important: '#root',
  plugins: [require('daisyui')],
};
