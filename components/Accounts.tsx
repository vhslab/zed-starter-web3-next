import { useEffect, useState } from 'react'
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react'
import type { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import type { Web3ReactHooks } from '@web3-react/core'


function useBalances(
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
  accounts?: string[]
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>()

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false

      void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
        if (!stale) {
          setBalances(balances)
        }
      })

      return () => {
        stale = true
        setBalances(undefined)
      }
    }
  }, [provider, accounts])

  return balances
}

export const Accounts = ({
  accounts,
  provider,
  ENSNames,
}: {
  accounts: ReturnType<Web3ReactHooks['useAccounts']>
  provider: ReturnType<Web3ReactHooks['useProvider']>
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>
}) => {
  const balances = useBalances(provider, accounts)

  if (accounts === undefined) return null

  return (
    <Stat>
      <StatLabel>Accounts:</StatLabel>
      {accounts.length === 0 && (
        <StatNumber fontSize="xs">None</StatNumber>
      )}
      {accounts?.map((account, i) => (
        <>
          <StatNumber fontSize="xs">
            {ENSNames?.[i] ?? account}
          </StatNumber>
          <StatHelpText>
            {balances?.[i] ? ` Ξ ${formatEther(balances[i])}` : null}
          </StatHelpText>
        </>
      ))}
    </Stat>
  )
}
