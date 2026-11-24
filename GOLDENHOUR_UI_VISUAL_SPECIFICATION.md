# GoldenHour AI — UI Visual Design Specification & Screen References

> **High-Definition Mobile Visualizations, Glassmorphic Layouts, and Micro-Interaction Tokens**  
> *Designed for Hackathon UI/UX Reference, Frontend Implementation, and Presentation Excellence.*

---

## 1. High-Definition Screen Visualizations Overview

To provide reference material for hackathon UI implementation, three high-definition 3-up mobile triptych presentation mockups were generated directly following the RonDesignLab Mivo healthcare design language and the reference mockups:

```
+---------------------------------------------------------------------------------------------------------+
|                                    GOLDENHOUR AI VISUAL TRIPTYCH SUITES                                  |
+---------------------------------------------------------------------------------------------------------+
|  TRIPTYCH 1: Citizen Emergency & Trauma Intake                                                          |
|  --> File: hackathon_3d_assets/goldenhour-ui-triptych-citizen-sos.jpg                                   |
|  --> Screens: S1 Landing Portal | S2 One-Tap SOS & Trauma Twin | S3 CPR Scene Guide                     |
|                                                                                                         |
|  TRIPTYCH 2: Tactical Command, AI Neural Triage & Physician Case Board                                  |
|  --> File: hackathon_3d_assets/goldenhour-ui-triptych-doctor-command.jpg                                 |
|  --> Screens: S11 AI Neural Triage | S10 Dr+ Ambulance Control Centre | S14 Doctor Case Board            |
|                                                                                                         |
|  TRIPTYCH 3: Paramedic Telemetry & Good Samaritan AED Mesh                                              |
|  --> File: hackathon_3d_assets/goldenhour-ui-triptych-paramedic-volunteer.jpg                            |
|  --> Screens: S4 Live Ambulance GPS | S8 Paramedic Live Vitals | S21 Volunteer AED Duty Radar           |
+---------------------------------------------------------------------------------------------------------+
```

---

## 2. Deconstruction of Reference Images

