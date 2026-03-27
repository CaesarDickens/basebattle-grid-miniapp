import Link from "next/link";
import { StatBubble } from "@/components/stat-bubble";

const highlights = [
  { label: "玩法类型", value: "Commit-Reveal PvP" },
  { label: "入场门槛", value: "0.00001 ETH+" },
  { label: "合约网络", value: "Base Mainnet" },
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">Base Mini App · GameFi</span>
          <h1>BaseBattle Grid</h1>
          <p>
            在糖果棋盘上布阵、选择攻守农三种行动，并把每一步都写进 Base 链。每次出战都是一次轻策略与运气并存的桌游对决。
          </p>
          <div className="hero-actions">
            <Link href="/arena" className="bubble-button bubble-button--primary">
              进入战场
            </Link>
            <Link href="/intel" className="bubble-button bubble-button--ghost">
              查看规则
            </Link>
          </div>
        </div>

        <div className="board-preview" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className={`tile tile-${index % 3}`}>
              <span>{["⚔", "🛡", "⭐"][index % 3]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-grid">
        {highlights.map((item) => (
          <StatBubble key={item.label} label={item.label} value={item.value} />
        ))}
      </section>

      <section className="content-grid">
        <article className="game-card">
          <span className="card-tag">游戏主循环</span>
          <h2>先入场，再布阵，随后结算</h2>
          <p>入场后可在每回合选择攻击、防守或发育。攻击风险最高，发育最稳定，防守更像稳健过渡。</p>
          <Link href="/arena" className="text-link">
            去体验主交易路径
          </Link>
        </article>

        <article className="game-card">
          <span className="card-tag card-tag--orange">合约情报</span>
          <h2>透明链上规则</h2>
          <p>已接入合约地址、交易归因埋点与 Base attribution 结构，后续只需替换 Builder Code 真值即可完成最终验证。</p>
          <Link href="/intel" className="text-link">
            查看合约与 metadata
          </Link>
        </article>
      </section>
    </main>
  );
}
