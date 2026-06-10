import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ValpMatch",
  description: "Hitta hundrasen som passar ditt liv med ValpMatch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
