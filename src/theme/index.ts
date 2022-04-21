import { extendTheme } from '@chakra-ui/react'
import { transparentize } from '@chakra-ui/theme-tools'

const colors = {
  brand: {
    900: '#22262D',
    800: '#2A2E35',
    700: '#F0F8FF',
  },
  green: {
    900: '#317D6C',
    800: '#27B18A',
    700: '#2ECCA0',
  },
}

const fonts = {
  heading: 'Montserrat, sans-serif',
  body: 'Montserrat, sans-serif',
}

const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  '4xl': '2.5rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
}

const letterSpacings = {
  tightest: '-0.05rem',
  tighter: '0',
  tight: '0.015rem',
  normal: '0.05rem',
  wide: '0.075rem',
  wider: '0.09375rem',
  widest: '0.125rem',
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const components = {
  Button: {
    variants: {
      primary: ({ theme }) => ({
        color: 'brand.700',
        bgGradient: 'linear(to-r, green.800, green.900)',
        boxShadow: `0 0 0.5rem ${transparentize('green.800', 0.32)(theme)}`,
        borderRadius: 8,
        fontSize: 'md',
        letterSpacing: 'tighter',
        lineHeight: 6,
        px: 6,
        py: 2.5,
        textAlign: 'center',
        _hover: {
          bgGradient: `linear(to-r, ${transparentize('green.800', 0.85)(theme)},${transparentize(
            'green.900',
            0.85,
          )(theme)})`,
          boxShadow: `0 0 0.5rem ${transparentize('green.800', 0.32)(theme)}`,
          _disabled: {
            background: transparentize('brand.700', 0.24)(theme),
            color: transparentize('brand.700', 0.24)(theme),
            boxShadow: 'none',
          },
        },
        _disabled: {
          background: transparentize('brand.700', 0.24)(theme),
          color: transparentize('brand.700', 0.24)(theme),
          opacity: 1,
        },
      }),
      secondary: ({ theme }) => ({
        backgroundColor: transparentize('brand.700', 0.32)(theme),
        color: 'brand.700',
        fontWeight: 'bold',
        px: 6,
        py: 2.5,
        _hover: {
          backgroundColor: transparentize('brand.700', 0.24)(theme),
        },
      }),
      ghost: {
        color: 'green.800',
        fontWeight: 'bold',
        fontSize: ['sm', 'md'],
        h: 0,
        p: 0,
        _hover: {
          bgColor: 'transparent',
          color: 'green.700',
        },
        _focus: {
          boxShadow: 'none',
        },
      },
    },
  },
  Divider: {
    baseStyle: {
      bgColor: 'brand.700',
      opacity: 0.12,
    },
  },
  Heading: {
    variants: {
      h1: {
        color: 'brand.700',
        fontSize: ['4xl', '6xl', '6xl'],
        letterSpacing: ['wider', 'widest'],
      },
      h2: {
        color: 'brand.700',
        fontSize: ['3xl', '5xl', '5xl'],
        letterSpacing: ['wide', 'wider'],
      },
      h3: {
        color: 'brand.700',
        fontSize: ['sm', 'md', 'md'],
        fontWeight: 'medium',
      },
    },
  },
  Link: {
    baseStyle: {
      color: 'green.800',
    },
  },
  Modal: {
    parts: ['content'],
    defaultProps: {
      variant: 'default',
    },
    variants: {
      default: {
        dialog: {
          bgColor: 'brand.900',
          w: ['90%', '100%'],
        },
        header: {
          color: 'brand.700',
          fontSize: ['xl', '2xl'],
          fontWeight: 'bold',
          lineHeight: 8,
          mt: 4,
          textAlign: 'center',
        },
      },
    },
  },
  Text: {
    variants: {
      modalDescription: {
        color: 'brand.700',
        fontSize: 'xs',
        fontWeight: 'medium',
        letterSpacing: 'tight',
        lineHeight: 4,
        mb: 4,
        opacity: 0.64,
        textAlign: 'center',
      },
      modalTitle: {
        color: 'brand.700',
        fontSize: ['xl', '2xl'],
        fontWeight: 'bold',
        letterSpacing: 'tight',
        lineHeight: 8,
        textAlign: 'center',
      },
    },
  },
}

const theme = extendTheme({ colors, config, components, fonts, fontSizes, letterSpacings })

export default theme
