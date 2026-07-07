import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { colors: { captain: { dark: '#1a1a1a', light: '#ffffff', accent: '#0066cc', success: '#22c55e' } } } },
  plugins: [],
  darkMode: 'class',
};
export default config;
