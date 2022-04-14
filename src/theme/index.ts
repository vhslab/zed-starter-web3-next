import { extendTheme } from '@chakra-ui/react'

// Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    1100: '#22262D',
    1000: '#2A2E35',
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
    600: '#F0F8FF',
  },
  custom: {
    green: {
      900: '#27B18A',
      800: '#2ECCA0',
    },
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

const theme = extendTheme({ colors, config, fonts })

export default theme
