import { ArenaClient } from "@/components/arena-client";

export default function ArenaPage() {
  return (
    <main className="page-shell">
      <section className="page-header">
        <span className="eyebrow">Main Transaction Flow</span>
        <h1>Arena Console</h1>
        <p>
          Connect your wallet and move through join, act, resolve, and claim.
          Every successful write keeps attribution tracking attached.
        </p>
      </section>
      <ArenaClient />
    </main>
  );
}
