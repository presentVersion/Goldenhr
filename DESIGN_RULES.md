# GoldenHour AI — Design Rules & Token Specification

> Canonical single source of truth derived from forensic inspection of `hackathon_3d_assets/` (36 assets inspected: 30 root files, 6 variations). All measurements marked *(estimated)* are derived proportionally against a 1440 px desktop frame or 390 px iOS viewport.

---

## 1. Overview

**Direction:** Clinical, calm, softly rounded, layered with translucent frosted glass and subtle ambient shadows, high contrast on text and urgent medical signals.

**Personality:** Clinical · Calm · Precision

---

## 2. Token Table

### 2.1 Colour Tokens

| Token | Role | Light Value | Dark Value |
|---|---|---|---|
| `bg-canvas` | Page background | `#F8FAFC` | `#070B12` |
| `surface-card` | Primary card surface | `#FFFFFF` | `#0F172A` |
| `surface-glass` | Frosted glass container | `rgba(255, 255, 255, 0.82)` | `rgba(15, 23, 42, 0.85)` |
| `surface-obsidian` | High-contrast focal card / dock | `#0B0F17` | `#020617` |
| `text-primary` | Headings & primary values | `#0F172A` | `#F8FAFC` |
| `text-secondary` | Captions, metadata & subtitles | `#475569` | `#94A3B8` |
| `border-subtle` | Card & input hairlines | `rgba(15, 23, 42, 0.08)` | `rgba(255, 255, 255, 0.14)` |
| `border-specular` | Glass highlight rim | `rgba(255, 255, 255, 0.75)` | `rgba(255, 255, 255, 0.20)` |
| `accent-primary` | Active progress & readiness | `#D4F933` | `#D4F933` |
| `accent-cta` | Primary non-SOS action fill | `#0B0F17` | `#FFFFFF` |
| `status-danger` | SOS, ESI-1/2 & cardiac alert | `#F43F5E` | `#FB7185` |
| `status-warning` | In-transit ETA & caution | `#F59E0B` | `#FBBF24` |
| `status-success` | Stable vitals & bay clear | `#10B981` | `#34D399` |
| `status-info` | Secondary clinical & neuro | `#3B82F6` | `#60A5FA` |
| `ai-highlight` | AI triage orb & neural ring | `#06B6D4` | `#22D3EE` |

### 2.2 Typography Scale

| Token | Font Family | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `display-lg` | `Plus Jakarta Sans` | `32px` | `700` | `38px` (`1.19`) | `-0.02em` |
| `heading-md` | `Plus Jakarta Sans` | `24px` | `700` | `30px` (`1.25`) | `-0.02em` |
| `heading-sm` | `Plus Jakarta Sans` | `18px` | `700` | `24px` (`1.33`) | `-0.01em` |
| `body-md` | `Inter` | `14px` | `400` | `21px` (`1.50`) | `0em` |
| `body-sm` | `Inter` | `12px` | `500` | `18px` (`1.50`) | `0em` |
| `label-xs` | `Inter` | `11px` | `700` | `14px` (`1.27`) | `0.04em` |
| `metric-lg` | `JetBrains Mono` | `28px` | `800` | `32px` (`1.14`) | `-0.02em` |
| `metric-sm` | `JetBrains Mono` | `12px` | `700` | `16px` (`1.33`) | `0.02em` |

### 2.3 Spacing Scale (Base Unit: `4px`)

| Token | Value | Usage |
|---|---|---|
| `space-1` | `4px` | Icon-to-badge micro gap |
| `space-2` | `8px` | Inner element gap (icon to label) |
| `space-3` | `12px` | Tight list item vertical gap |
| `space-4` | `16px` | Standard card padding (mobile) & form field gap |
| `space-5` | `20px` | Featured card padding (`ObsidianProgressCard`) |
| `space-6` | `24px` | Section gap & desktop card padding |
| `space-8` | `32px` | Major layout zone separation |

### 2.4 Radius Scale

