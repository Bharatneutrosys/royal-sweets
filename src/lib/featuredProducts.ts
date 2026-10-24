import { orderingUrl } from "@/lib/business";
import type { FeaturedProduct } from "@/types/featuredProduct";

const unsplashLicense = "https://unsplash.com/license";
const commonsLicense = "https://creativecommons.org/licenses/by-sa/4.0/";

type ProductEntry = Omit<
  FeaturedProduct,
  "priceSource" | "priceLastVerified" | "priceUnit"
>;

const products: ProductEntry[] = [
  {
    id: "rasmalai",
    slug: "rasmalai",
    name: "Rasmalai",
    categoryId: "sweets",
    shortDescription:
      "Soft, delicate cheese-based sweets served in rich, sweetened milk.",
    image: "/images/products/rasmalai.webp",
    imageAlt:
      "Illustrative rasmalai pieces in sweetened milk with a nut garnish",
    imageCredit: {
      title: "Rasa malai",
      creator: "Subhransuphotography",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Rasa_malai.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: commonsLicense,
    },
    onlinePriceCents: 499,
    featuredSection: "sweets",
    displayOrder: 1,
  },
  {
    id: "jalebi",
    slug: "jalebi",
    name: "Jalebi",
    categoryId: "sweets",
    shortDescription:
      "Golden, crisp spirals soaked in sweet syrup, a beloved Indian classic.",
    image: "/images/products/jalebi.webp",
    imageAlt: "Illustrative golden jalebi spirals garnished with rose petals",
    imageCredit: {
      title: "Sweet jalebi dessert garnished with rose and pistachios",
      creator: "Shoeib Abolhassani",
      sourceUrl:
        "https://unsplash.com/photos/sweet-jalebi-dessert-garnished-with-rose-and-pistachios-GWgrqDGxvRA",
      license: "Unsplash License",
      licenseUrl: unsplashLicense,
    },
    onlinePriceCents: 250,
    featuredSection: "sweets",
    displayOrder: 2,
  },
  {
    id: "gulab-jamun",
    slug: "gulab-jamun",
    name: "Gulab Jamun",
    categoryId: "sweets",
    shortDescription: "Soft golden dumplings soaked in aromatic sugar syrup.",
    image: "/images/products/gulab-jamun.webp",
    imageAlt: "Illustrative gulab jamun in syrup with sliced nuts",
    imageCredit: {
      title: "Gulab jamun (Gibraltar, November 2020)",
      creator: "Cabeza2000",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Gulab_jamun_(Gibraltar,_November_2020).jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: commonsLicense,
    },
    onlinePriceCents: 299,
    featuredSection: "sweets",
    displayOrder: 3,
  },
  {
    id: "rasgulla",
    slug: "rasgulla",
    name: "Rasgulla",
    categoryId: "sweets",
    shortDescription:
      "Light, spongy cheese-based sweets immersed in a delicate sugar syrup.",
    image: "/images/products/rasgulla.webp",
    imageAlt: "Illustrative white rasgulla sweets in a brown serving bowl",
    imageCredit: {
      title: "A wooden bowl filled with white balls of food",
      creator: "Mustafa Fatemi",
      sourceUrl:
        "https://unsplash.com/photos/a-wooden-bowl-filled-with-white-balls-of-food-XH0XpbicHAo",
      license: "Unsplash License",
      licenseUrl: unsplashLicense,
    },
    onlinePriceCents: 299,
    featuredSection: "sweets",
    displayOrder: 4,
  },
  {
    id: "gajar-halwa",
    slug: "gajar-halwa",
    name: "Gajar Halwa",
    categoryId: "sweets",
    shortDescription:
      "A comforting carrot dessert known for its rich flavor and fragrant sweetness.",
    image: "/images/products/gajar-halwa.webp",
    imageAlt: "Illustrative serving of orange gajar halwa in a white bowl",
    imageCredit: {
      title: "Halwa gajar ka",
      creator: "Vinayakgupta4",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Halwa_gajar_ka.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: commonsLicense,
    },
    onlinePriceCents: 299,
    featuredSection: "sweets",
    displayOrder: 5,
  },
  {
    id: "ladoo",
    slug: "ladoo",
    name: "Ladoo",
    categoryId: "sweets",
    shortDescription:
      "A timeless Indian sweet enjoyed during celebrations and everyday moments.",
    image: "/images/products/ladoo.webp",
    imageAlt: "Illustrative orange ladoo sweets arranged on a serving plate",
    imageCredit: {
      title: "A plate of food sitting on a table next to a candle",
      creator: "Prchi Palwe",
      sourceUrl:
        "https://unsplash.com/photos/a-plate-of-food-sitting-on-a-table-next-to-a-candle-wwgulilpmlg",
      license: "Unsplash License",
      licenseUrl: unsplashLicense,
    },
    onlinePriceCents: 299,
    featuredSection: "sweets",
    displayOrder: 6,
  },
  {
    id: "chole-bhature",
    slug: "chole-bhature",
    name: "Chole Bhature",
    categoryId: "indian-food",
    shortDescription:
      "A classic North Indian pairing of spiced chickpeas and fluffy fried bread.",
    image: "/images/products/chole-bhature.webp",
    imageAlt: "Illustrative chole with fried bhatura bread",
    imageCredit: {
      title: "Chana masala with fried bhatura bread",
      creator: "Zoshua Colah",
      sourceUrl:
        "https://unsplash.com/photos/chana-masala-with-fried-bhatura-bread-Idh9dnG2v8w",
      license: "Unsplash License",
      licenseUrl: unsplashLicense,
    },
    onlinePriceCents: 1099,
    featuredSection: "favorites",
    displayOrder: 1,
  },
  {
    id: "masala-dosa",
    slug: "masala-dosa",
    name: "Masala Dosa",
    categoryId: "indian-food",
    shortDescription:
      "A crisp South Indian crepe filled with a flavorful potato mixture.",
    image: "/images/categories/masala-dosa.webp",
    imageAlt: "Illustrative crisp dosa served with chutneys and accompaniments",
    imageCredit: {
      title: "Dosa with masala and chutney breakfast",
      creator: "Paul",
      sourceUrl:
        "https://unsplash.com/photos/dosa-with-masala-and-chutney-breakfast-5oF7d_hPJG4",
      license: "Unsplash License",
      licenseUrl: unsplashLicense,
    },
    onlinePriceCents: 1099,
    featuredSection: "favorites",
    displayOrder: 2,
  },
  {
    id: "hot-samosa-chaat",
    slug: "hot-samosa-chaat",
    name: "Hot Samosa Chaat",
    categoryId: "chaat",
    shortDescription:
      "A delicious combination of samosa, chaat accompaniments, and vibrant Indian flavors.",
    image: "/images/products/hot-samosa-chaat.webp",
    imageAlt: "Illustrative samosa chaat topped with savory accompaniments",
    imageCredit: {
      title: "Samosa chat at Kochi, Kerala - September 2026",
      creator: "Dev Jadiya",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Samosa_chat_at_Kochi,_Kerala_-_September_2026.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: commonsLicense,
    },
    onlinePriceCents: 799,
    featuredSection: "favorites",
    displayOrder: 3,
  },
  {
    id: "pav-bhaji",
    slug: "pav-bhaji",
    name: "Pav Bhaji",
    categoryId: "indian-food",
    shortDescription:
      "A comforting spiced vegetable preparation traditionally served with soft bread rolls.",
    image: "/images/products/pav-bhaji.webp",
    imageAlt: "Illustrative pav bhaji with spiced vegetables and bread rolls",
    imageCredit: {
      title: "Pav bhaji, a popular Indian street food is ready",
      creator: "Pavan Reddy",
      sourceUrl:
        "https://unsplash.com/photos/pav-bhaji-a-popular-indian-street-food-is-ready-QOvGLUTeOx0",
      license: "Unsplash License",
      licenseUrl: unsplashLicense,
    },
    onlinePriceCents: 999,
    featuredSection: "favorites",
    displayOrder: 4,
  },
  {
    id: "pani-puri",
    slug: "pani-puri",
    name: "Pani Puri",
    categoryId: "chaat",
    shortDescription:
      "Crisp, bite-sized puris enjoyed with tangy fillings and seasoned water.",
    image: "/images/categories/chaat-street-food.webp",
    imageAlt: "Illustrative pani puri and chaat accompaniments on a tray",
    imageCredit: {
      title: "Brown and white food on white ceramic bowl",
      creator: "Yashaswita Bhoir",
      sourceUrl:
        "https://unsplash.com/photos/brown-and-white-food-on-white-ceramic-bowl-oC63RhtykAw",
      license: "Unsplash License",
      licenseUrl: unsplashLicense,
    },
    onlinePriceCents: 699,
    featuredSection: "favorites",
    displayOrder: 5,
  },
  {
    id: "mango-lassi",
    slug: "mango-lassi",
    name: "Mango Lassi",
    categoryId: "beverages",
    shortDescription: "A smooth, refreshing mango-and-yogurt drink.",
    image: "/images/products/mango-lassi.webp",
    imageAlt: "Illustrative glass of mango lassi with a nut garnish",
    imageCredit: {
      title: "Tasty Mango lassi picture",
      creator: "Nithyasrm",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Tasty_Mango_lassi_picture.JPG",
      license: "CC BY-SA 4.0",
      licenseUrl: commonsLicense,
    },
    onlinePriceCents: 599,
    featuredSection: "favorites",
    displayOrder: 6,
  },
];

// These amounts were supplied by the owner as online-menu listings. The live
// ordering page blocked terminal verification, so no verification date is set.
export const featuredProducts: FeaturedProduct[] = products.map((product) => ({
  ...product,
  priceSource: orderingUrl,
  priceLastVerified: null,
  priceUnit: null,
}));
