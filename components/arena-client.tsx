"use client";

import { useEffect, useMemo, useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount, usePublicClient, useReadContracts, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS, GAME_ABI } from "@/lib/contract";
import { trackTransaction } from "@/utils/track";

const actions = [
  {
    id: 1,
    label: "Attack",
    title: "Strike Tile",
    description: "Take the highest-risk path for the biggest upside.",
    estimate: "+15 / KO risk",
  },
  {
    id: 2,
    label: "Defend",
    title: "Shield Tile",
    description: "Play safely and secure a smaller fixed reward.",
    estimate: "+5",
  },
  {
    id: 3,
    label: "Farm",
    title: "Supply Tile",
    description: "Choose the steadiest route and grow with less drama.",
    estimate: "+8",
  },
];

type FeedbackState = {
  kind: "idle" | "working" | "success" | "error";
  message: string;
};

export function ArenaClient() {
  const [selectedAction, setSelectedAction] = useState<number>(3);
  const [stake, setStake] = useState("0.00001");
  const [feedback, setFeedback] = useState<FeedbackState>({
    kind: "idle",
    message: "Connect your wallet to start the match.",
  });
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  const { data, refetch } = useReadContracts({
    allowFailure: false,
    contracts: [
      { address: CONTRACT_ADDRESS, abi: GAME_ABI, functionName: "entryFee" },
      { address: CONTRACT_ADDRESS, abi: GAME_ABI, functionName: "currentRound" },
      { address: CONTRACT_ADDRESS, abi: GAME_ABI, functionName: "pool" },
      {
        address: CONTRACT_ADDRESS,
        abi: GAME_ABI,
        functionName: "players",
        args: [address ?? "0x0000000000000000000000000000000000000000"],
      },
    ],
    query: { enabled: Boolean(address) },
  });

  const entryFee = (data?.[0] as bigint | undefined) ?? parseEther("0.00001");
  const currentRound = (data?.[1] as bigint | undefined) ?? 0n;
  const pool = (data?.[2] as bigint | undefined) ?? 0n;
  const player = data?.[3] as
    | {
        balance: bigint;
        lastRound: bigint;
        action: bigint;
        alive: boolean;
      }
    | undefined;

  const selectedActionMeta = useMemo(
    () => actions.find((item) => item.id === selectedAction) ?? actions[2],
    [selectedAction],
  );

  useEffect(() => {
    if (Number(stake) < Number(formatEther(entryFee))) {
      setStake(formatEther(entryFee));
    }
  }, [entryFee, stake]);

  async function runTransaction(label: string, config: any) {
    if (!address || !publicClient) {
      setFeedback({ kind: "error", message: "Please connect your wallet first." });
      return;
    }

    try {
      setFeedback({ kind: "working", message: `${label} submitted. Confirm it in your wallet.` });
      const hash = await writeContractAsync(config);
      setFeedback({ kind: "working", message: `${label} sent. Waiting for onchain confirmation.` });
      await publicClient.waitForTransactionReceipt({ hash });
      trackTransaction("app-001", "BaseBattle Grid", address, hash);
      setFeedback({ kind: "success", message: `${label} succeeded. Tx hash: ${hash}` });
      await refetch();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : `${label} failed. Please try again.`;
      setFeedback({ kind: "error", message });
    }
  }

  return (
    <section className="arena-grid">
      <article className="panel-card">
        <div className="board-card">
          <span className="card-tag">Board Selection</span>
          <h2>Choose your move</h2>
          <p className="muted">
            Pick one tile for this round. The action copy stays game-like instead
            of using generic transaction wording.
          </p>

          <div className="arena-board">
            {actions.map((action) => (
              <button
                key={action.id}
                type="button"
                className={`arena-cell ${selectedAction === action.id ? "selected" : ""}`}
                onClick={() => setSelectedAction(action.id)}
              >
                <strong>{action.title}</strong>
                <span>{action.estimate}</span>
              </button>
            ))}
          </div>

          <div className="soft-panel">
            <strong>{selectedActionMeta.label}</strong>
            <p>{selectedActionMeta.description}</p>
          </div>

          <div className="slider-wrap">
            <label htmlFor="stake">
              <strong>Stake Size (ETH)</strong>
            </label>
            <input
              id="stake"
              type="range"
              min={Number(formatEther(entryFee))}
              max={0.002}
              step={0.00001}
              value={Number(stake)}
              onChange={(event) => setStake(event.target.value)}
            />
            <input
              type="number"
              min={Number(formatEther(entryFee))}
              step={0.00001}
              value={stake}
              onChange={(event) => setStake(event.target.value)}
            />
            <span className="status-pill">
              Potential outcome: {stake} ETH + {selectedActionMeta.estimate}
            </span>
          </div>

          <div className="cta-row">
            <button
              type="button"
              className="bubble-button bubble-button--primary"
              disabled={!isConnected}
              onClick={() =>
                runTransaction("Start Match", {
                  address: CONTRACT_ADDRESS,
                  abi: GAME_ABI,
                  functionName: "join",
                  value: parseEther(stake),
                })
              }
            >
              Start Match
            </button>

            <button
              type="button"
              className="bubble-button bubble-button--accent"
              disabled={!isConnected}
              onClick={() =>
                runTransaction("Confirm Move", {
                  address: CONTRACT_ADDRESS,
                  abi: GAME_ABI,
                  functionName: "act",
                  args: [selectedAction],
                })
              }
            >
              Confirm Move
            </button>

            <button
              type="button"
              className="bubble-button bubble-button--ghost"
              disabled={!isConnected}
              onClick={() =>
                runTransaction("Resolve Round", {
                  address: CONTRACT_ADDRESS,
                  abi: GAME_ABI,
                  functionName: "resolve",
                })
              }
            >
              Resolve Round
            </button>

            <button
              type="button"
              className="bubble-button bubble-button--ghost"
              disabled={!isConnected}
              onClick={() =>
                runTransaction("Claim Rewards", {
                  address: CONTRACT_ADDRESS,
                  abi: GAME_ABI,
                  functionName: "claim",
                })
              }
            >
              Claim Rewards
            </button>
          </div>

          <div className="feedback">{feedback.message}</div>
        </div>
      </article>

      <article className="panel-card">
        <span className="card-tag card-tag--orange">Live Status</span>
        <h2>Onchain battle report</h2>
        <div className="info-grid">
          <div className="keyline">
            <span>Current Round</span>
            <span>{currentRound.toString()}</span>
          </div>
          <div className="keyline">
            <span>Entry Fee</span>
            <span>{formatEther(entryFee)} ETH</span>
          </div>
          <div className="keyline">
            <span>Prize Pool</span>
            <span>{formatEther(pool)} ETH</span>
          </div>
          <div className="keyline">
            <span>Player Balance</span>
            <span>{player ? player.balance.toString() : "--"}</span>
          </div>
          <div className="keyline">
            <span>Status</span>
            <span>{player?.alive ? "Alive" : "Waiting / Out"}</span>
          </div>
          <div className="keyline">
            <span>Last Action</span>
            <span>{player?.action?.toString() ?? "0"}</span>
          </div>
        </div>

        <div className="stack-list">
          <div className="soft-panel">
            <strong>Main flow</strong>
            <p>Join → Act → Resolve → Claim</p>
          </div>
          <div className="soft-panel">
            <strong>Transaction tracking</strong>
            <p>Every successful write calls trackTransaction with the live wallet and tx hash.</p>
          </div>
          <div className="soft-panel">
            <strong>ERC-8021 Builder Code</strong>
            <p>The wagmi config now uses the live data suffix for Base attribution.</p>
          </div>
        </div>
      </article>
    </section>
  );
}
