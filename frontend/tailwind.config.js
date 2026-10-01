/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#08090D",
        card: "#111318",
        card2: "#15171D",
        border: "#24262D",
        muted: "#8A8F98",
        primary: {
          DEFAULT: "#7C5CFC",
          blue: "#4E7CFF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #7C5CFC 0%, #4E7CFF 100%)",
      },
      boxShadow: {
        soft: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
