import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Business listings — the data moat.
 * One JSON file per business in src/content/businesses/.
 * Every field must trace to a public source (see sources[]).
 * No nulls: strings "", arrays [], numbers 0, so client-side search never crashes.
 */
const businesses = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/businesses' }),
  schema: z.object({
    name: z.string(),
    phone: z.string(),
    address: z.string().default(''),
    city: z.string(),
    citySlug: z.string(),
    county: z.enum(['Lauderdale', 'Colbert', 'Limestone', 'Franklin', 'Other']),
    state: z.string().default('AL'),
    zip: z.string().default(''),
    website: z.string().default(''),
    facebook: z.string().default(''),
    email: z.string().default(''),
    rating: z.number().min(0).max(5).default(0),
    reviewCount: z.number().int().min(0).default(0),
    ratingSource: z.string().default(''),
    services: z.array(z.string()).default([]),
    serviceArea: z.array(z.string()).default([]),
    yearsInBusiness: z.number().int().min(0).default(0),
    insuredClaim: z.string().default(''),
    certifiedClaim: z.string().default(''),
    summary: z.string().default(''),
    photoCredit: z.string().default(''),
    confidence: z.enum(['provider-verified', 'directory-listed', 'needs-confirmation']).default('directory-listed'),
    sourceLabel: z.string(),
    sourceUrl: z.string().default(''),
    sources: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
  }),
});

export const collections = { businesses };
