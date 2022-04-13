import { useEffect } from 'react'
import { Flex, StatGroup, Stat, StatNumber, Text, Image, Button } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { hooks, metaMask } from '../../util/connectors/metaMask'
import { Card } from '../Card'
import { Status } from '../Status'
import { chainId } from '../../util/connectors/chainId'
import useAuth from '../../hooks/useAuth'
import { getAddChainParameters } from '../../../chains'

const { useAccounts, useError, useIsActivating, useIsActive } = hooks

export default function MetaMaskCard() {
  const { user, signOut } = useAuth()
  const { isActive } = useWeb3React()
  const accounts = useAccounts()
  const error = useError()
  console.log(error)
  const isActivating = useIsActivating()

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
    <Flex position="relative" align="center" justify="center" flexDir="column">
      <Button onClick={onClick} position="absolute" isFullWidth h="100%"></Button>
      <Image src="/assets/images/icn-mmask.svg" />
      <Text>Metamask</Text>
      <Text>Browser Extension</Text>
    </Flex>
  )
}
