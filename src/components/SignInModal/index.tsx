import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'

import useAuth from '../../hooks/useAuth'
import MetaMaskCard from '../../components/connectors/MetaMaskCard'
import MagicCard from '../../components/connectors/MagicCard'

import { styles } from './styles'

const getBody = (step, setCurrentStep) => {
  if (step === 'welcome')
    return (
      <ModalContent {...styles.modalContent}>
        <ModalHeader textAlign="center" {...styles.modalHeader}>
          Start playing ZED Run
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text textAlign="center" {...styles.modalDescription}>
            Sign in to start playing! Or if you&rsquo;re a new user, sign up to set up Metamask.{' '}
          </Text>
          <MetaMaskCard />
          <Button onClick={() => setCurrentStep('email-sign-in')} {...styles.ghostButton}>
            Or sign in with email
          </Button>
        </ModalBody>
      </ModalContent>
    )
  if (step === 'email-sign-in')
    return (
      <ModalContent {...styles.modalContent}>
        <ModalHeader textAlign="center" {...styles.modalHeader}>
          Sign in with email
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text textAlign="center" {...styles.modalDescription}>
            Sign in if you have an existing Magic Link account.
          </Text>
          <MagicCard />
          <Button onClick={() => setCurrentStep('welcome')} {...styles.ghostButton}>
            Don&rsquo;t have a Magic Link account ?
          </Button>
        </ModalBody>
      </ModalContent>
    )
}
function SignInModal() {
  const { isSigningModalOpen, closeSignInModal, user } = useAuth()
  const [currentStep, setCurrentStep] = useState('welcome')

  if (user) {
    closeSignInModal()
  }

  return (
    <Modal isCentered isOpen={isSigningModalOpen} onClose={closeSignInModal}>
      <ModalOverlay />
      {getBody(currentStep, setCurrentStep)}
    </Modal>
  )
}

export default SignInModal
