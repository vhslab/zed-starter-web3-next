import { extendTheme } from '@chakra-ui/react'

// Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#22262D',
    800: '#2A2E35',
    700: '#F0F8FF',
  },
  green: {
    900: '#27B18A',
    800: '#2ECCA0',
  },
}

const fonts = {
  heading: 'Montserrat, sans-serif',
  body: 'Montserrat, sans-serif',
}

// Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const components = {
  Button: {
    variants: {
      ghost: {
        color: 'green.900',
        fontWeight: '700',
        my: 2,
        p: 0,
        _hover: {
          bgColor: 'transparent',
          color: 'green.800',
        },
      },
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
          fontSize: [20, 24],
          fontWeight: '700',
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
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 0.2475,
        lineHeight: 4,
        mb: 4,
        opacity: 0.64,
        textAlign: 'center',
      },
    },
  },
}

const theme = extendTheme({ colors, config, components, fonts })

export default theme
