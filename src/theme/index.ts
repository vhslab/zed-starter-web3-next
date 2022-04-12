import { extendTheme } from '@chakra-ui/react'
import type { SystemStyleObject } from '@chakra-ui/theme-tools'

// Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
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

const theme = extendTheme({ colors, config, components: { Link, Modal } })

export default theme
