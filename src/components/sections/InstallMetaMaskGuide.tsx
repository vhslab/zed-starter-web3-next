// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-unescaped-entities */
import { Button, Flex, Text } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const InstallMetaMaskGuideSection = () => {
  return (
    <Flex align="center" flexDir="column" justify="center" px="16px" py="32px">
      <Text mt="16px" variant="modalTitle">
        HAVE YOU INSTALLED METAMASK?
      </Text>
      <Text variant="modalDescription" fontSize={16} lineHeight="24px" my="24px">
        To play ZED you need to have an ethereum wallet. We've detected that your browser does not
        have Metamask installed. Metamask is widely used by many blockchain applications in order to
        keep your information secure.
      </Text>
      <Text fontSize="14px" variant="modalDescription">
        What is MetaMask? Head over to our
        <Text
          as="span"
          color="green.900"
          ml="4px"
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
        mt="16px"
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