### 2.1 Reference Image 1 (`media_1795506887701_0cb042f9.jpg`)
* **Layout Structure**: 3-screen mobile triptych floating over a warm peach-to-lavender gradient mesh.
* **Key Micro-Components Adapted into GoldenHour AI**:
  1. **Dark Luxury Glass Progress Card (Screen 1)**:
     - Deep obsidian glass surface (`#141014` / `#0F172A`) with subtle 1px specular white top border.
     - Luminous circular progress ring (72%) with neon-lime (`#D4FF00`) stroke and soft volumetric drop shadow.
     - Right-flanked statistical ledger: `Total Task`, `Completed`, `Pending`.
     - *GoldenHour Implementation*: Used on [`S1Landing.tsx`](file:///c:/GoldenHour/src/screens/S1Landing.tsx) for the **72% Golden Hour Survival Efficiency** gauge and [`S14DoctorCaseBoard.tsx`](file:///c:/GoldenHour/src/screens/S14DoctorCaseBoard.tsx) for the 90-second bay reservation hold ring.
  2. **Horizontal Segmented Date & Category Pills (Screen 2)**:
     - Pill track with active state in solid obsidian black (`#121212`) and inactive states in semi-transparent frosted white.
     - *GoldenHour Implementation*: Used in [`S10CommandMap.tsx`](file:///c:/GoldenHour/src/screens/S10CommandMap.tsx) for incident sorting (`Priority` vs `Arrival Time`) and [`S2SOS.tsx`](file:///c:/GoldenHour/src/screens/S2SOS.tsx) for emergency symptom categorization.
  3. **Frosted Modal Form with Priority Pills & Tag Clouds (Screen 3)**:
     - Form container featuring soft rounded text inputs with inset frosted backgrounds.
     - Multi-state pill selector: `Low` (soft mint `#E6F4EA`), `Medium` (warm amber `#FEF3C7`), and `High` (coral red `#FEE2E2`).
     - Dismissible tag pills with `✕` dismiss icons.
     - *GoldenHour Implementation*: Used in [`S2SOS.tsx`](file:///c:/GoldenHour/src/screens/S2SOS.tsx) for reported symptom chips and [`S18ChargeNurseRoomKit.tsx`](file:///c:/GoldenHour/src/screens/S18ChargeNurseRoomKit.tsx) for rapid kit checklist items.

### 2.2 Reference Image 2 (`media_1795506890538_22dea1fe.jpg`)
* **Layout Structure**: 3 floating smartphones showcasing AI features, conversational onboarding, and tone control.
* **Key Micro-Components Adapted into GoldenHour AI**:
  1. **Floating 3D Holographic AI Energy Orb (Screen 3)**:
     - Translucent 3D refractive sphere with internal chromatic dispersion, surrounded by floating frosted glass pill satellites (`Casual Tone`, `Formal Tone`, `Friendly Tone`).
     - *GoldenHour Implementation*: Used in [`S11TriageReview.tsx`](file:///c:/GoldenHour/src/screens/S11TriageReview.tsx) as the **Holographic AI Energy Orb** analyzing vitals trajectories, surrounded by floating ESI rule chips.
  2. **Tactile Stadium Action Rails with Gradient Progress (`Next > > >`)**:
     - Stadium pill container with left solid action button and right gradient progress track.
     - *GoldenHour Implementation*: Used across [`S1Landing.tsx`](file:///c:/GoldenHour/src/screens/S1Landing.tsx), [`S3SceneGuide.tsx`](file:///c:/GoldenHour/src/screens/S3SceneGuide.tsx), and [`S14DoctorCaseBoard.tsx`](file:///c:/GoldenHour/src/screens/S14DoctorCaseBoard.tsx).

---

## 3. Screen Suite 1: Citizen Emergency & Trauma Intake

**Image File Reference**: [`hackathon_3d_assets/goldenhour-ui-triptych-citizen-sos.jpg`](file:///c:/GoldenHour/hackathon_3d_assets/goldenhour-ui-triptych-citizen-sos.jpg)

### Screen 1: S1 Landing Portal (`Seconds Count In Trauma`)
* **Viewport**: Mobile viewport with soft peach ambient glow (`#FFA0B5`).
* **Header**: Clean grotesque typography *"Seconds Count In Trauma"* ($28\text{px}$, bold tracking-tight).
* **Hero Card**: Dark luxury glass card with:
  - Luminous circular progress ring ($120\text{px}$ diameter) in neon chartreuse (`#D4FF00`) displaying **`72% Golden Hour Efficiency`**.
  - Subtitle: *"Pre-Hospital Arrival Acceleration Rate"*.
* **Portal Actions**: Dual stacked frosted stadium pills:
  - Top: `Launch SOS (Citizen Intake)` with pulsating red dot.
  - Bottom: `Doctor & Staff Login` with keyhole icon.
* **Bottom Nav**: Minimal frosted glass bottom navigation bar with active portal indicator.

### Screen 2: S2 One-Tap SOS & 3D Trauma Twin
* **Viewport**: iPhone with Dynamic Island (`38px` pill at top).
* **Header**: Welcome greeting *"Welcome back, Jenifer Pilman"* and headline *"Are you in emergency?"*.
* **SOS Pulsing Beacon**:
  - Triple concentric ripple rings: outer ring at `opacity-20`, middle at `opacity-40`, inner frosted bezel ring with `border-2 border-white/80`.
  - Center button: Radiant red gradient (`#FF3366` to `#E11D48`), $128\text{px}$ circular action button with bold *"SOS TAP ONCE"*.
* **Permanent 3D Crystalline Trauma Twin**:
  - **Zero dropdowns or frame locks**: Full standing anatomical male torso rendered in translucent borosilicate glass.
  - Luminous cervical spine radiating molten amber glow (`#FFA500`).
  - Active cardiac trauma node radiating vivid crimson-orange pulse.
  - **Flanking Stadium Pills**:
    - Left: Floating glass card with dual arterial pressure waveforms ($135/88\text{ mmHg}$).
    - Right: Floating glass card with active in-transit medications ($3\text{ Active}$).
* **Symptom Severity Slider**: Tactile split track with neon-lime thumb bead (`#D4FF00`).
* **Action Rail**: Bottom `<SlideCommit />` slider *"Slide to Dispatch 108 Ambulance"*.

### Screen 3: S3 CPR Scene First-Aid Guide
* **Card Header**: Inverted concave liquid wave arch (`clip-path: ellipse(85% 100% at 50% 100%)`).
* **Hero Visual**: Unframed glowing 3D translucent cardiac heart sculpture radiating concentric volumetric golden-orange soundwave ripples (`#FFA500`).
* **Pacing Telemetry**:
  - Neon-lime metronome bar pulsing at **110 BPM**.
  - Sternum compression depth stadium pill: **`5.2 cm Depth • Adequate Force`**.
* **Action Button**: Stadium pill button with left recessed black arrow button and centered text *"Continue CPR > > >"*.

---

## 4. Screen Suite 2: Command Deck, AI Triage & Doctor Board

**Image File Reference**: [`hackathon_3d_assets/goldenhour-ui-triptych-doctor-command.jpg`](file:///c:/GoldenHour/hackathon_3d_assets/goldenhour-ui-triptych-doctor-command.jpg)

### Screen 1: S11 AI Neural Triage Review
* **Header**: `AI Neural Triage UI` with back button and notification pill.
* **Top Status Badge**: Electric neon-lime stadium pill **`ESI Level 2 Emergent`** flanked by **`GCS 12/15`** Glasgow Coma Scale pill.
* **Hero Visual**: Floating 3D Holographic AI Energy Orb radiating cyan and magenta light rays, merging into a translucent 3D cranial synapse scan with glowing golden axonal pathways.
* **Filter Chips**: Frosted horizontal chip row (`Airway Protocol`, `STEMI Fast-Track`, `CT Angio Reserved`).
* **Bottom Nav**: Minimal black stadium navigation bar.

### Screen 2: S10 Dr+ Ambulance Control Centre
* **Header**: `Ambulance Control Centre` with `6 New Calls • 12 Free Ambulance`.
* **Center Trauma Twin**: Standing crystalline trauma twin (*Matthew Johnson 26yo*) illuminated by studio rim lighting with visible cardiac and cervical injury markers.
* **Dual Arterial Waveforms**: Flanking invasive blood pressure telemetry cards ($135/88\text{ mmHg}$) with dual gold systolic and cyan diastolic waveforms.
* **Choose Ambulance Fleet Cards**: Two large, spacious 3D vehicle selector cards:
  - **Cardiohelp Heli Air Evac**: Warm amber border glow (`#FFA500`), 3D medical helicopter image, and `3 Free` badge.
  - **Cardiohelp Ground ICU**: Radiant rose border glow (`#FF3366`), 3D ambulance vehicle image, and `1 Free` badge.
* **Dispatch Commit Slider**: Centered tactile `<SlideCommit />` track with white drag handle and neon-lime commit state.

### Screen 3: S14 Emergency Physician Case Board
* **Header**: `Emergency Physician Case Board UI • Apollo Trauma Bay 1`.
* **3D Glass Flap Folder**: Translucent borosilicate glass folder for **`Case GH-2026-8812`** with visible cards:
  - Cardiology Discharge (Post-PCI STEMI).
  - Diabetic HbA1c Panel ($7.8\%$).
  - 12-Lead Acute Elevation Strip.
* **3D Jelly Formulations Card**: Wide-format showcase of translucent bicolored gelatin capsules (Metformin, Aspirin, Ticagrelor) with glowing caustic highlights.
* **90-Second Bay Reservation Countdown Ring**: Animated circular SVG progress ring counting down from `01:30` to hold Trauma Bay 1.
* **Action Button**: Stadium pill *"Confirm Bay 1 > > >"*.

---

## 5. Screen Suite 3: Paramedic Telemetry & Good Samaritan AED Mesh

**Image File Reference**: [`hackathon_3d_assets/goldenhour-ui-triptych-paramedic-volunteer.jpg`](file:///c:/GoldenHour/hackathon_3d_assets/goldenhour-ui-triptych-paramedic-volunteer.jpg)

### Screen 1: S4 Live Ambulance GPS Tracker
* **Map Canvas**: Elevated 3D isometric street grid of the Durgam Cheruvu / Jubilee Hills transit corridor.
* **Hero 3D Vehicle**: High-gloss porcelain aerodynamic ambulance gliding across a translucent frosted glass elevated highway with caustic light reflections.
* **Floating Traffic Pill**: Jet-black stadium pill **`15 min Easy Traffic`** with green status dot.
* **Driver Telemetry**: Paramedic photo badge, vehicle ID (`Ambulance 04`), and speed telemetry (`68 km/h`).
* **Action**: Coral-red stadium button *"Emergency Callback Stadium"*.

### Screen 2: S8 Paramedic Live Vitals & Telemetry
* **Survival Clock**: Prominent digital clock in electric lime **`14:22 mins elapsed`**.
* **Voice Dictation Bar**: Multilingual AI audio waveform with green mic indicator and badge **`AI Transcript Active`**.
* **Dual Arterial Blood Pressure**: Real-time waveform canvas showing systolic/diastolic curves and $135/88\text{ mmHg}$.
* **3D Jelly Medications Showcase**: Wide-format unconstrained card showing translucent capsules (Metformin 150mg lozenge, Ibuprofen 400mg amber capsule).
* **Tactile Commit Slider**: Bottom drag slider *"Slide to Confirm Arrival"*.

### Screen 3: S21 Community Volunteer AED Duty Radar
* **Navigation Header**: High-contrast black chip **`240m to Patient`** with white directional arrow.
* **Hero 3D Visual**: Floating crystal glass Automated External Defibrillator (AED) unit with titanium stadium handles hovering above a 3D topographic radar grid.
* **Radar Mesh**: Concentric 500-meter pulse wave rings glowing in neon-lime (`#D4FF00`) with active GPS volunteer beacons.
* **Action Pill**: Wide stadium action button in neon chartreuse **`Pads Armed & En Route >>>`**.

---

## 6. Layout, Spacing & Typography Master Tokens

```css
/* Typography Scale */
--font-heading-hero: 32px / 1.15;   /* Hero headlines, SOS prompt */
--font-heading-lg:   24px / 1.25;   /* Section headers, Screen titles */
--font-heading-md:   18px / 1.35;   /* Card titles, Patient name */
--font-body:         14px / 1.5;    /* Descriptions, Vitals data */
--font-caption:      11px / 1.4;    /* Stadium pill tags, Telemetry */
--font-mono:         12px / 1.2;    /* Timers, Case IDs, Coordinates */

/* Border Radii */
--radius-card:       32px;          /* Master card decks */
--radius-subcard:    20px;          /* Inset telemetry tiles */
--radius-pill:       9999px;        /* Stadium buttons, tags, chips */

/* Shadow & Specular Rims */
--shadow-specular:   inset 0 1.5px 2px rgba(255, 255, 255, 0.95), 0 20px 45px -12px rgba(244, 63, 94, 0.14);
--shadow-floating:   0 12px 32px -8px rgba(0, 0, 0, 0.25);
```

---

*GoldenHour AI UI Visual Specification • Stored in `hackathon_3d_assets/` and root repository for direct hackathon implementation.*
