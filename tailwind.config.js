/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        roadmapBadgeGlow: {
          '0%, 100%': {
            opacity: '0.85',
            boxShadow: '0 0 18px rgba(56, 189, 248, 0.12), 0 0 36px rgba(20, 184, 166, 0.06)',
          },
          '50%': {
            opacity: '1',
            boxShadow: '0 0 26px rgba(56, 189, 248, 0.22), 0 0 48px rgba(20, 184, 166, 0.1)',
          },
        },
      },
      animation: {
        'roadmap-badge': 'roadmapBadgeGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