| Token | Value | Applies To |
|---|---|---|
| `radius-sm` | `12px` | Small inner metric tiles & code/ID tags |
| `radius-md` | `16px` | Text inputs, alert callout boxes, thumbnail frames |
| `radius-lg` | `24px` | Standard white cards, telemetry widgets, table rows |
| `radius-xl` | `28px` | Featured obsidian cards, hero 3D twin containers |
| `radius-2xl` | `32px` | Modal sheets, bottom drawers, desktop floating docks |
| `radius-pill` | `9999px` | All buttons, filter tabs, status chips, sliders |

### 2.5 Elevation Levels

| Level | CSS Shadow | Surface Treatment |
|---|---|---|
| `elev-0` | `none` | Flat background canvas (`#F8FAFC` / `#070B12`) |
| `elev-1` | `0 4px 16px -4px rgba(15, 23, 42, 0.06)` | Standard cards & list items |
| `elev-2` | `0 16px 36px -10px rgba(244, 63, 94, 0.14)` | Frosted glass overlays & floating ETA pills |
| `elev-3` | `0 24px 56px -12px rgba(15, 23, 42, 0.24)` | Floating bottom dock, modals & SOS takeover |

### 2.6 Breakpoints & Icon Grid

| Token | Value |
|---|---|
| `bp-mobile` | `390px` (max-width `767px`) |
| `bp-tablet` | `768px` (max-width `1023px`) |
| `bp-desktop` | `1280px` (max container `1440px`) |
| `icon-sm` | `16px` (`strokeWidth: 2`) |
| `icon-md` | `20px` (`strokeWidth: 2`) |
| `icon-lg` | `24px` (`strokeWidth: 1.75`) |

### 2.7 Tailwind Config JSON Tokens

```json
{
  "colors": {
    "canvas": { "light": "#F8FAFC", "dark": "#070B12" },
    "card": { "light": "#FFFFFF", "dark": "#0F172A" },
    "obsidian": { "light": "#0B0F17", "dark": "#020617" },
    "text": {
      "primary": { "light": "#0F172A", "dark": "#F8FAFC" },
      "secondary": { "light": "#475569", "dark": "#94A3B8" }
    },
    "accent": { "lime": "#D4F933", "cta": "#0B0F17" },
    "status": {
      "danger": "#F43F5E",
      "warning": "#F59E0B",
      "success": "#10B981",
      "info": "#3B82F6",
      "ai": "#06B6D4"
    }
  },
  "fontFamily": {
    "display": ["Plus Jakarta Sans", "sans-serif"],
    "sans": ["Inter", "sans-serif"],
    "mono": ["JetBrains Mono", "monospace"]
  },
  "spacing": {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px"
  },
  "borderRadius": {
    "sm": "12px",
    "md": "16px",
    "lg": "24px",
    "xl": "28px",
    "2xl": "32px",
    "pill": "9999px"
  },
  "boxShadow": {
    "elev-1": "0 4px 16px -4px rgba(15, 23, 42, 0.06)",
    "elev-2": "0 16px 36px -10px rgba(244, 63, 94, 0.14)",
    "elev-3": "0 24px 56px -12px rgba(15, 23, 42, 0.24)"
  },
  "screens": {
    "mobile": "390px",
    "tablet": "768px",
    "desktop": "1280px"
  }
}
```

---

## 3. Colour Rules

1. Apply `bg-canvas` (`#F8FAFC` light / `#070B12` dark) to the root viewport of all 25 screens; Light Porcelain is the default primary mode *(conflict resolved against dark triptych renders for daytime outdoor legibility)*.
2. Maintain a minimum WCAG AA contrast ratio of `4.5:1` for all body text (`#0F172A` on `#FFFFFF` = `17.4:1`, `#475569` on `#FFFFFF` = `7.5:1`) and `3:1` for large headings and UI icons.
3. Restrict `accent-primary` (`#D4F933`) exclusively to active progress rings, active tab count badges, and live metronome bars on dark (`#0B0F17`) or `#FFFFFF` surfaces with `#0F172A` foreground text (`13.8:1` contrast).
4. Restrict `status-danger` (`#F43F5E`) exclusively to SOS triggers, ESI Level 1–2 alerts, cardiac trauma glow zones, and "What NOT to do" warning boxes.
5. Restrict `status-warning` (`#F59E0B`) exclusively to active transit ETAs, Air Evac helicopter selection cards, and caution banners.
6. Restrict `status-success` (`#10B981`) exclusively to normal vital ranges, cleared airways, and verified hospital bay readiness.
7. Restrict `ai-highlight` (`#06B6D4`) exclusively to AI triage orbs, neural synapse highlights, and automated voice dictation indicators.
8. Apply `surface-glass` (`rgba(255, 255, 255, 0.82)` with `backdrop-filter: blur(24px)`) to floating telemetry chips, top bars, and bottom navigation docks.
9. **Do not** place white or neon-lime (`#D4F933`) text directly on light porcelain (`#F8FAFC`) backgrounds, and do not use more than two accent colours on a single card.

