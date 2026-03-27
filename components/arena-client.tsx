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
    title: "猛攻格",
    description: "赌一次高风险突进，成功有更高奖励。",
    estimate: "+15 / 可能出局",
  },
  {
    id: 2,
    label: "Defend",
    title: "护盾格",
    description: "稳健防守，拿固定小额奖励。",
    estimate: "+5",
  },
  {
    id: 3,
    label: "Farm",
    title: "补给格",
    description: "轻松发育，获得稳定收益。",
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
    message: "连接钱包后就可以出战。",
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
      setFeedback({ kind: "error", message: "请先连接钱包。" });
      return;
    }

    try {
      setFeedback({ kind: "working", message: `${label}提交中，请在钱包里确认。` });
      const hash = await writeContractAsync(config);
      setFeedback({ kind: "working", message: `${label}已广播，等待链上确认。` });
      await publicClient.waitForTransactionReceipt({ hash });
      trackTransaction("app-001", "BaseBattle Grid", address, hash);
      setFeedback({ kind: "success", message: `${label}成功，交易哈希：${hash}` });
      await refetch();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : `${label}失败，请稍后重试。`;
      setFeedback({ kind: "error", message });
    }
  }

  return (
    <section className="arena-grid">
      <article className="panel-card">
        <div className="board-card">
          <span className="card-tag">棋盘选择</span>
          <h2>出战动作</h2>
          <p className="muted">
            选中一个格子作为本回合行动。按钮文案已替换为更游戏化的“开始对局 / 出战确认”。
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
              <strong>下注额度（ETH）</strong>
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
              可能赢得奖励：{stake} ETH + {selectedActionMeta.estimate}
            </span>
          </div>

          <div className="cta-row">
            <button
              type="button"
              className="bubble-button bubble-button--primary"
              disabled={!isConnected}
              onClick={() =>
                runTransaction("开始对局", {
                  address: CONTRACT_ADDRESS,
                  abi: GAME_ABI,
                  functionName: "join",
                  value: parseEther(stake),
                })
              }
            >
              开始对局
            </button>

            <button
              type="button"
              className="bubble-button bubble-button--accent"
              disabled={!isConnected}
              onClick={() =>
                runTransaction("出战确认", {
                  address: CONTRACT_ADDRESS,
                  abi: GAME_ABI,
                  functionName: "act",
                  args: [selectedAction],
                })
              }
            >
              出战确认
            </button>

            <button
              type="button"
              className="bubble-button bubble-button--ghost"
              disabled={!isConnected}
              onClick={() =>
                runTransaction("战局结算", {
                  address: CONTRACT_ADDRESS,
                  abi: GAME_ABI,
                  functionName: "resolve",
                })
              }
            >
              战局结算
            </button>

            <button
              type="button"
              className="bubble-button bubble-button--ghost"
              disabled={!isConnected}
              onClick={() =>
                runTransaction("领取奖励", {
                  address: CONTRACT_ADDRESS,
                  abi: GAME_ABI,
                  functionName: "claim",
                })
              }
            >
              领取奖励
            </button>
          </div>

          <div className="feedback">{feedback.message}</div>
        </div>
      </article>

      <article className="panel-card">
        <span className="card-tag card-tag--orange">实时状态</span>
        <h2>链上战报</h2>
        <div className="info-grid">
          <div className="keyline">
            <span>当前回合</span>
            <span>{currentRound}</span>
          </div>
          <div className="keyline">
            <span>入场费</span>
            <span>{formatEther(entryFee)} ETH</span>
          </div>
          <div className="keyline">
            <span>奖池</span>
            <span>{formatEther(pool)} ETH</span>
          </div>
          <div className="keyline">
            <span>玩家余额</span>
            <span>{player ? player.balance.toString() : "--"}</span>
          </div>
          <div className="keyline">
            <span>存活状态</span>
            <span>{player?.alive ? "Alive" : "Waiting / Out"}</span>
          </div>
          <div className="keyline">
            <span>上次动作</span>
            <span>{player?.action?.toString() ?? "0"}</span>
          </div>
        </div>

        <div className="stack-list">
          <div className="soft-panel">
            <strong>主交易路径</strong>
            <p>Join → Act → Resolve → Claim</p>
          </div>
          <div className="soft-panel">
            <strong>交易归因</strong>
            <p>所有成功交易会触发 `trackTransaction(app-001, BaseBattle Grid, address, txHash)`。</p>
          </div>
          <div className="soft-panel">
            <strong>8021 Builder Code</strong>
            <p>已在 wagmi 配置中预留 dataSuffix，等待你提供真实 Builder Code 以完成最终验证。</p>
          </div>
        </div>
      </article>
    </section>
  );
}
