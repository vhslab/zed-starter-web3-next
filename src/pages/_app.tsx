import '@fontsource/montserrat/300.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'

import Script from 'next/script'
import * as snippet from '@segment/snippet'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import theme from '../theme'
import Web3Provider from '../components/providers/Web3Provider'
import AuthProvider from '../components/providers/AuthProvider'
import { AppProps } from 'next/app'
import BiconomyProvider from '../components/providers/BiconomyProvider'

const queryClient = new QueryClient()

function renderSnippet() {
  const opts = {
    apiKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY,
    // note: the page option only covers SSR tracking.
    // Page.js is used to track other events using `window.analytics.page()`
    page: true,
  }

  if (process.env.NODE_ENV === 'development') {
    return snippet.max(opts)
  }

  return snippet.min(opts)
}

// Start the mocking conditionally.
if (process.env.NODE_ENV === 'development') {
  require('../mocks')
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Web3Provider>
        <AuthProvider>
          <BiconomyProvider>
            <QueryClientProvider client={queryClient}>
              {/* Inject the Segment snippet into the <head> of the document  */}
              <Script id="segment-script" dangerouslySetInnerHTML={{ __html: renderSnippet() }} />
              <Component {...pageProps} />
            </QueryClientProvider>
          </BiconomyProvider>
        </AuthProvider>
      </Web3Provider>
    </ChakraProvider>
  )
}

export default App
