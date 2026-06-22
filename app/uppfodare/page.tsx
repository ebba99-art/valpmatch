import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hitta uppfödare | ValpMatch",
  description:
    "En kommande ValpMatch-funktion med vägledning för dig som vill hitta en seriös hunduppfödare.",
  alternates: {
    canonical: "/uppfodare",
  },
};

export default function UppfodarePage() {
  return (
    <main
      style={{
        background: "#fff7ed",
        color: "#2f2f2f",
        minHeight: "100vh",
        padding: 40,
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: 900,
        }}
      >
        <section
          style={{
            margin: "60px 0 32px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: 48,
              marginBottom: 18,
            }}
          >
            Hitta uppfödare
          </h1>

          <p
            style={{
              color: "#555",
              fontSize: 20,
              lineHeight: 1.6,
              margin: "0 auto",
              maxWidth: 720,
            }}
          >
            Den här sidan är en kommande funktion i ValpMatch. Tanken är att
            hjälpa dig vidare från rätt hundras till trygga, genomtänkta val
            när du börjar leta efter uppfödare.
          </p>
        </section>

        <section
          style={{
            background: "white",
            borderRadius: 24,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            padding: 30,
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Att tänka på när du väljer uppfödare
          </h2>

          <ul
            style={{
              fontSize: 18,
              lineHeight: 1.8,
              paddingLeft: 24,
            }}
          >
            <li>Välj en seriös uppfödare som är öppen med hundarnas vardag.</li>
            <li>Fråga efter relevanta hälsotester för rasen.</li>
            <li>Träffa valpen och tiken i en lugn miljö innan du bestämmer dig.</li>
            <li>Ställ frågor om temperament, socialisering och tidigare kullar.</li>
            <li>Undvik stressade köp och var beredd att vänta på rätt valp.</li>
          </ul>

          <a
            href="https://www.skk.se/"
            rel="noopener noreferrer"
            target="_blank"
            style={{
              background: "#f97316",
              borderRadius: 999,
              color: "white",
              display: "inline-block",
              fontWeight: "bold",
              marginTop: 18,
              padding: "14px 24px",
              textDecoration: "none",
            }}
          >
            Läs mer hos Svenska Kennelklubben
          </a>
        </section>
      </div>
    </main>
  );
}
