/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0C2234',
        secondary: '#31555B',
        accent: '#E3CB7D',
        light: '#E4E2DD',
      },
    },
  },
  plugins: [],
}
