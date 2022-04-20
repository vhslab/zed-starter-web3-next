import { createContext } from 'react'

import type { RumProvider } from './types'

export default createContext<RumProvider>({
  addTiming: () => null,
  setUser: () => null,
  resetUser: () => null,
})
