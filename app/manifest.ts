import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Solo Status — Quest System",
    short_name: "Solo Status",
    description: "Habit tracker bergaya jendela status Solo Leveling",
    start_url: "/",
    display: "standalone",
    background_color: "#04060c",
    theme_color: "#04060c",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}