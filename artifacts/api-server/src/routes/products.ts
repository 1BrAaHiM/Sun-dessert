import { and, desc, eq, ilike, sql } from "drizzle-orm";
import { Router, type IRouter } from "express";
import { db, productsTable } from "@workspace/db";
import {
  CreateProductBody,
  CreateProductResponse,
  DeleteProductParams,
  GetProductParams,
  GetProductResponse,
  GetStoreSummaryResponse,
  ListCategoriesResponse,
  ListProductsQueryParams,
  ListProductsResponse,
  UpdateProductBody,
  UpdateProductParams,
  UpdateProductResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/products", async (req, res): Promise<void> => {
  const parsedQuery = ListProductsQueryParams.safeParse(req.query);
  if (!parsedQuery.success) {
    res.status(400).json({ error: parsedQuery.error.message });
    return;
  }

  const { category, search, featured, available } = parsedQuery.data;
  const filters = [];
  if (category) {
    filters.push(eq(productsTable.category, category));
  }
  if (search) {
    filters.push(ilike(productsTable.name, `%${search}%`));
  }
  if (featured !== undefined) {
    filters.push(eq(productsTable.featured, featured));
  }
  if (available !== undefined) {
    filters.push(eq(productsTable.available, available));
  }

  const products = await db
    .select()
    .from(productsTable)
    .where(filters.length > 0 ? and(...filters) : undefined)
    .orderBy(desc(productsTable.featured), productsTable.name);

  res.json(ListProductsResponse.parse(products));
});

router.post("/products", async (req, res): Promise<void> => {
  const parsed = CreateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const input = {
    ...parsed.data,
    tags: parsed.data.tags ?? [],
    featured: parsed.data.featured ?? false,
    available: parsed.data.available ?? true,
  };

  try {
    const [product] = await db.insert(productsTable).values(input).returning();
    res.status(201).json(CreateProductResponse.parse(product));
  } catch (error) {
    req.log.warn({ error }, "Unable to create product");
    res.status(400).json({ error: "A product with that slug may already exist." });
  }
});

router.get("/products/:id", async (req, res): Promise<void> => {
  const params = GetProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, params.data.id));

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(GetProductResponse.parse(product));
});

router.patch("/products/:id", async (req, res): Promise<void> => {
  const params = UpdateProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (Object.keys(parsed.data).length === 0) {
    res.status(400).json({ error: "At least one field is required." });
    return;
  }

  try {
    const [product] = await db
      .update(productsTable)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(productsTable.id, params.data.id))
      .returning();

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(UpdateProductResponse.parse(product));
  } catch (error) {
    req.log.warn({ error }, "Unable to update product");
    res.status(400).json({ error: "A product with that slug may already exist." });
  }
});

router.delete("/products/:id", async (req, res): Promise<void> => {
  const params = DeleteProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [product] = await db
    .delete(productsTable)
    .where(eq(productsTable.id, params.data.id))
    .returning({ id: productsTable.id });

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.sendStatus(204);
});

router.get("/categories", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      category: productsTable.category,
      count: sql<number>`count(*)`,
      imageUrl: sql<string>`min(${productsTable.imageUrl})`,
    })
    .from(productsTable)
    .where(eq(productsTable.available, true))
    .groupBy(productsTable.category)
    .orderBy(productsTable.category);

  res.json(
    ListCategoriesResponse.parse(
      rows.map((row) => ({
        category: row.category,
        count: Number(row.count),
        imageUrl: row.imageUrl,
      })),
    ),
  );
});

router.get("/store-summary", async (_req, res): Promise<void> => {
  const products = await db
    .select({
      id: productsTable.id,
      category: productsTable.category,
      featured: productsTable.featured,
    })
    .from(productsTable)
    .where(eq(productsTable.available, true));

  res.json(
    GetStoreSummaryResponse.parse({
      productCount: products.length,
      categoryCount: new Set(products.map((product) => product.category)).size,
      featuredCount: products.filter((product) => product.featured).length,
    }),
  );
});

export default router;