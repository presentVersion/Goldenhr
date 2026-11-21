---
name: mivo-liquid-glass
description: >-
  Master design system blueprint for GoldenHour AI inspired by RonDesignLab's Mivo
  Healthcare mobile app. Defines the radiant rose gradient mesh, 3D crystalline
  skeletal twin, concave liquid wave arches, neon-lime accents, jelly medication capsules,
  and tactile stadium pills across all 25 screens.
---

# Mivo Liquid Glass UI/UX Blueprint & Design System

*GoldenHour AI Master Design Specification • RonDesignLab Mivo Deconstruction & System-Wide Transformation*

---

## 1. Executive Summary & Visual DNA

The **Mivo Liquid Glass** design philosophy transitions clinical software from sterile utility to an incandescent, organic, tactile human experience. Inspired directly by the 12 reference screens from RonDesignLab's `mivo - healthcare mobile app`, this system balances high-adrenaline emergency precision with biological warmth, soft volumetric lighting, and deep optical depth.

### Core Visual Pillars:
1. **The Radiant Rose Gradient Mesh**: Multi-anchor radial substrate with warm coral-magenta glow (`#FF3366`), soft peach halo (`#FFA0B5`), and clean white/cream horizon.
2. **The 3D Crystalline Anatomical Twin**: Translucent glass human silhouette with internal crystalline skeleton, molten-amber cervical spine glow, and concentric trauma telemetry hot-spots.
3. **The Signature Concave Liquid Wave Arch**: Inverted scallop curves (`mask-image` / SVG curve) that sculpt the transition between the luminous anatomical field and frosted card decks.
4. **Neon Chartreuse Contrast Accelerators**: Vibrant electric lime (`#D4FF00` / `#CCFF00`) used strategically for primary callouts (`Tip a Doctor`, dosage badges, slider beads).
5. **3D Gummy / Jelly Medication Artifacts**: Volumetric translucent capsules with internal checkmarks and soft tinted shadows (Amber Ibuprofen, Jade Lozenges, Sapphire Syrup).
6. **Tactile Stadium Action Rails**: Continuous pills featuring a recessed circular arrow button (`→`), centered typographic CTA, and triple directional chevrons (`> > >`).

---

## 2. In-Depth Deconstruction of the 12 Reference Images

| Ref # | Filename | Key Visual Features & Micro-Interactions |
| :--- | :--- | :--- |
| **01** | `462604192999789535_sp0_b0.jpg` | **Translucent Dark-Rose Chart Deck**: Floating glass card with concave bottom arc on human silhouette. Temperature graph (`37.2°C` → `38.4°C`), horizontal dashed threshold lines (`Severe`, `Moderate`, `Mild`, `None`), lime spotlight beam emitting from active fever peak, `Tip a Doctor` neon pill. |
| **02** | `462604192999792091_sp0_b0.jpg` | **Macro Touch Interaction**: Fingertip interacting with the concave wave arch. Demonstrates the fluid separation between the white card and the bottom glowing pink hemisphere with 3D orbs. |
| **03** | `462604192999798219_sp0_b0.jpg` | **High-Fashion Editorial Glass**: Floating glass card on fashion silhouette. Shows chromatic edge aberration (cyan/magenta rainbow fringe along bevels) and specular white border reflections. |
| **04** | `462604192999799185_sp0_b0.jpg` | **Treatment Plan Phone Mockup**: Segmented date pills (`Day` [black], `Week`, `Month`, `Year`), 3D amber gummy capsules with checkmarks, lime dose tags (`Ibuprofen 400 mg`), timeline slider with tick marks, right vertical pink rail with active medication tab. |
| **05** | `462604192999804024_sp0_b0.jpg` | **Master 3D Skeletal Torso**: Full anatomical render showing translucent skull, facial bones, glowing amber spine, costal ribs, sternum, clavicles. Concentric throat pain node with hairline leader (`7/10 throat pain` / `Moderate`), and arc of 5 floating glass category orbs. |
| **06** | `462604192999812421_sp0_b0.jpg` | **Macro Symptoms Sheet**: Wave crest transition, dark notch handle, `My symptoms` typography, frosted pill tags (`Sore throat ✕`, `Dull headache ✕`, `Dry cough ✕`), and smooth severity slider with neon lime bead. |
| **07** | `462604192999813213_sp0_b0.jpg` | **Macro Jelly Lozenge Card**: Stadium-shaped inset card, translucent jade-green jelly capsule with checkmark, volumetric shadow, lime tag `Lozenges`, `Dissolve slowly`, `1 pill`. |
| **08** | `462604192999814656_sp0_b0.jpg` | **Technical Dot-Matrix Overlay**: Floating card on athlete silhouette with subtle 16px dot-matrix grid texture overlaying the gradient mesh, conveying medical telemetry precision. |
| **09** | `462604192999819536_sp0_b0.jpg` | **Chiffon Liquid Glass**: Square glass pill card on motion-blurred pink fabric with translucent amber gummy capsules and `mivo` micro-engraved typography. |
| **10** | `462604192999821366_sp0_b0.jpg` | **Hero Full Screen Mockup (Light)**: Complete mobile viewport: status bar, `mivo` serif wordmark, 3D skeletal torso, wave arch, `My symptoms` bottom sheet, severity slider, and bottom stadium `Continue > > >` button with satellite pencil icon. |
| **11** | `462604192999827046_sp0_b0.jpg` | **Hero Full Screen Mockup (Chart)**: Segmented control (`Table` \| `Chart` \| `Table`), temperature chart with lime beam, 3D jelly medication bubbles (`Ibuprofen $7.32`, `Lozenges $6.49`, `Cough Syrup $8.24`), and `Add Entry > > >` CTA. |
| **12** | `462604192999828905_sp0_b0.jpg` | **Hero Obsidian Dark-Glass View**: Deep dark glass variant (`#141014`) with concave top arch cradling 5 glowing category orbs, white typography, dark frosted chips, illuminated severity rail, and glowing orange circular arrow button. |

