# NOIR / Spatial Atelier

Concept / self-initiated project, implemented from the supplied premium landing-page brief. An independent Next.js App Router application with strict TypeScript, locally hosted fonts, Tailwind CSS, original SVG artwork and responsive layouts.

## Develop

Use the existing checkout at `/workspace/NOIR_ARCHITECTURE`. Tasks are already isolated; do not create a Git worktree unless explicitly requested.
Requires Node.js 22.13+ (tested with 24.19) and npm 11.

```sh
npm ci
npm run dev
```

Development port: 3001. Production: `npm run build` then `npm start`. Checks: `npm run lint` and `npm run typecheck`.
No API keys, environment variables, database or backend are needed. All assets and fonts are local, so the rendered site has no external requests. Deploy the repository as a standard Next.js project on Vercel; choose npm as the package manager.

## Interactions and honesty

All demos are local browser state. Forms validate without sending, storing or logging submitted information. Authentication/checkout CTAs open explicit concept dialogs. All metrics, prices, specifications and brands are fictional. See `/concept` and `ASSET_CREDITS.md`.

The supplied ZIP contains textual briefs and reference links but no attached screenshots, photographs, SVGs or 3D models. The implementation follows its visual direction using original assets. It does not embed third-party design screenshots. Any vehicle gallery is explicitly a gallery of concept views, not a 360° viewer; any material swatches are finish studies, not physical-product guarantees.

## Browser validation

Run `npm test` against the production server. The Playwright suite checks responsive layout, local assets, navigation and product interactions. Set `BROWSER_EXECUTABLE_PATH=/usr/bin/chromium` to use the cloud image browser; otherwise install Chromium with `npx playwright install chromium`. Screenshots are written to `test-results/`. Build and development scripts use the supported Webpack bundler for compatibility with environments that restrict Turbopack subprocess sockets.
