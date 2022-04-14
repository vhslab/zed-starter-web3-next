import { useEffect, createContext, useState, ReactNode } from 'react'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'
import { useDidMount, useLocalstorageState } from 'rooks'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { useDisclosure } from '@chakra-ui/react'

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

const zedApiBaseUrl = process.env.NEXT_PUBLIC_API_ROOT_URL ?? 'https://api.dev.zed.run'

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
  }, [user])

  const signIn = async () => {
    if (isSigningIn) return
    setIsSigningIn(true)
    try {
      const {
        data: { message },
      } = await ZedApiClient.get<{ message: string }>(`/signing_message?address=${account}`)

      const signedMessage = await provider.getSigner().signMessage(message)

      const { data } = await ZedApiClient.post<User>('/users/login', {
        address: account,
        signedMessage,
      })

      setUser(data)

      ZedApiClient.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`
    } catch (error) {
      signOut()
      console.log(error)
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
