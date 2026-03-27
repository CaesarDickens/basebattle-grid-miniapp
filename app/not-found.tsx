import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">Route Missing</span>
          <h1>地图走丢了</h1>
          <p>这个棋盘格暂时还没有开放。回到主城或战场继续游戏即可。</p>
          <div className="hero-actions">
            <Link href="/" className="bubble-button bubble-button--primary">
              返回主城
            </Link>
            <Link href="/arena" className="bubble-button bubble-button--ghost">
              进入战场
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
