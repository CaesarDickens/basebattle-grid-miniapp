import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected(),
    coinbaseWallet({
      appName: "BaseBattle Grid",
      preference: "all",
    }),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
  },
  multiInjectedProviderDiscovery: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
