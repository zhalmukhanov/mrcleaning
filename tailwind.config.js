/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      width: {
         '1/8': '23.62%',
         '2/8': '23.33%',
         '3/8': '22.61%',
         '4/8': '22.94%',
         '5/8': '32%',
         '6/8': '47%',
      }
    }
  },
  plugins: [],
}
