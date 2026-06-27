/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        publicBlue: {
          50: "#eef7ff",
          100: "#d9ecff",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          900: "#172554",
        },
        civic: {
          mint: "#0f766e",
          amber: "#b45309",
          red: "#b91c1c",
          ink: "#152033",
        },
      },
      boxShadow: {
        soft: "0 12px 30px rgba(29, 78, 216, 0.12)",
      },
    },
  },
  plugins: [],
};
