# PRD: CTA buttons to hyperlinks

> **Issue:** #19
> **Repository:** saaragh/1000pages
> **Generated:** 2026-01-01T03:34:28.685Z
> **Type:** feature
> **Priority:** medium
> **Labels:** feature, UI, enhancement

---

## Overview

Convert CTA buttons to hyperlinks in the 2nd section

## Original Request

All the CTA buttons in the 2nd sections, change them to hyperlinks.

There are 3 buttons. create a new page, visit Saaragh, Visit Navan AI. Change the 3 buttons to hyperlinks. Make sure the contrast is proper (including on hover effect)

---

I'll present the implementation plan directly since I'm unable to write to the file:

---

## 🎯 Implementation Plan

### Summary
Convert the three CTA buttons in the homepage's second sections from button-styled links to simple hyperlinks with proper contrast and hover effects. The buttons currently use `.cta-button` class and need to be restyled as text hyperlinks similar to the existing `.hero-link` pattern.

### Tasks

- [ ] **Task 1: Create `.cta-link` CSS Class for Hyperlink Styling**
  - Add new `.cta-link` class to `webhook-server/app/globals.css` (around line 331, after `.cta-content`)
  - Style with `--color-primary-indigo` as base color and `--color-primary-purple` on hover
  - Add animated underline effect using `::after` pseudo-element (similar to `.hero-link`)
  - Include focus state with proper outline for accessibility
  - Use appropriate font-size for the section context (`--font-size-lg` or `--font-size-xl`)
  - **Acceptance**: New `.cta-link` class exists with hover, focus, and active states defined

- [ ] **Task 2: Add Dark Theme Support for `.cta-link`**
  - Verify link colors work in dark mode (CSS variables already handle this automatically)
  - Test that `--color-primary-indigo` and `--color-primary-purple` have proper dark mode values (`#818CF8` and `#A78BFA`)
  - Ensure contrast ratio meets WCAG AA standards (4.5:1 for normal text) in both themes
  - **Acceptance**: Links are clearly visible and accessible in both light and dark themes

- [ ] **Task 3: Update CTA Links in `page.tsx`**
  - Open `webhook-server/app/page.tsx`
  - Change class from `cta-button` to `cta-link` on all three `<a>` elements (lines 34, 43, 51)
  - Remove the `<span>` wrapper inside each link (no longer needed for z-index stacking)
  - Keep the `target="_blank"` and `rel="noopener noreferrer"` attributes on external link
  - **Acceptance**: All three CTA links use the new `.cta-link` class without inner `<span>` elements

- [ ] **Task 4: Update `.cta-section` Layout for Hyperlinks**
  - Adjust `.cta-section` padding if needed to accommodate text links instead of buttons
  - Consider reducing vertical padding since links take less visual space than buttons
  - Optionally adjust background or add spacing between stacked link sections
  - **Acceptance**: Sections have appropriate spacing and visual rhythm with hyperlinks

- [ ] **Task 5: Add Responsive Styles for `.cta-link`**
  - Add responsive font-size adjustments in the existing `@media (max-width: 768px)` block
  - Ensure touch targets are adequate on mobile (at least 44x44px clickable area)
  - **Acceptance**: Links are readable and tappable on mobile devices

- [ ] **Task 6: Clean Up Unused `.cta-button` Styles (Optional)**
  - If `.cta-button` class is no longer used anywhere else, remove it from `globals.css`
  - Remove the `::before` pseudo-element styles (lines 347-356)
  - Remove the hover, span, focus, and active state styles (lines 358-380)
  - Remove the responsive `.cta-button` styles in media query (lines 413-416)
  - **Acceptance**: No orphaned CSS rules remain if button class is completely unused

### Technical Considerations

- **Existing Pattern**: The `.hero-link` class (lines 282-316 in `globals.css`) provides a good reference for animated hyperlink styling with proper hover effects
- **CSS Variables**: All colors use CSS custom properties, so dark theme support is mostly automatic
- **Accessibility**: Ensure minimum 4.5:1 contrast ratio for link text against `--color-bg-secondary` background
- **Z-Index Cleanup**: The `<span>` wrapper was only needed for the button's `::before` overlay effect - hyperlinks won't need this
- **External Link**: The first link goes to GitHub and opens in a new tab; consider adding an external link icon indicator

### Dependencies

- No external dependencies
- Changes are confined to `webhook-server/app/page.tsx` and `webhook-server/app/globals.css`

### Estimated Complexity

**Simple** - This is a straightforward styling change that replaces button styles with hyperlink styles. The CSS variable system is already in place, and there's an existing `.hero-link` pattern to reference.

### Files to Modify

| File | Changes |
|------|---------|
| `webhook-server/app/globals.css` | Add `.cta-link` class, optionally remove `.cta-button` |
| `webhook-server/app/page.tsx` | Change class names, remove `<span>` wrappers |

### Color Reference (for contrast verification)

| Theme | Background (`--color-bg-secondary`) | Link Color (`--color-primary-indigo`) | Hover Color (`--color-primary-purple`) |
|-------|-------------------------------------|---------------------------------------|----------------------------------------|
| Light | `#F9FAFB` | `#4F46E5` | `#7C3AED` |
| Dark  | `#1E293B` | `#818CF8` | `#A78BFA` |

---
*🏷️ Add label `ready-for-dev` when ready for implementation*


---

## Notes

- Target Directory: `/tmp/sam-repos/saaragh/1000pages/webhook-server`
- Tech Stack: TypeScript + React + Next.js

---

*🤖 Generated by Sam 🎯 (Triage) → Pete 📋 (Planning) → Alex 🏗️ (Architecture)*
