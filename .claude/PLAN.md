# Redezeit: Upgrade & Improvement Plan

## Context

The Redezeit project is a Remix 2.12.1 website on Vite 5, React 18, Tailwind 3, deployed on Netlify. It serves a vulnerable population (refugees seeking conversation partners) in 4 languages. The codebase is in good shape overall (Biome linting, TypeScript strict, all v3 future flags enabled), but has accumulated technical debt: outdated framework (Remix → React Router v7 transition), security issues, minimal test coverage, accessibility gaps, and type safety compromises.

---

## What NOT to Do

These were considered and deliberately rejected:

- **Tailwind v4** — Disruptive config rewrite, no user-facing benefit, v3 is maintained
- **React 19** — Wait for RR7 ecosystem to stabilize first
- **Vite 6** — Do after RR7 migration settles, not before
- **Dark mode** — No user demand, brand built around light green palette
- **Design system / component library** — ~30 components, not a product platform

---

## How This Plan Works

- **4 phases, each = 1 PR on its own branch** (except Phase 3 which is ongoing individual PRs)
- **Each phase = 1 Claude Code session** — start session, create branch, do all tasks, commit, push, open PR
- Phases 0 and 1 can run **in parallel** (different files). Phase 2 requires both to be merged first.
- Check off tasks as they're completed. Pick up where you left off in the next session.

| Phase | Branch | Depends on | Session |
|-------|--------|------------|---------|
| 0 — Security & Bug Fixes | `fix/security-and-bugs` | nothing | Session 1 |
| 1 — UX & Migration Prep | `feat/ux-and-migration-prep` | nothing (parallel with 0) | Session 2 |
| 2 — React Router v7 Migration | `feat/react-router-v7` | Phase 0 + 1 merged to `main` | Session 3 |
| 3 — Code Quality | individual `fix/` or `feat/` branches per task | Phase 2 merged | Ongoing |

---

## Phase 0: Security & Bug Fixes

**Branch:** `fix/security-and-bugs` off `main`
**Ship as:** single PR, merge to `main`

- [x] Remove `console.log({ pw, envPw })` — leaks password to server logs (`app/routes/$locale.admin.csv-export.tsx:9`) **[S]**
- [x] Fix `var timeout` debounce bug — causes multiple form submits (`app/components/SpeakingTimeContent.tsx:79` — replace with `useRef<NodeJS.Timeout>`) **[S]**
- [x] Fix Header scroll handler — re-adds listener every render (`app/components/layout/Header.tsx:9-22` — wrap in `useCallback` or move into `useEffect`) **[S]**
- [x] Move hardcoded tracking IDs to env vars (`root.tsx` GTM, `gtag.client.ts` GA, `brevo.tsx` Brevo → `VITE_GTM_ID`, `VITE_GA_ID`, `VITE_BREVO_KEY`) **[S]**
- [x] Move tracking init from render to `useEffect` (`app/root.tsx:74-76`) **[S]**

**Done when:** all boxes checked, `npm run typecheck && npm run lint && npm test && npm run build` passes, PR opened.

---

## Phase 1: UX Quick Wins & Migration Prep

**Branch:** `feat/ux-and-migration-prep` off `main`
**Ship as:** single PR, merge to `main`

- [x] Replace `remix-seo` with manual `getSeoMeta()` utility (create `app/utils/seo.ts`, update route meta functions) **[S]**
- [x] Replace `json()` with plain object returns — singleFetch already enabled (`app/routes/enable-analytics.tsx`, `$locale._index.tsx`, `$locale.$slug.tsx`) **[S]**
- [x] Localize error boundary — currently English-only for all locales (`app/components/BasicErrorBoundary.tsx` — add `useTranslation()`) **[S]**
- [x] Add skip-to-content link (`app/components/layout/BasicLayout.tsx`) **[S]**
- [x] Internationalize SearchBar placeholder — "Suche..." is hardcoded (`app/components/SearchBar.tsx`) **[S]**
- [x] Fix hardcoded locale array to use `availableLocales` constant (`app/routes/$locale.tsx:16-18`) **[S]**
- [x] Add unit tests for coach search/filter logic (new test file) **[M]**

**Done when:** all boxes checked, `npm run typecheck && npm run lint && npm test && npm run build` passes, PR opened.

---

## Phase 2: Remix → React Router v7 Migration

**Branch:** `feat/react-router-v7` off `main` (after Phase 0 + 1 merged)
**Ship as:** single PR, merge to `main`

The project is 90% ready (all future flags enabled, no deprecated APIs). Main work is import updates and dependency swaps.

### Steps in order:

1. - [ ] Verify/upgrade `remix-i18next` for RR7 compatibility (`app/utils/i18n.server.ts`, `app/entry.server.tsx`, `app/entry.client.tsx`) **[S-M]**
2. - [ ] Run the Remix-to-RR7 codemod — updates ~34 files of `@remix-run/*` imports to `react-router` **[M]**
3. - [ ] Manual import updates:
   - `entry.server.tsx`: `RemixServer` → `ServerRouter`
   - `entry.client.tsx`: `RemixBrowser` → `HydratedRouter`
   - `cookies.ts`: `createCookie` from `react-router`
4. - [ ] Replace packages:
   - `@remix-run/node`, `@remix-run/react`, `@remix-run/serve`, `@remix-run/dev` → `react-router`, `@react-router/dev`
   - `@netlify/remix-adapter` → `@netlify/react-router`
   - Drop or replace `remix-development-tools`
5. - [ ] Update `vite.config.ts`:
   - Plugin: `vitePlugin as remix` → `reactRouter` from `@react-router/dev/vite`
   - Remove future flags object
6. - [ ] Update `package.json` scripts:
   - `"build": "remix vite:build"` → `"react-router build"`
   - `"dev": "remix vite:dev"` → `"react-router dev"`
7. - [ ] Test on Netlify deploy preview before merging

### Risk mitigations:
- Full manual QA across all 4 locales (de, en, ru, uk)
- Verify SEO meta tags render correctly (`curl` + view-source)
- Verify analytics fire (GTM debug mode)
- Verify i18n detection and language switching

**Done when:** all boxes checked, full verification passes, Netlify deploy preview works, PR opened.

---

## Phase 3: Code Quality (Ongoing)

**Branches:** individual `fix/` or `feat/` branches per task, each its own small PR
**Start after:** Phase 2 is merged (so we're on React Router v7)

- [ ] Refactor ContentBlocks — replace 13 `as any` casts with discriminated union type map (`app/components/ContentBlocks.tsx`) **[M]** → `feat/contentblocks-type-safety`
- [ ] Extract shared Button component — 3+ duplicated style strings (`SpeakingTimeContent`, `CookieBanner`, `csv-export`) **[S]** → `feat/shared-button-component`
- [ ] Fix German-only email template fallback (`app/components/CoachCard.tsx:239-246`) **[S]** → `fix/localize-email-template`
- [ ] Expand test coverage (ContentBlocks, Contentful utils, route loaders) **[L]** → `feat/test-coverage`

---

## Verification Checklist (run after each phase)

```bash
npm run typecheck   # no new TypeScript errors
npm run lint        # Biome passes
npm test            # all tests pass
npm run build       # production build succeeds
```

Plus manual QA: all 4 locales (de, en, ru, uk), coach search, blog, navigation.
Phase 2 specifically: verify on Netlify deploy preview before merging to main.
