import { useContext } from 'react'
import { BiconomyContext } from '../components/providers/BiconomyProvider'

const useBiconomy = () => {
  return useContext(BiconomyContext)
}

export default useBiconomy
