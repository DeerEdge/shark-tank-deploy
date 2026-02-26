/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#F7DCE5",
        rose: "#F3B6C6",
        petal: "#FBEFF3",
        berry: "#A14664",
        cacao: "#5A3B3E",
        pearl: "#FFF9FB",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Work Sans", "sans-serif"],
      },
      boxShadow: {
        glow: "0 18px 45px rgba(171, 96, 118, 0.18)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        fadeUp: "fadeUp 0.6s ease-out",
      },
    },
  },
  plugins: [],
};
