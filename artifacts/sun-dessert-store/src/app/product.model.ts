export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  available: boolean;
  createdAt: string;
}

export type ProductInput = Omit<Product, "id" | "createdAt">;

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Classic Fudge Brownie",
    slug: "classic-fudge-brownie",
    category: "brownies",
    price: 160,
    description: "A soft, rich chocolate brownie with a fudgy center and a delicate crackled top.",
    imageUrl: "/assets/classic%20brownie.png",
    tags: ["classic", "chocolate", "best seller"],
    featured: true,
    available: true,
    createdAt: "2026-09-03T08:00:00.000Z",
  },
  {
    id: 2,
    name: "Extra Chocolate Brownie",
    slug: "extra-chocolate-brownie",
    category: "brownies",
    price: 180,
    description: "Deep cocoa brownie finished with generous chocolate pieces for an extra indulgent bite.",
    imageUrl: "/assets/extra%20chocolate%20brownie.png",
    tags: ["chocolate", "rich"],
    featured: true,
    available: true,
    createdAt: "2026-09-03T08:01:00.000Z",
  },
  {
    id: 3,
    name: "Hazelnut Brownie",
    slug: "hazelnut-brownie",
    category: "brownies",
    price: 195,
    description: "Our fudgy brownie layered with roasted hazelnut flavor and a warm, nutty finish.",
    imageUrl: "/assets/hazelnut%20brownie.png",
    tags: ["hazelnut", "signature"],
    featured: true,
    available: true,
    createdAt: "2026-09-03T08:02:00.000Z",
  },
  {
    id: 4,
    name: "Celebration Cake",
    slug: "celebration-cake",
    category: "cakes",
    price: 650,
    description: "A joyful celebration cake made for birthdays, gatherings, and moments worth making sweeter.",
    imageUrl: "/assets/celebrate.jpg",
    tags: ["celebration", "custom"],
    featured: true,
    available: true,
    createdAt: "2026-09-03T08:03:00.000Z",
  },
  {
    id: 5,
    name: "Sweet Surprise Box",
    slug: "sweet-surprise-box",
    category: "dessert boxes",
    price: 420,
    description: "A generous box of Sun Dessert favorites, packed to make gifting and sharing effortless.",
    imageUrl: "/assets/exclusive_offer.jpg",
    tags: ["gift", "sharing"],
    featured: false,
    available: true,
    createdAt: "2026-09-03T08:04:00.000Z",
  },
  {
    id: 6,
    name: "Cookie Crumble Box",
    slug: "cookie-crumble-box",
    category: "cookies",
    price: 240,
    description: "A comforting mix of golden cookie bites, baked for an easy afternoon treat.",
    imageUrl: "/assets/brownies.jpg",
    tags: ["cookies", "sharing"],
    featured: false,
    available: true,
    createdAt: "2026-09-03T08:05:00.000Z",
  },
];