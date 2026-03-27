"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectLaunchButton } from "@/components/connect-launch-button";

const links = [
  { href: "/", label: "Home" },
  { href: "/arena", label: "Arena" },
  { href: "/rewards", label: "Rewards" },
  { href: "/intel", label: "Intel" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">B</div>
          <div className="brand-copy">
            <strong>BaseBattle Grid</strong>
            <span>Onchain Strategy PvP Game</span>
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
