const steps = [
  "Connect your wallet and pay the entry fee.",
  "Choose Attack, Defend, or Farm on the board.",
  "Wait for the next round, then run Resolve.",
  "If your character is out, use Claim to withdraw rewards.",
];

export default function RewardsPage() {
  return (
    <main className="page-shell">
      <section className="page-header">
        <span className="eyebrow">Progress Path</span>
        <h1>Rewards and Strategy</h1>
        <p>This page reads like a playful board-game guide, not a generic crypto dashboard.</p>
      </section>

      <section className="content-grid">
        <article className="game-card">
          <span className="card-tag">Match Rhythm</span>
          <h2>Finish one battle in four steps</h2>
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
          <span className="card-tag card-tag--orange">Strategy Tips</span>
          <h2>A friendly opening route</h2>
          <p>
            New players should start with Farm to feel the pace of each round,
            then mix in Attack once the flow is familiar. Defend works well as a
            safer bridge between riskier turns.
          </p>
          <div className="strategy-grid">
            <div className="chip chip-blue">Steady Growth</div>
            <div className="chip chip-orange">Burst Push</div>
            <div className="chip chip-cream">Round Watch</div>
          </div>
        </article>
      </section>
    </main>
  );
}
