import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "BaseBattle Grid",
  description: "An onchain strategy battle game where players stake, plan, and compete for rewards.",
  applicationName: "BaseBattle Grid",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://basebattle-grid-miniapp.vercel.app",
  ),
  openGraph: {
    title: "BaseBattle Grid",
    description: "A playful, board-game inspired strategy Mini App built on Base.",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://basebattle-grid-miniapp.vercel.app",
    siteName: "BaseBattle Grid",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BaseBattle Grid",
    description: "Stake, choose your move, resolve the round, and claim rewards on Base.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69c602c4638fc70642e5499c" />
        <meta
          name="talentapp:project_verification"
          content="130ee9b2ef45567e4fa23e703059bf261e2e1c41c388700013f7fbf346db84a2e67c1b63a122ddf405866cbc478bfa94c840305ad132f8d6052c3653c7ca3d4d"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FFF8E7" />
      </head>
      <body className="app-body">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
