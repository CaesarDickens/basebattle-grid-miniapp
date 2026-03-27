"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectLaunchButton } from "@/components/connect-launch-button";

const links = [
  { href: "/", label: "主城" },
  { href: "/arena", label: "战场" },
  { href: "/rewards", label: "奖励" },
  { href: "/intel", label: "情报" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">♞</div>
          <div className="brand-copy">
            <strong>BaseBattle Grid</strong>
            <span>On-chain Strategy PvP Game</span>
          </div>
        </div>

        <nav className="nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-pill ${pathname === link.href ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <ConnectLaunchButton />
      </header>

      {children}
    </div>
  );
}
