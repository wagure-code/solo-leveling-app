import type { Metadata } from "next";
import { Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/nav/BottomNav";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "STATUS — Quest System",
  description: "Habit tracker bergaya jendela status Solo Leveling",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${rajdhani.variable} ${jetbrainsMono.variable}`}>
      <body className="font-mono antialiased">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}