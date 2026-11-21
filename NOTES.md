# GoldenHour AI — Build Notes & Verification Report (MVP v3)

## 1. Visual & Aesthetic Architecture Overhaul
- **Hero Ambient Particle Canvas (ReactBits-Inspired):** Dedicated interactive `<canvas>` rendering floating cyan/teal node particles connected by dynamic constellation lines over an emergency telemetry grid.
- **Iridescent Typography:** "Golden hour, coordinated." rendered with radiant text gradient shimmer transitioning from deep midnight navy to luminous cyan/teal.
- **3D Tactile SOS Button:** Precision multi-layer emergency dome with glossy specular highlight, concentric animated radar pulse rings (`animate-radar-1`, `animate-radar-2`, `animate-radar-3`), deep radial glow, spring-scale press physics, and cardiac ECG waveform caption.
- **Glassmorphic Surface Design:** Multi-layered frosted glass panels (`backdrop-filter: blur(16px)`), specular inner bevels, fine borders, and elevated shadows.
- **Command Deck Theme (S10, S14, S17, S18, S24):** Deep space cyber-medical console aesthetic (`#070E1E` to `#0B1A36`), illuminated cyan and crimson telemetry indicators, custom cartography, and HUD badges.
- **Demo Switcher HUD:** Floating, collapsible Glassmorphic HUD at bottom-right allowing one-click instantaneous review of all 25 screens (S1–S25), live role-state transitions, and the `AI_ENABLED` mock toggle.

## 2. Icon Map Verification & Fallbacks (Section 6)
- **Emergency / SOS:** `Siren` (verified, in bundle)
- **Ambulance:** `Ambulance` (verified, in bundle)
- **Hospital:** `Hospital` with `Building2` alias (verified, in bundle)
- **Vitals:** `HeartPulse` (verified, in bundle)
- **Triage / Severity:** `CircleOff` (unconscious), `HeartCrack` (chest pain), `CarFront` (accident), `Wind` (breathing)
- **Scene Guide Metronome:** `Activity` rhythm pulse used as specified where `Metronome` is not present in standard Lucide-react
- **Fast-Track Pass:** `Ticket` & `DoorOpen` / `DoorClosed`
- **Case Capsule & QR:** `QrCode` and `ScanLine`
- **Break-Glass Access:** `KeyRound`
- **AI Sparkle Badge:** `Sparkles` exclusively for AI outputs
- **Audit Anomaly:** `ShieldAlert`

## 3. Library & Environment Fallbacks (Section 2)
- **Rollup Native Binary / AppLocker Policy:** On Windows host environment with Application Control blocking unsigned `.node` dynamic libraries, `@rollup/wasm-node` is configured as pure WebAssembly fallback for PWA Workbox compilation, allowing `npm run build` to succeed with 0 errors.

## 4. Privacy, Data Safety & Non-Negotiable Rules
- **No Aadhaar Numbers:** Strict prohibition enforced across all forms (S2, S5, S6, S7, S12, S20, S25).
- **Simulated Data:** "SIMULATED DATA" pill appears in the persistent header on all staff screens (S6-S24) and demo banner on S1.
- **Mock Interfaces:** All external providers (`AbhaProvider`, `PmjayEligibilityProvider`, `SmsGatewayProvider`, `NotificationProvider`, `AiProvider`, `SpeechProvider`, `TranslationProvider`) are mocks labeled "(mock)".
- **Clinical Safety Disclaimer:** Full-width "Decision support, not a medical record. Clinician confirmation required." banner rendered on S8, S9, S11, S16.
- **AI Flag Fallback:** All AI suggestions provide deterministic rule-based fallbacks when `APP_CONFIG.AI_ENABLED = false`.
- **Zero Global Navigation in Production:** Screens transition strictly by case state and role per Section 8 journeys.
