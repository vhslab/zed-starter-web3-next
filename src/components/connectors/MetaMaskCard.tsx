import { hooks, metaMask } from '../../util/connectors/metaMask'
import { chainId } from '../../util/connectors/chainId'
import { getAddChainParameters } from '../../util/chains'
import ConnectorCard from './ConnectorCard'
import ErrorSection from './ErrorSection'

const { useIsActive, useError, useIsActivating } = hooks

export default function MetaMaskCard({
  setShowInstallMetaMaskGuide,
}: {
  setShowInstallMetaMaskGuide: (show: boolean) => void
}) {
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
