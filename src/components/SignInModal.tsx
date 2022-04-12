import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Link,
} from '@chakra-ui/react'
import useAuth from '../hooks/useAuth'
import MetaMaskCard from '../components/connectors/MetaMaskCard'
import MagicCard from '../components/connectors/MagicCard'
import { useState } from 'react'

const getBody = (step, setCurrentStep) => {
  if (step === 'welcome')
    return (
      <ModalContent>
        <ModalHeader>Sign in</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Sign in to start playing! Or if you&rsquo;re a new user, sign up to set up Metamask.
          </Text>
          <MetaMaskCard />
          <Link onClick={() => setCurrentStep('email-sign-in')}>Or signin with email</Link>
        </ModalBody>
      </ModalContent>
    )
  if (step === 'email-sign-in')
    return (
      <ModalContent>
        <ModalHeader>Sign in with email</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Sign in if you have an existing Magic Link account.</Text>
          <MagicCard />
          <Link onClick={() => setCurrentStep('welcome')}>
            Don&rsquo;t have a Magic Link account ?
          </Link>
        </ModalBody>
      </ModalContent>
    )
}
function SignInModal() {
  const { isSigningModalOpen, closeSignInModal } = useAuth()
  const [currentStep, setCurrentStep] = useState('welcome')
  console.log({ currentStep })
  return (
    <Modal isOpen={isSigningModalOpen} onClose={closeSignInModal}>
      <ModalOverlay />
      {getBody(currentStep, setCurrentStep)}
    </Modal>
  )
}

export default SignInModal
