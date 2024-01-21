import typographyPlugin from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./*.html', './src/**/*.{ts,tsx}'],
  plugins: [typographyPlugin],
};

export default config;
