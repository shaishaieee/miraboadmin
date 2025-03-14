 /** @type {import('tailwindcss').Config} */
 export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
          fontFamily: {
            sans: ['Poppins', 'sans-serif'],
          },
          screens: {
            'xs': '300px',    
          },
    },
  },
  plugins: [],
}