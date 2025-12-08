/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e6ecff',
          200: '#c7d9ff',
          300: '#a8c7ff',
          400: '#7aa3ff',
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3',
          800: '#312e81',
          900: '#1e1b4b',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
        'card-light': '#ffffff',
        'card-dark': '#1f2937',
        'background-light': '#f9fafb',
        'background-dark': '#111827',
        'text-secondary-light': '#6b7280',
        'text-secondary-dark': '#d1d5db',
        'border-light': '#e5e7eb',
        'border-dark': '#374151',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        'gradient-accent': 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
        'gradient-warm': 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
        'gradient-cool': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(79, 70, 229, 0.3)',
        'glow-lg': '0 0 40px rgba(79, 70, 229, 0.4)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};