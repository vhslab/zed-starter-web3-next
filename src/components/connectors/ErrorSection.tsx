import { Flex, Text } from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'

interface ErrorSectionProps {
  message: string
}

const ErrorSection = ({ message }: ErrorSectionProps) => {
  return (
    <Flex
      align="center"
      borderRadius={8}
      gap={4}
      borderColor="red.500"
      borderWidth="2px"
      justify="center"
      mt={4}
      p={4}
    >
      <WarningIcon w={6} h={6} color="red.500" />
      <Text color="red.500" fontWeight="500" mx="auto" textAlign="center">
        {message}
      </Text>
    </Flex>
  )
}

export default ErrorSection
