const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

module.exports = {
  purge: createGlobPatternsForDependencies(__dirname),
  darkMode: 'class',
  theme: {
    extend: {
        fontFamily: {
            sans: ['MarkPro', 'sans-serif'],
        },
        colors: {
          teal: '#35D0BA',
          blue: '#041549',
          duckegg: '#00CFBD',
          lightblue: '#00C1E8',
          gray: '#F3F4F6',
          darkgray: '#374151'
        }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};