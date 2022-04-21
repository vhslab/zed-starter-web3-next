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
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { useEffect, useMemo, useState } from 'react'

import MetaMaskCard from '../../components/connectors/MetaMaskCard'
import MagicCard from '../../components/connectors/MagicCard'
import useAuth from '../../hooks/useAuth'
import InstallMetaMaskGuideSection from '../sections/InstallMetaMaskGuide'

enum Connector {
  MetaMask = 'MetaMask',
  Magic = 'Magic',
}

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    aria-label="Back to choose the login method"
    bgColor="transparent"
    fontSize="xl"
    h={6}
    icon={<ArrowBackIcon color="brand.700" opacity={0.8} />}
    left={3}
    onClick={onClick}
    top={3}
    w={6}
  />
)

const SignInModal = () => {
  const { isSignInModalOpen, onSignInModalClose } = useAuth()
  const [connector, setConnector] = useState(Connector.MetaMask)
  const [showInstallMetaMaskGuide, setShowInstallMetaMaskGuide] = useState(false)
  const [showMagicForm, setShowMagicForm] = useState(false)

  const content = useMemo(() => {
    if (showMagicForm) {
      return {
        title: 'ENTER YOUR EMAIL',
        description: '',
        footerButtonLabel: 'If you used Metamask to sign in previously, sign in with Metamask',
      }
    }
    return {
      title: 'SIGN IN',
      description: 'Sign in to start playing ZED RUN.',
      footerButtonLabel:
        connector === Connector.MetaMask
          ? 'Or sign in with email'
          : "Don't have a Magic Link account?",
    }
  }, [connector, showMagicForm])

  const footerButtonLabelStyles = showMagicForm
    ? {
        color: 'brand.700',
        fontSize: 'xs',
        fontWeight: 'medium',
        opacity: 0.64,
      }
    : {}

  useEffect(() => {
    if (connector === Connector.MetaMask && showMagicForm) {
      setShowMagicForm(false)
    }
  }, [connector, showMagicForm])

  return (
    <Modal isCentered isOpen={isSignInModalOpen} onClose={onSignInModalClose}>
      <ModalOverlay />
      <ModalContent>
        {showInstallMetaMaskGuide && (
          <BackButton onClick={() => setShowInstallMetaMaskGuide(false)} />
        )}
        {showMagicForm && <BackButton onClick={() => setShowMagicForm(false)} />}
        <ModalCloseButton />
        {showInstallMetaMaskGuide ? (
          <InstallMetaMaskGuideSection />
        ) : (
          <>
            <ModalHeader>{content.title}</ModalHeader>
            <ModalBody>
              {content.description && <Text variant="modalDescription">{content.description}</Text>}
              {connector === Connector.MetaMask ? (
                <MetaMaskCard setShowInstallMetaMaskGuide={setShowInstallMetaMaskGuide} />
              ) : (
                <MagicCard showMagicForm={showMagicForm} setShowMagicForm={setShowMagicForm} />
              )}
              {content.footerButtonLabel && (
                <Button
                  _focus={{ outline: 'none' }}
                  my={8}
                  isFullWidth
                  onClick={() =>
                    setConnector(
                      connector === Connector.MetaMask ? Connector.Magic : Connector.MetaMask,
                    )
                  }
                  rightIcon={!showMagicForm && <ArrowForwardIcon />}
                  variant="ghost"
                  whiteSpace={showMagicForm ? 'normal' : 'nowrap'}
                  {...footerButtonLabelStyles}
                >
                  {content.footerButtonLabel}
                </Button>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default SignInModal
