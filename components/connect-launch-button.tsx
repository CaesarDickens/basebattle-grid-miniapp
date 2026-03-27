"use client";

import { useMemo } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { base } from "wagmi/chains";

export function ConnectLaunchButton() {
  const { address, chain, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChainAsync, isPending: isSwitching } = useSwitchChain();

  const supportedConnectors = useMemo(() => connectors, [connectors]);

  if (!isConnected) {
    return (
      <div className="wallet-menu">
        {supportedConnectors.map((connector) => (
          <button
            key={connector.uid}
            className="bubble-button bubble-button--accent"
            disabled={isPending}
            onClick={() => connect({ connector })}
            type="button"
          >
            {isPending ? "Connecting..." : `Connect ${labelFor(connector.id)}`}
          </button>
        ))}
      </div>
    );
  }

  if (chain?.id !== base.id) {
    return (
      <button
        className="bubble-button bubble-button--ghost"
        disabled={isSwitching}
        onClick={() => switchChainAsync({ chainId: base.id })}
        type="button"
      >
        {isSwitching ? "Switching..." : "Switch to Base"}
      </button>
    );
  }

  return (
    <button
      className="bubble-button bubble-button--primary"
      onClick={() => disconnect()}
      type="button"
      title="Disconnect wallet"
    >
      {address ? shortenAddress(address) : "Connected"}
    </button>
  );
}

function labelFor(id: string) {
  if (id === "coinbaseWalletSDK" || id === "coinbaseWallet") return "Coinbase Wallet";
  return "Browser Wallet";
}

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
