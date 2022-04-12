import { useEffect } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'

import useAuth from '../hooks/useAuth'

export default function Home() {
  const { isActive, account } = useWeb3React()
  const { user, signIn, isSigningIn, openSignInModal } = useAuth()

  useEffect(() => {
    if (isActive && account && !user && !isSigningIn) {
      signIn()
    }
  }, [isActive])

  return (
    <Flex flexWrap="wrap">
      <Button onClick={openSignInModal}>Sign in</Button>
    </Flex>
  )
}
