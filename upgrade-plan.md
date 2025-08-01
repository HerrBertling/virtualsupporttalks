# Remix v2 to React Router v7 Migration Plan

## Overview
This document tracks the step-by-step migration from Remix v2 to React Router v7. Each task produces a separate commit to maintain a working, deployable state throughout the upgrade process.

## Current State Analysis

### Dependencies to Replace (Current Actual Versions)
- `@remix-run/node@2.15.2` → `react-router@7`
- `@remix-run/react@2.15.2` → `react-router@7` 
- `@remix-run/serve@2.15.2` → `react-router@7`
- `@remix-run/dev@2.15.2` → `react-router@7`
- `@netlify/remix-adapter@2.6.0` → needs investigation for v7 compatibility
- `@netlify/remix-runtime@2.3.1` → needs investigation for v7 compatibility

### Current Future Flags (enabled in vite.config.ts)
- `v3_fetcherPersist: true`
- `v3_lazyRouteDiscovery: true` 
- `v3_relativeSplatPath: true`
- `v3_throwAbortReason: true`
- `v3_singleFetch: true`

### Third-party Remix Integrations (Current Actual Versions)
- `remix-i18next@6.4.1` - needs React Router v7 compatible version
- `remix-seo@0.1.0` - needs React Router v7 compatible version  
- `remix-development-tools@4.7.7` - needs React Router v7 compatible version

### Environment
- **Node.js**: v22.2.0 ✅ (meets v7 requirement of Node 20+)
- **npm**: v10.7.0
- **Git branch**: upgrade/remix-to-react-router-v7

### Route Files (18 total)
- `$locale.$slug.tsx`
- `$locale._index.tsx`
- `$locale.admin.csv-export.tsx`
- `$locale.blog.$post.tsx`
- `$locale.blog._index.tsx`
- `$locale.blog.tag.$tag.tsx`
- `$locale.blog.tsx`
- `$locale.sitemap[.]xml.tsx`
- `$locale.tsx`
- `_index.tsx`
- `de.ich-suche-redezeit.tsx`
- `de.netzwerk-partner-medien.tsx`
- `en.i-need-speaking-time.tsx`
- `en.network-partner-media.tsx`
- `enable-analytics.tsx`
- `ru.i-need-speaking-time.tsx`
- `ru.network-partner-media.tsx`
- `uk.i-need-speaking-time.tsx`
- `uk.network-partner-media.tsx`

## Migration Tasks

### ✅ Phase 1: Preparation & Analysis
- [x] **Task 1**: Create upgrade-plan.md with detailed tracking
- [x] **Task 2**: Analyze current dependencies and create backup

### Phase 2: Core Migration  
- [ ] **Task 3**: Update package.json dependencies
- [ ] **Task 4**: Update Vite configuration
- [ ] **Task 5**: Update entry points

### Phase 3: Route Migration
- [ ] **Task 6**: Update all route files (18 files)

### Phase 4: Integration Updates
- [ ] **Task 7**: Update third-party integrations

### Phase 5: Testing & Validation
- [ ] **Task 8**: Comprehensive testing and validation

## Task Details & Commits

### Task 1: Create upgrade-plan.md ⏳ IN PROGRESS
**Status**: In Progress
**Commit**: TBD
**Details**: Document current state and create tracking system for migration

### Task 2: Analyze current dependencies and create backup ✅ COMPLETED
**Status**: Completed
**Commit**: 69c02b7
**Details**: 
- ✅ Document exact current package versions (Remix 2.15.2, etc.)
- ✅ Ensure clean git state (on upgrade branch)
- ✅ Create backup branch (upgrade/remix-to-react-router-v7)

### Task 3: Run automated codemod migration
**Status**: In Progress  
**Commit**: TBD
**Details**:
- ✅ Found official codemod: `remix/2/react-router/upgrade@1.2.0`
- ✅ Verified codemod handles: package.json, vite.config.ts, entry files, imports, scripts
- Run `npx codemod remix/2/react-router/upgrade` to automate most migration steps
- This replaces Tasks 3, 4, and 5 with automated approach
- Review and commit automated changes

### Task 4: Update Vite configuration
**Status**: Pending
**Commit**: TBD
**Details**:
- Replace `@remix-run/dev` vitePlugin with React Router v7 plugin
- Remove future flags (they become defaults in v7)
- Update Netlify plugin configuration if needed

### Task 5: Update entry points
**Status**: Pending
**Commit**: TBD
**Details**:
- Update `app/entry.server.tsx` - imports and component changes
- Update `app/entry.client.tsx` - hydration setup changes
- Update `app/root.tsx` - import and type changes

### Task 6: Update all route files
**Status**: Pending
**Commit**: TBD
**Details**:
- Update imports in all 18 route files
- Fix type imports (`LoaderFunction`, `MetaFunction`, `LoaderFunctionArgs`, etc.)
- Verify file-based routing still works

### Task 7: Update third-party integrations
**Status**: Pending
**Commit**: TBD
**Details**:
- Research and update `remix-i18next` to React Router v7 compatible version
- Research and update `remix-seo` to React Router v7 compatible version
- Research and update `remix-development-tools` to React Router v7 compatible version

### Task 8: Comprehensive testing and validation
**Status**: Pending
**Commit**: TBD
**Details**:
- Test development server (`npm run dev`)
- Test build process (`npm run build`)
- Test type checking (`npm run typecheck`)
- Test linting (`npm run lint`)
- Validate i18n functionality works
- Check SEO meta/links generation
- Test local Netlify deployment (`npm run start`)

## Notes & Issues
- Each commit should maintain a working, deployable state
- Test thoroughly after each step
- Document any issues or deviations from the original plan
- Keep track of any additional changes discovered during migration

## Rollback Plan
If issues arise, rollback to the previous working commit and reassess the problematic step.