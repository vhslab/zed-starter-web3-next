// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-unescaped-entities */
import { Button, Flex, Text } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const InstallMetaMaskGuideSection = () => {
  const METAMASK_DEEP_LINK =
    'https://metamask.app.link/dapp/' + window?.location?.href?.split('//')[1]

  return (
    <Flex align="center" flexDir="column" justify="center" px={4} py={8}>
      <Text mt={4} variant="modalTitle">
        HAVE YOU INSTALLED METAMASK?
      </Text>
      <Text variant="modalDescription" fontSize="md" lineHeight={6} my={6}>
        To play ZED you need to have an ethereum wallet. We've detected that your browser does not
        have Metamask installed. Metamask is widely used by many blockchain applications in order to
        keep your information secure.
      </Text>
      <Text fontSize="sm" variant="modalDescription">
        What is MetaMask? Head over to our
        <Text
          as="span"
          color="green.900"
          ml={1}
          onClick={() =>
            window.open('https://community.zed.run/2021/09/10/zed-run-guide/', '_blank')
          }
          _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          FAQ
        </Text>
      </Text>
      <Button
        mb={4}
        mt={4}
        rightIcon={<ExternalLinkIcon fontSize="2xl" />}
        onClick={() => window.open(METAMASK_DEEP_LINK, '_blank')}
        variant="primary"
      >
        Install Metamask
      </Button>
    </Flex>
  )
}

export default InstallMetaMaskGuideSection
