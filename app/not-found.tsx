import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">Route Missing</span>
          <h1>This tile is hidden</h1>
          <p>The page you tried to visit is not part of the current board. Jump back into the map below.</p>
          <div className="hero-actions">
            <Link href="/" className="bubble-button bubble-button--primary">
              Return Home
            </Link>
            <Link href="/arena" className="bubble-button bubble-button--ghost">
              Open Arena
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
