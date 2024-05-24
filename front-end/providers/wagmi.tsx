import '@walletconnect/react-native-compat'
import { WagmiConfig } from 'wagmi'
import { mainnet, sepolia } from 'viem/chains'
import { createWeb3Modal, defaultWagmiConfig, Web3Modal } from '@web3modal/wagmi-react-native'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = `${process.env.EXPO_PUBLIC_WALLET_CONNECT_PROJECT_ID}`;

if (!projectId) throw Error('Error: Missing `EXPO_PUBLIC_WALLET_CONNECT_PROJECT_ID`.');

// 2. Create config for our app - defined by our env vars
const metadata = {
    name: `${process.env.EXPO_PUBLIC_METADATA_NAME}`,
    description: `${process.env.EXPO_PUBLIC_METADATA_DESCRIPTION}`,
    url: `${process.env.EXPO_PUBLIC_METADATA_URL}`,
    icons: [`${process.env.EXPO_PUBLIC_METADATA_ICONS}`],
    redirect: {
        native: `${process.env.EXPO_PUBLIC_METADATA_REDIRECT_NATIVE}`,
        universal: `${process.env.EXPO_PUBLIC_METADATA_REDIRECT_UNIVERSAL}`,
    },
};

const chains = [mainnet, sepolia]

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({
    projectId,
    chains,
    wagmiConfig,
    enableAnalytics: true // Optional - defaults to your Cloud configuration
})

// 4. Provider
export default function Wagmi({ children }: { children: React.ReactNode }) {
    return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
};