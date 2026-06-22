import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { siteUrl } from "./seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ValpMatch – hitta hundrasen som passar ditt liv",
    template: "%s",
  },
  description:
    "Hitta hundrasen som passar ditt liv med ValpMatchs quiz och hundrasguide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinkStyle = {
    color: "#222",
    fontWeight: 700,
    textDecoration: "none",
  };

  return (
    <html
      lang="sv"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <header
          style={{
            background: "#f5efe8",
            borderBottom: "1px solid rgba(249, 115, 22, 0.22)",
            padding: "18px 40px",
          }}
        >
          <nav
            aria-label="Huvudnavigation"
            style={{
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
              gap: "14px 24px",
              justifyContent: "space-between",
              margin: "0 auto",
              maxWidth: 1200,
            }}
          >
            <Link
              href="/"
              style={{
                color: "#f97316",
                fontSize: 22,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              🐶 ValpMatch
            </Link>

            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                gap: 18,
              }}
            >
              <Link href="/" style={navLinkStyle}>
                Startsida
              </Link>
              <Link href="/raser" style={navLinkStyle}>
                Hundraser
              </Link>
              <Link href="/uppfodare" style={navLinkStyle}>
                Uppfödare
              </Link>
              <Link href="/" style={navLinkStyle}>
                Quiz
              </Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
