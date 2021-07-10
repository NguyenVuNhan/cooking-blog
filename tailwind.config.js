const materialColors = require('./material-color');

module.exports = {
  mode: 'jit',
  prefix: '',
  purge: {
    content: ['**/*.html', '**/*.tsx', './apps/frontend/safelist.txt'],
  },
  darkMode: 'class',
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      transparent: 'transparent',
      ...materialColors,
    },
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/aspect-ratio')],
};
