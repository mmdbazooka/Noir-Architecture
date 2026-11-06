# Validation — 7 November 2026

- Production build: passed (`npm run build`, Next.js Webpack).
- ESLint: passed, no warnings.
- Strict TypeScript: passed.
- Playwright: 5 tests passed against the production build.
- Screenshots: 1920×1080, 1440×900, 1024×768, 768×1024, 390×844, 360×800.
- No horizontal document overflow or broken local images at tested widths.
- All internal section anchors resolve. Mobile menu, keyboard dismissal, dialog focus and concept route verified.
- Automated axe WCAG 2 A/AA and WCAG 2.1 AA tagged rules: no violations in the tested page state. This is automated coverage, not a full manual accessibility certification.
- Normal motion, reduced motion and main content without JavaScript verified.
- All product-specific demo interactions exercised by `tests/interactions.spec.ts`.
- Development server also exercised on the representative NOIR app.

No live backend, authentication, transaction, AI inference or 3D model is represented as functioning. See README.md for the supported local demo boundaries.

## Tailwind migration

- Replaced the standalone brand/component stylesheet with Tailwind v4 utilities in TSX.
- Retained only Tailwind setup, tokens, document defaults, accessibility and animation keyframes in `app/globals.css`.
- Production build, ESLint, strict TypeScript and the complete Playwright suite passed after migration.
- Compared document/component styles at the six listed viewport sizes and checked the concept route at desktop and mobile sizes.
- Compared interactive styles for the scrolled header and product-specific selections against the previous styles.
- Updated class-state assertions to match complete class tokens, so arbitrary Tailwind selectors cannot satisfy them accidentally.
