// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./app/**/*.tsx'],
  darkMode: false,
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      }
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
