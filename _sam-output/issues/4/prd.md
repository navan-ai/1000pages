# PRD: Change the tech stack to NextJS

> **Issue:** #4
> **Repository:** navan-ai/1000pages
> **Generated:** 2025-12-28T23:02:34.704Z
> **Type:** feature
> **Priority:** medium
> **Labels:** feature, enhancement, tech stack, NextJS, SEO

---

## Overview

Change tech stack to NextJS for better deployment options and SEO

## Original Request

Change the tech stack to NextJS.

The current tech stack is html/css/express server. Instead of this, change it to NextJS application, so that I can deploy it to a static server hosting providers like Cloudflare or AWS S3 or Vercel.

Also make sure the site is SEO friendly.


---

Now I have a comprehensive understanding of the current codebase. Let me create a detailed implementation plan for migrating to NextJS.

## 🎯 Implementation Plan

### Summary
Migrate the existing Express-based static site (single homepage with dark/light theme toggle) to a Next.js 14+ App Router application, enabling static export for deployment to Cloudflare Pages, AWS S3, or Vercel while implementing SEO best practices.

---

### Tasks

- [ ] **Task 1: Initialize Next.js Project Structure**
  - Create new Next.js 14+ project with App Router in the `webhook-server/` directory
  - Update `package.json` with Next.js dependencies and scripts (`dev`, `build`, `start`, `export`)
  - Add `next.config.js` configured for static export (`output: 'export'`)
  - Create base folder structure: `app/`, `components/`, `public/`
  - Move existing static assets (if any future ones added) to Next.js `public/` folder
  - **Acceptance:** Running `npm run dev` starts Next.js dev server on localhost:3000; `npm run build` produces static files in `out/` directory

- [ ] **Task 2: Create Root Layout with SEO Foundation**
  - Create `app/layout.tsx` with HTML structure, metadata, and viewport settings
  - Implement comprehensive SEO metadata in layout:
    - Title template: `"%s | 1000pages"`
    - Default description, keywords, author
    - Open Graph tags for social sharing
    - Twitter card metadata
    - Canonical URL configuration
  - Add semantic HTML structure (`<header>`, `<main>`, `<footer>`)
  - Import global CSS styles
  - **Acceptance:** Page source shows proper `<head>` with meta tags; social preview tools (e.g., opengraph.xyz) show correct metadata

- [ ] **Task 3: Migrate Styles to Next.js**
  - Convert `public/css/styles.css` to `app/globals.css`
  - Ensure CSS custom properties (theme variables) work correctly
  - Verify all responsive breakpoints function properly
  - Test gradient backgrounds and animations render correctly
  - **Acceptance:** Visual appearance matches original site exactly in both light and dark modes

- [ ] **Task 4: Create Header Component with Theme Toggle**
  - Create `components/Header.tsx` as a client component (`'use client'`)
  - Implement navigation bar with brand logo and links
  - Migrate theme toggle functionality from vanilla JS to React state + localStorage
  - Handle hydration mismatch by detecting theme on mount (avoid flash of wrong theme)
  - Add proper ARIA labels for accessibility
  - **Acceptance:** Theme toggle persists across page refreshes; no hydration warnings in console; toggle works without page reload

- [ ] **Task 5: Create Homepage with Hero and CTA Sections**
  - Create `app/page.tsx` as the main homepage
  - Add page-specific SEO metadata using Next.js `generateMetadata`
  - Implement Hero section with animated gradient background
  - Implement CTA section with styled button linking to GitHub issues
  - Create `components/Footer.tsx` for the footer
  - Ensure all external links have `rel="noopener noreferrer"` for security
  - **Acceptance:** Homepage renders identically to original; all links work correctly; page metadata is properly set

- [ ] **Task 6: Add SEO Enhancements**
  - Create `app/robots.txt` (or `robots.ts` for dynamic generation)
  - Create `app/sitemap.xml` (or `sitemap.ts` for dynamic generation)
  - Add structured data (JSON-LD) for organization/website schema
  - Ensure all images (future) have alt tags via component conventions
  - Configure proper heading hierarchy (h1, h2, etc.)
  - **Acceptance:** `/robots.txt` and `/sitemap.xml` are accessible; Google Rich Results Test validates structured data

- [ ] **Task 7: Update Configuration and Documentation**
  - Update `.sam/config.yaml` to reflect new tech stack (`Next.js`, `React`, `TypeScript`)
  - Update `README.md` with new development and deployment instructions
  - Remove old Express server file (`server.js`)
  - Remove old `public/` folder structure (after migration verified)
  - Add `.env.example` if any environment variables are needed
  - Verify static export works for target platforms (Cloudflare/S3/Vercel)
  - **Acceptance:** `npm run build` produces deployable static files; documentation reflects new workflow; no legacy Express files remain

