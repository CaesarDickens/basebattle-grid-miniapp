"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function ConnectLaunchButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        mounted,
        openAccountModal,
        openChainModal,
        openConnectModal,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!connected) {
          return (
            <button
              className="bubble-button bubble-button--accent"
              onClick={openConnectModal}
              type="button"
            >
              游戏开始
            </button>
          );
        }

        if (chain.unsupported) {
          return (
            <button
              className="bubble-button bubble-button--ghost"
              onClick={openChainModal}
              type="button"
            >
              切换到 Base
            </button>
          );
        }

        return (
          <button
            className="bubble-button bubble-button--primary"
            onClick={openAccountModal}
            type="button"
          >
            {account.displayName}
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}
