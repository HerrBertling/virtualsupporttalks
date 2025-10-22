# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Remix-based website for Redezeit, deployed on Netlify. The site is multilingual (German, English, Russian, Ukrainian) and uses Contentful as a headless CMS for content management. The application connects refugee coaches with people seeking conversation partners.

## Required Environment Setup

Before running the project, create a `.env` file based on `.env.template`:

- `CONTENTFUL_SPACE`: Contentful space ID
- `CONTENTFUL_ACCESSTOKEN`: Contentful delivery API token
- `CONTENTFUL_ENVIRONMENT`: Usually "master"
- `CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN`: Required for generating TypeScript types from Contentful

Find these values in Contentful under Settings > API keys.

## Common Commands

### Development
```bash
npm run dev                           # Start local development server
npm run build                         # Build for production
npm start                             # Serve production build locally (via Netlify)
```

### Type Generation
```bash
npm run contentful-typescript-codegen # Generate TypeScript types from Contentful schema
```

This generates types to `@types/generated/contentful.d.ts` based on the current Contentful content model.

### Code Quality
```bash
npm run lint                          # Run ESLint
npm run typecheck                     # Run TypeScript type checking
npm test                              # Run Vitest tests
```

## Architecture

### Contentful Integration

The site is entirely content-driven through Contentful:

- **Content fetching**: All Contentful API calls are in `app/utils/contentful.ts`
- **Content types**: TypeScript types are auto-generated in `@types/generated/contentful.d.ts`
- **Content blocks**: Modular content blocks are rendered via `app/components/ContentBlocks.tsx`, which maps Contentful content types to React components

Key Contentful utilities:
- `getPage(slug, locale)`: Fetch page by slug
- `getPageById(id, locale)`: Fetch page by Contentful entry ID
- `getCoaches(lang)`: Fetch coach profiles with language filtering
- `getMainNav(locale)`: Fetch navigation structure
- `getBlogposts(locale)`: Fetch blog posts

### Internationalization (i18n)

Uses `remix-i18next` for translations:

- **Supported locales**: `de` (German), `en` (English), `ru` (Russian), `uk` (Ukrainian)
- **Translation files**: `public/locales/{locale}/common.json`
- **Locale configuration**: `app/utils/locales.ts`
- **i18n setup**: `app/utils/i18n.server.ts` and `app/utils/i18n.ts`

Locales are handled via URL routing: `/{locale}/path`. The locale parameter is extracted in loaders and passed to Contentful queries.

### Routing Structure

Remix file-based routing with dynamic locale prefixes:

- `app/routes/$locale.tsx`: Layout wrapper that fetches navigation and wraps all locale-specific pages
- `app/routes/$locale._index.tsx`: Homepage
- `app/routes/$locale.$slug.tsx`: Dynamic pages from Contentful
- `app/routes/$locale.blog.tsx`: Blog layout
- `app/routes/$locale.blog._index.tsx`: Blog listing
- `app/routes/$locale.blog.$post.tsx`: Individual blog post
- Language-specific routes: e.g., `de.ich-suche-redezeit.tsx`, `en.i-need-speaking-time.tsx` for special pages

### Content Block System

Pages in Contentful are composed of reusable content blocks. Each block type maps to a React component:

- `headerBlock` → `ContentBlockHeader`
- `centeredContent` → `ContentBlockCentered`
- `contentImageBg` → `ContentBlockImageBg`
- `twoImages` → `ContentBlockTwoImages`
- `videoPlayer` → `VideoPlayer`
- `testimonials` → `Testimonial`
- etc.

The `ContentBlocks` component in `app/components/ContentBlocks.tsx` iterates through a page's content array and renders the appropriate component for each block type.

### Coach Search & Filtering

The coach directory allows filtering by language, gender, and tags:

- Coach data comes from Contentful via `getCoaches()`
- Filtering logic is in `app/routes/de.ich-suche-redezeit.tsx` and similar language-specific routes
- `app/components/CoachCard.tsx`: Individual coach display
- `app/components/CoachSearch.tsx` and `app/components/SearchBar.tsx`: Search interface

### Analytics & Tracking

- **Google Tag Manager**: Integrated via `GTM-NH6W3MZ`
- **Brevo**: Email marketing integration via `app/brevo.tsx`
- **Cookie consent**: Managed via `app/cookies.ts` with `gdprConsent` cookie
- Tracking is only enabled when user consents via `CookieBanner` component

### Deployment

Deployed to Netlify:

- Build command: `npm run build`
- Publish directory: `build/client`
- Configuration: `netlify.toml`
- Adapter: `@netlify/remix-adapter`

### Styling

- **Tailwind CSS**: Primary styling framework
- **Typography plugin**: `@tailwindcss/typography` for rich text
- Config: `tailwind.config.js`
- Global styles: `app/styles/app.css`

## Key Files

- `app/root.tsx`: Root layout with SEO, analytics setup, and cookie banner
- `app/routes/$locale.tsx`: Main layout that loads navigation for all pages
- `app/utils/contentful.ts`: All Contentful API integration
- `app/components/ContentBlocks.tsx`: Content block renderer
- `getContentfulEnvironment.js`: Helper for Contentful Management API access
