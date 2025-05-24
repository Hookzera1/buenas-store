/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      perola: "#EFEAE1",    // cor clara perolada
        marrom: "#5C4033",    // cor marrom escura
        verde: "#3B7D4B",     // cor de sucesso
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  
  plugins: [],
};
