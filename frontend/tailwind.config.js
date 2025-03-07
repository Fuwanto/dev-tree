/* Aunque este archivo ya no es necesario para tailwindcss v4.0, sigue siendo requerido para que la
extensión Tailwind CSS IntelliSense funcione correctamente.
*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Keyframes para animaciones
      keyframes: {
        "gradient-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        underline: {
          "0%": { backgroundPosition: "left" },
          "100%": { backgroundPosition: "right" },
        },
        "quantum-bounce": {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(-15px)", opacity: "0.5" },
        },
      },
      // Animaciones personalizadas
      animation: {
        "gradient-rotate": "gradient-rotate 60s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        underline: "underline 3s ease infinite",
        "quantum-bounce": "quantum-bounce 1s infinite ease-in-out",
      },
      // Sombras y efectos
      boxShadow: {
        glow: "0 0 20px 5px rgba(34, 211, 238, 0.15)",
        "glow-md": "0 0 30px 8px rgba(34, 211, 238, 0.2)",
        "glow-lg": "0 0 40px 10px rgba(34, 211, 238, 0.25)",
      },
    },
  },
  plugins: [],
}
