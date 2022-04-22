import { createContext } from 'react'

import type { Logger } from './types'

export default createContext<Logger>({
  debug: () => null,
  info: () => null,
  warn: () => null,
  error: () => null,
})