---

## 4. Typography Rules

1. Use `Plus Jakarta Sans` (`display-lg` `32px`, `heading-md` `24px`, `heading-sm` `18px`) for all screen titles, patient names, and section headers.
2. Use `Inter` (`body-md` `14px`, `body-sm` `12px`) for clinical instructions, form labels, and bystander guidance steps.
3. Use `JetBrains Mono` with `font-variant-numeric: tabular-nums` for all live timers, blood pressure readings (`135/88`), ETA minutes (`15 min`), and BPM counters (`110 BPM`).
4. Set uppercase tracking (`letter-spacing: 0.04em`, `11px` bold) only on micro-eyebrow labels (`CRITICAL WARNING`, `01 • ASSESS & ALERT`); use sentence case for all body copy and buttons.
5. Limit each screen to a maximum of `2` font weights per hierarchy group (`700` bold for headings/labels, `400` or `500` for body copy).
6. For **Telugu** (`te`) and **Hindi** (`hi`) localized UI copy, enforce a minimum line height of `1.65` on `body-md` (`23px`) and `1.45` on headings to prevent vertical clipping of vowel matras and diacritics.
7. For **Telugu** and **Hindi** inside pill buttons and chips, set `whitespace-normal text-center` or expand horizontal padding to `20px` so multi-syllable translations never truncate mid-glyph.
8. **Do not** use italic styling on clinical vitals, timers, or emergency instructions, and do not set body text smaller than `12px`.

---

## 5. Layout and Spacing Rules

1. Base all spacing on a strict `4px` grid (`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`).
2. **Mobile (`390px–767px`):** Use a `4`-column grid with `16px` outer horizontal margin, `12px` column gutter, and `96px` bottom clearance above the floating navigation dock.
3. **Tablet (`768px–1023px`):** Use an `8`-column grid with `24px` outer margin and `16px` gutter.
4. **Desktop (`1280px+`):** Use a `12`-column grid (`max-width: 1440px`) with `24px` outer margin, `20px` gutter, and a `64px` left vertical dock offset on Command Centre (`S10`) *(estimated from `reference-01` 1024px frame)*.
5. **Command Centre (`S10`) 3-Zone Split:** Allocate `4` columns to Map + Queue, `5` columns to the central 3D Trauma Twin + Fleet selector, and `3` columns to the Active Triage feed.
6. Enforce `16px` (`space-4`) internal padding on mobile cards and `24px` (`space-6`) internal padding on desktop cards.
7. Maintain `8px` (`space-2`) spacing within related elements (icon to label) and `20px–24px` (`space-5` to `space-6`) between distinct card groups.
8. **Do not** use arbitrary pixel margins outside the `4px` scale, and do not place scrollable content behind the fixed bottom navigation dock without `96px` bottom padding.

---

## 6. Component Rules

### 6.1 Buttons
- **Anatomy:** Stadium capsule (`radius-pill`, `9999px`) with optional leading `16px` icon and single-line sentence-case label (`14px` bold).
- **Sizes:** Primary/Destructive height `48px` (`px-6`), Compact/Toolbar height `36px` (`px-4`), Circular Icon button `40px × 40px`.
- **States:** Primary uses `#0B0F17` fill (`#FFFFFF` text); SOS Destructive uses `#F43F5E` fill (`#FFFFFF` text); Secondary uses `surface-glass` with `1px` `border-subtle`; Pressed scales to `0.97` with `elev-1`.
- **Do not** use sharp or `8px`-rounded rectangles for buttons; all interactive action buttons must use `9999px` pill geometry.

