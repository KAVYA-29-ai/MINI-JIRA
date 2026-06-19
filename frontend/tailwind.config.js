/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    '../src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#1d2633',
          875: '#16202b'
        },
        indigo: {
          650: '#4f46e5'
        }
      },
      boxShadow: {
        soft: '0 24px 80px rgba(15, 23, 42, 0.32)'
      }
    }
  },
  plugins: []
}
