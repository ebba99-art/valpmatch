export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://valpmatch.se";

export function getDogSlug(dog: { name: string; slug?: string }) {
  return dog.slug ?? dog.name.toLowerCase().trim().replaceAll(" ", "-");
}
