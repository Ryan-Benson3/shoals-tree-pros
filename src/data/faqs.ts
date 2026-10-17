export type Faq = { q: string; a: string; scope: ('home' | 'city' | 'service')[]; service?: 'tree-trimming' | 'stump-grinding' };

/**
 * FAQ content. Answers stay honest: no invented local prices,
 * no claims about specific companies. Cost language uses published
 * industry ranges with clear "quotes vary" framing.
 */
export const faqs: Faq[] = [
  {
    q: 'How do I pick a tree service in the Shoals?',
    a: 'Ask three things from any crew before you hire: proof of liability insurance (ask for the certificate, not just a verbal yes), a written estimate that states exactly what will be cut, hauled, and ground, and a local reference or two. Alabama does not require a statewide tree-service license, so insurance and reputation are your real protection.',
    scope: ['home', 'city'],
  },
  {
    q: 'Do tree services in Alabama need a license?',
    a: 'Alabama has no statewide contractor license specifically for tree work. Businesses still need a standard city or county business license to operate legally, and many carry voluntary credentials like ISA Certified Arborist on the tree-care side. Ask any crew for their insurance certificate regardless — that matters more than a license title.',
    scope: ['home', 'city', 'service'],
  },
  {
    q: 'How much does stump grinding cost?',
    a: 'Published industry ranges put most residential stump grinding between roughly $100 and $400 per stump — small stumps at the low end, large or multiple stumps at the high end. Diameter, root spread, access, and how deep you want it ground all move the price. Shoals crews usually quote by the stump after seeing it, so two or three quick quotes is the reliable way to price yours. Try our stump cost estimator for a ballpark.',
    scope: ['home', 'service'], service: 'stump-grinding',
  },
  {
    q: "What's the difference between stump grinding and stump removal?",
    a: 'Grinding shreds the stump a few inches below the grass line and leaves the roots to rot naturally — fast, cheap, and you can sod over it within days. Full removal pulls the stump and root ball out with excavation, leaving a hole and a bigger mess. Most homeowners choose grinding; removal is mainly needed for new construction or replanting in the exact same spot.',
    scope: ['home', 'service'], service: 'stump-grinding',
  },
  {
    q: "When's the best time to trim trees in north Alabama?",
    a: 'Late winter, while trees are dormant, is the cleanest window for most species — oaks included, which should not be pruned during warm months because of oak wilt risk. Dead, broken, or hazardous limbs can and should come off any time of year. Avoid heavy trimming in the heat of summer.',
    scope: ['home', 'city', 'service'], service: 'tree-trimming',
  },
  {
    q: 'Do I need a permit to remove a tree in Florence or the Shoals cities?',
    a: 'Rules vary by city and by where the tree sits. Most private-property removals in the Shoals need no tree-specific permit, but rights-of-way, some subdivided lots, and trees near utility easements can trigger city or utility review. Check with your city building or inspection office before a removal near a street or property line — it is a five-minute call.',
    scope: ['city'],
  },
  {
    q: 'How can I tell if a tree is dangerous?',
    a: 'Watch for a new or increasing lean, large dead limbs in the crown, cracks in the trunk or major forks, mushrooms or fungus at the base, and raised or broken soil on one side of the root zone. Any one of these on a tree that could reach a house, car, or person is worth a professional look. Several crews in this directory offer assessments.',
    scope: ['home', 'city', 'service'], service: 'tree-trimming',
  },
  {
    q: 'What should a written tree-work estimate include?',
    a: 'The exact trees or limbs to be cut, whether the stump is ground (and to what depth), who hauls the debris, whether the yard will be repaired (raked, re-sodded), the total price, and a completion window. If any of those are missing, ask before you sign.',
    scope: ['home', 'service'],
  },
];

export const faqsFor = (scope: 'home' | 'city' | 'service', service?: string) => faqs.filter((f) => f.scope.includes(scope) && (!service || !f.service || f.service === service));
