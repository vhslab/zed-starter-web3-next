import { Button, Flex, Image, Text } from '@chakra-ui/react'

interface ConnectorCardProps {
  icon: string
  iconProps?: object
  title: string
  description: string
  onClick: () => void
}

const ConnectorCard = ({
  icon,
  iconProps = {},
  title,
  description,
  onClick,
}: ConnectorCardProps) => {
  return (
    <Flex
      bgColor="brand.1000"
      align="center"
      flexDir="column"
      justify="center"
      p={6}
      position="relative"
    >
      <Image alt={icon} src={icon} {...iconProps} />
      <Text color="brand.600" fontSize={18} fontWeight="700" lineHeight={6} mt={5}>
        {title}
      </Text>
      <Text color="brand.600" fontSize={14} fontWeight="500" lineHeight={5} opacity={0.32}>
        {description}
      </Text>
      <Button onClick={onClick} position="absolute" h="100%" w="100%" />
    </Flex>
  )
}

export default ConnectorCard
