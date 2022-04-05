import type { Web3ReactHooks } from '@web3-react/core'
import { Stat, StatLabel, StatHelpText } from '@chakra-ui/react'

export function Status({
  isActivating,
  error,
  isActive,
}: {
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  error: ReturnType<Web3ReactHooks['useError']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
}) {
  return (
    <Stat>
      {error ? (
        <>
          <StatLabel>🔴 {error.name ?? 'Error'}</StatLabel>
          <StatHelpText>{error.message ? `: ${error.message}` : null}</StatHelpText>
        </>
      ) : isActivating ? (
        <StatLabel>🟡 Connecting</StatLabel>
      ) : isActive ? (
        <StatLabel>🟢 Connected</StatLabel>
      ) : (
        <StatLabel>⚪️ Disconnected</StatLabel>
      )}
    </Stat>
  )
}
