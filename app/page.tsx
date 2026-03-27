import Link from "next/link";
import { StatBubble } from "@/components/stat-bubble";

const highlights = [
  { label: "Mode", value: "Commit-Reveal PvP" },
  { label: "Entry", value: "0.00001 ETH+" },
  { label: "Network", value: "Base Mainnet" },
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">Base Mini App · GameFi</span>
          <h1>BaseBattle Grid</h1>
          <p>
            Build your plan on a candy-colored board, choose between attack,
            defense, or farming, and record every move on Base. Every match feels
            like a playful strategy board game with real onchain stakes.
          </p>
          <div className="hero-actions">
            <Link href="/arena" className="bubble-button bubble-button--primary">
              Enter Arena
            </Link>
            <Link href="/intel" className="bubble-button bubble-button--ghost">
              View Rules
            </Link>
          </div>
        </div>

        <div className="board-preview" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className={`tile tile-${index % 3}`}>
              <span>{["A", "D", "F"][index % 3]}</span>
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
          <span className="card-tag">Core Loop</span>
          <h2>Join, plan, resolve, and collect</h2>
          <p>
            After joining the game, each round lets you choose Attack, Defend, or
            Farm. Attack is the swingiest line, Farm is the steadiest route, and
            Defend helps you slow the pace down.
          </p>
          <Link href="/arena" className="text-link">
            Try the main flow
          </Link>
        </article>

        <article className="game-card">
          <span className="card-tag card-tag--orange">Contract Intel</span>
          <h2>Transparent onchain rules</h2>
          <p>
            The contract address, transaction tracking, and Base attribution
            wiring are all live, so gameplay and attribution stay verifiable.
          </p>
          <Link href="/intel" className="text-link">
            Inspect metadata
          </Link>
        </article>
      </section>
    </main>
  );
}
