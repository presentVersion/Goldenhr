import { APP_CONFIG } from './config';

export interface AbhaProfile {
  abhaId: string;
  name: string;
  gender: string;
  yearOfBirth: string;
  source: string;
}

export interface EligibilityResult {
  eligible: boolean;
  scheme: string;
  preAuthStatus: string;
  verifiedAt: string;
  source: string;
}

// 1. AbhaProvider
export const AbhaProvider = {
  lookupByRef: async (nameRef: string): Promise<AbhaProfile | null> => {
    return {
      abhaId: 'ABHA-9821-4412-MOCK',
      name: nameRef || 'Patient (Simulated)',
      gender: 'Male',
      yearOfBirth: '1984',
      source: 'ABHA Registry (mock)',
    };
  },
};

// 2. PmjayEligibilityProvider (F16)
export const PmjayEligibilityProvider = {
  checkEligibility: async (_patientId: string): Promise<EligibilityResult> => {
    return {
      eligible: true,
      scheme: 'AB-PMJAY Golden Card (mock)',
      preAuthStatus: 'Auto-Approved for Emergency Intake',
      verifiedAt: new Date().toISOString(),
      source: 'National Health Authority (mock)',
    };
  },
};

// 3. SmsGatewayProvider (F6 SMS fallback)
export const SmsGatewayProvider = {
  sendSMS: async (phone: string, text: string): Promise<{ success: boolean; messageId: string; source: string }> => {
    return {
      success: true,
      messageId: `msg-${Date.now()}`,
      source: 'SMS Gateway (mock)',
    };
  },
};

// 4. NotificationProvider (F7 Silence alarm escalation, F19 radar)
export const NotificationProvider = {
  dispatchEmergencyAlert: async (title: string, body: string, recipientRole: string): Promise<{ delivered: boolean; source: string }> => {
    return {
      delivered: true,
      source: 'Emergency Dispatcher Push Service (mock)',
    };
  },
};

// 5. SpeechProvider (F33 Indic Speech layer)
export const SpeechProvider = {
  transcribeAudio: async (_audioBlob: Blob, lang: 'en' | 'te' | 'hi'): Promise<{ transcript: string; confidence: number; source: string }> => {
    if (!APP_CONFIG.AI_ENABLED) {
      return {
        transcript: 'Heavy traffic near flyover, patient has severe chest pain and difficulty breathing.',
        confidence: 1.0,
        source: 'Rule-based Audio Ingest (fallback)',
      };
    }
    const sampleByLang = {
      en: 'Motorcycle collided with auto rickshaw. One unconscious male, bleeding from forehead.',
      te: 'ఆటో రిక్షా ఢీకొంది. ఒకరు అపస్మారక స్థితిలో ఉన్నారు, తలకు గాయమైంది.',
      hi: 'ऑटो रिक्शा की टक्कर हुई है। एक व्यक्ति बेहोश है और सिर से खून बह रहा है।',
    };
    return {
      transcript: sampleByLang[lang] || sampleByLang.en,
      confidence: 0.92,
      source: 'Indic Speech v1 (mock)',
    };
  },

  speakText: (text: string, lang: 'en' | 'te' | 'hi') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (lang === 'te') utterance.lang = 'te-IN';
      else if (lang === 'hi') utterance.lang = 'hi-IN';
      else utterance.lang = 'en-IN';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  },
};

// 6. TranslationProvider
export const TranslationProvider = {
  translate: async (text: string, targetLang: 'en' | 'te' | 'hi'): Promise<string> => {
    if (targetLang === 'en') return text;
    if (targetLang === 'te') {
      if (text.includes('Ambulance')) return 'అంబులెన్స్ త్వరలోనే చేరుకుంటుంది';
      if (text.includes('On the way')) return 'మార్గంలో ఉంది';
      return `[తెలుగు] ${text}`;
    }
    if (targetLang === 'hi') {
      if (text.includes('Ambulance')) return 'एम्बुलेंस रास्ते में है';
      if (text.includes('On the way')) return 'रास्ते में है';
      return `[हिंदी] ${text}`;
    }
    return text;
  },
};

