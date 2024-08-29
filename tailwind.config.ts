import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1.25s infinite',
      },
      backgroundColor: {
        'white-opacity-24': 'rgba(255, 255, 255, 0.24)',
      },
      backgroundImage: {
        'custom-intro-mobile-img':
          "linear-gradient(0deg, rgba(247, 247, 247, 0.00) 0.06%, #F7F7F7 56.06%), url('/images/miningFlowCoverMobile.webp')",
        'custom-gradient-rightpanel':
          'linear-gradient(180deg, rgba(255, 108, 21, 0.12) 0%, rgba(255, 108, 21, 0.04) 63.36%, rgba(255, 108, 21, 0.06) 100%)',
        'custom-gradient-explorer':
          'linear-gradient(230deg, rgba(255, 108, 21, 0.13) 0%, rgba(255, 108, 21, 0.03) 53.36%, rgba(255, 108, 21, 0.02) 100%)',
      },
      boxShadow: {
        'custom-inset': 'inset 0px 0px 4px 0px rgba(255, 255, 255, 0.48)',
        'custom-intro': '0px 1px 3px 0px rgba(0, 2, 2, 0.08)',
        'custom-claim-assets': '0px 1px 2px 0px rgba(10, 10, 10, 0.04)',
        'custom-rightpanel':
          '0px 2px 2px 0px rgba(10, 10, 10, 0.04), 0px 8px 16px -4px rgba(10, 10, 10, 0.04)',
      },
      colors: {
        orange: {
          970: '#C73807',
          950: '#FF6C15',
        },
        red: {
          warning: '#E11D48',
        },
        slate: {
          50: '#F7F7F7',
          100: '#E5E6E6',
          200: '#CCCCCC',
          300: '#B2B3B3',
          400: '#999A9A',
          500: '#808080',
          600: '#666767',
          700: '#4D4E4E',
          800: '#333535',
          900: '#1A1B1B',
          950: '#000202',
        },
      },
      gridTemplateColumns: {
        '3-column-layout': '1fr 680px 1fr',
      },
      width: {
        '540': '540px',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
}
export default config
