import {useEffect} from 'react'
import {coinbaseWallet, hooks} from '../../util/connectors/coinbaseWallet'
import {Accounts} from '../Accounts'
import {Card} from '../Card'
import {Chain} from '../Chain'
import {ConnectWithSelect} from '../ConnectWithSelect'
import {Status} from '../Status'
import {Box, Divider, Stat, StatGroup, StatNumber} from "@chakra-ui/react";

const {useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames} = hooks

export default function CoinbaseWalletCard() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const error = useError()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  // attempt to connect eagerly on mount
  useEffect(() => {
    void coinbaseWallet.connectEagerly()
  }, [])

  return (
    <Card>
      <Box>
        <StatGroup>
          <Stat>
            <StatNumber fontSize="md">Coinbase Wallet</StatNumber>
          </Stat>
          <Status isActivating={isActivating} error={error} isActive={isActive}/>
        </StatGroup>
        <Divider my={4}/>
        <Chain chainId={chainId}/>
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames}/>
      </Box>
      <Box>
        <Divider my={4}/>
        <ConnectWithSelect
          connector={coinbaseWallet}
          chainId={chainId}
          isActivating={isActivating}
          error={error}
          isActive={isActive}
        />
      </Box>
    </Card>
  )
}
