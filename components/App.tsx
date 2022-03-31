import {FC} from "react";
import { ChakraProvider } from '@chakra-ui/react'
import Web3Provider from './Web3Provider'
import theme from "../theme";


const App: FC = ({children}) => (
    <ChakraProvider theme={theme}>
      <Web3Provider>
        {children}
      </Web3Provider>
    </ChakraProvider>
  )

export default App