### 6.2 Inputs & Forms
- **Anatomy:** Top-aligned `12px` bold label (`margin-bottom: 6px`), rounded container (`radius-md`, `16px`), optional `16px` leading icon, and bottom `12px` helper/error text.
- **Sizes:** Single-line input height `48px` (`px-4`), Textarea minimum height `96px` (`p-4`).
- **States:** Default uses `1px solid border-subtle` on `#FFFFFF`; Focus uses `2px` ring in `#0F172A` (or `#3B82F6`); Error uses `1px solid #F43F5E` with `#F43F5E` message below.
- **Do not** place placeholder text as a substitute for a visible top label, and do not use underlined Material-style inputs.

### 6.3 Cards & Lists
- **Anatomy:** Rounded container (`radius-lg` `24px` for standard, `radius-xl` `28px` for obsidian progress/hero) with `1px solid border-specular` and `elev-1` shadow.
- **Density:** List rows (`SwipeRow`) use fixed `58px` height (`px-3`, `radius-md` `16px`) with `8px` vertical gap between rows.
- **Dividers:** Prefer `8px–12px` vertical spacing over horizontal hairline dividers; use `1px solid border-subtle` only inside dense clinical tables.
- **Do not** nest more than `2` card levels deep, and do not obscure 3D card imagery with full-width dark text gradients.

### 6.4 Chips & Priority Selectors
- **Anatomy:** `radius-pill` (`9999px`), height `32px` (`px-3`), `12px` bold text, optional `8px` status dot or circular count badge (`20px × 20px` `#D4F933` fill).
- **Priority Pills:** `Low` (`#DCFCE7` bg / `#15803D` text), `Medium` (`#FEF3C7` bg / `#B45309` text), `High` (`#FEE2E2` bg / `#B91C1C` text).
- **Do not** wrap chip labels onto two lines or mix square tags with pill chips on the same row.

### 6.5 Sheets & Dialogs
- **Anatomy:** Bottom sheets and modals use `radius-2xl` (`32px`) top corners (or all corners on centered dialogs), `24px` padding, and circular `36px` `X` close / `✓` confirm header buttons.
- **Backdrop:** Dim underlying viewport with `rgba(15, 23, 42, 0.40)` and `backdrop-filter: blur(8px)`.
- **Do not** hide critical emergency actions (like 3D Trauma Scan or SOS) inside collapsed accordions or modal dialogs.

### 6.6 Tables & Badges
- **Tables:** Row height `52px`, `12px` uppercase header (`#475569`), tabular numbers (`JetBrains Mono`), zebra hover tint `rgba(15, 23, 42, 0.03)`.
- **Badges:** Height `22px` (`px-2`, `radius-pill`), `10px` uppercase bold text with optional `6px` pulsing status dot for live cases.
- **Do not** display raw unformatted timestamps or unaligned variable-width numbers in clinical tables.

### 6.7 Maps & Navigation Chrome
- **Maps:** Desaturated light pastel street tiles (`saturation: -60%`), `radius-lg` (`24px`) container, overlaid with `#0B0F17` floating ETA beacon pills (`15 min Easy Traffic`) and `36px` circular `+`/`-` zoom pills.
- **Navigation Dock:** Mobile bottom dock (`height: 64px`, `radius-2xl` `32px`, `bottom: 20px`) and Desktop left vertical dock (`width: 64px`, `radius-2xl` `32px`) using frosted glass with `#0B0F17` active pill state.
- **Do not** place more than `6` top-level destinations inside the floating navigation dock.

---

## 7. Iconography Rules

