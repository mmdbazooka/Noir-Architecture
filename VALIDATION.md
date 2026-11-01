# Validation — 1 November 2026

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

No live backend, authentication, transaction, AI inference or 3D model is represented as functioning. See README.md for the supported local demo boundaries. Source is prepared locally; no GitHub push or deployment was performed.
