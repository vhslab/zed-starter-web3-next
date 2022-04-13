import { useEffect } from 'react'
// import { useWeb3React } from '@web3-react/core'

import useAuth from '../../hooks/useAuth'
import { hooks, metaMask } from '../../util/connectors/metaMask'
import { chainId } from '../../util/connectors/chainId'
import { getAddChainParameters } from '../../../chains'
import ConnectorCard from './ConnectorCard'

const {
  useIsActive,
  // useAccounts,
  // useError,
  // useIsActivating,
} = hooks

export default function MetaMaskCard() {
  const { user, signOut } = useAuth()
  // const { isActive } = useWeb3React()
  // const accounts = useAccounts()
  // const isActivating = useIsActivating()
  // const error = useError()
  const isMMActive = useIsActive()

  // attempt to connect eagerly on mount
  useEffect(() => {
    if (user && user?.accountType === 'metamask') {
      void metaMask.connectEagerly()
    }
  }, [user])

  const onClick = async () => {
    if (!isMMActive) {
      await metaMask.activate(getAddChainParameters(chainId))
    } else {
      signOut()
    }
  }

  return (
    <ConnectorCard
      description="Browser Extension"
      icon="/assets/images/icn-mmask.svg"
      onClick={onClick}
      title="Metamask"
    />
  )
}