// 7. AiProvider for F8, F11, F12, F13, F30, F31, F34, F35, F36, F37
export const AiProvider = {
  // F8: Voice handoff draft
  draftHandoffCard: async (transcript: string) => {
    if (!APP_CONFIG.AI_ENABLED) {
      return {
        bp: '130/85',
        hr: 92,
        spo2: 96,
        gcs: 14,
        symptoms: transcript,
        confidence: 0.75,
        source: 'Standard Form Preset (fallback)',
      };
    }
    return {
      bp: '142/90',
      hr: 104,
      spo2: 93,
      gcs: 12,
      symptoms: 'Blunt thoracic trauma, diaphoresis, altered sensorium',
      confidence: 0.89,
      source: 'Clinical LLM v2 (mock)',
    };
  },
  draftHandoff: async (transcript: string) => AiProvider.draftHandoffCard(transcript),

  // F11: Triage suggestion (ESI rules + model second opinion)
  getTriageSuggestion: (vitals: { bp?: string; hr?: number; spo2?: number; gcs?: number }, answers?: { breathingNormally?: boolean; responsive?: boolean; heavyBleeding?: boolean }) => {
    // ESI Rules primary (Clinical rule engine)
    let ruleLevel = 3;
    if (answers?.responsive === false || (vitals.gcs && vitals.gcs < 9) || (vitals.spo2 && vitals.spo2 < 90)) {
      ruleLevel = 1; // Resuscitation
    } else if (answers?.heavyBleeding || (vitals.hr && vitals.hr > 120) || (vitals.spo2 && vitals.spo2 < 94)) {
      ruleLevel = 2; // Emergent
    }

    if (!APP_CONFIG.AI_ENABLED) {
      return {
        ruleLevel,
        modelLevel: null,
        confidence: 1.0,
        explanation: 'Clinical ESI Decision Rule Matrix',
        source: 'Clinical Protocol v1 (fallback)',
      };
    }

    // Model second opinion (mock and not validated)
    const modelLevel = ruleLevel === 3 ? 2 : ruleLevel;
    return {
      ruleLevel,
      modelLevel,
      confidence: 0.88,
      explanation: modelLevel !== ruleLevel ? 'Model flags early hypoperfusion risk from tachycardia trajectory' : 'Model agrees with ESI Rule assessment',
      source: 'Triage Model v0 (mock)',
    };
  },

  // F12: Prior-report summary
  extractPriorReports: async () => {
    if (!APP_CONFIG.AI_ENABLED) {
      return {
        allergies: ['Penicillin (reported)'],
        conditions: ['Type 2 Diabetes'],
        medicines: ['Metformin 500mg'],
        confidence: 1.0,
        source: 'Patient Record Cache (fallback)',
      };
    }
    return {
      allergies: ['Penicillin (severe anaphylaxis reported 2024)', 'Aspirin (mild rash)'],
      conditions: ['Hypertension (Stage 2)', 'Type 2 Diabetes mellitus'],
      medicines: ['Telmisartan 40mg od', 'Metformin 500mg bd'],
      confidence: 0.86,
      source: 'Extraction LLM v1 (mock)',
    };
  },

  // F13: Kit prediction
  predictKit: (symptoms: string) => {
    const core = ['Trauma primary pack', 'High-flow oxygen mask', '18G IV cannulas × 2', 'Normal saline 500ml'];
    if (!APP_CONFIG.AI_ENABLED) {
      return {
        room: 'Trauma Bay 1',
        coreKit: core,
        optionalItems: [{ name: 'Chest tube thoracostomy tray', aiRank: 1, approved: false }],
        source: 'Standard Trauma Kit Protocol (fallback)',
      };
    }
    return {
      room: 'Trauma Bay 1',
      coreKit: core,
      optionalItems: [
        { name: 'Chest tube thoracostomy tray 28Fr', aiRank: 1, approved: false },
        { name: 'Pelvic binder (medium)', aiRank: 2, approved: false },
        { name: 'Rapid infuser tubing set', aiRank: 3, approved: false },
      ],
      confidence: 0.84,
      source: 'Kit Predictor v0 (mock)',
    };
  },

  // F30: Learned ETA model v0
  predictETA: (distanceKm: number, _hour: number = 14) => {
    const baseMinutes = Math.max(3, Math.round(distanceKm * 2.8));
    if (!APP_CONFIG.AI_ENABLED) {
      return {
        etaMinutes: baseMinutes,
        rangeMin: Math.max(2, baseMinutes - 1),
        rangeMax: baseMinutes + 2,
        confidence: 0.7,
        source: 'Distance / Avg Speed (fallback)',
      };
    }
    return {
      etaMinutes: baseMinutes,
      rangeMin: Math.max(2, baseMinutes - 1),
      rangeMax: baseMinutes + 3,
      confidence: 0.91,
      source: 'ETA model v0 (mock)',
    };
  },

  // F31: Hospital load forecasting
  getLoadForecast: (hospitalId: string) => {
    if (!APP_CONFIG.AI_ENABLED) {
      return {
        predictedArrivalsNext30Min: 2,
        freeBeds: 3,
        status: 'ready',
        source: 'Hospital Live Bed Census (fallback)',
      };
    }
    return {
      predictedArrivalsNext30Min: 3,
      freeBeds: 2,
      status: 'watch',
      source: 'Bayesian Load Forecast v0 (mock)',
    };
  },

  // F34: Deterioration watch
  checkDeterioration: (hr: number, spo2: number) => {
    const isWorsening = (hr > 115 && spo2 < 94) || spo2 < 91;
    return {
      flagged: isWorsening,
      source: APP_CONFIG.AI_ENABLED ? 'Deterioration Signal v0 (mock)' : 'Vitals Threshold Rules (fallback)',
      confidence: isWorsening ? 0.87 : 0.95,
      disclaimer: 'Not a diagnosis. Clinician decides.',
    };
  },

  // F35: Document check
  checkDocument: (fileName: string) => {
    const isBlurry = fileName.toLowerCase().includes('blur') || fileName.toLowerCase().includes('photo');
    return {
      valid: true,
      quality: isBlurry ? ('blurry' as const) : ('high' as const),
      aiFlags: isBlurry ? ['Check: image is blurry'] : [],
      source: APP_CONFIG.AI_ENABLED ? 'Document Quality Vision v0 (mock)' : 'Heuristic File Check (fallback)',
      confidence: 0.93,
    };
  },

  // F36: Access anomaly detection
  detectAccessAnomaly: (accessCount: number, breakGlass: boolean) => {
    const isAnomaly = breakGlass && accessCount > 3;
    return {
      flagged: isAnomaly,
      reason: isAnomaly ? 'Unusual multiple break-glass access outside emergency roster' : null,
      source: APP_CONFIG.AI_ENABLED ? 'Access Anomaly Isolation Forest v0 (mock)' : 'Audit Rule Thresholds (fallback)',
      confidence: 0.94,
    };
  },

  // F37: AI Narrator for Analytics
  generateNarrative: (metrics: { avgHandoverMin: number; stage1Min: number; delaysCount: number }) => {
    if (!APP_CONFIG.AI_ENABLED) {
      return {
        narrative: `During this period, median handover duration was ${metrics.avgHandoverMin} minutes with ${metrics.delaysCount} flagged stage delays.`,
        source: 'Template Aggregator (fallback)',
      };
    }
    return {
      narrative: `Median arrival-to-handover time was ${metrics.avgHandoverMin} min. Trauma triage dispatch demonstrated an 18% turnaround improvement, while desk eligibility approvals accounted for ${metrics.delaysCount} bottleneck episodes during peak afternoon hours.`,
      source: 'Narrator LLM v0 (mock)',
      confidence: 0.90,
    };
  },
};
