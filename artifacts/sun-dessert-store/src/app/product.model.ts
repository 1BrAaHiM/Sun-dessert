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
    price: 45,
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
    price: 60,
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
    price: 55,
    description: "Our fudgy brownie layered with roasted hazelnut flavor and a warm, nutty finish.",
    imageUrl: "/assets/hazelnut%20brownie.png",
    tags: ["hazelnut", "signature"],
    featured: true,
    available: true,
    createdAt: "2026-09-03T08:02:00.000Z",
  },
  {
    id: 4,
    name: "kinder dream brownie",
    slug: "kinder dream brownie",
    category: "brownies",
    price: 60,
    description: "Our fudgy brownie layered with roasted hazelnut flavor and a warm, nutty finish.",
    imageUrl: "/assets/kinder%20dream%20brownie.png",
    tags: ["kinder", "signature"],
    featured: true,
    available: true,
    createdAt: "2026-09-03T08:02:00.000Z",
  },
  // {
  //   id: 5,
  //   name: "Nutella Hazelnut brownie",
  //   slug: "nutella hazelnut brownie",
  //   category: "brownies",
  //   price: 65,
  //   description: "Our fudgy brownie layered with hazelnut and nutella and a warm, nutty finish.",
  //   imageUrl: "/assets/nutella20%hazelnut20%brownie.png",
  //   tags: ["nutella", "signature"],
  //   featured: true,
  //   available: true,
  //   createdAt: "2026-09-03T08:02:00.000Z",
  // },
  {
    id: 5,
    name: "Celebration Cake",
    slug: "celebration-cake",
    category: "cakes",
    price: 650,
    description: "A joyful celebration cake made for birthdays, gatherings, and moments worth making sweeter.",
    imageUrl: "/assets/cakes.jpg",
    tags: ["celebration", "custom"],
    featured: true,
    available: true,
    createdAt: "2026-09-03T08:03:00.000Z",
  },
  
    {
    id: 6,
    name: "Dessert Boxes",
    slug: "Dessert Boxes",
    category: "dessert-boxes",
    price: 650,
    description: " Get a collection of your favourite dessert tailored to your taste.",
    imageUrl: "/assets/celebrate.jpg",
    tags: ["kinder", "signature"],
    featured: true,
    available: true,
    createdAt: "2026-09-03T08:02:00.000Z",
  },
  
  {
    id: 7,
    name: "Cookies",
    slug: "cookies",
    category: "cookies",
    price: 65,
    description: "A comforting mix of golden cookie bites, baked for an easy afternoon treat.",
    imageUrl: "/assets/cookies.jpg",
    tags: ["cookies", "sharing"],
    featured: false,
    available: true,
    createdAt: "2026-09-03T08:05:00.000Z",
  },
];