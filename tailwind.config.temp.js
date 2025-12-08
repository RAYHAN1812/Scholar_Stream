/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class', // enables dark: variants
  theme: {
    extend: {
      colors: {
        // ... (Your color definitions are correct)
        'card-light': '#f9f9f9',
        'card-dark': '#1e1e1e',

        'background-light': '#f3f4f6',
        'background-dark': '#1f2937',

        'text-secondary-light': '#666',
        'text-secondary-dark': '#ccc',

        'border-light': '#e5e7eb',
        'border-dark': '#333',

        'primary': '#4f46e5',
      },
    },
  },
  plugins: [
    require("daisyui"), // Make sure you have run 'npm install daisyui'
  ],
};
