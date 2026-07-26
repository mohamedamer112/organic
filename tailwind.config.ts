import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        olive: "#556B2F",
        oliveDark: "#3D4F2A",
        cream: "#F5F5DC",
        terracotta: "#CD5C5C",
        terracottaDark: "#B54545",
        terracottaDarker: "#9E3B3B",
        wheat: "#D2B48C",
        charcoal: "#36454F",
        whatsapp: "#25D366",
        whatsappDark: "#1DA851",
        softbrown: "#8B7355",
        border: "#E8E0D0",
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
        tajawal: ["var(--font-tajawal)", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        btn: "12px",
        input: "10px",
        pill: "50px",
        badge: "6px",
      },
      keyframes: {
        bounce_cart: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        bounce_cart: "bounce_cart 0.4s ease-in-out",
        marquee: "marquee 30s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
