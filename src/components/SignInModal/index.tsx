import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  IconButton,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useState } from 'react'

import MetaMaskCard from '../../components/connectors/MetaMaskCard'
import MagicCard from '../../components/connectors/MagicCard'
import useAuth from '../../hooks/useAuth'
import InstallMetaMaskGuideSection from '../sections/InstallMetaMaskGuide'

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

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    aria-label="Back to choose the login method"
    bgColor="transparent"
    fontSize="22px"
    h="24px"
    icon={<ArrowBackIcon color="brand.700" opacity={0.8} />}
    left={3}
    onClick={onClick}
    top={3}
    w="24px"
  />
)

const SignInModal = () => {
  const { isSignInModalOpen, onSignInModalClose } = useAuth()
  const [connector, setConnector] = useState(Connector.MetaMask)
  const [showInstallMetaMaskGuide, setShowInstallMetaMaskGuide] = useState(false)

  return (
    <Modal isCentered isOpen={isSignInModalOpen} onClose={onSignInModalClose}>
      <ModalOverlay />
      <ModalContent>
        {showInstallMetaMaskGuide && (
          <BackButton onClick={() => setShowInstallMetaMaskGuide(false)} />
        )}
        <ModalCloseButton />
        {showInstallMetaMaskGuide ? (
          <InstallMetaMaskGuideSection />
        ) : (
          <>
            <ModalHeader>{CONTENT[connector].title}</ModalHeader>
            <ModalBody>
              <Text variant="modalDescription">{CONTENT[connector].description}</Text>
              {connector === Connector.MetaMask ? (
                <MetaMaskCard setShowInstallMetaMaskGuide={setShowInstallMetaMaskGuide} />
              ) : (
                <MagicCard />
              )}
              <Button
                _focus={{ outline: 'none' }}
                isFullWidth
                onClick={() =>
                  setConnector(
                    connector === Connector.MetaMask ? Connector.Magic : Connector.MetaMask,
                  )
                }
                variant="ghost"
              >
                {CONTENT[connector].footerButtonLabel}
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default SignInModal
