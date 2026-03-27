import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base } from "wagmi/chains";
import { DATA_SUFFIX } from "@/lib/wagmi";

export const wagmiConfig = getDefaultConfig({
  appName: "BaseBattle Grid",
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
    "basebattle-grid-demo-project-id",
  chains: [base],
  ssr: true,
  dataSuffix: DATA_SUFFIX,
});