1. Use crisp `2px` stroke line icons (Lucide / HugeIcons) for all standard navigation, form, and button actions (`icon-sm` `16px`, `icon-md` `20px`, `icon-lg` `24px`).
2. Maintain consistent `round` line caps and `round` line joins across every SVG icon.
3. Pair icons with a visible text label (`gap: 8px`) inside navigation active states, filter tabs, and clinical action buttons.
4. Allow icon-only presentation (`40px × 40px` circular target) strictly for universal utility controls (`+`, `-`, `X`, bell, theme toggle, settings).
5. **AI Icon Rule:** Always render AI triage/assistant indicators inside a glowing `ai-highlight` (`#06B6D4`) circular orb or pill badge with a `Sparkles` or neural ring motif to separate algorithmic suggestions from verified physician orders.
6. **Do not** mix filled solid icons and thin `1px` outline icons within the same toolbar or card header.

---

## 8. Imagery and 3D Asset Rules

1. **Lighting & Temperature:** Use soft top-left studio key lighting with warm porcelain/peach ambient bounce (`#FFF5F7` / `#FAFAFA`) and cool cyan/amber internal subsurface rim glow.
2. **Material Finish:** Render anatomical structures and medical devices in translucent frosted borosilicate glass or smooth satin porcelain; render medications in glossy translucent gelatin.
3. **Background Treatment:** Isolate 3D clinical and CPR instruction assets on clean `#FAFAFA` or `#F8FAFC` backgrounds so they blend seamlessly into cards without hard rectangular borders.
4. **Placement & Scale (Anti-Framelock):** Render hero 3D scans at a minimum `aspect-[16/9]` or full vertical torso height (`min-h-[320px]`), never squished into `48px` icon thumbnails.
5. **Overlay Rule:** Flank 3D models with floating `surface-glass` stadium telemetry pills (`Pressure`, `Medications`) beside or beneath the anatomy rather than covering the torso in dark text gradients.
6. **Do not** crop the head or chest trauma hotspot of the 3D Anatomical Twin, and do not apply heavy dark scrims (`opacity > 0.25`) over 3D renders.

---

## 9. Motion Hints

1. **Card Lift Hint:** `elev-1` to `elev-2` shadow transitions and subtle `1.02` image zoom imply tactile lift on hover/selection (`reference-01` ambulance cards).
2. **Swipe-to-Confirm Hint:** The `✓ >> Swipe to Confirm` chevron track (`reference-01`, `reference-03`) implies continuous horizontal drag with snap-back resistance until threshold commit.
3. **Row Action Drawer Hint:** Stacked triage cards (`reference-01` right column) imply left-swipe gesture reveal for secondary dispatch/defer actions (`SwipeRow`).
4. **Scroll Reveal Hint:** Overlapping blurred bottom cards beneath floating docks (`reference-03`, `S1Landing`) imply upward scroll-float focus reveals (durations deferred to motion spec).
5. **Live Pulse Hint:** Concentric rings around the SOS orb, 3D heart, and AED radar imply continuous rhythmic radial expansion (`110 BPM` metronome / live beacon).
6. **Do not** animate layout-shifting properties (`width`/`height` reflows) on active triage lists, and do not invent custom spring curves outside the motion spec.

---

## 10. Tone of Voice and Copy

1. **Action Labels:** Use crisp 1–3 word imperative verb phrases on all buttons (`Launch SOS`, `Confirm Bay 1`, `Swipe to Confirm`, `Create Task`).
2. **Step Titles:** Write first-aid instructions as direct action pairs (`Assess & Alert`, `Cool with Running Water`, `Place in Recovery Position`).
3. **Status Wording:** Use concise noun-metric pairs for live states (`15 min • Easy Traffic`, `ESI Level 2 • Emergent`, `3 Free`, `Airway Opened`).
4. **Warning Copy:** Prefix all contraindications with `"Don't..."` in plain, direct language (`Don't apply ice, butter, or toothpaste.`).
5. **Capitalisation:** Use Title Case for screen headers, card titles, and CTA buttons; use Sentence case for clinical body instructions; use UPPERCASE only for `10–11px` eyebrow tags (`CRITICAL WARNING`, `LIVE`).
6. **Do not** use medical jargon without plain bystander phrasing on Citizen screens (`S1–S5`), and do not end button labels with periods.

---

## 11. Consistency Checklist

