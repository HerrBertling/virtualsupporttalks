# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Build & Development:**
- `npm run dev` - Start development server (Remix with Vite)
- `npm run build` - Build for production
- `npm run start` - Start production server via Netlify

**Code Quality:**
- `npm run lint` - Run ESLint with caching
- `npm run typecheck` - Run TypeScript type checking
- `npm run test` - Run tests with Vitest

**Contentful Integration:**
- `npm run contentful-typescript-codegen` - Generate TypeScript types from Contentful schema
- Requires `CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN` in `.env`

## Architecture Overview

This is a **multilingual Remix application** deployed on Netlify, built for the "Redezeit" platform connecting coaches and people needing speaking time.

**Key Technologies:**
- **Remix v2** with Vite bundling and future flags enabled
- **Contentful CMS** as headless content management system
- **TailwindCSS** for styling with typography plugin
- **i18next** for internationalization (de, en, ru, uk locales)
- **React GA4** for analytics with GDPR compliance
- **Netlify** for hosting with edge functions

**Content Architecture:**
- Content types: `page`, `blogpost`, `coach`, `coachtag`, `testimonials`, `network`, `media`, `supporter`
- Generated TypeScript types in `@types/generated/contentful.d.ts`
- Locale-specific routing with `$locale` parameter

**Routing Structure:**
- Locale-prefixed routes (`$locale.tsx` as layout)
- Dynamic pages via `$locale.$slug.tsx`
- Blog system with tags at `$locale.blog.tsx`
- Special coaching pages per locale (e.g., `de.ich-suche-redezeit.tsx`)

**State Management:**
- Cookie-based GDPR consent tracking
- Server-side locale detection and i18n setup
- Context-free component architecture

**Environment Setup:**
- Copy `.env.template` to `.env`
- Required: `CONTENTFUL_SPACE`, `CONTENTFUL_ACCESSTOKEN`
- Optional: `CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN` (for type generation)

**Content Utilities:**
- `app/utils/contentful.ts` - All Contentful API interactions
- Client initialization with error handling
- Typed content fetching functions for all content types
- Built-in locale handling and content includes

**Component Organization:**
- `app/components/` - Reusable UI components
- `app/components/ContentBlocks/` - Contentful-driven content blocks
- `app/components/layout/` - Header, Footer, Navigation
- `app/components/icons/` - Custom icon components

## Preferred CLI Tools

Use these modern, faster alternatives to standard tools when available:
- `rg` (ripgrep) instead of `grep` - Much faster searching
- `fd` instead of `find` - Faster file finding
- `eza` instead of `ls` - Enhanced directory listing
- `bat` instead of `cat` - Syntax highlighting and git integration
- `dust` instead of `du` - Better disk usage display
- `delta` for git diffs - Enhanced diff viewing
- `fzf` for fuzzy finding - Interactive file/command selection
- `zoxide` (`z`) for directory navigation - Smart directory jumping

Install essentials: `brew install ripgrep fd eza bat dust delta fzf zoxide`