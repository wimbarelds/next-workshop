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
        transparent: colors.transparent,
        gray: colors.slate,
        black: colors.black,
        white: colors.white,
        // state
        success: colors.green,
        error: colors.red,
        warn: colors.yellow,
        info: colors.sky,
        // brand
        brand: colors.orange,
        primary: colors.orange,
        accent: colors.cyan,
      },
    },
  },
};

export default config;
