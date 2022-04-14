import { useEffect } from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'

import useAuth from '../hooks/useAuth'
import SignInModal from './SignInModal'

export default function SignInButton() {
  const { isActive, account } = useWeb3React()
  const { user, signIn, isSigningIn, signOut } = useAuth()
  const {
    isOpen: isSignInModalOpen,
    onOpen: onSignInModalOpen,
    onClose: onSignInModalClose,
  } = useDisclosure()

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

  if (!user) {
    return (
      <>
        <Button onClick={onSignInModalOpen}>Sign in</Button>
        <SignInModal isOpen={isSignInModalOpen} onClose={onSignInModalClose} />
      </>
    )
  }

  return <Button onClick={signOut}>Sign out</Button>
}
