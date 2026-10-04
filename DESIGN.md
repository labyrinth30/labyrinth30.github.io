# Younha Lee — portfolio design contract

## 1. Intent and source
An editorial engineering notebook: quiet white paper, firm black typography, precise rules, generous margins. The memorable moment is the pair of large project names with concise engineering questions underneath. Recruiters choose a project; engineers read evidence and limitations.
Live reference https://www.dahyun.site/ inspected in a real Chromium browser on 2026-10-05 (external evidence reference-desktop.png and reference-runtime.json). Adopt project selection → case study navigation only. The reference uses warm folder tabs and a personal portrait; these are not the user's requested visual contract and are not copied. No supplied portrait or cleared brand logo, so use honest typographic project names.
Minimalist style reference supplies restrained hierarchy and whitespace. Browser-native page scrolling owns all long content; sticky TOC is subordinate. No React or hydration framework.

## 2. Colors and material
--paper #fafaf8; --surface #fff; --ink #20221f; --muted #61655e; --line #daddd5; --wash #eff0eb; --accent #3a4935. No gradients, fake imagery, decorative shadow cards, or proficiency charts. Fine horizontal rules organize the page. Native modal backdrop rgba(20,22,19,.65).

## 3. Typography
System sans: Arial, Apple SD Gothic Neo, Noto Sans KR, sans-serif. Mono: ui-monospace, SFMono-Regular, Consolas. Display fluid 40–68px; project display 60–100px; section 28–40px; case 25–34px; body 16px / 1.85; small 13px / 1.6; labels 11px with .12em tracking. Korean word-break keep-all and overflow-wrap anywhere protect natural phrases while containing long URLs. No external font request.

## 4. Geometry
Spacing scale 4,8,12,16,24,32,48,64,96,128px. Container 1160px; article maximum 760px. Desktop padding 48px, mobile 24px (20px at 320px). Two equal project columns, single column below 700px. Detail grid 208px TOC plus flexible article, collapse below 960px. Border radius 2px for controls, no card rounding. Print A4, 16mm margins; exhibit keep-together only.

## 5. Primitives and states
SiteHeader: name home-link and text actions; current location clear. ProjectCard: linked full editorial panel, number/category, oversized project name, service, role and explicit detail arrow. Hover uses wash; focus-visible 2px ink ring with 5px offset. ProjectHeader: category, title, service, structured role/period/stack metadata. ProjectToc: sticky desktop list, native details/summary mobile. CaseStudy: stable unique anchor, numbered heading, summary, three decision rows, diagram, MDX narrative, public source links. DiagramFigure: prebuilt SVG image with text alternative and explanatory caption; full-size link works without JS; JS enhances link into native dialog with close and Escape, native focus containment and explicit return focus. Code/table blocks scroll within article, never the viewport. SiteFooter: mail/GitHub/PDF with large touch areas.

## 6. Motion and interaction
No ornamental or entrance animation. Links underline on hover, focus is always visible. Dialog opens without animated delay. All actions use native links/buttons. Reduced motion disables smooth scrolling. Diagram source is represented as an external image to isolate SVG IDs on detail and print pages.

## 7. Accessibility and content
Korean lang, unique titles/descriptions/canonical, skip link, semantic headings, labelled navigation, visible keyboard focus, ≥44px primary targets. Diagram caption explains intent, full-scale SVG remains accessible without JS. Content remains readable with JavaScript disabled. Tables have scoped header styling; code has Shiki syntax highlighting. No private identifiers in public content. Values must retain measurement context and limitations.

## 8. Verification and debt
Capture home, both details at 1440/390 and 320 wrap checks, keyboard navigation, dialog Escape/focus return, mobile TOC, no-JS diagram and detail links. PDF shares exact content and uses separate print styles. PDF export and final deployment QA owned by subsequent task. Final independent review to be coordinated by parent after fresh captures. No accepted visual debt.
