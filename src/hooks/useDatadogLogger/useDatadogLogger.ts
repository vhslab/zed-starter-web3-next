import { useContext } from 'react'

import Context from './Context'

function useDatadogLogger() {
  return useContext(Context)
}

export default useDatadogLogger
