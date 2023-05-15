/* @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "5rem",
        xl: "5rem",
      },
    },
  },
  plugins: [],
}

