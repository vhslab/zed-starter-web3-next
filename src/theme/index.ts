import { extendTheme } from '@chakra-ui/react'
import type { SystemStyleObject } from '@chakra-ui/theme-tools'

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

const Link: SystemStyleObject = {
  baseStyle: {
    color: 'green.400',
  },
}
const Modal: SystemStyleObject = {
  baseStyle: {
    header: {
      // bg: 'brand.900',
      // TODO change the font-size here
    },
  },
}

const theme = extendTheme({ colors, config, components: { Link, Modal }, fonts })

export default theme
