const steps = [
  "连接钱包并支付入场费。",
  "在棋盘上选择 Attack / Defend / Farm。",
  "等待或推进到新回合后执行 Resolve。",
  "若角色淘汰，则可执行 Claim 提现奖励。",
];

export default function RewardsPage() {
  return (
    <main className="page-shell">
      <section className="page-header">
        <span className="eyebrow">成长路线</span>
        <h1>奖励与策略</h1>
        <p>不是传统炒币仪表盘，而是一张带路线感与收益预期的桌游说明书。</p>
      </section>

      <section className="content-grid">
        <article className="game-card">
          <span className="card-tag">对局节奏</span>
          <h2>四步完成一轮出战</h2>
          <div className="stack-list">
            {steps.map((step, index) => (
              <div key={step} className="soft-panel">
                <strong>Step {index + 1}</strong>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="game-card">
          <span className="card-tag card-tag--orange">策略建议</span>
          <h2>适合新手的开局</h2>
          <p>初次体验更推荐先用 Farm 感受回合节奏，再在熟悉后切换 Attack。Defend 适合作为中途保守过渡。</p>
          <div className="strategy-grid">
            <div className="chip chip-blue">稳健发育</div>
            <div className="chip chip-orange">冲刺爆发</div>
            <div className="chip chip-cream">回合观察</div>
          </div>
        </article>
      </section>
    </main>
  );
}
