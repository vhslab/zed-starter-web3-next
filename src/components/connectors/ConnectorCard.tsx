import { Button, ButtonProps, Flex, Image, Text } from '@chakra-ui/react'

interface ConnectorCardProps extends ButtonProps {
  icon: string
  iconProps?: object
  title: string
  description: string
}

const ConnectorCard = ({
  icon,
  iconProps = {},
  title,
  description,
  ...otherProps
}: ConnectorCardProps) => {
  return (
    <Flex
      bgColor="brand.800"
      align="center"
      flexDir="column"
      justify="center"
      maxW="22rem"
      minH="9rem"
      mx="auto"
      p={6}
      position="relative"
    >
      <Image alt={title} src={icon} {...iconProps} />
      <Text color="brand.700" fontSize={18} fontWeight="bold" lineHeight={6} mt={5}>
        {title}
      </Text>
      <Text color="brand.700" fontSize={14} fontWeight="medium" lineHeight={5} opacity={0.32}>
        {description}
      </Text>
      <Button position="absolute" h="100%" w="100%" {...otherProps} />
    </Flex>
  )
}

export default ConnectorCard
