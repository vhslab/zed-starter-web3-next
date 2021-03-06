import '@fontsource/montserrat/300.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'

import Script from 'next/script'
import { AppProps } from 'next/app'
import * as snippet from '@segment/snippet'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { withLDProvider } from 'launchdarkly-react-client-sdk'

import Web3Provider from '../components/providers/Web3Provider'
import AuthProvider from '../components/providers/AuthProvider'
import BiconomyProvider from '../components/providers/BiconomyProvider'
import SignInModal from '../components/SignInModal'
import { DatadogRumProvider } from '../hooks/useDatadogRum'
import { DatadogLoggerProvider } from '../hooks/useDatadogLogger'
import theme from '../theme'

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
    <DatadogRumProvider>
      <DatadogLoggerProvider>
        <ChakraProvider theme={theme}>
          <Web3Provider>
            <AuthProvider>
              <BiconomyProvider>
                <QueryClientProvider client={queryClient}>
                  {/* Inject the Segment snippet into the <head> of the document  */}
                  <Script
                    id="segment-script"
                    dangerouslySetInnerHTML={{ __html: renderSnippet() }}
                  />
                  <Component {...pageProps} />
                  <SignInModal />
                </QueryClientProvider>
              </BiconomyProvider>
            </AuthProvider>
          </Web3Provider>
        </ChakraProvider>
      </DatadogLoggerProvider>
    </DatadogRumProvider>
  )
}

export default withLDProvider<AppProps>({
  clientSideID: process.env.NEXT_PUBLIC_LAUNCH_DARKLY_CLIENT_SIDE_ID,
  options: {
    autoAliasingOptOut: true,
    bootstrap: 'localStorage',
  },
})(App)
