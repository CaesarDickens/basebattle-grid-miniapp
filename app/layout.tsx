import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "BaseBattle Grid",
  description: "链上布阵对战游戏，下注参与胜负博弈赢取奖励。",
  applicationName: "BaseBattle Grid",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://basebattle-grid.vercel.app",
  ),
  openGraph: {
    title: "BaseBattle Grid",
    description: "儿童桌游感的 Base 链上轻策略对战 Mini App。",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://basebattle-grid.vercel.app",
    siteName: "BaseBattle Grid",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BaseBattle Grid",
    description: "链上布阵对战游戏，下注参与胜负博弈赢取奖励。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="base:app_id" content="69c22f7b3c2c56b9bbd2f616" />
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
