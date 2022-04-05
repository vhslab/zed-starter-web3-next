import { useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'

import MetaMaskCard from '../components/connectors/MetaMaskCard'
import MagicCard from '../components/connectors/MagicCard'
import useAuth from '../hooks/useAuth'

export default function Home() {
  const { isActive, account } = useWeb3React()
  const { user, signIn, isSigningIn } = useAuth()

  useEffect(() => {
    if (isActive && account && !user && !isSigningIn) {
      signIn()
    }
  }, [isActive])

  return (
    <Flex flexWrap="wrap">
      <MetaMaskCard />
      <MagicCard />
    </Flex>
  )
}
