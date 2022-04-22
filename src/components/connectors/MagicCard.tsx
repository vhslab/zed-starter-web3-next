import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import { hooks, magic } from '../../util/connectors/magic'
import { isValidEmail } from '../../util/helpers'

import ConnectorCard from './ConnectorCard'

const { useIsActivating, useIsActive } = hooks

export default function MagicCard({
  showMagicForm,
  setShowMagicForm,
}: {
  showMagicForm: boolean
  setShowMagicForm: (showMagicForm: boolean) => void
}) {
  const { isActive } = useWeb3React()
  const isActivating = useIsActivating()
  const isMagicActive = useIsActive()
  const [email, setEmail] = useState('')

  const onSubmit = async (e) => {
    if (!isActivating) {
      e.preventDefault()
      const email = e.currentTarget.elements['email'].value
      magic.activate({ email })
    }
  }

  return (
    <>
      {showMagicForm ? (
        <Flex
          as="form"
          align="center"
          flexDir="column"
          maxW="17.5rem"
          mx="auto"
          onSubmit={onSubmit}
        >
          <Input
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            type="email"
            value={email}
          />
          <Text color="brand.700" fontSize="xs" fontWeight="medium" mt={2} opacity={0.32}>
            We will send you a confirmation email with magic link.
          </Text>
          <Button
            disabled={(isActive && !isMagicActive) || isActivating || !isValidEmail(email)}
            isLoading={isActivating}
            mt={4}
            mx="auto"
            type="submit"
            variant="primary"
          >
            Continue
          </Button>
        </Flex>
      ) : (
        <ConnectorCard
          description="Browser Extension"
          icon="/assets/images/icn-email.svg"
          iconProps={{ h: '1rem', w: '1.375rem' }}
          title="Email"
          onClick={() => setShowMagicForm(true)}
        />
      )}
    </>
  )
}
