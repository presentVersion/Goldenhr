export interface ProtocolStep {
  stepNumber: number;
  title: string;
  body: string;
  donts?: string;
  visualHint?: string;
  image?: string;
  hasTimer?: boolean;
  timerDurationSeconds?: number;
  hasMetronome?: boolean;
  metronomeBpm?: number;
}

export interface ProtocolDefinition {
  id: string;
  emergencyType: string;
  title: string;
  shortLabel: string;
  category?: 'cpr' | 'choking' | 'bleeding' | 'recovery' | 'burn' | 'seizure' | 'stroke' | 'chest_pain' | 'fracture' | 'snakebite' | 'heatstroke' | 'drowning' | 'poisoning' | 'accident';
  steps: ProtocolStep[];
}

export const PROTOCOLS: Record<string, ProtocolDefinition> = {
  cpr: {
    id: 'cpr',
    emergencyType: 'Cardiac Arrest / Unresponsive',
    title: '4-Step Hands-Only CPR & Defibrillation',
    shortLabel: 'CPR (4 Steps)',
    category: 'cpr',
    steps: [
      {
        stepNumber: 1,
        title: 'Assess & Alert (Check Responsiveness)',
        body: 'Tap the shoulders firmly and shout loudly: "Are you okay?". If there is no response and no normal breathing, immediately call 108 or activate the emergency beacon. Gently perform a head-tilt chin-lift maneuver to clear the airway.',
        donts: "Don't spend more than 10 seconds checking for a pulse if untrained.",
        visualHint: 'Supine patient, head-tilt chin-lift airway check',
        image: '/assets/cpr-step-01-assess-alert.jpg',
      },
      {
        stepNumber: 2,
        title: 'Hand Position & Interlock',
        body: 'Position the heel of one hand on the center of the breastbone (lower half of the sternum). Place your other hand on top and interlock your fingers. Lock your elbows straight and position your shoulders directly above your hands at a 90° angle.',
        donts: "Don't press on the ribs or the tip of the breastbone (xiphoid process).",
        visualHint: 'Heel of palm on lower sternum, fingers interlocked, arms 90°',
        image: '/assets/cpr-step-02-hand-placement.jpg',
      },
      {
        stepNumber: 3,
        title: 'Continuous Compressions (100–120 BPM)',
        body: 'Push hard and fast down at least 5–6 cm (2 inches). Allow full chest recoil after every compression without leaning on the chest. Maintain the steady 110 BPM metronome rhythm.',
        donts: "Don't interrupt compressions for more than 10 seconds.",
        visualHint: 'Vertical downward compression 5–6 cm, 110 BPM rhythm ripples',
        image: '/assets/cpr-step-03-chest-compressions.jpg',
        hasMetronome: true,
        metronomeBpm: 110,
        hasTimer: true,
        timerDurationSeconds: 120, // 2-minute cycle
      },
      {
        stepNumber: 4,
        title: 'AED Pad Placement & Shock',
        body: 'As soon as an AED is available, turn it on. Attach Pad 1 to upper right chest below the clavicle and Pad 2 to lower left ribcage. Stand clear while the AED analyzes cardiac rhythm, and deliver shock if advised before resuming CPR.',
        donts: "Don't touch the patient while the AED is analyzing or shocking.",
        visualHint: 'Anterolateral pad placement (upper right, lower left)',
        image: '/assets/cpr-step-04-aed-defibrillation.jpg',
      },
    ],
  },
  unconscious: {
    id: 'unconscious',
    emergencyType: 'Unresponsive but Breathing Normally',
    title: 'Recovery Position & Airway Protection',
    shortLabel: 'Recovery Position',
    category: 'recovery',
    steps: [
      {
        stepNumber: 1,
        title: 'Place in Stable Recovery Position',
        body: 'Place the person in the recovery position: roll them gently onto their side, tilt head back gently to open airway, bend top leg at 90° to prevent rolling forward. Watch breathing continuously until help arrives.',
        donts: "Don't give food or drink. Don't leave them unattended on their back.",
        visualHint: 'Person on their side, one leg bent 90°, head tilted back',
        image: '/assets/emergency-rescue-recovery-position.jpg',
      },
      {
        stepNumber: 2,
        title: 'Airway Angle & Continuous Check',
        body: 'Ensure mouth is angled slightly downward so saliva or fluids drain without choking. Check normal chest excursion every minute.',
        donts: "Don't place a pillow under the head if it flexes the neck forward.",
        visualHint: 'Mouth angled downward to drain fluids, breathing verified',
        image: '/assets/emergency-rescue-recovery-position.jpg',
      },
    ],
  },
  burn: {
    id: 'burn',
    emergencyType: 'Thermal / Chemical Burn',
    title: 'Burn First Aid: Cool Water & Cover',
    shortLabel: 'Burn Care',
    category: 'burn',
    steps: [
      {
        stepNumber: 1,
        title: 'Cool with Cool Running Water for 20 Minutes',
        body: 'Cool the burn with cool, clean running tap water for at least 20 minutes continuously. Remove rings, watches, and tight jewellery immediately before tissue swelling begins.',
        donts: "Don't apply ice, ice water, butter, toothpaste, or oil. Don't burst blisters.",
        visualHint: 'Hand or affected limb under running cool tap water for 20 mins',
        image: '/assets/emergency-rescue-tourniquet-bleeding.jpg',
        hasTimer: true,
        timerDurationSeconds: 1200, // 20 minutes
      },
      {
        stepNumber: 2,
        title: 'Cover Loosely with Clean Cling Film',
        body: 'Cover the cooled burn loosely with clean kitchen cling film (wrap in flat layers, not circular tension) or a clean, non-fluffy cloth to protect nerve endings and prevent infection.',
        donts: "Don't wrap tightly. Don't pull off clothing stuck to the burned skin.",
        visualHint: 'Burn covered loosely with clean flat layer of cling film',
        image: '/assets/emergency-rescue-tourniquet-bleeding.jpg',
      },
    ],
  },
  seizure: {
    id: 'seizure',
    emergencyType: 'Active Seizure / Convulsion',
    title: 'Seizure First Aid: Time & Cushion Head',
    shortLabel: 'Seizure Protocol',
    category: 'seizure',
    steps: [
      {
        stepNumber: 1,
        title: 'Time the Seizure & Cushion Head',
        body: 'Time the seizure from the exact moment it starts. Move hard or sharp objects away. Place a folded jacket or soft cushion under their head to protect from impact trauma.',
        donts: "Don't hold them down or restrain them. Don't put anything in their mouth.",
        visualHint: 'Head cushioned with soft item, hard furniture cleared away',
        image: '/assets/cpr-step-01-assess-alert.jpg',
        hasTimer: true,
        timerDurationSeconds: 300, // 5 min warning threshold
      },
      {
        stepNumber: 2,
        title: 'Post-Seizure Recovery Position',
        body: 'Once convulsions stop, gently turn them onto their side into the recovery position to keep airway clear. Stay with them and reassure them calmly as they regain awareness.',
        donts: "Don't offer food, water, or medication until fully awake and alert.",
        visualHint: 'Turned into lateral recovery position, reassuring calm presence',
        image: '/assets/emergency-rescue-recovery-position.jpg',
      },
    ],
  },
  stroke: {
    id: 'stroke',
    emergencyType: 'Suspected Acute Stroke',
    title: 'Stroke Identification: FAST Protocol',
    shortLabel: 'Stroke (FAST)',
    category: 'stroke',
    steps: [
      {
        stepNumber: 1,
        title: 'Check FAST Signs Immediately',
        body: 'F (Face Drooping): Ask them to smile—does one side droop? A (Arm Weakness): Ask to raise both arms—does one drift downward? S (Speech Difficulty): Ask to repeat a simple sentence—is speech slurred or strange? T (Time to Call): If ANY sign is present, call 108 immediately.',
        donts: "Don't give them food, drink, or medicine (including aspirin).",
        visualHint: 'Four labelled signs: Face droop, Arm drift, Slurred speech, Time to call',
        image: '/assets/mivo-cranial-neural-3d.jpg',
      },
      {
        stepNumber: 2,
        title: 'Note Exact Time & Position',
        body: 'Note the exact time symptoms were first noticed (critical for thrombolysis treatment within the 4.5-hour golden window). Keep patient calm and resting with head and shoulders slightly elevated.',
        donts: "Don't let the patient sleep or delay calling an ambulance.",
        visualHint: 'Timestamp documented, patient resting with head elevated',
        image: '/assets/mivo-cranial-neural-3d.jpg',
      },
    ],
  },
  chest_pain: {
    id: 'chest_pain',
    emergencyType: 'Severe Chest Pain / Suspected STEMI',
    title: 'Chest Pain & Heart Attack Protocol',
    shortLabel: 'Chest Pain',
    category: 'chest_pain',
    steps: [
      {
        stepNumber: 1,
        title: 'Sit Upright, Loosen Clothing & Call 108',
        body: 'Keep the person sitting upright in a comfortable position (W-position on floor or chair with knees bent). Loosen tight clothing around neck and chest. Call emergency services immediately.',
        donts: "Don't give aspirin or any other medicine unless the dispatcher or doctor explicitly tells you to.",
        visualHint: 'Person sitting upright and calm, loose clothing, emergency call active',
        image: '/assets/mivo-cardiac-cpr-3d.jpg',
      },
      {
        stepNumber: 2,
        title: 'Continuous Monitoring & CPR Readiness',
        body: 'Reassure the person and encourage slow, calm breathing. If they collapse, become unresponsive, and stop breathing normally, begin Hands-Only CPR compressions immediately.',
        donts: "Don't let them walk around or exert themselves.",
        visualHint: 'Monitoring consciousness, bystander ready for chest compressions',
        image: '/assets/cpr-step-03-chest-compressions.jpg',
      },
    ],
  },
  fracture: {
    id: 'fracture',
    emergencyType: 'Fracture / Suspected Spine Trauma',
    title: 'Fracture & Spine Injury Stabilization',
    shortLabel: 'Fracture / Spine',
    category: 'fracture',
    steps: [
      {
        stepNumber: 1,
        title: 'Support Injured Part Where It Lies',
        body: 'Support the injured limb or spine in the exact position it was found using your hands, folded towels, or clothing. Keep the person completely still and calm.',
        donts: "Don't straighten, force, or realign an injured limb. Don't move the neck or back unless the scene is dangerous.",
        visualHint: 'Limb supported by two hands in position found, spine immobilized',
        image: '/assets/mivo-anatomical-scan.jpg',
      },
      {
        stepNumber: 2,
        title: 'Splint Only If Safe & Necessary',
        body: 'Apply a padded splint above and below the injured joint only if you are trained and the patient must be moved. Check circulation (fingers/toes are warm and pink).',
        donts: "Don't tie bandages directly over the fracture or wound site.",
        visualHint: 'Padded support above and below fracture joint, circulation checked',
        image: '/assets/mivo-anatomical-scan.jpg',
      },
    ],
  },
  snakebite: {
    id: 'snakebite',
    emergencyType: 'Snakebite Envenomation (India Protocol)',
    title: 'Snakebite Emergency (Keep Still & Hospital Transit)',
    shortLabel: 'Snakebite (India)',
    category: 'snakebite',
    steps: [
      {
        stepNumber: 1,
        title: 'Keep Person Calm, Still & Immobilized',
        body: 'Keep the person completely calm and physically still—movement accelerates venom spread. Keep the bitten limb at heart level or slightly below. Remove rings, bangles, and tight items immediately before swelling begins.',
        donts: "Don't cut the wound, suck the venom out, or apply a tourniquet. Don't use ice, chemicals, or herbal pastes.",
        visualHint: 'Calm person resting, limb supported at heart level, jewellery removed',
        image: '/assets/mivo-ambulance-transit-3d.jpg',
      },
      {
        stepNumber: 2,
        title: 'Rapid Hospital Transit for Anti-Snake Venom (ASV)',
        body: 'Transport the patient to the nearest hospital with Anti-Snake Venom (ASV) as quickly as possible. Keep limb splinted and immobilized during transit. If possible, note snake color/shape without capturing it.',
        donts: "Don't waste critical time trying to catch or kill the snake.",
        visualHint: 'Immobilized patient in rapid ambulance transit to hospital ASV bay',
        image: '/assets/mivo-ambulance-transit-3d.jpg',
      },
    ],
  },
  heatstroke: {
    id: 'heatstroke',
    emergencyType: 'Severe Heatstroke / Hyperthermia',
    title: 'Heatstroke Emergency: Move to Shade & Cool',
    shortLabel: 'Heatstroke Care',
    category: 'heatstroke',
    steps: [
      {
        stepNumber: 1,
        title: 'Move into Shade & Cool Actively',
        body: 'Move the person immediately into cool shade or air conditioning. Cool them with water (spray or sponge with tap water) and vigorous fanning. Call emergency services if they are confused, vomiting, or unresponsive.',
        donts: "Don't give them iced drinks, alcohol, or fever-reducing medicine (paracetamol won't help heatstroke).",
        visualHint: 'Person in shade, cool water sponging and fanning active',
        image: '/assets/cpr-step-01-assess-alert.jpg',
        hasTimer: true,
        timerDurationSeconds: 600, // 10 minutes active cooling
      },
      {
        stepNumber: 2,
        title: 'Cold Packs on High-Flow Vessels',
        body: 'Place cool, wet cloths or ice packs wrapped in towels under the armpits, on the groin, and around the neck to cool high-flow blood vessels. Rehydrate only if fully conscious.',
        donts: "Don't force fluids if the person is drowsy, confused, or vomiting.",
        visualHint: 'Cool packs on neck, armpits, and groin, consciousness monitored',
        image: '/assets/cpr-step-01-assess-alert.jpg',
      },
    ],
  },
  drowning: {
    id: 'drowning',
    emergencyType: 'Submersion / Drowning Incident',
    title: 'Drowning Rescue: Safe Retrieval & CPR',
    shortLabel: 'Drowning Rescue',
    category: 'drowning',
    steps: [
      {
        stepNumber: 1,
        title: 'Safe Retrieval & Immediate Airway Check',
        body: 'Get the person out of the water safely without endangering yourself. Place them on their back on firm ground. Check for breathing for no more than 10 seconds.',
        donts: "Don't do abdominal thrusts (Heimlich). Don't try to drain water from the lungs—focus on rescue breaths and CPR.",
        visualHint: 'Person resting safely on dry bank, airway opened',
        image: '/assets/cpr-step-01-assess-alert.jpg',
      },
      {
        stepNumber: 2,
        title: 'Initial Rescue Breaths & CPR Compressions',
        body: 'If not breathing, immediately give 5 initial rescue breaths (pinch nose, seal mouth, blow until chest rises), then immediately begin cycles of 30 chest compressions followed by 2 breaths. Keep compressing until EMS arrives.',
        donts: "Don't delay CPR to dry the person or clear swallowed water.",
        visualHint: '5 initial rescue breaths followed by 30 chest compressions',
        image: '/assets/cpr-step-03-chest-compressions.jpg',
        hasMetronome: true,
        metronomeBpm: 110,
        hasTimer: true,
        timerDurationSeconds: 120,
      },
    ],
  },
  poisoning: {
    id: 'poisoning',
    emergencyType: 'Toxic Ingestion / Chemical Poisoning',
    title: 'Poisoning Emergency: Call Helpline & Retain Sample',
    shortLabel: 'Poisoning Care',
    category: 'poisoning',
    steps: [
      {
        stepNumber: 1,
        title: 'Call Poison Helpline (1800-116-117) or 108',
        body: 'Call the National Poison Information Centre (1800-116-117) or 108 emergency dispatch immediately. Keep the exact container, packaging, plant sample, or medicine bottle to show responders.',
        donts: "Don't make the person vomit unless the poison helpline explicitly advises it. Don't give raw eggs, salt water, or milk.",
        visualHint: 'Chemical/medication container preserved, call helpline with product details',
        image: '/assets/mivo-jelly-medications.jpg',
      },
      {
        stepNumber: 2,
        title: 'Position & Airway Care',
        body: 'If the person is breathing but drowsy or unconscious, place them in the recovery position on their side. If chemical is on skin or eyes, flush with running tap water for 15 minutes.',
        donts: "Don't wait for symptoms to develop before calling the poison helpline.",
        visualHint: 'Patient in recovery position on side, container secured for doctors',
        image: '/assets/emergency-rescue-recovery-position.jpg',
      },
    ],
  },
  bleeding: {
    id: 'bleeding',
    emergencyType: 'Heavy Bleeding / Arterial Hemorrhage',
    title: 'Severe Bleeding Control & Tourniquet',
    shortLabel: 'Severe Bleeding',
    category: 'bleeding',
    steps: [
      {
        stepNumber: 1,
        title: 'Apply Tourniquet or Firm Direct Pressure',
        body: 'For life-threatening extremity bleeding, apply a tactical windlass tourniquet 2–3 inches above the wound (never over a joint). Tighten the windlass rod until arterial bleeding completely stops, and lock it into the clip.',
        donts: "Don't apply tourniquet over a joint. Don't loosen it once tightened.",
        visualHint: 'Tactile windlass tourniquet 2–3 inches above wound, direct pressure',
        image: '/assets/emergency-rescue-tourniquet-bleeding.jpg',
        hasTimer: true,
        timerDurationSeconds: 180,
      },
      {
        stepNumber: 2,
        title: 'Record Time & Never Loosen',
        body: 'Write the application time clearly on the tourniquet time tab. Keep the patient warm and lying down to prevent trauma shock. Never loosen or remove a tourniquet once applied.',
        donts: "Don't cover the tourniquet with blankets—keep it clearly visible for ER doctors.",
        visualHint: 'Application time recorded, limb elevated, patient warm',
        image: '/assets/emergency-rescue-tourniquet-bleeding.jpg',
      },
    ],
  },
  choking: {
    id: 'choking',
    emergencyType: 'Choking / Foreign Body Airway Obstruction',
    title: 'Choking Relief: Heimlich Maneuver',
    shortLabel: 'Choking (Heimlich)',
    category: 'choking',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify Severe Airway Obstruction',
        body: 'If the person cannot speak, cough forcefully, or breathe and is clutching their throat, immediately ask "Are you choking?" and position yourself directly behind them.',
        donts: "Don't slap the back if the person can cough forcefully on their own.",
        visualHint: 'Rescuer positioned behind standing conscious patient, hands ready',
        image: '/assets/emergency-rescue-heimlich-choking.jpg',
      },
      {
        stepNumber: 2,
        title: 'Fist Placement & Upward J-Thrusts',
        body: 'Make a fist with one hand and place thumb-side just above the navel, well below breastbone. Grasp fist with other hand and deliver quick, inward and upward abdominal J-thrusts until obstruction is expelled.',
        donts: "Don't squeeze the ribcage or press on the xiphoid process.",
        visualHint: 'Inward and upward J-thrust motion creating sudden thoracic airflow',
        image: '/assets/emergency-rescue-heimlich-choking.jpg',
        hasTimer: true,
        timerDurationSeconds: 60,
      },
    ],
  },
  accident: {
    id: 'accident',
    emergencyType: 'Road Traffic Accident / Multiple Trauma',
    title: 'Accident Trauma Stabilization',
    shortLabel: 'Road Accident',
    category: 'accident',
    steps: [
      {
        stepNumber: 1,
        title: 'Secure the Crash Site',
        body: 'Turn on vehicle hazard lights and signal oncoming traffic. Do not put yourself in danger on the roadway.',
        donts: "Don't enter oncoming traffic or approach vehicles with fire/fuel risk without caution.",
        visualHint: 'Hazard lights on, safety perimeter secured, scene evaluated',
        image: '/assets/mivo-ambulance-transit-3d.jpg',
      },
      {
        stepNumber: 2,
        title: 'Do Not Move Spine or Neck',
        body: 'Unless there is immediate danger of fire or explosion, do not move the patient. Keep neck and spine in neutral alignment.',
        donts: "Don't straighten the spine or move patient unless immediate fire or submersion hazard.",
        visualHint: 'Spine and neck immobilized where found',
        image: '/assets/mivo-anatomical-scan.jpg',
      },
      {
        stepNumber: 3,
        title: 'Control Major External Bleeding',
        body: 'Apply clean direct pressure to any bleeding wounds. Avoid moving fractured limbs.',
        donts: "Don't remove deeply embedded objects or loosen pressure once applied.",
        visualHint: 'Direct pressure on bleeding wound, limbs kept still',
        image: '/assets/emergency-rescue-tourniquet-bleeding.jpg',
        hasTimer: true,
        timerDurationSeconds: 120,
      },
      {
        stepNumber: 4,
        title: 'Do Not Remove Helmets Forcefully',
        body: 'Keep motorcycle helmets in place unless airway is fully obstructed, to protect the cervical spine.',
        donts: "Don't twist or pull motorcycle helmets off single-handedly.",
        visualHint: 'Helmet stabilized in neutral alignment',
        image: '/assets/mivo-cranial-neural-3d.jpg',
      },
    ],
  },
};
