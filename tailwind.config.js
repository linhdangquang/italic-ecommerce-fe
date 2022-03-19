/* eslint-disable global-require */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        OpenSans: ['Open Sans', 'sans-serif'],
        DancingScript: ['Dancing Script', 'cursive'],
      },
      colors: {
        blacklight: '#171722',
        blueSage: '#67E5D0',
        grayMirage: '#32323D',
      },
    },
  },
  plugins: [require('daisyui')],
};
