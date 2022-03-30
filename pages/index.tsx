import CoinbaseWalletCard from '../components/connectors/CoinbaseWalletCard'
import MetaMaskCard from '../components/connectors/MetaMaskCard'
import NetworkCard from '../components/connectors/NetworkCard'
import WalletConnectCard from '../components/connectors/WalletConnectCard'
import App from "../components/App";

export default function Home() {
  return (
    <App>
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <MetaMaskCard />
        <WalletConnectCard />
        <CoinbaseWalletCard />
        <NetworkCard />
      </div>
    </App>
  )
}
