import { useEffect } from 'react'
import { Button } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'

import useAuth from '../hooks/useAuth'

export default function SignInButton() {
  const { isActive, account } = useWeb3React()
  const {
    user,
    signIn,
    isSigningIn,
    signOut,
    isSignInModalOpen,
    onSignInModalOpen,
    onSignInModalClose,
  } = useAuth()

  useEffect(() => {
    if (isActive && account && !user && !isSigningIn) {
      signIn()
    }
  }, [isActive])

  useEffect(() => {
    if (!!user && isSignInModalOpen) {
      onSignInModalClose()
    }
  }, [isSignInModalOpen, onSignInModalClose, user])

  if (!user) return <Button onClick={onSignInModalOpen}>Sign in</Button>

  return <Button onClick={signOut}>Sign out</Button>
}
