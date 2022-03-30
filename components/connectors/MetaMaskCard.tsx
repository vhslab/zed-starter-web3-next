import { useEffect } from 'react'
import { hooks, metaMask } from '../../util/connectors/metaMask'
import { Accounts } from '../Accounts'
import { Card } from '../Card'
import { Chain } from '../Chain'
import { ConnectWithSelect } from '../ConnectWithSelect'
import { Status } from '../Status'
import {Box, Divider,StatGroup, Stat, StatNumber} from "@chakra-ui/react";

const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

export default function MetaMaskCard() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const error = useError()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly()
  }, [])

  return (
    <Card>
      <Box>
        <StatGroup>
          <Stat>
            <StatNumber fontSize="md">MetaMask</StatNumber>
          </Stat>
          <Status isActivating={isActivating} error={error} isActive={isActive}/>
        </StatGroup>
        <Divider my={4}/>
      </Box>
      <Chain chainId={chainId}/>
      <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames}/>
      <Box>
        <Divider my={4}/>
        <ConnectWithSelect
          connector={metaMask}
          chainId={chainId}
          isActivating={isActivating}
          error={error}
          isActive={isActive}
        />
      </Box>
    </Card>
  )
}
