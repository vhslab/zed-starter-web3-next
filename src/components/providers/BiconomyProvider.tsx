import { useEffect, createContext, FC, useState } from 'react'
import { Biconomy } from '@biconomy/mexa'
import { useWeb3React } from '@web3-react/core'

import { network, hooks } from '../../util/connectors/network'

const { useProvider, useIsActive } = hooks

export const BiconomyContext = createContext(null)

const BiconomyProvider: FC = ({ children }) => {
  const { account } = useWeb3React()
  const provider = useProvider()
  const isActive = useIsActive()
  const [biconomy, setBiconomy] = useState<Biconomy | null>(null)

  useEffect(() => {
    void network.activate(Number(process.env.NEXT_PUBLIC_MATIC_CHAIN_ID))
  }, [])

  useEffect(() => {
    // Only initialize Biconomy if there is a provider with a signer
    if (account && isActive && !biconomy) {
      setBiconomy(
        new Biconomy(provider, {
          apiKey: process.env.NEXT_PUBLIC_BICONOMY_API_KEY,
          debug: process.env.NODE_ENV === 'development',
        }),
      )
    }
  }, [account, provider, isActive, biconomy])

  return <BiconomyContext.Provider value={biconomy}>{children}</BiconomyContext.Provider>
}

export default BiconomyProvider
