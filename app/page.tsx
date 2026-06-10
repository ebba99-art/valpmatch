"use client";

import Link from "next/link";
import { useState } from "react";
import { dogs } from "../data/dogs";

const questions = [
  {
    key: "home",
    question: "Hur bor du?",
    options: ["Lägenhet", "Radhus", "Villa", "Gård"],
  },
  {
    key: "activity",
    question: "Hur aktiv är du?",
    options: ["Lugn", "Ganska aktiv", "Mycket aktiv"],
  },
  {
    key: "size",
    question: "Vilken storlek vill du ha?",
    options: ["Liten", "Mellan", "Stor"],
  },
  {
    key: "children",
    question: "Finns barn i hemmet?",
    options: ["Ja", "Nej"],
  },
  {
    key: "grooming",
    question: "Hur mycket pälsvård vill du lägga tid på?",
    options: ["Låg", "Medel", "Hög"],
  },
];



export default function Home() {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  

  function chooseAnswer(option: string) {
    const currentQuestion = questions[step];

    const newAnswers = {
      ...answers,
      [currentQuestion.key]: option,
    };

    setAnswers(newAnswers);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function getMatches() {
    const activityLevels: Record<string, number> = {
      Lugn: 1,
      "Ganska aktiv": 2,
      "Mycket aktiv": 3,
    };
    const groomingLevels: Record<string, number> = {
      Låg: 1,
      Medel: 2,
      Hög: 3,
    };

    return dogs
      .map((dog) => {
        let score = 0;
        const reasons: string[] = [];

        if (dog.homes.includes(answers.home)) {
          score += 30;
          reasons.push("passar ditt boende");
        }

        const activityDifference = Math.abs(
          activityLevels[dog.activity] - activityLevels[answers.activity]
        );

        if (activityDifference === 0) {
          score += 30;
          reasons.push("matchar din aktivitetsnivå");
        } else if (activityDifference === 1) {
          score += 15;
          reasons.push("ligger nära din aktivitetsnivå");
        }

        if (answers.children === "Ja") {
          if (dog.childFriendly === "Hög") {
            score += 20;
            reasons.push("hög barnvänlighet");
          } else if (dog.childFriendly === "Medel") {
            score += 10;
            reasons.push("viss barnvänlighet");
          }
        } else {
          score += 20;
          reasons.push("barnvänlighet är inget krav");
        }

        const groomingDifference =
          groomingLevels[dog.grooming] - groomingLevels[answers.grooming];

        if (groomingDifference <= 0) {
          score += 20;
          reasons.push("passar din nivå för pälsvård");
        } else if (groomingDifference === 1) {
          score += 8;
          reasons.push("kräver lite mer pälsvård");
        }

        return {
          ...dog,
          score,
          reasons,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }
if (!started) {
  return (
    <main style={pageStyle}>
      <div style={{ maxWidth: 900, margin: "80px auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 56, marginBottom: 20 }}>
          🐶 ValpMatch
        </h1>

        <p style={{ fontSize: 24, marginBottom: 30 }}>
          Hitta hundrasen som passar ditt liv.
        </p>

        <p style={{ fontSize: 18, marginBottom: 40, color: "#666" }}>
          Gör vårt quiz och få personliga rekommendationer baserat på ditt boende,
          din aktivitetsnivå och vilken hundstorlek du söker.
        </p>

        <p style={{ fontSize: 18, marginBottom: 24, color: "#444" }}>
          Svara på några snabba frågor om din vardag. Du får dina bästa
          matchningar med tydliga skäl till varför raserna kan passa dig.
        </p>

        <button
          onClick={() => setStarted(true)}
          style={{
            padding: "18px 36px",
            fontSize: 22,
            borderRadius: 999,
            border: "none",
            background: "#f97316",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Starta Quiz
        </button>

        <p style={{ marginTop: 14, marginBottom: 0, color: "#666" }}>
          Tar mindre än 1 minut. Inga uppgifter sparas.
        </p>
      <div
  style={{
    marginTop: 20,
    display: "flex",
    gap: 16,
    justifyContent: "center",
    flexWrap: "wrap",
  }}
>
  <Link
    href="/raser"
    style={{
      padding: "14px 24px",
      borderRadius: 999,
      border: "2px solid #f97316",
      background: "white",
      color: "#f97316",
      fontWeight: "bold",
      cursor: "pointer",
      textDecoration: "none",
    }}
  >
    Utforska Hundraser
  </Link>

  <button
    style={{
      padding: "14px 24px",
      borderRadius: 999,
      border: "2px solid #f97316",
      background: "white",
      color: "#f97316",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Hitta Uppfödare
  </button>
</div>
<section style={{ marginTop: 50 }}>
  <h2>Så fungerar det</h2>
  <div style={cardGridStyle}>
    {[
      "Svara på frågor om ditt liv",
      "Vi jämför dina svar med hundrasernas behov",
      "Du får dina bästa matchningar",
    ].map((stepText, index) => (
      <div key={stepText} style={cardStyle}>
        <h3>{index + 1}. {stepText}</h3>
      </div>
    ))}
  </div>
</section>

<section style={{ marginTop: 30 }}>
  <h2>Quizet tar hänsyn till</h2>
  <div
    style={{
      display: "flex",
      gap: 12,
      justifyContent: "center",
      flexWrap: "wrap",
      marginTop: 20,
    }}
  >
    {["Boende", "Aktivitetsnivå", "Hundens storlek", "Barnvänlighet", "Pälsvård"].map(
      (item) => (
        <span
          key={item}
          style={{
            padding: "10px 16px",
            borderRadius: 999,
            background: "white",
            color: "#2f2f2f",
            fontWeight: "bold",
            boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
          }}
        >
          {item}
        </span>
      )
    )}
  </div>
</section>
      </div>
    </main>
  );
}
  if (done) {
    const matches = getMatches();

    return (
      <main style={pageStyle}>
        <h1>🐶 Dina bästa matchningar</h1>

        <p style={introStyle}>
          Du valde: <strong>{answers.home}</strong>,{" "}
          <strong>{answers.activity}</strong>, <strong>{answers.size}</strong>,{" "}
          <strong>{answers.children}</strong>, <strong>{answers.grooming}</strong>
        </p>

        <div style={cardGridStyle}>
          {matches.map((dog, index) => (
            <div key={dog.name} style={cardStyle}>
              {dog.image ? (
  <img
    src={dog.image}
    alt={dog.name}
    style={imageStyle}
  />
) : (
  <div style={emojiStyle}>{dog.emoji}</div>
)}

              <h2>
                {index + 1}. {dog.name}
              </h2>

              <div style={scoreStyle}>{dog.score}% match</div>

              <p>{dog.description}</p>

              <div style={infoGridStyle}>
                <p>📏 {dog.size}</p>
                <p>⚡ {dog.activity}</p>
                <p>👶 Barnvänlig: {dog.childFriendly}</p>
                <p>🧼 Pälsvård: {dog.grooming}</p>
                <p>⚖️ Vikt: {dog.weight}</p>
                <p>❤️ Livslängd: {dog.life}</p>
              </div>

              <p style={reasonStyle}>
                Därför matchar den: {dog.reasons.join(", ")}.
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setStep(0);
            setAnswers({});
            setDone(false);
          }}
          style={buttonStyle}
        >
          Gör quizet igen
        </button>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <h1>🐶 ValpMatch</h1>
      <p style={introStyle}>Hitta hundrasen som passar ditt liv.</p>

      <div style={quizBoxStyle}>
        <p>
          Fråga {step + 1} av {questions.length}
        </p>

        <h2>{questions[step].question}</h2>

        {questions[step].options.map((option) => (
          <button
            key={option}
            onClick={() => chooseAnswer(option)}
            style={buttonStyle}
          >
            {option}
          </button>
        ))}
      </div>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: 40,
  fontFamily: "Arial, sans-serif",
  textAlign: "center" as const,
  background: "#fff7ed",
  color: "#2f2f2f",
};

const introStyle = {
  fontSize: 20,
  marginBottom: 30,
};

const quizBoxStyle = {
  maxWidth: 600,
  margin: "0 auto",
  background: "white",
  padding: 30,
  borderRadius: 24,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const buttonStyle = {
  display: "block",
  margin: "12px auto",
  padding: "14px 24px",
  fontSize: 18,
  cursor: "pointer",
  borderRadius: 999,
  border: "none",
  background: "#f97316",
  color: "white",
  fontWeight: "bold",
};

const cardGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 24,
  maxWidth: 1100,
  margin: "30px auto",
};

const cardStyle = {
  background: "white",
  padding: 24,
  borderRadius: 24,
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const emojiStyle = {
  fontSize: 54,
};
const imageStyle = {
  width: "100%",
  height: 180,
  objectFit: "cover" as const,
  borderRadius: 20,
  marginBottom: 16,
};

const scoreStyle = {
  display: "inline-block",
  margin: "10px 0",
  padding: "8px 14px",
  background: "#dcfce7",
  color: "#166534",
  borderRadius: 999,
  fontWeight: "bold",
};

const infoGridStyle = {
  textAlign: "left" as const,
  marginTop: 18,
  lineHeight: 1.6,
};

const reasonStyle = {
  marginTop: 18,
  fontWeight: "bold",
};
