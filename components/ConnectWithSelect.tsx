import { useCallback, useState } from 'react'
import type { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import type { Web3ReactHooks } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'
import {Button, Select} from '@chakra-ui/react'
import { CHAINS, getAddChainParameters, URLS } from '../chains'

function ChainSelect({
  chainId,
  switchChain,
  displayDefault,
  chainIds,
}: {
  chainId: number
  switchChain: (chainId: number) => void | undefined
  displayDefault: boolean
  chainIds: number[]
}) {
  return (
    <Select
      value={chainId}
      onChange={(event) => {
        switchChain?.(Number(event.target.value))
      }}
      disabled={!switchChain}
    >
      {displayDefault ? <option value={-1}>Default Chain</option> : null}
      {chainIds.map((chainId) => (
        <option key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </Select>
  )
}

export function ConnectWithSelect({
  connector,
  chainId,
  isActivating,
  error,
  isActive,
}: {
  connector: MetaMask | WalletConnect | CoinbaseWallet | Network
  chainId: ReturnType<Web3ReactHooks['useChainId']>
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  error: ReturnType<Web3ReactHooks['useError']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
}) {
  const isNetwork = connector instanceof Network
  const displayDefault = !isNetwork
  const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map((chainId) => Number(chainId))

  const [desiredChainId, setDesiredChainId] = useState<number>(isNetwork ? 1 : -1)

  const switchChain = useCallback(
    async (desiredChainId: number) => {
      setDesiredChainId(desiredChainId)
      // if we're already connected to the desired chain, return
      if (desiredChainId === chainId) return
      // if they want to connect to the default chain and we're already connected, return
      if (desiredChainId === -1 && chainId !== undefined) return

      if (connector instanceof WalletConnect || connector instanceof Network) {
        await connector.activate(desiredChainId === -1 ? undefined : desiredChainId)
      } else {
        await connector.activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
      }
    },
    [connector, chainId]
  )

  if (error) {
    return (
      <>
        <ChainSelect
          chainId={desiredChainId}
          switchChain={switchChain}
          displayDefault={displayDefault}
          chainIds={chainIds}
        />
        <Button
          variant="outline"
          colorScheme="teal"
          size="sm"
          isFullWidth
          my={4}
          onClick={() =>
            connector instanceof WalletConnect || connector instanceof Network
              ? void connector.activate(desiredChainId === -1 ? undefined : desiredChainId)
              : void connector.activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
          }
        >
          Try Again?
        </Button>
      </>
    )
  } else if (isActive) {
    return (
      <>
        <ChainSelect
          chainId={desiredChainId === -1 ? -1 : chainId}
          switchChain={switchChain}
          displayDefault={displayDefault}
          chainIds={chainIds}
        />
        <Button
          variant="outline"
          colorScheme="teal"
          size="sm"
          isFullWidth
          my={4}
          onClick={() => void connector.deactivate()}>
          Disconnect
        </Button>
      </>
    )
  } else {
    return (
      <>
        <ChainSelect
          chainId={desiredChainId}
          switchChain={isActivating ? undefined : switchChain}
          displayDefault={displayDefault}
          chainIds={chainIds}
        />
        <Button
          variant="outline"
          colorScheme="teal"
          size="sm"
          isFullWidth
          my={4}
          onClick={
            isActivating
              ? undefined
              : () =>
                  connector instanceof WalletConnect || connector instanceof Network
                    ? connector.activate(desiredChainId === -1 ? undefined : desiredChainId)
                    : connector.activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
          }
          disabled={isActivating}
        >
          Connect
        </Button>
      </>
    )
  }
}
