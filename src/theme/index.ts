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
  greenAlpha: {
    900: 'rgba(39, 177, 138, 0.32)',
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
      primary: {
        color: colors.brand[700],
        background: `linear-gradient(90deg, ${colors.green[800]} 0%, ${colors.green[900]} 100%)`,
        boxShadow: `0px 0px 8px ${colors.greenAlpha[900]}`,
        borderRadius: '8px',
        fontSize: '16px',
        letterSpacing: '0.0666667px',
        lineHeight: '24px',
        p: '24px',
        textAlign: 'center',
        transition: '0.5s',
        _hover: {
          background: `linear-gradient(90deg, ${colors.green[800]} 0%, ${colors.green[900]} 100%)`,
          boxShadow: `0px 0px 8px ${colors.greenAlpha[900]}`,
          opacity: 0.85,
        },
        _disabled: {
          background: 'rgba(240, 248, 255, 0.24)',
          color: 'rgba(240, 248, 255, 0.24)',
          opacity: 1,
        },
      },
      ghost: {
        color: 'green.900',
        fontWeight: '700',
        fontSize: ['14px', '16px'],
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
      modalTitle: {
        color: 'brand.700',
        fontSize: [22, 25],
        fontWeight: '700',
        letterSpacing: 0.2475,
        lineHeight: 8,
        textAlign: 'center',
      },
    },
  },
}

const theme = extendTheme({ colors, config, components, fonts })

export default theme