---

## 3. Exact Color Palette & Design Tokens

### Light Theme Substrate:
```css
:root {
  /* Radiant Rose Gradient Mesh */
  --mivo-mesh-core: #FF3366;       /* Intense luminous rose */
  --mivo-mesh-ambient: #FFA0B5;    /* Soft peach halo */
  --mivo-mesh-perimeter: #FFF5F7;  /* Bleach to cream/white */
  --mivo-bg-surface: #FFFFFF;      /* Clean card surface */

  /* Contrast Accent (Neon Lime) */
  --mivo-lime: #D4FF00;            /* Primary contrast accent */
  --mivo-lime-hover: #C2EA00;      /* Darker lime hover */
  --mivo-lime-ink: #121212;        /* High-contrast pure black on lime */

  /* 3D Jelly Medication Tones */
  --mivo-jelly-amber: #FFA500;     /* Ibuprofen / Cardiac */
  --mivo-jelly-jade: #10B981;      /* Lozenges / Respiratory */
  --mivo-jelly-cobalt: #3B82F6;    /* Syrup / Neurological */

  /* Skeletal & Telemetry Glows */
  --mivo-spine-amber: #FFB800;     /* Molten cervical spine luminescence */
  --mivo-focal-core: #FFFFFF;      /* Focal pain center bead */
  --mivo-focal-corona: #FFD166;    /* Focal halo */

  /* Glass Optics */
  --mivo-glass-card: rgba(255, 255, 255, 0.88);
  --mivo-glass-rim: rgba(255, 255, 255, 0.85);
  --mivo-glass-shadow: 0 20px 50px -15px rgba(255, 50, 90, 0.18);
}
```

### Dark Obsidian Theme Substrate:
```css
.dark, [data-theme="dark"] {
  --mivo-mesh-core: #2A0815;       /* Deep dark rose abyss */
  --mivo-mesh-ambient: #1D0A14;    /* Obsidian ambient */
  --mivo-mesh-perimeter: #0F0A0E;  /* True black horizon */
  --mivo-bg-surface: #141014;      /* Deep obsidian card */

  --mivo-glass-card: rgba(20, 16, 20, 0.92);
  --mivo-glass-rim: rgba(255, 255, 255, 0.22);
  --mivo-glass-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.65);
}
```

---

## 4. The Concave Liquid Wave Arch (Signature Geometry)

The defining visual anchor of RonDesignLab's Mivo UI is the **concave liquid wave arch** separating the upper glowing canvas from the lower card deck:

```svg
<!-- Upper Scallop Arch (Used on Top of Bottom Sheets) -->
<svg class="w-full h-8 overflow-visible" viewBox="0 0 400 32" preserveAspectRatio="none">
  <path d="M 0,32 L 0,0 Q 200,38 400,0 L 400,32 Z" fill="var(--mivo-bg-surface)" />
</svg>

<!-- Inverted Arch (Used on Floating Pill Cards) -->
<svg class="w-full h-8 overflow-visible" viewBox="0 0 400 32" preserveAspectRatio="none">
  <path d="M 0,0 L 0,32 Q 200,-6 400,32 L 400,0 Z" fill="var(--mivo-glass-card)" />
</svg>
```

