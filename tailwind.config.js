module.exports = {
  mode: 'jit',
  prefix: '',
  purge: {
    content: ['**/*.html', '**/*.tsx', './apps/frontend/safelist.txt'],
  },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
