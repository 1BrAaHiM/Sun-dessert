---
name: Angular template constraints
description: Angular's strict template parser rejects inline arrow-function expressions.
---

Angular templates should keep filtering, counting, and lookup logic in component getters or methods rather than inline arrow functions.

**Why:** The strict Angular compiler rejects expressions such as `items.filter(item => ...)` in interpolation, even when the equivalent TypeScript expression is valid.

**How to apply:** Add a typed getter or method on the standalone component and bind the template to that result.