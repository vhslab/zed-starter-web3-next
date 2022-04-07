import {
  Box,
  StatGroup,
  Stat,
  StatNumber,
  Button,
  Input,
  FormLabel,
  FormHelperText,
  FormControl,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import useAuth from '../../hooks/useAuth'
import { hooks, magic } from '../../util/connectors/magic'
import { Card } from '../Card'
import { Status } from '../Status'

const { useError, useIsActivating, useIsActive, useAccount } = hooks

export default function MagicCard() {
  const { signOut } = useAuth()
  const { isActive } = useWeb3React()
  const account = useAccount()
  const error = useError()
  const isActivating = useIsActivating()

  const isMagicActive = useIsActive()

  const onSubmit = async (e) => {
    if (!isActivating) {
      e.preventDefault()
      const email = e.currentTarget.elements['email'].value
      magic.activate({ email })
    }
  }

  return (
    <Card>
      <Box>
        <StatGroup>
          <Stat>
            <StatNumber fontSize="xs">{account}</StatNumber>
            <StatNumber fontSize="md">Magic</StatNumber>
          </Stat>
          <Status isActivating={isActivating} error={error} isActive={isMagicActive} />
        </StatGroup>
      </Box>
      {!isMagicActive ? (
        <form onSubmit={onSubmit}>
          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input id="email" type="email" required />
            <FormHelperText>{"We'll never share your email."}</FormHelperText>
          </FormControl>
          <Button type="submit" isFullWidth disabled={(isActive && !isMagicActive) || isActivating}>
            {isActivating ? 'Connecting...' : 'Connect'}
          </Button>
        </form>
      ) : (
        <>
          <Button onClick={signOut}>Disconnect</Button>
        </>
      )}
    </Card>
  )
}
