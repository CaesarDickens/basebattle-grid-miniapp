import { ArenaClient } from "@/components/arena-client";

export default function ArenaPage() {
  return (
    <main className="page-shell">
      <section className="page-header">
        <span className="eyebrow">主交易路径</span>
        <h1>战场指挥台</h1>
        <p>连接钱包后依次完成入场、行动、结算、提现。交易成功后会自动写入归因埋点。</p>
      </section>
      <ArenaClient />
    </main>
  );
}
