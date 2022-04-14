import { Button, Input, FormLabel, FormHelperText, FormControl } from '@chakra-ui/react'
import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import { hooks, magic } from '../../util/connectors/magic'

import ConnectorCard from './ConnectorCard'

const { useIsActivating, useIsActive } = hooks

export default function MagicCard() {
  const { isActive } = useWeb3React()
  const isActivating = useIsActivating()
  const isMagicActive = useIsActive()

  const [shouldDisplayForm, setShouldDisplayForm] = useState(false)

  const onSubmit = async (e) => {
    if (!isActivating) {
      e.preventDefault()
      const email = e.currentTarget.elements['email'].value
      magic.activate({ email })
    }
  }

  return (
    <>
      {shouldDisplayForm ? (
        <form onSubmit={onSubmit}>
          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input id="email" type="email" required />
            <FormHelperText>We will send you a confirmation email with magic link.</FormHelperText>
          </FormControl>
          <Button
            type="submit"
            isFullWidth
            isLoading={isActivating}
            disabled={(isActive && !isMagicActive) || isActivating}
            mt={6}
          >
            {isActivating ? 'Connecting...' : 'Connect'}
          </Button>
        </form>
      ) : (
        <ConnectorCard
          description="Browser Extension"
          icon="/assets/images/icn-email.svg"
          iconProps={{ h: '16px', w: '22px' }}
          title="Email"
          onClick={() => setShouldDisplayForm(true)}
        />
      )}
    </>
  )
}
