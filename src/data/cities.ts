export type City = {
  name: string;
  slug: string;
  county: 'Lauderdale' | 'Colbert';
  blurb: string;
  treeNote: string;
};

/** Shoals-area cities with dedicated pages. Kept intentionally small:
 *  four core Shoals cities + the two biggest bedroom towns. Pillar quality
 *  over thin sprawl. */
export const cities: City[] = [
  {
    name: 'Florence',
    slug: 'florence',
    county: 'Lauderdale',
    blurb: 'The largest city in the Shoals and the Lauderdale County seat, sitting on the north bank of the Tennessee River.',
    treeNote: 'Mature hardwoods along the river bluffs and older neighborhoods mean regular deadwood and clearance pruning work.',
  },
  {
    name: 'Muscle Shoals',
    slug: 'muscle-shoals',
    county: 'Colbert',
    blurb: 'Home of the world-famous recording studios, on the south side of the Tennessee River in Colbert County.',
    treeNote: 'A mix of established subdivisions and open lots — lot clearing and stump grinding are common calls here.',
  },
  {
    name: 'Sheffield',
    slug: 'sheffield',
    county: 'Colbert',
    blurb: 'One of the four Quad Cities, sitting between Muscle Shoals and Tuscumbia in Colbert County.',
    treeNote: 'Older tree canopy in historic districts brings trimming, hazardous-limb removal, and storm cleanup requests.',
  },
  {
    name: 'Tuscumbia',
    slug: 'tuscumbia',
    county: 'Colbert',
    blurb: 'The Colbert County seat and birthplace of Helen Keller, at the western edge of the Shoals.',
    treeNote: 'Large yard trees and spring storm season keep local crews busy with removals and cleanup.',
  },
  {
    name: 'Killen',
    slug: 'killen',
    county: 'Lauderdale',
    blurb: 'A fast-growing bedroom town east of Florence in Lauderdale County.',
    treeNote: 'New construction and clearing work make stump grinding and lot cleanup steady work.',
  },
  {
    name: 'Rogersville',
    slug: 'rogersville',
    county: 'Lauderdale',
    blurb: 'A small town on the east side of Lauderdale County near Wheeler Lake and the Elk River.',
    treeNote: 'Lakeside lots and rural acreage mean bigger removals and stump work than in the cities.',
  },
];

export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
