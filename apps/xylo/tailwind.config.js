const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

module.exports = {
  purge: createGlobPatternsForDependencies(__dirname),
  darkMode: 'class',
  theme: {
    extend: {
        fontFamily: {
            sans: ['MarkPro', 'sans-serif'],
        },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};