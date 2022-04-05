import { Magic } from '@web3-react/magic'
import { initializeConnector } from '@web3-react/core'
import { chainId } from './chainId'
import { CHAINS } from '../../../chains'

export const [magic, hooks] = initializeConnector<Magic>(
  (actions) =>
    new Magic(actions, {
      apiKey: process.env.NEXT_PUBLIC_MAGIC_PK,
      network: { chainId, rpcUrl: CHAINS[chainId].urls[0] },
    }),
)
