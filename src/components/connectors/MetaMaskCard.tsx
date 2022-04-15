import { useEffect } from 'react'

import useAuth from '../../hooks/useAuth'
import { hooks, metaMask } from '../../util/connectors/metaMask'
import { chainId } from '../../util/connectors/chainId'
import { getAddChainParameters } from '../../../chains'
import ConnectorCard from './ConnectorCard'
import ErrorSection from './ErrorSection'

const { useIsActive, useError, useIsActivating } = hooks

export default function MetaMaskCard({
  setShowInstallMetaMaskGuide,
}: {
  setShowInstallMetaMaskGuide: (show: boolean) => void
}) {
  const { user } = useAuth()
  const isMMActive = useIsActive()
  const isActivating = useIsActivating()
  const error = useError()
  const hasMetaMaskInstalled = !!window.ethereum

  const onClick = async () => {
    if (!hasMetaMaskInstalled) {
      setShowInstallMetaMaskGuide(true)
      return
    }
    if (!isMMActive) {
      await metaMask.activate(getAddChainParameters(chainId))
    }
  }

  useEffect(() => {
    if (user && user?.accountType === 'metamask') {
      void metaMask.connectEagerly()
    }
  }, [user])

  return (
    <>
      <ConnectorCard
        description="Browser Extension"
        icon="/assets/images/icn-mmask.svg"
        isLoading={isActivating}
        onClick={onClick}
        title="Metamask"
      />
      {!!error && <ErrorSection message={error.message} />}
    </>
  )
}
