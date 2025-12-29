# PRD: Navan AI

> **Issue:** #10
> **Repository:** saaragh/1000pages
> **Generated:** 2025-12-29T00:05:39.639Z
> **Type:** feature
> **Priority:** medium
> **Labels:** feature, enhancement, new-page

---

## Overview

Create a new page for Navan AI in the 1000pages project

## Original Request

Create a new Page for Navan AI
Title: Navan AI
Description: Navan AI provides Spec Coding Consulting
URL: https://navan.ai

---

Now I have a comprehensive understanding of the codebase. Let me create the detailed implementation plan.

---

## 🎯 Implementation Plan

### Summary
Create a new page for "Navan AI" at `/navan-ai/` following the established page pattern from the Saaragh page, including proper SEO metadata, theme support, and sitemap integration.

---

### Tasks

- [ ] **Task 1: Create the Navan AI page component**
  - Create directory: `webhook-server/app/navan-ai/`
  - Create file: `webhook-server/app/navan-ai/page.tsx`
  - Follow the exact pattern from `webhook-server/app/saaragh/page.tsx`
  - Import `Header` and `Footer` components from `../../components/`
  - Use existing CSS classes: `.hero`, `.hero-content`, `.hero-title`, `.hero-subtitle`, `.hero-link`
  - Include external link to `https://navan.ai` with `target="_blank" rel="noopener noreferrer"`
  - **Acceptance:** Page renders at `/navan-ai/` with correct layout, title "Navan AI", description "Navan AI provides Spec Coding Consulting", and working external link

- [ ] **Task 2: Add SEO metadata to the page**
  - Export `Metadata` object with:
    - `title`: `'Navan AI - Spec Coding Consulting'`
    - `description`: `'Navan AI provides Spec Coding Consulting services.'`
    - `openGraph` with `title`, `description`, and `url: 'https://1000pages.navan.ai/navan-ai'`
  - **Acceptance:** Page title shows correctly in browser tab, meta tags visible in page source

- [ ] **Task 3: Update sitemap for SEO**
  - Edit `webhook-server/app/sitemap.ts`
  - Add new entry for `https://1000pages.navan.ai/navan-ai/`
  - Set priority to `0.8` (matching the Saaragh page pattern)
  - Set `lastModified` to current date
  - **Acceptance:** Running `npm run build` generates sitemap.xml containing the Navan AI URL

- [ ] **Task 4: Add navigation link from homepage (optional but recommended)**
  - Edit `webhook-server/app/page.tsx`
  - Add a link to `/navan-ai/` in the CTA section alongside the existing Saaragh link
  - Use consistent styling with existing links
  - **Acceptance:** Homepage shows clickable link to Navan AI page

- [ ] **Task 5: Test and verify**
  - Run `npm run dev` and verify page loads at `http://localhost:3000/navan-ai/`
  - Test dark/light theme toggle works correctly
  - Verify responsive design on mobile viewport
  - Run `npm run build` to ensure static export succeeds
  - Run `npm run lint` to check for any code issues
  - **Acceptance:** All tests pass, page works in both themes, no build errors

---

### Technical Considerations
- **Theme support is automatic**: The existing CSS variable system handles light/dark themes without any additional code
- **Static export**: Project uses `output: 'export'` in next.config.js - ensure no dynamic features are used
- **Trailing slashes**: Next.js config has `trailingSlash: true`, so the URL will be `/navan-ai/` (not `/navan-ai`)
- **Component imports**: Use relative paths `../../components/Header` since the page is two levels deep

### Dependencies
- No external dependencies required
- Existing `Header` and `Footer` components are reused
- All styling comes from existing `globals.css`

### Estimated Complexity
**Simple** - This is a straightforward page addition following an established pattern. The Saaragh page provides a complete template to follow, and all styling/components already exist.

---

*🏷️ Add label `ready-for-dev` when ready for implementation*


---

The implementation plan is sound. Let me provide the complete architecture review.

---

## 🏗️ Architecture Review

### Overview
This is a **low-complexity, pattern-following task**. The existing `saaragh/page.tsx` provides a complete, working template. The proposed implementation correctly identifies all required files and follows established conventions. No architectural concerns or hidden complexities.

