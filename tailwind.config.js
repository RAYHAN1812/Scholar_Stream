/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // enables dark mode using 'class'
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: '#2563eb',      // Main blue
        secondary: '#3b82f6',    // Hover/Accent blue

        // UI Colors
        background: '#f9fafb',   // Soft gray background
        card: '#ffffff',          // White card background
        textPrimary: '#1f2937',   // Dark slate text
        textMuted: '#4b5563',     // Muted gray text
        borderColor: '#e5e7eb',   // Light border

        // Dark mode text overrides
        textPrimaryDark: '#ffffff', // White text for dark backgrounds
        textMutedDark: '#d1d5db',   // Lighter muted text for dark backgrounds

        // Error / Alert colors
        error: '#dc2626',          // red-600
        success: '#16a34a',        // green-600
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
