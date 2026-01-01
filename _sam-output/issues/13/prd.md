# PRD: Font contrast on hover is a problem

> **Issue:** #13
> **Repository:** saaragh/1000pages
> **Generated:** 2026-01-01T02:52:35.945Z
> **Type:** bug
> **Priority:** medium
> **Labels:** bug, UI, accessibility, contrast

---

## Overview

Fix font contrast issue on hover for better readability

## Original Request

Font contrast on hover is a problem. When on hover, the font color and the button color  is same and its not readable. this needs to be fixed. 

---

Now I have a clear picture. Let me analyze the issue. Looking at the CSS in `globals.css`:

**The Problem:** The `.cta-button` has text color `var(--color-btn-text)` which is `#FFFFFF` (white). On hover, the button uses a `::before` pseudo-element with `var(--color-btn-hover)` gradient, but there's a potential issue - the text color is not explicitly maintained with a high z-index, and the gradient colors on hover could create contrast issues.

Looking more closely at lines 356-369:
- The button has `color: var(--color-btn-text)` = white
- The hover `::before` overlay uses `--color-btn-hover` gradient
- Light theme hover: `#4338CA` to `#6D28D9` (darker indigo to purple)
- Dark theme hover: `#6366F1` to `#8B5CF6` (lighter indigo to purple)

The issue seems to be that while there is a `z-index: 1` on the button and span (lines 365-369), the actual text content inside the button might not be getting proper stacking. Looking at the HTML, the CTA buttons contain text directly inside the `<a>` element without a wrapping `<span>`, so the text may not be properly layered above the hover overlay.

## 🎯 Implementation Plan

### Summary
Fix the font contrast issue on hover for CTA buttons by ensuring text remains visible and readable when the hover overlay is displayed. The issue is that button text may be obscured or have poor contrast when the `::before` hover overlay becomes visible.

### Tasks

- [ ] **Task 1: Investigate and Confirm the Root Cause**
  - Run the application locally to visually confirm the hover contrast issue
  - Test on both light and dark themes
  - Check if the issue affects `.cta-button`, `.hero-link`, or other interactive elements
  - Document which elements have the problem and in which theme(s)
  - Acceptance: Clear identification of which specific elements and themes have the contrast problem

- [ ] **Task 2: Fix CTA Button Text Layering**
  - In `webhook-server/app/globals.css`, update `.cta-button` styles
  - Ensure the text content has explicit `position: relative` and `z-index` higher than the `::before` overlay
  - Consider wrapping button text in spans in the TSX files if needed, or use the direct element selector approach
  - Ensure `color: var(--color-btn-text)` is explicitly maintained on hover state
  - Acceptance: CTA button text remains white and fully visible on hover in both themes

- [ ] **Task 3: Ensure Hover Text Color is Explicitly Defined**
  - Add explicit `.cta-button:hover` rule with `color: var(--color-btn-text)` to prevent any inheritance issues
  - Verify the `::before` pseudo-element `z-index` is lower than the text `z-index`
  - Acceptance: Text color is explicitly defined for hover state, not relying on cascade alone

- [ ] **Task 4: Audit Other Interactive Elements**
  - Check `.hero-link:hover` contrast (currently changes to `--color-primary-purple`)
  - Check `.footer a:hover` contrast
  - Check `.theme-toggle:hover` contrast
  - Verify all interactive elements meet WCAG AA contrast ratio (4.5:1 for normal text)
  - Acceptance: All hover states have sufficient contrast for readability

- [ ] **Task 5: Test Fixes Across Themes and Viewports**
  - Test all button hover states in light theme
  - Test all button hover states in dark theme
  - Test on mobile viewport sizes
  - Ensure the fix doesn't break any existing transitions or animations
  - Acceptance: No visual regressions, hover states work correctly across all themes and screen sizes

### Technical Considerations
- The current CSS uses a `::before` pseudo-element for hover effects which can overlay text if z-index stacking is incorrect
- The button text needs `position: relative` with a higher `z-index` than the overlay (`z-index` values should be: text > `::before` overlay)
- CSS custom properties are used throughout, so fixes should leverage existing variables for consistency
- Both light and dark themes have different gradient colors for hover states that need to maintain contrast with white text

### Dependencies
- Access to run the dev server (`npm run dev` or similar) for visual testing
- Browser DevTools for inspecting hover states and computed styles
- Understanding of WCAG contrast requirements (4.5:1 ratio for AA compliance)

### Estimated Complexity
**Simple** - This is a CSS-only fix involving z-index stacking and explicit color declarations. The root cause is likely a missing explicit text color or z-index on the hover state. No JavaScript changes or architectural modifications needed.

---
*🏷️ Add label `ready-for-dev` when ready for implementation*


---

## Notes

- Target Directory: `/tmp/sam-repos/saaragh/1000pages/webhook-server`
- Tech Stack: TypeScript + React + Next.js

---

*🤖 Generated by Sam 🎯 (Triage) → Pete 📋 (Planning) → Alex 🏗️ (Architecture)*
