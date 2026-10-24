import type { HomepageSection, Promotion, TodaysSpecial } from "@/types/menu";

// Seeded editorial configuration; Sprint 2 will replace this with admin-managed records.
export const homepageSections: HomepageSection[] = [
  {
    id: "heritage-hero",
    type: "hero",
    heading: "A Tradition of Taste. A Legacy of Quality.",
    description: null,
    image: "/images/hero/indian-mithai-assortment.webp",
    isVisible: true,
    displayOrder: 1,
    startAt: null,
    endAt: null,
  },
  {
    id: "menu-discovery",
    type: "categories",
    heading: "Find Your Craving",
    description: null,
    image: null,
    isVisible: true,
    displayOrder: 2,
    startAt: null,
    endAt: null,
  },
  {
    id: "specials",
    type: "specials",
    heading: "Today's Specials",
    description: null,
    image: null,
    isVisible: false,
    displayOrder: 3,
    startAt: null,
    endAt: null,
  },
  {
    id: "offers",
    type: "offers",
    heading: "Offers",
    description: null,
    image: null,
    isVisible: false,
    displayOrder: 4,
    startAt: null,
    endAt: null,
  },
  {
    id: "visit",
    type: "visit",
    heading: "Visit Us in Richardson",
    description: null,
    image: null,
    isVisible: true,
    displayOrder: 5,
    startAt: null,
    endAt: null,
  },
];

export const promotions: Promotion[] = [];
export const todaysSpecials: TodaysSpecial[] = [];

function isCurrent(startAt: string | null, endAt: string | null, now: number) {
  return (
    (!startAt || Date.parse(startAt) <= now) &&
    (!endAt || Date.parse(endAt) >= now)
  );
}

export function activeHomepageOffers(now = Date.now()) {
  const specialsVisible = homepageSections.some(
    (section) =>
      section.type === "specials" &&
      section.isVisible &&
      isCurrent(section.startAt, section.endAt, now),
  );
  const offersVisible = homepageSections.some(
    (section) =>
      section.type === "offers" &&
      section.isVisible &&
      isCurrent(section.startAt, section.endAt, now),
  );
  return {
    specials: specialsVisible
      ? todaysSpecials.filter(
          (item) =>
            item.isPublished && isCurrent(item.startAt, item.endAt, now),
        )
      : [],
    offers: offersVisible
      ? promotions.filter(
          (item) =>
            item.isPublished && isCurrent(item.startAt, item.endAt, now),
        )
      : [],
  };
}