Alternatively, with modern CSS clip-path:
```css
.mivo-scallop-top {
  clip-path: ellipse(85% 100% at 50% 0%);
}
.mivo-scallop-bottom {
  clip-path: ellipse(85% 100% at 50% 100%);
}
```

---

## 5. Component Primitives Specifications

### 1. `MivoCard` (Refractive Specular Container)
* **Border**: `1px solid rgba(255, 255, 255, 0.75)` (light) / `rgba(255, 255, 255, 0.15)` (dark).
* **Corner Radius**: `rounded-[36px]` (cards), `rounded-[24px]` (sub-tiles).
* **Backdrop**: `backdrop-filter: blur(28px) saturate(190%)`.
* **Specular Highlight**:
  ```css
  box-shadow: 
    inset 0 1.5px 2px rgba(255, 255, 255, 0.9),
    inset 0 -1px 2px rgba(255, 80, 120, 0.15),
    0 18px 45px -10px rgba(255, 50, 90, 0.15);
  ```

### 2. `MivoButton` (Tactile Stadium Action Rail)
* **Geometry**: `height: 60px`, `rounded-full`, stadium pill with `flex items-center justify-between px-2`.
* **Left Capsule**: `w-12 h-12 rounded-full bg-black text-white flex items-center justify-center` (light) or glowing iridescent orange (dark).
* **Label**: Center text in bold grotesque sans (`Continue`, `Dispatch Ambulance`, `Lock Bay`).
* **Right Chevrons**: Triple animated chevrons `> > >` in neon lime or soft gray.
* **Satellite Button**: Circular `w-12 h-12 rounded-full border border-white/80 bg-white/90 shadow-md` pinned to the right.

### 3. `MivoSeveritySlider` (Continuous Tactile Groove)
* **Track**: Split dual-tone track:
  * Left (active): Deep charcoal `#1A1A1A` (light) / Pure white `#FFFFFF` (dark).
  * Right (inactive): Light gray `#E5E7EB` (light) / Dark slate `#333333` (dark).
* **Thumb**: Neon Chartreuse bead (`#D4FF00`) with dual concentric halo rings (`ring-4 ring-lime-400/30`).
* **Scale**: `1` to `10` with live label (`Mild`, `Moderate`, `Severe`, `Critical`).

### 4. `MivoPillTag` (Frosted Dismissible Chip)
* **Geometry**: `rounded-full px-3 py-1.5`.
* **Style**: Semi-opaque frosted white `bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80`.
* **Typography**: Medium sans with trailing thin dismissal `✕`.

### 5. `MivoCategoryOrb` (Floating 3D Sphere Arc)
* **Geometry**: 5 circular orbs positioned in a radial arc over the thoracic model.
* **Inactive Orbs**: Frosted pink/rose glass orbs with thin line icon inside.
* **Active Orb**: Solid white or illuminated neon bead with high-contrast glyph and ping animation.

---

## 6. Comprehensive 25-Screen Transformation Matrix

Every screen in GoldenHour AI will adopt the Mivo Liquid Glass visual language:

