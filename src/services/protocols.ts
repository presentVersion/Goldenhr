export interface ProtocolStep {
  stepNumber: number;
  title: string;
  body: string;
  hasTimer?: boolean;
  timerDurationSeconds?: number;
  hasMetronome?: boolean;
  metronomeBpm?: number;
}

export interface ProtocolDefinition {
  id: string;
  emergencyType: string;
  title: string;
  steps: ProtocolStep[];
}

export const PROTOCOLS: Record<string, ProtocolDefinition> = {
  bleeding: {
    id: 'bleeding',
    emergencyType: 'Heavy Bleeding',
    title: 'Severe Bleeding Control',
    steps: [
      {
        stepNumber: 1,
        title: 'Ensure Scene Safety',
        body: 'Check that the area is safe for you and the patient. Wear protective gloves if available.',
      },
      {
        stepNumber: 2,
        title: 'Apply Continuous Direct Pressure',
        body: 'Place a clean cloth, sterile gauze, or clothing directly over the wound. Press down firmly with both hands.',
        hasTimer: true,
        timerDurationSeconds: 180, // 3 minutes firm continuous pressure
      },
      {
        stepNumber: 3,
        title: 'Maintain Pressure Without Peeking',
        body: 'Do not lift the cloth to check bleeding. If blood soaks through, place another layer directly on top and continue pressing.',
      },
      {
        stepNumber: 4,
        title: 'Position the Patient',
        body: 'Keep the patient lying down flat and calm to prevent shock. Keep them warm with a blanket or jacket.',
      },
      {
        stepNumber: 5,
        title: 'Monitor Breathing',
        body: 'Continue direct pressure until the ambulance crew arrives and takes over. Do not use unapproved pressure-point tourniquets.',
      },
    ],
  },
  unconscious: {
    id: 'unconscious',
    emergencyType: 'Unresponsive / Unconscious',
    title: 'Unconscious Patient Care',
    steps: [
      {
        stepNumber: 1,
        title: 'Check Responsiveness',
        body: 'Tap the shoulders firmly and shout loudly: "Are you okay?". If no response, prepare for recovery position.',
      },
      {
        stepNumber: 2,
        title: 'Open the Airway',
        body: 'Gently tilt the head back and lift the chin. Look and feel for normal breathing for 10 seconds.',
      },
      {
        stepNumber: 3,
        title: 'Place in Recovery Position',
        body: 'Roll the patient gently onto their side. Bend their top leg at a right angle to prevent them rolling forward.',
      },
      {
        stepNumber: 4,
        title: 'Tilt Head to Clear Airway',
        body: 'Ensure mouth is angled slightly downward so vomit or fluid can drain safely without choking.',
      },
      {
        stepNumber: 5,
        title: 'Monitor Continuously',
        body: 'Keep an eye on regular breathing until Ambulance 04 reaches your location.',
      },
    ],
  },
  cpr: {
    id: 'cpr',
    emergencyType: 'Cardiac Arrest / Not Breathing',
    title: 'Hands-Only CPR Protocol',
    steps: [
      {
        stepNumber: 1,
        title: 'Verify No Normal Breathing',
        body: 'If the person is unresponsive and not breathing or only gasping, immediately begin chest compressions.',
      },
      {
        stepNumber: 2,
        title: 'Position Your Hands',
        body: 'Place the heel of one hand in the center of the chest. Place your other hand on top and interlock fingers.',
      },
      {
        stepNumber: 3,
        title: 'Push Hard and Fast at 110 BPM',
        body: 'Push straight down at least 5 cm (2 inches). Allow full chest recoil between compressions. Follow the metronome rhythm.',
        hasMetronome: true,
        metronomeBpm: 110,
        hasTimer: true,
        timerDurationSeconds: 120, // 2-minute cycle
      },
      {
        stepNumber: 4,
        title: 'Do Not Stop Compressions',
        body: 'Continue chest compressions without pausing. If another bystander is nearby, switch every 2 minutes without delaying.',
      },
      {
        stepNumber: 5,
        title: 'Prepare for Crew Arrival',
        body: 'Keep compressing until the ambulance crew arrives with the defibrillator (AED) and instructs you to stop.',
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
