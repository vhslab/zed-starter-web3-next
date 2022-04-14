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

import MetaMaskCard from '../../components/connectors/MetaMaskCard'
import MagicCard from '../../components/connectors/MagicCard'
import useAuth from '../../hooks/useAuth'

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
  const { isSignInModalOpen, onSignInModalClose } = useAuth()
  const [connector, setConnector] = useState(Connector.MetaMask)

  return (
    <Modal isCentered isOpen={isSignInModalOpen} onClose={onSignInModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{CONTENT[connector].title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text variant="modalDescription">{CONTENT[connector].description}</Text>
          {connector === Connector.MetaMask ? <MetaMaskCard /> : <MagicCard />}
          <Button
            _focus={{ outline: 'none' }}
            isFullWidth
            onClick={() =>
              setConnector(connector === Connector.MetaMask ? Connector.Magic : Connector.MetaMask)
            }
            variant="ghost"
          >
            {CONTENT[connector].footerButtonLabel}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SignInModal
