import Script from "next/script";
import * as snippet from "@segment/snippet";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import Web3Provider from "../components/providers/Web3Provider";
import AuthProvider from "../components/providers/AuthProvider";

function renderSnippet() {
  const opts = {
    apiKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY,
    // note: the page option only covers SSR tracking.
    // Page.js is used to track other events using `window.analytics.page()`
    page: true,
  };

  if (process.env.NODE_ENV === "development") {
    return snippet.max(opts);
  }

  return snippet.min(opts);
}

// Start the mocking conditionally.
if (process.env.NODE_ENV === "development") {
  require("../mocks");
}

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Web3Provider>
        <AuthProvider>
          {/* Inject the Segment snippet into the <head> of the document  */}
          <Script
            id="segment-script"
            dangerouslySetInnerHTML={{ __html: renderSnippet() }}
          />
          <Component {...pageProps} />
        </AuthProvider>
      </Web3Provider>
    </ChakraProvider>
  );
};

export default App;
