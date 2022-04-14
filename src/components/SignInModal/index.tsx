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
import { useEffect, useState } from 'react'

import useAuth from '../../hooks/useAuth'
import MetaMaskCard from '../../components/connectors/MetaMaskCard'
import MagicCard from '../../components/connectors/MagicCard'

import { styles } from './styles'

enum Connector {
  MetaMask = 'MetaMask',
  Magic = 'Magic',
}

const CONTENT = {
  [Connector.MetaMask]: {
    title: 'Start playing ZED Run',
    description: "Sign in to start playing! Or if you're a new user, sign up to set up Metamask.",
    footerButtonLabel: 'Or sign in with email',
  },
  [Connector.Magic]: {
    title: 'Sign in with email',
    description: 'Sign in if you have an existing Magic Link account.',
    footerButtonLabel: "Don't have a Magic Link account ?",
  },
}

function SignInModal() {
  const { isSigningModalOpen, closeSignInModal, user } = useAuth()
  const [connector, setConnector] = useState(Connector.MetaMask)

  useEffect(() => {
    if (user) {
      closeSignInModal()
    }
  }, [closeSignInModal, user])

  return (
    <Modal isCentered isOpen={isSigningModalOpen} onClose={closeSignInModal}>
      <ModalOverlay />
      <ModalContent {...styles.modalContent}>
        <ModalHeader textAlign="center" {...styles.modalHeader}>
          {CONTENT[connector].title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text textAlign="center" {...styles.modalDescription}>
            {CONTENT[connector].description}
          </Text>
          {connector === Connector.MetaMask ? <MetaMaskCard /> : <MagicCard />}
          <Button
            onClick={() =>
              setConnector(connector === Connector.MetaMask ? Connector.Magic : Connector.MetaMask)
            }
            {...styles.ghostButton}
          >
            {CONTENT[connector].footerButtonLabel}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SignInModal
