import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

const primary = '#3AAFA9'
const secondary = '#2B7A78'
const dark = '#17252A'
const light = '#DEF2F1'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: primary,
        secondary: secondary,
        dark: dark,
        light: light,
        black: colors.black,
        white: colors.white,
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          300: '#d9dAE8',
          500: '#999AA4',
          600: '#66676E',
          700: '#39393F',
          800: '#242529',
          900: '#191B1F',
          950: '#101215',
        },
      },
      extend: {
        spacing: {
          0.5: '0.12rem',
          13: '3.25rem',
          23: '5.75rem',
          25: '6.25rem',
          124: '31rem',
          layout: '2.75rem',
        },
        fontSize: {
          '2lg': '1.38rem',
          ssm: '0.038rem',
        },
        borderRadius: {
          image: '0.5rem',
          layout: '0.8rem',
        },
        transitionTimingFunction: {
          DEFAULT: 'easy-in-out',
        },
        transitionDuration: {
          DEFAULT: '200ms',
        },
        zIndex: {
          1: '1',
          2: '2',
          3: '3',
          4: '4',
          5: '5',
          6: '6',
        },
        keyframes: {
          fade: {
            from: { opacity: '0' },
            to: { opacity: '1' },
          },
          swapWidth: {
            from: { width: '0px' },
            to: { width: '100%' },
          },
          swapLeft: {
            from: { left: '-100%' },
            to: { left: '100%' },
          },
          display: {
            '0%': { display: 'none' },
            '90%': { display: 'none' },
            '100%': { display: 'block' },
          },
          scaleIn: {
            '0%': {
              transform: 'scale(1)',
            },
            '50%': {
              opacity: '0.3',
            },
            '100%': {
              transform: 'scale(1)',
            },
          },
        },
      },
      animation: {
        fade: 'fade .5s ease-in-out',
        display: 'display .7s ease-in-out',
        swapWidth: 'swapWidth .25s ease-in-out',
        swapLeft: 'swapWidth .25s ease-in-out',
        scaleIn: 'scaleIn .56s ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    plugin(
       ({
          addComponents,
          theme,
          addUtilities,
        }: {
         addComponents: any
         theme: any
         addUtilities: any
       }) => {
         addComponents({
           '.btn-primary': {
             backgroundColor: theme('colors.secondary'),
             color: theme('colors.white'),
             borderRadius: '0.65rem',
             transition: 'background-color .3s easy-in-out',
             '&:hover': {
               backgroundColor: theme('colors.secondary'),
             },
           },
           '.text-link': {
             textUnderlineOffset: 4,
             color: 'rgba(255, 255, 255, .9)',
             transition: 'text-decoration-color .3s ease-in-out',
             textDecorationLine: 'underline',
             textDecorationColor: 'rgba(255, 255, 255, .2)',
             '&:hover': {
               textDecorationColor: 'rgba(255, 255, 255, .9)',
             },
           },
           '.air-block': {
             borderRadius: theme('borderRadius.layout'),
             backgroundColor: theme('colors.gray.950'),
             color: theme('colors.white'),
             boxShadow: theme('boxShadow.layout'),
           },
           '.air-mondegreen': {
             boxShadow: '4px 4px rgba(0, 98, 90, 0.4), 8px 8px rgba(0, 98, 90, 0.3), 12px 12px rgba(0, 98, 90, 0.2), 16px 16px rgba(0, 98, 90, 0.1), 20px 20px rgba(0, 98, 90, 0.05)'
           },
         })
         addUtilities({
           '.text-shadow': {
             textShadow: '1px 1px ' + 'rgba(0, 0, 0, 0.4)',
           },
           
           '.text-lighting': {
             textShadow: '1px 1px ' + 'rgba(55, 205, 205, 0.4)',
           },
           
           '.outline-border-none': {
             outline: 'none',
             border: 'none',
           },
           
           '.flex-center-between': {
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'space-between',
           },
           
           '.image-like-bg': {
             objectPosition: 'center',
             objectFit: 'cover',
             pointerEvents: 'none',
           },
         })
       }
    ),
  ],
} satisfies Config;

export default config;