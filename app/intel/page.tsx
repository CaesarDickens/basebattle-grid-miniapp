import { CONTRACT_ADDRESS } from "@/lib/contract";

const actions = [
  { title: "Attack", desc: "High risk and high variance. Win bigger or get knocked out." },
  { title: "Defend", desc: "A cautious move that grants a smaller fixed reward." },
  { title: "Farm", desc: "A growth-focused option with reliable, steady upside." },
];

export default function IntelPage() {
  return (
    <main className="page-shell">
      <section className="page-header">
        <span className="eyebrow">Rules and Contract</span>
        <h1>Intel Room</h1>
        <p>Find the round logic, contract address, Builder Code setup, and verification tags in one place.</p>
      </section>

      <section className="content-grid">
        <article className="game-card">
          <span className="card-tag">Rule Snapshot</span>
          <h2>One round every 20 seconds</h2>
          <p>
            The contract uses lazy round updates. Players join, choose actions by
            round, and resolve their own outcomes for rewards or elimination.
          </p>
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
          <span className="card-tag card-tag--orange">Onchain Details</span>
          <h2>Live project data</h2>
          <div className="stack-list">
            <div className="soft-panel">
              <strong>Contract Address</strong>
              <p className="mono">{CONTRACT_ADDRESS}</p>
            </div>
            <div className="soft-panel">
              <strong>Base App ID</strong>
              <p className="mono">69c602c4638fc70642e5499c</p>
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
