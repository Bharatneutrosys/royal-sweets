export type BusinessHours =
  | { status: "unconfirmed" }
  | {
      status: "confirmed";
      schedule: readonly { day: string; hours: string }[];
    };

export type SocialLink = {
  platform: "facebook" | "instagram" | "google-business";
  label: string;
  href: string;
};

type BusinessConfig = {
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone: { display: string; href: string };
  orderingUrl: string;
  hours: BusinessHours;
  socialLinks: readonly SocialLink[];
};

export const orderingUrl =
  "https://order.online/store/royal-sweets-fast-food-west-belt-line-road-303445";

export const business: BusinessConfig = {
  name: "Royal Sweets & Fast Food",
  description: "Authentic Indian Sweets, Chaat & Timeless Flavors.",
  address: {
    street: "524 W Belt Line Rd",
    city: "Richardson",
    state: "TX",
    postalCode: "75080",
    country: "United States",
  },
  phone: { display: "(972) 669-4973", href: "tel:+19726694973" },
  orderingUrl,
  hours: { status: "unconfirmed" },
  socialLinks: [],
};

const { street, city, state, postalCode } = business.address;

export const mapsDirectionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(`${street}, ${city}, ${state} ${postalCode}`);