1. [ ] Is the root canvas `#F8FAFC` (light) or `#070B12` (dark) with no unapproved tinted backgrounds?
2. [ ] Do all body texts meet `>= 4.5:1` contrast and use `Inter` (`>= 12px`)?
3. [ ] Do all timers, vitals, ETAs, and BPM counters use `JetBrains Mono` with `tabular-nums`?
4. [ ] Are all buttons, filter tabs, and status badges `9999px` pills (`radius-pill`)?
5. [ ] Do all cards use `24px` (`radius-lg`) or `28px` (`radius-xl`) corners with `1px` specular/subtle borders?
6. [ ] Is all spacing strictly on the `4px` base grid (`4, 8, 12, 16, 20, 24, 32`)?
7. [ ] Are Telugu/Hindi strings given `>= 1.65` line height with zero clipping inside pills?
8. [ ] Are 3D anatomical/CPR assets rendered full-bleed (`>= aspect-[16/9]`) without dark scrims or dropdown gates?
9. [ ] Are `#F43F5E` (danger) and `#D4F933` (neon-lime active) used strictly in their assigned semantic roles?
10. [ ] Does the bottom navigation dock sit `20px` above the viewport bottom with `96px` content clearance?

---

## 12. Anti-Patterns

1. **Framelocked 3D Assets:** Never hide the 3D Trauma Twin inside a collapsed accordion/dropdown or squish volumetric renders into `48×48px` square icon boxes.
2. **Obscuring Dark Vignettes:** Never cover 3D porcelain/glass renders with heavy `rgba(0,0,0,0.7)` gradients just to make white text readable.
3. **Neon-Lime on White Text:** Never render `#D4F933` text on `#FFFFFF` or `#F8FAFC` surfaces (fails contrast severely); use `#D4F933` only as a fill behind `#0F172A` text or as a stroke on `#0B0F17`.
4. **Sharp Rectangular Buttons:** Never use `0px` or `4px` corner radius on buttons or chips; GoldenHour AI requires pill (`9999px`) and softly rounded (`16–32px`) geometry.
5. **Unbounded Text Columns:** Never render clinical instructions wider than `65ch` on desktop or omit `"What NOT to do"` safety callouts on emergency protocol steps.
6. **Mixed Icon Weights:** Never combine solid filled icons, `1px` hairline icons, and `2px` stroke icons inside the same component bar.
7. **Unformatted Telemetry Numbers:** Never use proportional fonts (`Inter`) for ticking countdowns or BP waveforms (causes horizontal jitter).

---

## 13. Source Map & Asset Inventory Summary

### 13.1 Rule-to-Reference Source Map

| `DESIGN_RULES.md` Section | Primary Supporting References |
|---|---|
| **1–2. Overview & Tokens** | `reference-01-drplus-ambulance-control-centre.jpg`, `reference-02-mobile-productivity-progress-screens.jpg`, `original-001c0341c31a7f262e1ee6bc0e80dbe2.png` |
| **3. Colour Rules** | `reference-01`, `reference-02`, `original-001c0341c31a7f262e1ee6bc0e80dbe2.png`, `goldenhour-ui-triptych-citizen-sos.jpg` |
| **4. Typography Rules** | `reference-02`, `original-32843b85235a0c77067266e39c3a651b.png`, `cpr-step-01-assess-alert.jpg` |
| **5. Layout & Spacing** | `reference-01` (Desktop 3-zone + left dock), `reference-02` (Mobile 390px), `original-32843b85235a0c77067266e39c3a651b.png` |
| **6. Component Rules** | `reference-01` (Maps, SwipeRow, SlideCommit), `reference-02` (Progress Card, Tabs, Priority Pills, Sheets), `original-d683073dca1315d2dad76e167c1821ee.png` |
| **7. Iconography Rules** | `reference-01`, `reference-02`, `goldenhour-ui-triptych-doctor-command.jpg` (AI orb) |
| **8. Imagery & 3D Assets** | `mivo-anatomical-scan.jpg`, `mivo-jelly-medications.jpg`, `cpr-step-01` through `04`, `emergency-rescue-*` |
| **9. Motion Hints** | `reference-01` (SlideCommit, SwipeRow), `reference-03` (Scroll/Stack), `goldenhour-ui-triptych-citizen-sos.jpg` (Pulse rings) |
| **10. Tone & Copy** | `cpr-step-01` through `04`, `emergency-rescue-*`, `reference-01`, `reference-02` |

