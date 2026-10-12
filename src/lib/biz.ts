import { getCollection } from 'astro:content';

/** Short labels for card badges */
export const svcLabels: Record<string, string> = {
  'tree-trimming': 'Tree trimming',
  'stump-grinding': 'Stump grinding',
  'tree-removal': 'Tree removal',
  'storm-cleanup': 'Storm cleanup',
  'lot-clearing': 'Lot clearing',
  'emergency': '24/7 emergency',
  'crane': 'Crane work',
  'arborist': 'Arborist services',
  'firewood': 'Firewood',
};

export function serviceLabel(slug: string): string {
  return svcLabels[slug] ?? slug;
}

export type BizEntry = Awaited<ReturnType<typeof getCollection<'businesses'>>>[number];

export async function allBusinesses(): Promise<BizEntry[]> {
  const list = await getCollection('businesses');
  return [...list].sort((a, b) => a.data.name.localeCompare(b.data.name));
}

/** Groups: exact city first, then same county, then crews that list the city in their service area. */
export function groupForCity(list: BizEntry[], citySlug: string, cityName: string, county: string) {
  const inCity = list.filter((b) => b.data.citySlug === citySlug);
  const inCounty = list.filter((b) => b.data.county === county && b.data.citySlug !== citySlug);
  const serves = list.filter(
    (b) =>
      b.data.citySlug !== citySlug &&
      b.data.county !== county &&
      b.data.serviceArea.some((a) => a.toLowerCase().includes(cityName.toLowerCase()))
  );
  return { inCity, inCounty, serves };
}

/** Client-side search index — flat, null-free (FFP lesson). */
export function clientIndex(list: BizEntry[]) {
  return list.map((b) => ({
    slug: b.id,
    name: b.data.name,
    phone: b.data.phone,
    city: b.data.city,
    state: b.data.state,
    county: b.data.county,
    services: b.data.services.map(serviceLabel),
    serviceArea: b.data.serviceArea,
    rating: b.data.rating,
    reviewCount: b.data.reviewCount,
    ratingSource: b.data.ratingSource,
    confidence: b.data.confidence,
    sourceLabel: b.data.sourceLabel,
    sourceUrl: b.data.sourceUrl,
  }));
}
