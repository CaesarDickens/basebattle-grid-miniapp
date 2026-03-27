import { CONTRACT_ADDRESS } from "@/lib/contract";

const actions = [
  { title: "Attack", desc: "高风险高波动，50% 概率获得更高奖励，否则直接出局。" },
  { title: "Defend", desc: "稳健保守，本回合固定小额奖励。" },
  { title: "Farm", desc: "偏发育路线，固定收益略高于防守。" },
];

export default function IntelPage() {
  return (
    <main className="page-shell">
      <section className="page-header">
        <span className="eyebrow">规则与合约</span>
        <h1>情报中心</h1>
        <p>这里集中展示回合逻辑、合约地址、Builder Code 接入点与验证标签。</p>
      </section>

      <section className="content-grid">
        <article className="game-card">
          <span className="card-tag">规则速览</span>
          <h2>20 秒一回合</h2>
          <p>合约采用懒更新回合机制。玩家加入后可按回合提交行动，再由自己触发结算获得奖励或出局。</p>
          <div className="stack-list">
            {actions.map((item) => (
              <div key={item.title} className="soft-panel">
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="game-card">
          <span className="card-tag card-tag--orange">链上信息</span>
          <h2>正式链上目标</h2>
          <div className="stack-list">
            <div className="soft-panel">
              <strong>合约地址</strong>
              <p className="mono">{CONTRACT_ADDRESS}</p>
            </div>
            <div className="soft-panel">
              <strong>Base App ID</strong>
              <p className="mono">69c22f7b3c2c56b9bbd2f616</p>
            </div>
            <div className="soft-panel">
              <strong>Talent Verification</strong>
              <p className="mono compact">
                130ee9b2ef45567e4fa23e703059bf261e2e1c41c388700013f7fbf346db84a2e67c1b63a122ddf405866cbc478bfa94c840305ad132f8d6052c3653c7ca3d4d
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
