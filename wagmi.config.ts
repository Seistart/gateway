import { type Chain } from "viem"
import { createConfig, http } from "wagmi"

export const sei_testnet = {
  id: 713715,
  name: "Sei",
  nativeCurrency: { name: "Sei", symbol: "SEI", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://evm-rpc-arctic-1.sei-apis.com"] },
  },
  blockExplorers: {
    default: { name: "seistream", url: "https://seistream.app" },
  },
  contracts: {},
} as const satisfies Chain
export const config = createConfig({
  chains: [sei_testnet],
  multiInjectedProviderDiscovery: true,
  ssr: true,
  transports: {
    [sei_testnet.id]: http(),
  },
})
