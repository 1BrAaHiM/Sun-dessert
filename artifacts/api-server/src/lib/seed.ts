import { db, productsTable } from "@workspace/db";
import { logger } from "./logger";

const starterProducts = [
  {
    name: "Classic Fudge Brownie",
    slug: "classic-fudge-brownie",
    category: "brownies",
    price: 160,
    description: "A soft, rich chocolate brownie with a fudgy center and a delicate crackled top.",
    imageUrl: "/assets/classic%20brownie.png",
    tags: ["classic", "chocolate", "best seller"],
    featured: true,
    available: true,
  },
  {
    name: "Extra Chocolate Brownie",
    slug: "extra-chocolate-brownie",
    category: "brownies",
    price: 180,
    description: "Deep cocoa brownie finished with generous chocolate pieces for an extra indulgent bite.",
    imageUrl: "/assets/extra%20chocolate%20brownie.png",
    tags: ["chocolate", "rich"],
    featured: true,
    available: true,
  },
  {
    name: "Hazelnut Brownie",
    slug: "hazelnut-brownie",
    category: "brownies",
    price: 195,
    description: "Our fudgy brownie layered with roasted hazelnut flavor and a warm, nutty finish.",
    imageUrl: "/assets/hazelnut%20brownie.png",
    tags: ["hazelnut", "signature"],
    featured: true,
    available: true,
  },
  {
    name: "Celebration Cake",
    slug: "celebration-cake",
    category: "cakes",
    price: 650,
    description: "A joyful celebration cake made for birthdays, gatherings, and the moments worth making sweeter.",
    imageUrl: "/assets/celebrate.jpg",
    tags: ["celebration", "custom"],
    featured: true,
    available: true,
  },
  {
    name: "Sweet Surprise Box",
    slug: "sweet-surprise-box",
    category: "dessert boxes",
    price: 420,
    description: "A generous box of Sun Dessert favorites, packed to make gifting and sharing effortless.",
    imageUrl: "/assets/exclusive_offer.jpg",
    tags: ["gift", "sharing"],
    featured: false,
    available: true,
  },
  {
    name: "Cookie Crumble Box",
    slug: "cookie-crumble-box",
    category: "cookies",
    price: 240,
    description: "A comforting mix of golden cookie bites, baked for an easy afternoon treat.",
    imageUrl: "/assets/brownies.jpg",
    tags: ["cookies", "sharing"],
    featured: false,
    available: true,
  },
];

export async function seedProducts(): Promise<void> {
  const existing = await db.select({ id: productsTable.id }).from(productsTable).limit(1);
  if (existing.length > 0) {
    return;
  }

  await db.insert(productsTable).values(starterProducts);
  logger.info({ count: starterProducts.length }, "Seeded starter dessert products");
}