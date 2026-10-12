export type Service = {
  name: string;
  slug: string;
  short: string;
  description: string;
  core: boolean; // core services get dedicated service×city pages
  icon: string; // emoji fallback used in cards
};

export const services: Service[] = [
  {
    name: 'Tree Trimming & Pruning',
    slug: 'tree-trimming',
    short: 'Canopy thinning, deadwood removal, clearance pruning, and shaping.',
    description:
      'Trimming covers everything from cutting back limbs over a roofline to full canopy thinning. Good pruning keeps trees healthy, lets light through, and reduces storm damage. In the Shoals, the most common calls are deadwood removal in older oaks and clearance cutting away from houses and power lines.',
    core: true,
    icon: '🌲',
  },
  {
    name: 'Stump Grinding & Removal',
    slug: 'stump-grinding',
    short: 'Grind stumps below grade so you can re-sod, replant, or build.',
    description:
      'After a tree comes down, the stump is what is left. Grinding shreds the stump 4–8 inches below the grass line so the area can be re-sodded or replanted the same week. Most Shoals crews grind stumps left by other companies too — you do not need the same crew that removed the tree.',
    core: true,
    icon: '🪵',
  },
  {
    name: 'Tree Removal',
    slug: 'tree-removal',
    short: 'Full takedowns, including hazardous and storm-damaged trees.',
    description:
      'Full removal of dead, dying, or hazardous trees, including sectional dismantling in tight quarters near homes. Some local crews run cranes for large removals; most quote by tree size, location, and risk.',
    core: false,
    icon: '🪚',
  },
  {
    name: 'Storm Cleanup & Emergency',
    slug: 'storm-cleanup',
    short: 'Fallen limbs, debris hauling, and after-storm takedowns.',
    description:
      'North Alabama storms drop limbs and whole trees every spring. Cleanup crews cut and haul debris, tarp roofs where limbs have punctured them, and take down trees weakened by wind or lightning. Some crews offer emergency response — call, do not email, when a tree is on a structure.',
    core: false,
    icon: '⛈️',
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const coreServices = services.filter((s) => s.core);
