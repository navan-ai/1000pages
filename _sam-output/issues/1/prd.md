# PRD: Create home page

> **Issue:** #1
> **Repository:** navan-ai/1000pages
> **Generated:** 2025-12-28T16:20:05.498Z
> **Type:** feature
> **Priority:** medium
> **Labels:** feature, homepage, UI, enhancement

---

## Overview

Create a homepage with hero section and CTA button

## Original Request

Create a homepage.

Hero section: This website is entirely developed by SAM Agents. 
Learn more about SAM (hyperlink: https://sam.navan.ai)

Next section: Add a CTA button with Message Create a new page on 1000pages.navan.ai (redirect to https://github.com/navan-ai/1000pages/issues/new)

Requirements:
Color Palette: Modern Indigo, Purple 
Should support Dark and Light color theme.

---

Now I have a clear picture of the codebase. It's essentially a greenfield project with no existing frontend infrastructure. Let me create a detailed, actionable task breakdown for the developer.

## 🎯 Implementation Plan

### Summary
Build a complete homepage from scratch for a new Express.js web application, featuring a hero section highlighting SAM Agents with a CTA button linking to GitHub issues. The page must support dark/light themes using a modern Indigo/Purple color palette.

---

### Tasks

- [ ] **Task 1: Initialize Project Infrastructure**
  - Create `webhook-server/` directory structure
  - Initialize `package.json` with Express and required dependencies
  - Create Express server entry point (`server.js` or `app.js`)
  - Configure static file serving from `public/` directory
  - Set up basic route for homepage (`GET /`)
  - Acceptance: `npm install` completes successfully, `npm start` runs server on a port (e.g., 3000), and navigating to `http://localhost:3000` returns a response

- [ ] **Task 2: Create Base HTML Structure**
  - Create `public/index.html` with semantic HTML5 structure
  - Add proper `<head>` with meta tags (viewport, charset, description)
  - Include CSS and JS file references
  - Structure with `<header>`, `<main>`, and `<footer>` elements
  - Add placeholder content for hero and CTA sections
  - Acceptance: HTML validates, page loads with proper document structure visible in browser dev tools

- [ ] **Task 3: Implement CSS Theme System**
  - Create `public/css/styles.css` with CSS custom properties (variables)
  - Define color palette variables for both themes:
    - Light theme: Indigo/Purple accents on light backgrounds
    - Dark theme: Indigo/Purple accents on dark backgrounds
  - Implement `prefers-color-scheme` media query for automatic theme detection
  - Add manual theme toggle support via `data-theme` attribute on `<html>`
  - Include base reset/normalize styles
  - Acceptance: Page automatically switches themes based on OS preference, colors use Indigo (#4F46E5 range) and Purple (#7C3AED range)

- [ ] **Task 4: Build Hero Section**
  - Create hero section with prominent heading
  - Add main text: "This website is entirely developed by SAM Agents"
  - Add "Learn more about SAM" hyperlink pointing to `https://sam.navan.ai`
  - Style with appropriate typography, spacing, and gradient/accent colors
  - Ensure responsive design (mobile-first approach)
  - Acceptance: Hero section is visually prominent, link opens in new tab, text is readable on all screen sizes, works in both themes

- [ ] **Task 5: Build CTA Section**
  - Create section below hero with call-to-action
  - Add prominent button with text: "Create a new page on 1000pages.navan.ai"
  - Button links to `https://github.com/navan-ai/1000pages/issues/new`
  - Style button with hover/focus states using theme colors
  - Add supporting text or visual elements as appropriate
  - Acceptance: Button is clearly visible, clickable, has proper hover states, opens GitHub in new tab, accessible via keyboard

- [ ] **Task 6: Add Theme Toggle Functionality**
  - Create `public/js/theme.js` for theme switching logic
  - Implement toggle button/icon in the UI (sun/moon icons recommended)
  - Persist user preference in `localStorage`
  - Load saved preference on page load (with fallback to system preference)
  - Ensure smooth transition between themes (CSS transitions)
  - Acceptance: Toggle switches themes instantly, preference persists across page reloads, respects system preference when no user preference set

- [ ] **Task 7: Polish and Responsive Design**
  - Review and refine spacing, typography, and visual hierarchy
  - Test and adjust for mobile devices (320px and up)
  - Test and adjust for tablet devices (768px and up)
  - Test and adjust for desktop (1024px and up)
  - Add subtle animations/transitions for polish (hover effects, theme transitions)
  - Ensure accessibility (color contrast, focus indicators, semantic HTML)
  - Acceptance: Page looks professional across all device sizes, passes basic accessibility checks (contrast ratio, keyboard navigation), no horizontal scrolling on mobile

---

### Technical Considerations

- **Express Static Serving**: Use `express.static('public')` middleware to serve frontend assets
- **Color Palette**: 
  - Primary Indigo: `#4F46E5` (Tailwind indigo-600) or `#6366F1` (indigo-500)
  - Primary Purple: `#7C3AED` (Tailwind violet-600) or `#8B5CF6` (violet-500)
  - Consider gradients between these colors for visual interest
- **Theme Detection**: Use `window.matchMedia('(prefers-color-scheme: dark)')` for system preference
- **External Links**: Add `target="_blank" rel="noopener noreferrer"` for security
- **No Build Step Required**: Keep it simple with vanilla HTML/CSS/JS - no bundler needed initially
- **SAM Config Alignment**: The `webhook-server/` directory matches the SAM configuration

### Dependencies

- **Node.js**: Runtime environment (likely already available)
- **Express**: Web framework for serving the page
- **No other external dependencies required** for the frontend (vanilla CSS/JS)

### Directory Structure (Proposed)

```
webhook-server/
├── package.json
├── server.js (or app.js)
├── public/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── theme.js
```

### Estimated Complexity
**Medium** - While the page itself is straightforward, this requires setting up the entire project infrastructure from scratch, implementing a robust theming system with persistence, and ensuring responsive design across all breakpoints. The individual pieces are simple, but there are multiple moving parts that need to work together cohesively.

---
*🏷️ Add label `ready-for-dev` when ready for implementation*


---

Now I have a complete picture. Let me write my architecture review.

---

## 🏗️ Architecture Review

### Overview

The implementation plan proposes building a simple **static homepage** served by Express.js, featuring a hero section promoting SAM Agents and a CTA button linking to GitHub Issues. The page must support dark/light theming with an Indigo/Purple color palette.

**Verdict:** The plan is fundamentally sound but has some architectural observations worth addressing. This is a greenfield project—the `webhook-server/` directory doesn't exist yet, so we're building from scratch with no legacy constraints.

### Component Design

```
┌──────────────────────────────────────────────────────────────┐
│                        Browser                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    index.html                            │ │
│  │  ┌───────────────────────────────────────────────────┐  │ │
│  │  │  <header>                                          │  │ │
│  │  │    [Theme Toggle Button]                           │  │ │
│  │  └───────────────────────────────────────────────────┘  │ │
│  │  ┌───────────────────────────────────────────────────┐  │ │
│  │  │  <main>                                            │  │ │
│  │  │    ┌─────────────────────────────────────────────┐ │  │ │
│  │  │    │  HERO SECTION                               │ │  │ │
│  │  │    │  "This website is entirely developed by     │ │  │ │
│  │  │    │   SAM Agents"                               │ │  │ │
│  │  │    │  [Learn more about SAM] → sam.navan.ai      │ │  │ │
│  │  │    └─────────────────────────────────────────────┘ │  │ │
│  │  │    ┌─────────────────────────────────────────────┐ │  │ │
│  │  │    │  CTA SECTION                                │ │  │ │
│  │  │    │  [Create a new page on 1000pages.navan.ai]  │ │  │ │
│  │  │    │   → github.com/.../issues/new               │ │  │ │
│  │  │    └─────────────────────────────────────────────┘ │  │ │
│  │  └───────────────────────────────────────────────────┘  │ │
│  │  ┌───────────────────────────────────────────────────┐  │ │
│  │  │  <footer>                                          │  │ │
│  │  └───────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
        │                      │
        ▼                      ▼
┌───────────────┐      ┌───────────────┐
│  styles.css   │      │   theme.js    │
│  - CSS vars   │      │  - toggle     │
│  - Light/Dark │      │  - persist    │
│  - Responsive │      │  - init       │
└───────────────┘      └───────────────┘
        │                      │
        └──────────┬───────────┘
                   ▼
┌──────────────────────────────────────────────────────────────┐
│                     Express Server                            │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  server.js                                              │  │
│  │  • express.static('public')                             │  │
│  │  • GET / → public/index.html                            │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Data Model

This is a **static page** with no backend data. The only "state" is theme preference:

```javascript
// Theme State (client-side only)
{
  theme: 'light' | 'dark' | 'system',  // User preference
  systemPreference: 'light' | 'dark',  // OS setting
  effectiveTheme: 'light' | 'dark'     // Computed result
}

// Storage: localStorage
localStorage.setItem('theme', 'dark');  // Persisted value
```

**No database, no API endpoints, no server-side state required.**

### Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Frontend Stack** | Vanilla HTML/CSS/JS | No build step = simpler deployment, faster iteration. Appropriate for a single-page static site. |
| **Theme System** | CSS Custom Properties | Native browser support, no runtime JS for style changes, easy to extend |
| **Theme Detection** | `prefers-color-scheme` | Respects user's OS preference automatically |
| **Theme Persistence** | `localStorage` | Simple, synchronous, no privacy concerns for theme choice |
| **Server Framework** | Express.js | Matches SAM config, minimal setup, well-understood |
| **Color Palette** | Indigo (#4F46E5) / Purple (#7C3AED) | Modern, accessible, good contrast in both themes |
| **Build Tooling** | None | Appropriate for scope; can add later if needed |

### Risk Assessment

**High Risk:** None identified. This is a low-complexity implementation.

**Medium Risk:**
- **FOUC (Flash of Unstyled Content)**: Theme JS loads after HTML renders. Users may briefly see wrong theme.
  - *Mitigation*: Add inline `<script>` in `<head>` to set `data-theme` before paint, or use `<script>` blocking.

- **SAM Convention Alignment**: The proposed structure doesn't utilize `agents/`, `services/`, `__tests__/` directories defined in `.sam/config.yaml`.
  - *Assessment*: This is acceptable. A static homepage doesn't need these abstractions. The conventions exist for future feature development—not every file needs to fit the pattern.

**Low Risk:**
- **Accessibility**: Plan mentions it but light on specifics. Should ensure:
  - Focus visible states on theme toggle and buttons
  - `aria-label` on icon-only buttons
  - Skip link for keyboard navigation (optional for single-page)
  
- **External Link Security**: Plan correctly notes `rel="noopener noreferrer"` for external links. Developer should not forget this.

- **.gitignore Gap**: Current `.gitignore` includes `/node_modules` but not `webhook-server/node_modules`. Since Express setup creates nested structure, this should work due to git's recursive ignore behavior, but worth verifying.

### Implementation Notes

1. **Theme Script Placement**: Place a small inline script in `<head>` to prevent FOUC:
   ```html
   <script>
     (function() {
       const saved = localStorage.getItem('theme');
       const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
       document.documentElement.dataset.theme = saved || (prefersDark ? 'dark' : 'light');
     })();
   </script>
   ```

2. **CSS Variable Pattern**: Use semantic variable names for maintainability:
   ```css
   :root {
     --color-bg-primary: #ffffff;
     --color-text-primary: #1f2937;
     --color-accent: #4F46E5;      /* Indigo */
     --color-accent-hover: #7C3AED; /* Purple */
   }
   [data-theme="dark"] {
     --color-bg-primary: #0f172a;
     --color-text-primary: #f1f5f9;
   }
   ```

3. **Button Styling**: The CTA button should have clear `:hover`, `:focus`, and `:active` states. Consider a gradient between Indigo → Purple for visual interest.

4. **Express Server Keep It Minimal**:
   ```javascript
   const express = require('express');
   const app = express();
   app.use(express.static('public'));
   app.listen(process.env.PORT || 3000);
   ```

5. **External Links**: Both links go external. Use consistent handling:
   ```html
   <a href="https://sam.navan.ai" target="_blank" rel="noopener noreferrer">
   ```

6. **Mobile-First CSS**: Write base styles for mobile, then use `@media (min-width: ...)` for larger screens. This results in cleaner CSS and better mobile performance.

### Directory Structure (Confirmed)

```
webhook-server/
├── package.json
├── server.js
└── public/
    ├── index.html
    ├── css/
    │   └── styles.css
    └── js/
        └── theme.js
```

This structure is appropriate. The `agents/`, `services/`, `__tests__/` directories from SAM conventions can be created later when actual backend features are added. Don't create empty directories just to match conventions.

### Questions for Stakeholder

1. **Deployment Environment**: Where will this be deployed? (Vercel, AWS, bare VM?) This affects:
   - Port configuration strategy
   - Whether Express is even needed (static hosts could serve this without Node.js)
   
2. **Footer Content**: The plan mentions `<footer>` but doesn't specify content. Should there be copyright, additional links, or leave it empty/omit for now?

3. **Theme Toggle Placement**: Header, hero section, or floating button? The plan doesn't specify exact UI location.

4. **Analytics/Tracking**: Any requirement for basic analytics (page views, button clicks)? Should be considered before implementation if needed.

---

*🏗️ Architecture review complete. The implementation plan is sound for a static homepage. Key recommendations: handle FOUC with inline theme script, follow mobile-first CSS patterns, and ensure accessibility on interactive elements. Ready for implementation.*


---

## Notes

- Target Directory: `/tmp/sam-repos/navan-ai/1000pages/webhook-server`
- Tech Stack: JavaScript + Node.js + Express

---

*🤖 Generated by Sam 🎯 (Triage) → Pete 📋 (Planning) → Alex 🏗️ (Architecture)*
