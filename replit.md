# Sun Dessert Store

A clean Angular dessert storefront for Sun Dessert in Elmenoufia, ready to connect to a .NET REST backend.

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

- `artifacts/sun-dessert-store/src/app` — Angular shell, routes, product service, storefront pages, and admin product manager.
- `artifacts/sun-dessert-store/public/assets` — supplied Sun Dessert product and brand imagery.
- `artifacts/sun-dessert-store/src/app/product.service.ts` — REST adapter for the .NET backend with local browser fallback for preview use.

## Architecture decisions

- Product management is intentionally a simple shared admin surface at `/admin`; authentication can be added before public launch if needed.
- Customer ordering is handled through WhatsApp rather than a cart or payment checkout.
- Product images are bundled as supplied static assets, while product metadata and availability live in PostgreSQL.
- The public site keeps navigation focused on About Us, Products/category browsing, and Order.
- The Angular frontend expects the .NET API to expose `/products`, `/products/{id}`, and the matching POST/PATCH/DELETE operations.

## Product

Customers can browse featured desserts, search and filter by category, open a bakery-style product detail page, choose a quantity, and send an order request to WhatsApp. The admin can add, edit, feature, hide, and remove products. The frontend is Angular-only and does not import the internal React client.

## User preferences

- Use Elmenoufia, Shibin El Kom in the footer and general contact details.
- General WhatsApp: 01044279407. Order WhatsApp: 01129939015.
- Instagram: https://www.instagram.com/sun_dessert_eg/. TikTok: https://www.tiktok.com/@sun_dessert_3.

## Gotchas

- Run `pnpm --filter @workspace/sun-dessert-store run typecheck` to compile the Angular app.
- Set `window.__SUN_DESSERT_API_URL__` before bootstrapping if the .NET API is hosted at a different base URL than `/api`.
- The browser fallback data makes the preview usable without a .NET API; successful REST responses replace it and persist in the browser cache.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
