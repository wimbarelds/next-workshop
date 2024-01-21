import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: ['./*.html', './src/**/*.{ts,tsx}'],
  plugins: [typographyPlugin, formsPlugin],
  theme: {
    extend: {
      colors: {
        // Generic colors
        inherit: 'inherit',
        current: 'currentColor',
        gray: colors.slate,
      },
      animation: {
        fade: 'fadeIn .3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
};

export default config;
