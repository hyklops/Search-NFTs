import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "../components/Navbar";

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "NFT Marketplace",
  chains,
});

const demoAppInfo = {
  appName: "NFT Marketplace",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

console.log(webSocketProvider);

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
        <Navbar />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
