"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { base } from "wagmi/chains";

export function ConnectLaunchButton() {
  const [isMobile, setIsMobile] = useState(false);
  const { address, chain, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChainAsync, isPending: isSwitching } = useSwitchChain();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent));
  }, []);

  const supportedConnectors = useMemo(
    () =>
      connectors.filter((connector) =>
        ["injected", "coinbaseWalletSDK", "coinbaseWallet"].includes(connector.id),
      ),
    [connectors],
  );
  const hasInjected = supportedConnectors.some((connector) => connector.id === "injected");

  if (!isConnected) {
    return (
      <div className="wallet-menu">
        {isMobile && !hasInjected ? (
          <>
            <button
              className="bubble-button bubble-button--accent"
              onClick={openCoinbaseWallet}
              type="button"
            >
              Open in Coinbase Wallet
            </button>
            <span className="wallet-hint">
              Mobile browsers usually cannot inject a wallet here. Open this app
              inside Coinbase Wallet or another wallet-enabled browser.
            </span>
          </>
        ) : null}
        {supportedConnectors.map((connector) => (
          <button
            key={connector.uid}
            className={
              connector.id === "injected"
                ? "bubble-button bubble-button--ghost"
                : "bubble-button bubble-button--accent"
            }
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

function openCoinbaseWallet() {
  if (typeof window === "undefined") return;
  const targetUrl = encodeURIComponent(window.location.href);
  window.location.href = `https://go.cb-w.com/dapp?cb_url=${targetUrl}`;
}

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
