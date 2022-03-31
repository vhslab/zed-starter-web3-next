import CoinbaseWalletCard from '../components/connectors/CoinbaseWalletCard'
import MetaMaskCard from '../components/connectors/MetaMaskCard'
import NetworkCard from '../components/connectors/NetworkCard'
import WalletConnectCard from '../components/connectors/WalletConnectCard'

export default function Home() {
  return (
    <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
      <MetaMaskCard />
      <WalletConnectCard />
      <CoinbaseWalletCard />
      <NetworkCard />
    </div>
  )
}