| Screen ID & Role | Mivo Theme Architecture | Key Visual Transformation |
| :--- | :--- | :--- |
| **S1 Landing** (Bystander) | Radiant Rose Mesh + 3D Anatomical Twin | Hero anatomical body with active emergency pulses, concave liquid wave divider, glass portal cards. |
| **S2 SOS Trigger** (Bystander) | Mivo Interactive Pain Scanner | 3D Skeletal model with glowing cervical spine, touchable pain hot-spots, `My symptoms` pill chips, severity slider, stadium `TAP SOS > > >` action. |
| **S3 Scene Guide** (Bystander) | Frosted Card Deck + Lime CPR Metronome | Inverted concave cards, neon-lime audio compression pacer (`100-120 BPM`), clear step-by-step CPR cards. |
| **S4 Live Tracker** (Bystander) | Aerial Map + Liquid Wave ETA Drawer | Full-bleed map with wave-cut glass bottom drawer, active responder photo card, quick call pills. |
| **S5 Family Upload** (Family) | 3D Jelly Diagnostic Grid | 2x3 frosted square tiles, lime category tags, active upload pill with neon progress track. |
| **S6 Login** (Clinical Staff) | Obsidian Dark Glass Portal | Deep obsidian glass card (`#141014`), glowing 5-category role selector, OTP pill inputs with lime focus ring. |
| **S7 Role Registration** (Staff) | Frosted Titanium Form | Multi-step credential cards, license upload dropzone with concave header, verification status tags. |
| **S8 Paramedic Live** (Crew) | Master Digital Trauma Twin | 3D translucent skeletal model with thoracic ischemia glow, dual gold/cyan wave arterial pressure, Metformin jelly capsule, stadium `Swipe to Confirm Arrival > > >`. |
| **S9 Handoff Confirmation** (Crew) | Dual-Signature Glass Tablet | Receiving nurse digital signature pad, QR HMAC capsule card, green verified lozenge badge. |
| **S10 Command Deck** (Dispatch) | Tactical Map + Floating Mivo Trauma Twin | Full-screen vector map, floating central glass card with Matthew Johnson trauma twin, fleet chooser (Helicopter vs ICU), stadium dispatch slider. |
| **S11 Triage Review** (Triage) | 3D Holographic AI Energy Orb | Floating cyan/sapphire refractive orb, ESI 1-5 segmented control, neon second opinion badge, lime protocol chips. |
| **S12 Registration Desk** (Desk) | Split Clinical Ledger | PMJAY Ayushman Bharat card reader, eligibility check pill, patient document carousel with glass borders. |
| **S13 Fast-Track Gate** (Gate) | Optical Laser Sweep Scanner | Glowing vehicle beacon radar, automated barrier gate status with green/red liquid glass status orbs. |
| **S14 Doctor Trauma Board** (Doctor) | Resuscitation Bay Hold Radar | 3D anatomical injury review, countdown ring, bed readiness toggles, stadium `Swipe to Lock Bay 1 > > >`. |
| **S15 Critical Takeover** (Doctor) | Full-Screen Strobe Warning | Urgent red-carmine glass takeover, audible override button, patient vitals flashcard. |
| **S16 Patient Medical History** (Doctor) | Break-Glass History Viewer | Chronic medication timeline (Ibuprofen, Metformin, Insulin), allergy warning chip, audit ledger. |
| **S17 Bay Readiness Board** (Nurse) | Visual Trauma Bay Matrix | Bed occupancy grid with liquid status pills (Free, Held, Locked, Occupied), cleaning timer rings. |
| **S18 Charge Nurse Room Kit** (Nurse) | Protocol Kit Checklist | Interactive kit checklist (Airway, Infuser, Chest Tube), assignment pills, nurse dispatch bar. |
| **S19 Department Console** (Dept) | Multi-Service Glass Dashboard | Cath Lab, CT suite, Blood Bank coordination rails with live queue progress bars. |
| **S20 Volunteer Registration** (Volunteer) | Community Hero Onboarding | Certification badge upload, geographic radius slider with chartreuse thumb, duty toggle. |
| **S21 Volunteer Check-in** (Volunteer) | Tactical On-Duty Console | Live proximity map with caller beacon, BLS kit status, turn-by-turn navigation pill. |
| **S22 Landmark Tagging** (Admin) | Geospatial Anchor Editor | Map pin coordinate editor with photo attachment and precision radius circle. |
| **S23 Hospital Facility Setup** (Admin) | Bed & Resource Builder | Department configuration, bay quantity slider, trauma level selector pills. |
| **S24 Regional Analytics** (Admin) | Spatial Performance Cockpit | 4 Glass Specular metric cards, delay ledger bar chart, transit bottleneck heatmap, 4-lane clinical operations board. |
| **S25 Patient Access Log** (Admin) | Immutable Cryptographic Audit | Hash-chained access entries, break-glass reason audit trail, compliance export button. |

---

## 7. Phased Execution Roadmap

*   [x] **Phase 1: Deep Image Analysis & Blueprint Specification** (Completed across all 12 RonDesignLab Mivo assets)
*   [ ] **Phase 2: Global Theme & Token Infusion** (Injecting Mivo colors, wave arch SVG utilities, and specular shaders into `index.css`)
*   [ ] **Phase 3: High-Fidelity 3D Anatomical Asset Integration** (Embedding generated 3D crystalline body twin asset)
*   [ ] **Phase 4: Component Redesign** (`MivoCard`, `MivoButton`, `MivoSeveritySlider`, `MivoPillTag`, `MivoCategoryOrb`)
*   [ ] **Phase 5: Screen-by-Screen Redesign Execution** (Refactoring S1–S25 with 100% theme uniformity)
*   [ ] **Phase 6: Visual Verification & Browser Testing** (Verification across desktop and mobile viewports)
