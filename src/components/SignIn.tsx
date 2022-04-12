import { useEffect } from 'react'
import { Button } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'

import useAuth from '../hooks/useAuth'

export default function SignInButton() {
  const { isActive, account } = useWeb3React()
  const { user, signIn, isSigningIn, openSignInModal, signOut } = useAuth()
  useEffect(() => {
    if (isActive && account && !user && !isSigningIn) {
      signIn()
    }
  }, [isActive])

  if (!user) return <Button onClick={openSignInModal}>Sign in</Button>
  return <Button onClick={signOut}>Sign out</Button>
}
