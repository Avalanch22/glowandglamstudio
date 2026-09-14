# Glow & Glam Studio — React Migration + Component Sourcing (Antigravity)

https://github.com/XaviourZone/glowandglamstudio.git

Your scaffold in the screenshot matches the original plan, good. This is the next phase: move it to React, pull polished component primitives from **21st.dev**, reskin them into "Quiet Glow" instead of default shadcn, and set up drop-in photo folders. Save this file in the repo as `REACT_MIGRATION_BRIEF.md` and tell Antigravity to read it alongside `PROJECT_BRIEF.md` — same reasoning as before, it keeps context persistent without re-pasting.

Six prompts, in order, each with a checkpoint before the next.

---

## Decisions made for you (stated so you can override any of them)

- **Vite + React + TypeScript + Tailwind + shadcn/ui.** TypeScript because almost everything on 21st.dev assumes it — fighting that would mean converting every component you pull in. shadcn/ui specifically because 21st.dev's whole catalogue installs *through* the shadcn CLI, not as regular npm packages.
- **Routing: a Vite multi-page build, not React Router.** Each route (`/`, `/about`, `/services/bridal-makeup`, etc.) becomes a real static `index.html` at build time, with a React root mounted into it. This keeps clean, crawlable URLs for your local-SEO service pages and sidesteps GitHub Pages' well-known problem where a client-side router 404s on any direct link or refresh, because there's no server to rewrite the path. If you later want an actual app-like area (client login, dashboard), that's a real reason to bring in React Router + the 404-redirect workaround — not needed for a marketing site.
- **Photo galleries load from local folders at build time** via Vite's `import.meta.glob`, not a CMS or external API. Drop a photo in, redeploy, it appears — no code edits. The one honest limitation: "redeploy" means a `git push`, not a truly live runtime update. More on that in Prompt 4.

## One prerequisite before Prompt 1

21st.dev components install through the shadcn CLI. Some install from a plain URL, no login. Others are hosted on 21st's own registry and need a free account: sign up at [21st.dev](https://21st.dev), grab your API key from your dashboard, set it in the terminal Antigravity will use:

```
export API_KEY_21ST=your_key_here
```

---

## PROMPT 1 — Migrate the scaffold to Vite + React + Tailwind + shadcn/ui

```
Migrate the current static HTML/CSS site to a Vite + React + TypeScript
project, with Tailwind CSS and shadcn/ui as the component foundation.

1. Scaffold with `npm create vite@latest . -- --template react-ts`, adapting
   for a non-empty directory. Keep the existing static .html files and
   PROJECT_BRIEF.md around as content reference for now — don't delete them
   yet.
2. Install and configure Tailwind CSS.
3. Run `npx shadcn@latest init`. When asked, choose CSS variables (not
   utility classes) for theming, so our palette maps cleanly into every
   component we install later.
4. In the generated globals.css, replace shadcn's default CSS variables with
   our "Quiet Glow" tokens from PROJECT_BRIEF.md, mapped to shadcn's naming
   so every future component auto-themes correctly:
     --background          → canvas   #FAF6F0
     --foreground           → ink      #24201C
     --primary               → accent   #B5714A
     --primary-foreground    → canvas
     --secondary / --muted   → surface #F3EAE1 / accent-soft #D8B98C
     --border / --input      → a faint hairline tone derived from ink at low
                                opacity, not shadcn's default gray
     --radius                → small (2-4px), sharp/editorial — NOT the
                                default rounded-2xl SaaS look
   Wire in Fraunces (font-display) and Inter (font-sans) via Google Fonts in
   tailwind.config, matching the brief's type system.
5. Build this as a MULTI-PAGE app: configure vite.config.ts's
   build.rollupOptions.input with one entry per route in our sitemap
   (index.html, about/index.html, services/index.html,
   services/bridal-makeup/index.html, ...one per service, portfolio,
   packages, reviews, book-now, contact). Each mounts its own React root.
   Navigation between pages stays plain <a href> — we are NOT using React
   Router for page-to-page nav, on purpose (see brief).
6. Build shared components: <Layout>, <Header> (with the Services dropdown),
   <Footer>, <WhatsAppFloatButton>, matching what's already in the static
   site's header/footer, now as React components.
7. Get Home fully working through this pipeline — `npm run dev` AND a
   production `npm run build` — before I approve moving on.
```

---

## PROMPT 2 — Source components from 21st.dev (list before installing)
... (etc, saving the brief)
