import { useEffect } from 'react'
import { Box, StatGroup, Stat, StatNumber, Button } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { hooks, metaMask } from '../../util/connectors/metaMask'
import { Card } from '../Card'
import { Status } from '../Status'
import { chainId } from '../../util/connectors/chainId'
import useAuth from '../../hooks/useAuth'

const { useAccounts, useError, useIsActivating, useIsActive } = hooks

export default function MetaMaskCard() {
  const { user, signOut } = useAuth()
  const { isActive } = useWeb3React()
  const accounts = useAccounts()
  const error = useError()
  const isActivating = useIsActivating()

  const isMMActive = useIsActive()

  // attempt to connect eagerly on mount
  useEffect(() => {
    if (user && user?.accountType === 'metamask') {
      void metaMask.connectEagerly()
    }
  }, [])

  const onClick = () => {
    if (!isMMActive) {
      metaMask.activate(chainId)
    } else {
      signOut()
    }
  }

  return (
    <Card>
      <Box>
        <StatGroup>
          <Stat>
            <StatNumber fontSize="md">{accounts}</StatNumber>
            <StatNumber fontSize="md">MetaMask</StatNumber>
          </Stat>
          <Status isActivating={isActivating} error={error} isActive={isMMActive} />
        </StatGroup>
      </Box>
      <Button onClick={onClick} disabled={isActive && !isMMActive}>
        {isMMActive ? 'Disconnect' : 'Connect'}
      </Button>
    </Card>
  )
}
