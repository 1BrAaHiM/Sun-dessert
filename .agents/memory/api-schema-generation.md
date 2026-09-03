---
name: API schema generation
description: Compatibility note for OpenAPI contracts and generated Zod validation in this workspace
---

OpenAPI `integer` schemas can generate `zod.int()` in this workspace, while the installed Zod runtime exposes integer validation through `z.number().int()`. Prefer numeric API schemas with explicit runtime integer validation when adding contracts unless the generator/runtime versions are aligned.

**Why:** Code generation succeeded but the library typecheck failed because the generated code targeted a Zod API not present in the installed package.

**How to apply:** After every OpenAPI change, run codegen and `pnpm run typecheck:libs` before adding route handlers that import the generated schemas.