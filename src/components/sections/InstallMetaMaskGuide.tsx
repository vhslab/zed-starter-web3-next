import { Button, Flex, Text } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const InstallMetaMaskGuideSection = () => {
  return (
    <Flex align="center" flexDir="column" justify="center">
      <Text variant="modalTitle">HAVE YOU INSTALLED METAMASK?</Text>
      <Text variant="modalDescription" fontSize={16}>
        To play ZED you need to have an ethereum wallet. We&aposve detected that your browser does
        not have Metamask installed. Metamask is widely used by many blockchain applications in
        order to keep your information secure.
      </Text>
      <Text mt="32px" variant="modalDescription">
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
        mb="16px"
        mt="8px"
        rightIcon={<ExternalLinkIcon fontSize="24px" />}
        onClick={() => window.open('https://metamask.io/', '_blank')}
        variant="primary"
      >
        Install Metamask
      </Button>
    </Flex>
  )
}

export default InstallMetaMaskGuideSection
