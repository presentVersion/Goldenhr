export interface ProtocolStep {
  stepNumber: number;
  title: string;
  body: string;
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
  category?: 'cpr' | 'choking' | 'bleeding' | 'recovery';
  steps: ProtocolStep[];
}

export const PROTOCOLS: Record<string, ProtocolDefinition> = {
  cpr: {
    id: 'cpr',
    emergencyType: 'Cardiac Arrest / Unresponsive',
    title: '4-Step Hands-Only CPR & Defibrillation',
    category: 'cpr',
    steps: [
      {
        stepNumber: 1,
        title: 'Assess & Alert (Check Responsiveness)',
        body: 'Tap the shoulders firmly and shout loudly: "Are you okay?". If there is no response and no normal breathing, immediately call 108 or activate the emergency beacon. Gently perform a head-tilt chin-lift maneuver to clear the airway.',
        image: '/assets/cpr-step-01-assess-alert.jpg',
      },
      {
        stepNumber: 2,
        title: 'Hand Position & Interlock',
        body: 'Position the heel of one hand on the center of the breastbone (lower half of the sternum). Place your other hand on top and interlock your fingers. Lock your elbows straight and position your shoulders directly above your hands at a 90° angle.',
        image: '/assets/cpr-step-02-hand-placement.jpg',
      },
      {
        stepNumber: 3,
        title: 'Continuous Compressions (100–120 BPM)',
        body: 'Push hard and fast down at least 5–6 cm (2 inches). Allow full chest recoil after every compression without leaning on the chest. Maintain the steady 110 BPM metronome rhythm.',
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
        image: '/assets/cpr-step-04-aed-defibrillation.jpg',
      },
    ],
  },
  choking: {
    id: 'choking',
    emergencyType: 'Choking / Foreign Body Airway Obstruction',
    title: 'Choking Relief: Heimlich Maneuver',
    category: 'choking',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify Severe Airway Obstruction',
        body: 'If the person cannot speak, cough forcefully, or breathe and is clutching their throat, immediately ask "Are you choking?" and position yourself directly behind them.',
        image: '/assets/emergency-rescue-heimlich-choking.jpg',
      },
      {
        stepNumber: 2,
        title: 'Fist Placement & Upward J-Thrusts',
        body: 'Make a fist with one hand and place the thumb-side just above the navel, well below the breastbone. Grasp your fist with your other hand and deliver quick, inward and upward abdominal J-thrusts until the obstruction is expelled.',
        image: '/assets/emergency-rescue-heimlich-choking.jpg',
        hasTimer: true,
        timerDurationSeconds: 60,
      },
    ],
  },
  bleeding: {
    id: 'bleeding',
    emergencyType: 'Heavy Bleeding / Arterial Hemorrhage',
    title: 'Severe Bleeding Control & Tourniquet',
    category: 'bleeding',
    steps: [
      {
        stepNumber: 1,
        title: 'Apply Tourniquet or Firm Direct Pressure',
        body: 'For life-threatening extremity bleeding, apply a tactical windlass tourniquet 2–3 inches above the wound (never over a joint). Tighten the windlass rod until the arterial bleeding completely stops, and lock it into the clip.',
        image: '/assets/emergency-rescue-tourniquet-bleeding.jpg',
        hasTimer: true,
        timerDurationSeconds: 180,
      },
      {
        stepNumber: 2,
        title: 'Record Time & Never Loosen',
        body: 'Write the application time clearly on the tourniquet time tab. Keep the patient warm and lying down to prevent trauma shock. Never loosen or remove a tourniquet once applied.',
        image: '/assets/emergency-rescue-tourniquet-bleeding.jpg',
      },
    ],
  },
  unconscious: {
    id: 'unconscious',
    emergencyType: 'Unresponsive but Breathing Normally',
    title: 'Recovery Position & Airway Protection',
    category: 'recovery',
    steps: [
      {
        stepNumber: 1,
        title: 'Verify Normal Breathing',
        body: 'If the patient is unconscious but breathing regularly, roll them onto their side into the recovery position to prevent airway obstruction or aspiration.',
        image: '/assets/emergency-rescue-recovery-position.jpg',
      },
      {
        stepNumber: 2,
        title: 'Stabilize Body & Angle Mouth Downward',
        body: 'Bend the upper leg at a 90° angle to anchor the body. Place the upper hand under the tilted cheek to maintain head alignment and ensure fluids drain freely from the mouth.',
        image: '/assets/emergency-rescue-recovery-position.jpg',
      },
    ],
  },
  chest_pain: {
    id: 'chest_pain',
    emergencyType: 'Severe Chest Pain',
    title: 'Suspected Heart Attack Protocol',
    steps: [
      {
        stepNumber: 1,
        title: 'Rest in a Comfortable Sitting Position',
        body: 'Help the person sit on the floor or a sturdy chair with knees bent and back supported. Do not let them walk.',
      },
      {
        stepNumber: 2,
        title: 'Loosen Tight Clothing',
        body: 'Unbutton collars, belts, or tight clothing around the neck, chest, and waist to ease breathing.',
      },
      {
        stepNumber: 3,
        title: 'Keep Patient Calm',
        body: 'Encourage slow, deep breaths. Reassure them that emergency help is en route.',
      },
      {
        stepNumber: 4,
        title: 'Do Not Give Food or Drink',
        body: 'Do not offer water or snacks. If they have doctor-prescribed Sorbitrate/Nitroglycerin, allow them to take it.',
      },
      {
        stepNumber: 5,
        title: 'Be Ready for CPR',
        body: 'If the person becomes unresponsive and stops breathing normally, switch to the CPR protocol immediately.',
      },
    ],
  },
  accident: {
    id: 'accident',
    emergencyType: 'Road Traffic Accident',
    title: 'Accident Trauma Stabilization',
    steps: [
      {
        stepNumber: 1,
        title: 'Secure the Crash Site',
        body: 'Turn on vehicle hazard lights and signal oncoming traffic. Do not put yourself in danger on the roadway.',
      },
      {
        stepNumber: 2,
        title: 'Do Not Move the Spine or Neck',
        body: 'Unless there is immediate danger of fire or explosion, do not move the patient. Keep neck and spine aligned.',
      },
      {
        stepNumber: 3,
        title: 'Control Major External Bleeding',
        body: 'Apply clean direct pressure to any bleeding wounds. Avoid moving fractured limbs.',
        hasTimer: true,
        timerDurationSeconds: 120,
      },
      {
        stepNumber: 4,
        title: 'Do Not Remove Helmets Forcefully',
        body: 'Keep motorcycle helmets in place unless airway is fully obstructed, to protect the cervical spine.',
      },
      {
        stepNumber: 5,
        title: 'Await Emergency Responders',
        body: 'Keep patient warm and talk to them continuously to assess consciousness level.',
      },
    ],
  },
};
