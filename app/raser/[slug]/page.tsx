import type { Metadata } from "next";
import Link from "next/link";
import { dogs } from "../../../data/dogs";
import { getDogSlug } from "../../seo";

type DogPageProps = {
  params: Promise<{ slug: string }>;
};

function findDogBySlug(slug: string) {
  return dogs.find((dog) => getDogSlug(dog) === slug);
}

export function generateStaticParams() {
  return dogs.map((dog) => ({
    slug: getDogSlug(dog),
  }));
}

export async function generateMetadata({
  params,
}: DogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dog = findDogBySlug(slug);

  if (!dog) {
    return {
      title: "Hundrasen hittades inte | ValpMatch",
    };
  }

  const title = `${dog.name} – fakta, temperament och vem rasen passar | ValpMatch`;

  return {
    title,
    description: dog.description,
    alternates: {
      canonical: `/raser/${getDogSlug(dog)}`,
    },
    openGraph: {
      title,
      description: dog.description,
      url: `/raser/${getDogSlug(dog)}`,
      siteName: "ValpMatch",
      locale: "sv_SE",
      type: "article",
    },
  };
}

export default async function DogPage({
  params,
}: DogPageProps) {
  const { slug } = await params;

  const dog = findDogBySlug(slug);

  if (!dog) {
    return <h1>Hundrasen hittades inte.</h1>;
  }

  return (
    <main style={{ padding: 40, background: "#f5efe8", minHeight: "100vh" }}>
      <Link
  href="/raser"
  style={{
    display: "inline-block",
    marginBottom: 20,
    color: "#f97316",
    fontWeight: "bold",
    textDecoration: "none",
  }}
>
  ← Tillbaka till alla hundraser
</Link>
      <div style={{ maxWidth: 900, margin: "0 auto", background: "white", borderRadius: 24, padding: 30,  color: "#222", }}>
        <img src={dog.image} alt={dog.name} style={{ width: "100%", maxHeight: 500, objectFit: "cover", borderRadius: 20 }} />

        <h1>🐶 {dog.name}</h1>
        <p>{dog.description}</p>

        <hr />

        <p><strong>📏 Storlek:</strong> {dog.size}</p>
        <p><strong>⚡ Aktivitet:</strong> {dog.activity}</p>
        <p><strong>👶 Barnvänlig:</strong> {dog.childFriendly}</p>
        <p><strong>💇 Pälsvård:</strong> {dog.grooming}</p>
        <p><strong>⚖️ Vikt:</strong> {dog.weight}</p>
        <p><strong>❤️ Livslängd:</strong> {dog.life}</p>
        <section style={{ marginTop: 30 }}>
  <h2>💰 Kostnader att tänka på</h2>

  <p><strong>Valp:</strong> 15 000–30 000 kr</p>
  <p><strong>Försäkring:</strong> 200–600 kr/mån</p>
  <p><strong>Mat:</strong> 200–800 kr/mån beroende på hundens storlek</p>
  <p><strong>Veterinär och tillbehör:</strong> Varierar beroende på behov och livsstil.</p>
</section>

<section style={{ marginTop: 30 }}>
  <h2>🏠 Passar bäst för</h2>
  <ul>
   {dog.homes.map((home) => (
      <li key={home}>✅ {home}</li>
    ))}
    </ul>
    </section>
<section style={{ marginTop: 30 }}>
  <h2>⭐ Fördelar</h2>

<ul>
  {dog.pros?.map((pro) => (
    <li key={pro}>✅ {pro}</li>
  ))}
</ul>
</section>

<section style={{ marginTop: 30 }}>
  <h2>⚠️ Att tänka på</h2>

  <ul>
  {dog.cons?.map((con) => (
    <li key={con}>⚠️ {con}</li>
  ))}
</ul>
</section>
<section style={{ marginTop: 30 }}>
  <h2>❓ Vanliga frågor</h2>
</section>
<div
  style={{
    marginTop: 20,
    background: "#faf7f2",
    padding: 20,
    borderRadius: 16,
    border: "1px solid #eee",
  }}
>
  <h3>❓ Är {dog.name} en bra familjehund?</h3>
  <p>
    {dog.name} är generellt känd för sitt temperament och kan passa bra för många familjer.
    Det är dock viktigt att välja hund efter livsstil, aktivitetsnivå och erfarenhet.
  </p>
</div>
<div
  style={{
    marginTop: 20,
    background: "#faf7f2",
    padding: 20,
    borderRadius: 16,
    border: "1px solid #eee",
  }}
>
  <h3>Hur mycket motion behöver en {dog.name}?</h3>
  <p>
    Behovet av motion varierar mellan olika hundraser. En {dog.name} behöver regelbunden
    motion och mental stimulans för att må bra.
  </p>
</div>
<div style={{ marginTop: 20 }}>
  <h3>Passar {dog.name} i lägenhet?</h3>
  <p>
    Det beror på hundens behov och din livsstil. Kontrollera alltid sektionen
    &quot;Passar bäst för&quot; ovan för att se vilka boendeformer som passar rasen bäst.
  </p>
</div>
 

        
      </div>
    </main>
  );
}
