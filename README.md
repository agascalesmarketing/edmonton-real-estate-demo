# North & Nest Real Estate

A complete premium, multi-page Edmonton real estate **portfolio demonstration by AgaScales Digital Marketing**. North & Nest is fictional: it is not a brokerage and does not provide real estate services. Every property, price, and architectural image is illustrative.

**Find your place. Make it home.**

## Download and open on your Mac — no server required

1. On GitHub, open this repository, choose the **main** branch, then select **Code → Download ZIP**.
2. Extract the **entire ZIP** in Finder. Keep the folder structure intact; the pages depend on their adjacent assets and folders.
3. Open `offline-preview/index.html` in Safari, Chrome, or Firefox. You can also right-click it → **Open With** → your browser.
4. Use the navigation to explore every page. All local navigation uses explicit relative `index.html` paths, so it works through `file://` without a development server or internet connection.

The fonts, architectural images, CSS, and JavaScript are bundled. Listing filters, mobile navigation, demonstration forms, and print-friendly guides work offline. Links labelled as external official resources need internet access. If your browser blocks local scripts due to a custom security setting, use another browser with its default settings; do not disable browser security.

For a smaller standalone download, `downloads/north-and-nest-offline-preview.zip` contains only the complete offline site. Extract it and open its `index.html`.

## Deploy to Netlify — manual, never automatic from this project

The **`netlify-deploy` directory is the complete production output**. Its `index.html` is at the root. It also contains all page directories, fonts, images, CSS, JavaScript, a custom `404.html`, and `_headers`.

1. Log in to Netlify and open its manual deploy / drag-and-drop workflow.
2. Upload the **`netlify-deploy` folder itself**, not the repository root and not the offline-preview folder. Alternatively, extract `downloads/north-and-nest-netlify-deploy.zip` and upload the extracted folder.
3. Netlify will publish only when **you** submit the folder. This repository does not publish a site automatically.
4. Check `/`, `/about/`, `/buy/`, `/sell/`, `/properties/`, `/properties/sample-home-1/`, `/neighbourhoods/`, `/neighbourhoods/glenora/`, `/resources/`, and `/contact/`. Visit a detail URL directly and refresh it.

All routes are real static directory pages with their own `index.html`; no client-side router or SPA rewrite is used. Direct route loads and refreshes were verified on a static HTTP server. A live Netlify deployment has not been created or tested.

If you choose a Git-connected Netlify deployment later, `netlify.toml` specifies build command `npm run build` and publish directory `netlify-deploy`. Choosing and activating continuous deployment is your decision. Use Node.js 20 or newer. No environment variables or secrets are required. There is no Netlify Forms integration.

## Project structure

- `src/data.mjs` — six fictional homes, five Edmonton neighbourhoods, four educational guides.
- `src/assets/` — shared design system, local interaction script, generated imagery, local fonts, and favicon.
- `scripts/build.mjs` — dependency-free static generator, page content, shared page layout, and separate offline/deployment link handling.
- `offline-preview/` — complete offline-friendly output with explicit file links.
- `netlify-deploy/` — complete deployment output with directory URLs and security headers.
- `site-manifest.json` — generated list of pages and unique titles/descriptions.
- `tests/check.mjs` — route, link, asset, metadata, disclosure, and form-safety checks.
- `tests/browser.cjs` — functional, offline, responsive, and automated accessibility checks.
- `downloads/` — portable zipped preview and deploy folders.
- `ASSETS.md` — imagery and font provenance/licensing.
- `VALIDATION.md` — tested capabilities and limitations.

## Development

Node.js 20+ is sufficient to generate or check the site; there are **no runtime dependencies**. The locked development dependencies are only for browser testing.

```sh
npm ci --ignore-scripts
npm run build
npm run check
```

Or run `npm test` to regenerate both outputs and check them together. Edit the source, then rebuild; generated output is intentionally committed for immediate preview and deployment. Do not edit generated pages by hand. The build replaces only its managed `offline-preview` and `netlify-deploy` directories.

Optional local HTTP development:

```sh
npm run serve
```

This uses Python 3 and serves the production folder on port 4173. A server is **not** needed for the Mac offline preview.

Browser checks:

```sh
npx playwright install chromium
npm run test:browser
```

The test also supports an existing system Chromium, or `CHROMIUM_PATH=/path/to/chromium npm run test:browser`. It creates and stops its own local static server, audits 25 pages with axe-core, and tests all routes, mobile layouts, filters, forms, and offline file navigation. It writes desktop and mobile screenshots to the OS temporary directory. If a managed cloud browser blocks `file://`, the test reports that limitation and uses filesystem-backed browser request fulfillment with network disabled. The direct Mac file-open experience is not tested in that fallback.

To refresh the portable ZIPs after rebuilding, run:

```sh
python3 scripts/package.py
```

## Pages and features

25 independently rendered pages: homepage; about; buying; selling; property collection and **six** property details; neighbourhood index and **Glenora, Windermere, Ritchie, Strathcona, Summerside** guides; resources and **four printable educational guides**; contact; demonstration/privacy; and a 404 page.

The collection supports combined price, minimum-bedroom, and property-type filters, a reset, result counts, and an empty state. Navigation includes mobile menu state, keyboard focus, Escape-to-close, and a skip link. Typography and colours follow the supplied charcoal, ivory, champagne, and sage identity. Layouts respond to screen size, motion respects reduced-motion settings, and every page has its own heading, title, and description.

## Demonstration forms and privacy

Forms are browser-only demonstrations. They **do not send, email, or store information**. There is no backend, analytics, cookie usage, local storage, or session storage. Entries clear after local confirmation. Form fieldsets are disabled until JavaScript registers the local submission handler. Without JavaScript, the forms remain disabled with an explanation. Production security headers also block form submissions and network connections.

Use fictional details, not personal or property information. Browser autofill, extensions, and hosting access logs are outside the application's control.

## Content boundaries

No real addresses, MLS® feeds, scraped data, current market statistics, school ratings, fabricated credentials, reviews, transaction history, or sales results appear. Neighbourhood guides provide general geographic context and practical verification questions. The Summerside guide explicitly requires checking property-specific lake-access and association obligations. Educational guides do not replace legal, mortgage, tax, or licensed real estate advice.

**Created for the AgaScales Digital Marketing portfolio.**