### Component Design
```
┌─────────────────────────────────────────────────────────┐
│                    app/navan-ai/page.tsx                │
│                    (New Page Component)                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              <Header />                          │   │
│  │         (Existing - No Changes)                  │   │
│  └─────────────────────────────────────────────────┘   │
│                          │                              │
│  ┌─────────────────────────────────────────────────┐   │
│  │              <main>                              │   │
│  │    ┌──────────────────────────────────────┐     │   │
│  │    │  .hero section                       │     │   │
│  │    │   - h1: "Navan AI"                   │     │   │
│  │    │   - p: "Spec Coding Consulting"      │     │   │
│  │    │   - a: External link to navan.ai     │     │   │
│  │    └──────────────────────────────────────┘     │   │
│  └─────────────────────────────────────────────────┘   │
│                          │                              │
│  ┌─────────────────────────────────────────────────┐   │
│  │              <Footer />                          │   │
│  │         (Existing - No Changes)                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Data Model
No new data structures required. The page is purely presentational.

**TypeScript Types Used:**
```typescript
import type { Metadata } from 'next';  // Next.js built-in
```

**Metadata Structure (following existing pattern):**
```typescript
export const metadata: Metadata = {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
  };
};
```

### Technical Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Page location | `app/navan-ai/page.tsx` | Next.js App Router convention |
| Component reuse | Import `Header`/`Footer` | Maintain consistency, DRY |
| Styling | Use existing CSS classes | All styles exist in `globals.css` |
| External link | `target="_blank" rel="noopener noreferrer"` | Security best practice for external links |
| Static export | No dynamic features | Project uses `output: 'export'` |
| URL format | `/navan-ai/` (with trailing slash) | Matches `next.config.js` setting |

### Risk Assessment

- **High Risk:** None identified

- **Medium Risk:** None identified

- **Low Risk:**
  - **Sitemap URL consistency**: Note that existing sitemap entries use URLs *without* trailing slashes (`/saaragh` not `/saaragh/`) despite `trailingSlash: true` in config. Follow the same pattern for consistency: `https://1000pages.navan.ai/navan-ai`

### Implementation Notes

1. **Copy-paste from Saaragh page** - The `saaragh/page.tsx` file at line 1-44 is your exact template. Replace:
   - `Saaragh` → `Navan AI`
   - `saaragh.com` → `navan.ai`
   - Update metadata URL path accordingly

2. **Sitemap entry pattern** - Add after line 16 in `sitemap.ts`:
   ```typescript
   {
     url: 'https://1000pages.navan.ai/navan-ai',
     lastModified: new Date(),
     changeFrequency: 'monthly',
     priority: 0.8,
   },
   ```

3. **Homepage link pattern** - Follow the existing CTA section pattern (lines 41-47 in `app/page.tsx`):
   ```tsx
   <section className="cta-section">
     <div className="cta-content">
       <a href="/navan-ai" className="cta-button">
         Visit Navan AI - Spec Coding Consulting
       </a>
     </div>
   </section>
   ```

4. **No trailing slash in internal links** - The homepage link to Saaragh uses `/saaragh` (not `/saaragh/`). Next.js handles the redirect automatically. Follow this pattern.

5. **Testing checklist**:
   - `npm run dev` - Page loads at `/navan-ai/`
   - Theme toggle works (automatic via CSS variables)
   - External link opens in new tab
   - `npm run build` - No errors, generates static output
   - `npm run lint` - No warnings

### Questions for Stakeholder

None. The requirements are clear and the implementation pattern is well-established.

---

**Validation Summary:**
- All required CSS classes exist in `globals.css`
- `Header` and `Footer` components are reusable
- Sitemap structure is straightforward
- Homepage has a clear pattern for adding navigation links
- Static export confirmed in `next.config.js`

*🏗️ Architecture review complete. This is a green-light implementation - no blockers, no concerns. Ready for implementation.*


---

## Notes

- Target Directory: `/tmp/sam-repos/saaragh/1000pages/webhook-server`
- Tech Stack: TypeScript + React + Next.js

---

*🤖 Generated by Sam 🎯 (Triage) → Pete 📋 (Planning) → Alex 🏗️ (Architecture)*
