import type { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "ValpMatch – hitta hundrasen som passar ditt liv",
  description:
    "Gör ValpMatchs enkla hundquiz och få förslag på hundraser som passar ditt boende, din aktivitetsnivå och din vardag.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ValpMatch – hitta hundrasen som passar ditt liv",
    description:
      "Jämför hundraser och få personliga rekommendationer utifrån hur du lever.",
    url: "/",
    siteName: "ValpMatch",
    locale: "sv_SE",
    type: "website",
  },
};

export default function Home() {
  return <HomeClient />;
}
