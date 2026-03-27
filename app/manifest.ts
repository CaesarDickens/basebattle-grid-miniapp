import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BaseBattle Grid",
    short_name: "Battle Grid",
    description: "链上布阵对战游戏，下注参与胜负博弈赢取奖励。",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8E7",
    theme_color: "#FFF8E7",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
