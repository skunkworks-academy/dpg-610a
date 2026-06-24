# IBM DataPower Gateway — Self-Paced Course

A free, self-paced, hands-on online course on **IBM DataPower Gateway**, built by
[Skunkworks Academy](https://github.com/skunkworks-academy). It takes you from
fundamentals through architecture, the Multi-Protocol Gateway, security, message
processing, and operations — ending with guided, hands-on labs.

The course is a static site built with [Docusaurus](https://docusaurus.io/) and
deployed to GitHub Pages.

> **Live site:** https://skunkworks-academy.github.io/ibm-datapower-gateway/

## What's inside

| Module | Topic |
| --- | --- |
| 1 | Fundamentals — what DataPower is, form factors, where it fits, use cases |
| 2 | Architecture — domains, object model, services, configuration model |
| 3 | Multi-Protocol Gateway — handlers, processing policy, matches & actions |
| 4 | Security — TLS/crypto, AAA framework, threat protection |
| 5 | Message Processing — XSLT transforms, GatewayScript, error handling |
| 6 | Administration & Operations — logging, monitoring, troubleshooting, config mgmt |
| 7 | Hands-on Labs — build an MPGW, add TLS, write a transform, configure AAA |

Each lesson includes a **knowledge-check quiz** and a **mark-complete** button.
Progress is tracked in your browser via `localStorage` (nothing is sent to a
server) and shown on the home page.

## Run it locally

Requirements: **Node.js ≥ 18**.

```bash
# Install dependencies
npm install

# Start the dev server (with hot reload) at
# http://localhost:3000/ibm-datapower-gateway/
npm start
```

### Build a production bundle

```bash
# Type-check, then build the static site into ./build
npm run build

# Preview the production build locally
npm run serve
```

`npm run build` fails on broken internal links, so a green build means the
course's navigation is intact.

## Project structure

```
.
├── docs/                 # Course content (MDX) — one folder per module
├── src/
│   ├── components/       # Quiz, ProgressTracker, LessonComplete
│   ├── lib/              # courseData (module/lesson registry) + progress store
│   ├── pages/index.tsx   # Home page (hero, progress, module cards)
│   ├── theme/MDXComponents.tsx  # Registers <Quiz>/<LessonComplete> globally
│   └── css/custom.css    # Theming
├── static/img/           # Logo, favicon, social card
├── docusaurus.config.ts  # Site config (GitHub Pages, search, Mermaid)
├── sidebars.ts           # Explicit course/module/lesson ordering
└── .github/workflows/deploy.yml  # CI: build + deploy to GitHub Pages
```

### Authoring content

- Add a lesson as an `.md`/`.mdx` file under the relevant `docs/<module>/` folder.
- Register it in **two** places: `sidebars.ts` (ordering) and
  `src/lib/courseData.ts` (so it counts toward progress and appears on the home
  page). Keep the `lessonId` in `<LessonComplete lessonId="..." />` equal to the
  doc id (e.g. `security/aaa`).
- Use `<Quiz questions={[...]} />` and `<LessonComplete lessonId="..." />` —
  they're registered globally, no import needed.
- Diagrams use Mermaid fenced code blocks (```` ```mermaid ````).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes it to GitHub Pages.

**One-time setup:** in the GitHub repo, go to **Settings → Pages → Build and
deployment → Source** and select **GitHub Actions**.

## License

[MIT](./LICENSE) © Skunkworks Academy
