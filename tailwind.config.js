// tailwind.config.js
const { tailwindConfig } = require('@storefront-ui/react/tailwind-config');
import sfTypography from '@storefront-ui/typography';

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindConfig],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@storefront-ui/react/**/*.{js,mjs,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [sfTypography],
};
