import { useEffect, createContext, useState, ReactNode } from 'react'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'
import { useDidMount, useLocalstorageState } from 'rooks'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { useDisclosure, useToast } from '@chakra-ui/react'
import { metaMask } from '../../util/connectors/metaMask'
import { getAddChainParameters } from '../../util/chains'
import { chainId } from '../../util/connectors/chainId'

interface User {
  stableName: string
  jwt: string
  hasOver18: boolean
  hasAcceptedTerms: boolean
  accountType: 'metamask' | 'magic'
  stableAvatarUrls?: { original: string }
  email?: string
}

interface IAuthContext {
  user: User | undefined
  signIn: () => void
  signOut: () => void
  isSigningIn: boolean
  isSignInModalOpen: boolean
  onSignInModalOpen: () => void
  onSignInModalClose: () => void
}

export const AuthContext = createContext<IAuthContext>({
  user: undefined,
  signIn: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  signOut: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  isSigningIn: false,
  isSignInModalOpen: false,
  onSignInModalOpen: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  onSignInModalClose: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
})

const zedApiBaseUrl =
  `${process.env.NEXT_PUBLIC_API_ROOT_URL}/api/v1/` ?? 'https://api.dev.zed.run/api/v1/'

const ZedApiClient = applyCaseMiddleware(
  axios.create({
    baseURL: zedApiBaseUrl,
  }),
)

interface Props {
  children: ReactNode
}

export default function AuthProvider({ children }: Props) {
  const { provider, account, connector } = useWeb3React()
  const toast = useToast()
  const [isMounted, setIsMounted] = useState(false)

  useDidMount(() => setIsMounted(true))
  const [user, setUser] = useLocalstorageState<User | null>('user', null)
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false)
  const {
    isOpen: isSignInModalOpen,
    onOpen: onSignInModalOpen,
    onClose: onSignInModalClose,
  } = useDisclosure()

  useEffect(() => {
    if (user && user?.accountType === 'metamask') {
      void metaMask.activate(getAddChainParameters(chainId))
    }
  }, [user])

  useEffect(() => {
    // Sign out if the jwt is expired or cannot be decoded
    if (isMounted && user) {
      try {
        const jwt = jwtDecode(user.jwt) as JwtPayload
        if (jwt.exp > Date.now() / 1000) return
      } catch (error) {
        console.log(error)
      }
      signOut()
    }
  }, [user, isMounted])

  const signIn = async () => {
    if (isSigningIn) return
    setIsSigningIn(true)
    try {
      const {
        data: { message },
      } = await ZedApiClient.get<{ message: string }>(`users/signing_message/${account}`)

      const signedMessage = await provider.getSigner().signMessage(message)

      const { data } = await ZedApiClient.post<User>('users/login', {
        address: account,
        signedMessage,
      })

      setUser(data)

      ZedApiClient.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`
    } catch (err) {
      const error = err?.response?.data?.error ?? err?.message
      console.log(error)
      if (error === 'not found') {
        toast({
          title: 'This address is not registered on ZED RUN',
          status: 'error',
          duration: 2500,
        })
      }
      signOut()
    }

    setIsSigningIn(false)
  }

  const signOut = () => {
    setUser(null)
    connector.deactivate()
    delete ZedApiClient.defaults.headers.common.Authorization
  }

  return (
    <AuthContext.Provider
      value={{
        user: isMounted ? user : null,
        signIn,
        signOut,
        isSigningIn,
        isSignInModalOpen,
        onSignInModalOpen,
        onSignInModalClose,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
