import {useEffect} from 'react'
import {hooks, network} from '../../util/connectors/network'
import {Accounts} from '../Accounts'
import {Card} from '../Card'
import {Chain} from '../Chain'
import {ConnectWithSelect} from '../ConnectWithSelect'
import {Status} from '../Status'
import {Box, Divider, StatGroup, Stat, StatNumber} from "@chakra-ui/react";

const {useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames} = hooks

export default function NetworkCard() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const error = useError()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  // attempt to connect eagerly on mount
  useEffect(() => {
    void network.activate()
  }, [])

  return (
    <Card>
      <Box>
        <StatGroup>
          <Stat>
            <StatNumber fontSize="md">Network</StatNumber>
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
          connector={network}
          chainId={chainId}
          isActivating={isActivating}
          error={error}
          isActive={isActive}
        />
      </Box>
    </Card>
  )
}