---

### Technical Considerations

- **App Router vs Pages Router:** Use Next.js 14+ App Router for modern patterns, React Server Components, and simplified data fetching
- **Static Export:** Configure `next.config.js` with `output: 'export'` for static hosting compatibility
- **Theme Hydration:** Use `useEffect` to read localStorage on client to prevent hydration mismatch; consider adding a short CSS transition delay or suppression class
- **TypeScript:** Strongly recommended for type safety and better developer experience (Next.js has built-in support)
- **CSS Strategy:** Keep existing CSS with minimal changes (globals.css) rather than introducing a new system like Tailwind to minimize migration risk
- **No API Routes Needed:** Current site is purely static; no backend logic to migrate

### Dependencies

- **Node.js 18.17+** required for Next.js 14
- **npm/yarn/pnpm** for package management
- No external API dependencies
- No database requirements

### File Structure After Migration

```
webhook-server/
├── app/
│   ├── layout.tsx          # Root layout with SEO
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles
│   ├── robots.ts            # SEO: robots.txt
│   └── sitemap.ts           # SEO: sitemap.xml
├── components/
│   ├── Header.tsx           # Navigation + theme toggle
│   └── Footer.tsx           # Footer component
├── public/                  # Static assets (images, etc.)
├── next.config.js           # Next.js configuration
├── package.json             # Updated dependencies
├── tsconfig.json            # TypeScript config
└── README.md                # Updated documentation
```

### Estimated Complexity
**Medium** - The current application is simple (single page, minimal dependencies), but the migration requires careful attention to:
1. Theme toggle hydration handling in React
2. Proper SEO implementation with metadata API
3. Static export configuration for multiple deployment targets
4. Preserving exact visual fidelity during migration

---

*🏷️ Add label `ready-for-dev` when ready for implementation*


---

Now I have a comprehensive understanding of the current codebase. Let me provide my architecture review.

## Architecture Review

### Overview
The proposed migration converts a minimal Express-based static file server (single homepage with theme toggle) to a Next.js 14+ App Router application with static export capability. The current implementation is remarkably simple: 19 lines of Express code serving HTML/CSS/JS files with client-side theme persistence via localStorage.

### Component Design

```
Current Architecture:
┌─────────────────────────────────────────────────────────┐
│                    Express Server                        │
│  ┌─────────────────────────────────────────────────┐    │
│  │              Static File Serving                 │    │
│  │   /public/index.html ──────────────────────┐    │    │
│  │   /public/css/styles.css                   │    │    │
│  │   /public/js/theme.js (IIFE, localStorage) │    │    │
│  └────────────────────────────────────────────┘    │    │
└─────────────────────────────────────────────────────────┘

Proposed Next.js Architecture:
┌─────────────────────────────────────────────────────────┐
│                   Next.js App Router                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │  app/layout.tsx (Server Component)                │  │
│  │    ├── SEO metadata (title, OG, Twitter cards)    │  │
│  │    ├── globals.css import                         │  │
│  │    └── <html><body>...</body></html>              │  │
│  ├───────────────────────────────────────────────────┤  │
│  │  app/page.tsx (Server Component)                  │  │
│  │    ├── generateMetadata() for page SEO           │  │
│  │    ├── <Header /> (Client Component)             │  │
│  │    ├── Hero Section (static markup)              │  │
│  │    ├── CTA Section (static markup)               │  │
│  │    └── <Footer /> (Server Component)             │  │
│  ├───────────────────────────────────────────────────┤  │
│  │  components/                                      │  │
│  │    ├── Header.tsx ('use client')                 │  │
│  │    │     └── Theme toggle with useState + useEffect│  │
│  │    └── Footer.tsx (Server Component)             │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  Static Export (output: 'export') ──► /out/              │
└─────────────────────────────────────────────────────────┘
```

### Data Model

The application has minimal data/state requirements:

```typescript
// Theme State (client-side only)
type Theme = 'light' | 'dark';

// localStorage key: "1000pages-theme"
// Value: Theme

// No server-side data models
// No database entities
// No API response types needed
```

**State Management Boundary:**
- Theme preference is the only stateful element
- Persisted in localStorage (client-side)
- No server state, no SSR data requirements
- Static export means all data is build-time

### Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Next.js Version | 14+ with App Router | Modern patterns, React Server Components, better static export support than Pages Router |
| Rendering Strategy | Static Export (`output: 'export'`) | Matches deployment requirements (Cloudflare/S3/Vercel static hosting) |
| CSS Approach | Keep existing CSS (globals.css) | 444 lines of well-structured CSS with variables - no need to introduce Tailwind/CSS-in-JS risk |
| TypeScript | Yes | Built-in Next.js support, catches type errors, better DX |
| Theme Handling | Client Component with useEffect | Only way to access localStorage; must handle hydration carefully |
| SEO Implementation | Metadata API + robots.ts + sitemap.ts | Native Next.js patterns for static export compatibility |

### Risk Assessment

**High Risk:** None identified

**Medium Risk:**
1. **Theme Hydration Flash (FOUC)** - The current vanilla JS applies theme immediately via IIFE. In React, `useEffect` runs after hydration, causing a potential flash of the default theme. 
   - **Mitigation:** Add a blocking `<script>` in `layout.tsx` head to apply theme class before React hydrates, or use CSS `visibility: hidden` until theme is resolved.

2. **CSS Specificity Changes** - Moving from a flat HTML file to component-based structure may cause CSS specificity issues if class names change.
   - **Mitigation:** Keep all class names identical to original; validate visually in both themes.

**Low Risk:**
1. **Static Export Limitations** - Some Next.js features (API routes, middleware) won't work with static export, but this site doesn't need them.
2. **Node.js Version** - Requires Node 18.17+; current package.json doesn't specify engine. Add `"engines": { "node": ">=18.17.0" }`.

### Implementation Notes

1. **Theme Flash Prevention Pattern:**
   ```tsx
   // In app/layout.tsx, add inline script before body content:
   <script dangerouslySetInnerHTML={{
     __html: `
       (function() {
         const theme = localStorage.getItem('1000pages-theme') || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
         document.documentElement.setAttribute('data-theme', theme);
       })();
     `
   }} />
   ```

2. **Header Component Hydration:**
   - Use `suppressHydrationWarning` on the toggle button if its appearance depends on theme
   - Initialize theme state as `null`, render consistent server markup, then apply theme in `useEffect`

3. **CSS Migration Considerations:**
   - The current CSS uses `[data-theme="dark"]` selector on `:root` - ensure `data-theme` is set on `<html>` element, not `<body>`
   - Keep the `@media (prefers-color-scheme: dark)` fallback as-is

4. **Static Export Verification:**
   - After `npm run build`, verify `/out` directory contains:
     - `index.html` (homepage)
     - `robots.txt`
     - `sitemap.xml`
     - `_next/static/` (CSS, JS chunks)

5. **External Link Pattern:**
   - Current links use `target="_blank" rel="noopener noreferrer"` - maintain this pattern in JSX

6. **SEO Structured Data:**
   - Add JSON-LD in layout for Organization schema:
   ```tsx
   <script type="application/ld+json" dangerouslySetInnerHTML={{
     __html: JSON.stringify({
       "@context": "https://schema.org",
       "@type": "WebSite",
       "name": "1000pages",
       "url": "https://1000pages.navan.ai" // Update with actual domain
     })
   }} />
   ```

7. **SAM Config Update:**
   - Update `.sam/config.yaml` tech_stack from `["JavaScript", "Node.js", "Express"]` to `["TypeScript", "Next.js", "React"]`

### Questions for Stakeholder

1. **Production Domain:** What is the canonical production URL for SEO metadata and sitemap generation? (e.g., `https://1000pages.navan.ai`)

2. **Deployment Target Preference:** Is there a primary deployment target (Cloudflare Pages vs Vercel vs S3+CloudFront)? This affects:
   - Vercel: Zero config, automatic
   - Cloudflare: May need `wrangler.toml`
   - S3: May need `_redirects` or CloudFront function for SPA routing

3. **Future Pages:** Will additional pages be added soon? If so, consider:
   - Creating a shared component library structure now
   - Adding a `lib/` directory for utilities
   - Planning URL structure for sitemap

4. **Analytics:** Should we add placeholder for analytics (Google Analytics 4, Plausible, etc.) during this migration?

---
*Architecture review complete. The plan is sound and well-structured. The main implementation concern is theme hydration handling - follow the inline script pattern above to prevent flash of unstyled content. Ready for implementation.*


---

## Notes

- Target Directory: `/tmp/sam-repos/navan-ai/1000pages/webhook-server`
- Tech Stack: JavaScript + Node.js + Express

---

*🤖 Generated by Sam 🎯 (Triage) → Pete 📋 (Planning) → Alex 🏗️ (Architecture)*
