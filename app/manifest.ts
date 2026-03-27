import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BaseBattle Grid",
    short_name: "Battle Grid",
    description: "An onchain strategy battle game where players stake, plan, and compete for rewards.",
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
