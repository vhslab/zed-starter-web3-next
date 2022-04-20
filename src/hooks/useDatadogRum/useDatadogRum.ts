import { useContext } from 'react'

import Context from './Context'

function useDatadogRum() {
  return useContext(Context)
}

export default useDatadogRum
