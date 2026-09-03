# Sun Dessert Store

A dessert storefront for Sun Dessert in Elmenoufia, with WhatsApp ordering and a lightweight product management panel.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/sun-dessert-store` — React storefront, category grids, product detail pages, About, Order, and admin product manager.
- `artifacts/api-server/src/routes/products.ts` — product CRUD, category summaries, and store summary API routes.
- `lib/db/src/schema/products.ts` — PostgreSQL/Drizzle product schema.
- `lib/api-spec/openapi.yaml` — source of truth for the generated API hooks and validation schemas.
- `artifacts/sun-dessert-store/public/assets` — supplied Sun Dessert product and brand imagery.

## Architecture decisions

- Product management is intentionally a simple shared admin surface at `/admin`; authentication can be added before public launch if needed.
- Customer ordering is handled through WhatsApp rather than a cart or payment checkout.
- Product images are bundled as supplied static assets, while product metadata and availability live in PostgreSQL.
- The public site keeps navigation focused on About Us, Products/category browsing, and Order.

## Product

Customers can browse featured desserts, search and filter by category, open a bakery-style product detail page, choose a quantity, and send an order request to WhatsApp. The admin can add, edit, feature, hide, and remove products.

## User preferences

- Use Elmenoufia, Shibin El Kom in the footer and general contact details.
- General WhatsApp: 01044279407. Order WhatsApp: 01129939015.
- Instagram: https://www.instagram.com/sun_dessert_eg/. TikTok: https://www.tiktok.com/@sun_dessert_3.

## Gotchas

- Run `pnpm --filter @workspace/api-spec run codegen` after changing `lib/api-spec/openapi.yaml`.
- Seeded products are inserted only when the products table is empty.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