### 13.2 Complete Inventory (`hackathon_3d_assets/`)

- **Total Files Analysed:** `36` images (`30` root files + `6` in `variations/`).
- **UI Screens (14 primary/supporting):** `reference-01-drplus-ambulance-control-centre.jpg` (1024×768, Primary), `reference-02-mobile-productivity-progress-screens.jpg` (1024×768, Primary), `reference-03-ethereal-onboarding-holographic-orb-screens.jpg` (892×640, Supporting/Mood), `goldenhour-ui-triptych-citizen-sos.jpg` (1376×768, Primary), `goldenhour-ui-triptych-doctor-command.jpg` (1376×768, Primary), `goldenhour-ui-triptych-paramedic-volunteer.jpg` (1376×768, Primary), `original-001c0341c31a7f262e1ee6bc0e80dbe2.png` (1504×1128, Primary), `original-32843b85235a0c77067266e39c3a651b.png` (1596×1200, Primary), `original-4d63561d94547b461f09200062d84df3.png` (1504×1128, Supporting), `original-59b6625b3e998d5893c4952c77a26fcf.png` (1504×1131, Supporting), `original-d683073dca1315d2dad76e167c1821ee.png` (1504×1128, Primary), `original-ff3d16540cfaa54c0e9c944a29763c88.png` (1504×1128, Supporting), `mivo-drplus-centre.jpg` (1024×768, Supporting), `mivo-sos-mobile.jpg` (1024×768, Supporting), `mivo-skeleton-phone.jpg` (1024×768, Supporting).
- **UI Instruction Cards / Components (7 primary + 6 variations):** `cpr-step-01-assess-alert.jpg` through `cpr-step-04-aed-defibrillation.jpg` (1376×768), `emergency-rescue-heimlich-choking.jpg` (1376×768), `emergency-rescue-recovery-position.jpg` (1376×768), `emergency-rescue-tourniquet-bleeding.jpg` (1376×768), plus 6 `variations/*.jpg` (1376×768, Supporting).
- **3D Assets (7 primary):** `mivo-anatomical-scan.jpg` (896×1200), `mivo-cardiac-cpr-3d.jpg` (1024×1024), `mivo-cranial-neural-3d.jpg` (1024×1024), `mivo-ambulance-transit-3d.jpg` (1200×896), `mivo-volunteer-aed-radar-3d.jpg` (1200×896), `mivo-diagnostic-dossier-3d.jpg` (1200×896), `mivo-jelly-medications.jpg` (1376×768).
- **Flagged / Skipped:**
  - `original-59b6625b3e998d5893c4952c77a26fcf.webp` (42 KB) — Skipped as an uncompressed duplicate of the `1504×1131` PNG.
  - `mivo-pill-capsule.jpg` (736×552, 68.1 KB) — Flagged as lower-resolution; medication material rules derive from `mivo-jelly-medications.jpg` (`1376×768`).
  - `reference-03-ethereal-onboarding-holographic-orb-screens.jpg` (892×640) — Blurred small text inside tilted notification cards was excluded from typography sizing rules; used only for pastel mesh, orb glow, and pill slider geometry.

### 13.3 Conflicts Resolved
1. **Light vs Dark Canvas:** Resolved in favour of Light Porcelain (`#F8FAFC`) as default for daytime outdoor emergency legibility, retaining Deep Obsidian (`#0B0F17`) for featured progress cards, floating docks, and dark mode.
2. **Competing Accent Colours (Neon Lime vs Rose vs Cobalt):** Separated strictly by semantic role (`#F43F5E` = SOS/Trauma, `#D4F933` = Active progress/counts, `#0B0F17` = Primary CTA, `#3B82F6` = Secondary info).
3. **Card Radius Variance (`20px` vs `28px` vs `32px`):** Standardized into `24px` (standard cards), `28px` (featured/hero cards), `32px` (modals/sheets/docks), and `9999px` (buttons/chips).
