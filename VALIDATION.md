# Validation evidence

Validated in the Codex Cloud environment on October 9, 2026. No site was published.

## Passed

- Frozen development dependency installation: `npm ci --ignore-scripts --no-audit --no-fund`.
- Static generation and checks: `npm test` built 25 independent pages in **each** of the two outputs; verified **50 HTML pages and 1,690 local links/assets**.
- All required routes, six fictional property details, five neighbourhood guides, four resource guides, and unique page titles/descriptions are present.
- All images have descriptive alt text; fonts and images are local; no external asset dependencies exist.
- `npm run test:browser` with Playwright and system Chromium:
  - Direct HTTP visits **and refreshes** on all 25 production routes.
  - All images loaded and both local font families were available.
  - **25 axe-core WCAG A/AA/2.1 AA automated page audits: zero violations reported.** Automated checks do not establish complete accessibility conformance.
  - **25 mobile layouts at 390 px** and desktop layouts at 1,440 px, without horizontal overflow.
  - Price, bedroom, and type filters in combination; no-results state; reset; navigation to the matching property.
  - Buyer, seller, and contact forms: local confirmation, no submission network requests, cleared fields, and no local/session storage.
  - Mobile menu navigation, expanded state, and Escape-to-close.
  - All 25 offline output pages with **network disabled**, using filesystem-backed request fulfillment; no external asset requests. Offline filtering and property navigation passed.
  - Demonstration forms remain disabled when JavaScript is unavailable.
  - No JavaScript page errors or browser console errors in the production interactions.
- Preview and deployment ZIP archives validated for integrity and root `index.html`; archive timestamps are deterministic.
- Build repeatability: regenerating the outputs leaves their content unchanged.

## Boundaries

The cloud's managed Chromium blocks `file://` navigation by administrator policy. The exact Finder/double-click file opening experience on a Mac could not be executed here. Explicit relative `.html` links are checked on disk, and the complete offline build was browser-tested with network disabled through local filesystem fulfillment. No browser security policy was changed or bypassed.

Safari, Firefox, actual screen-reader operation, and live Netlify hosting were not tested. The build uses standard HTML/CSS/classic JavaScript with no fetch-based page loading, ES module script imports, or external assets, so it is designed to support ordinary local-file browsing. Netlify direct routes are physical directory pages; deployment to a live Netlify site remains the user's action.

The site does not provide real estate services. All property details and imagery are fictional; educational and neighbourhood content is general and does not substitute for current official information or professional advice.
