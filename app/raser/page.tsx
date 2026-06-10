"use client";

import Link from "next/link";
import { useState } from "react";
import { dogs } from "../../data/dogs";

export default function RaserPage() {
  const [search, setSearch] = useState("");
  const filteredDogs = dogs.filter((dog) =>
    dog.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main
      style={{
        padding: 40,
        background: "#f5efe8",
        minHeight: "100vh",
          color: "#222",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        🐶 Alla Hundraser
      </h1>

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Sök hundras"
        style={{
          display: "block",
          width: "100%",
          maxWidth: 500,
          margin: "0 auto 32px",
          padding: "14px 18px",
          borderRadius: 999,
          border: "1px solid #ddd",
          fontSize: 18,
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
    {filteredDogs.map((dog) => (
  <Link
    key={dog.name}
    href={`/raser/${dog.slug ?? dog.name.toLowerCase().replaceAll(" ", "-")}`}
    style={{
      textDecoration: "none",
      color: "inherit",
    }}
  >
    <div
      style={{
        background: "white",
        borderRadius: 20,
        padding: 20,
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <img
        src={dog.image}
        alt={dog.name}
        style={{
          width: "100%",
          height: 220,
          objectFit: "cover",
          borderRadius: 16,
        }}
      />

      <h2>{dog.name}</h2>

      <p>{dog.description}</p>
      <section style={{ marginTop: 30 }}>
  <h2>Passar {dog.name} mig?</h2>

  <p>
    {dog.name} kan passa dig som vill ha en hund i storleken{" "}
    <strong>{dog.size.toLowerCase()}</strong>, med aktivitetsnivån{" "}
    <strong>{dog.activity.toLowerCase()}</strong>.
  </p>

  <h3>✅ Passar ofta bra för dig som:</h3>
  <ul>
    <li>Vill ha en hund som passar ditt boende</li>
    <li>Vill ha en hund med tydlig personlighet</li>
    <li>Vill jämföra hundraser innan du väljer valp</li>
  </ul>

  <h3>❌ Kan passa sämre om:</h3>
  <ul>
    <li>Du inte har tid för daglig motion och aktivering</li>
    <li>Du vill välja hund enbart efter utseende</li>
    <li>Du inte vill läsa på om rasens behov innan köp</li>
  </ul>
</section>

      <p>📏 Storlek: {dog.size}</p>
      <p>⚡ Aktivitet: {dog.activity}</p>
      <p>⚖️ Vikt: {dog.weight}</p>
      <p>❤️ Livslängd: {dog.life}</p>
    </div>
  </Link>
))}
 </div>
    </main>
  );
}
