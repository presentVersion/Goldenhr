/**
 * F6 Case Capsule Implementation
 * HMAC-signed JSON as QR. SMS format GH|<caseId>|<severity>|<lat,lng>|<vitals>, max 160 characters.
 */

export interface CaseCapsuleData {
  caseId: string;
  severity: string;
  lat: number;
  lng: number;
  vitals: string;
  timestamp: string;
  signature: string;
}

// Simple signature generator for simulated signing (simulates HMAC-SHA256)
export const signCaseData = (caseId: string, vitals: string): string => {
  let hash = 0;
  const str = `${caseId}|${vitals}|GH_SECRET_KEY_2026`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `SIG_${Math.abs(hash).toString(16).toUpperCase()}`;
};

export const generateCaseCapsule = (
  caseId: string,
  severity: string,
  lat: number,
  lng: number,
  vitals: { bp?: string; hr?: number; spo2?: number; gcs?: number }
): { jsonString: string; smsString: string; signature: string } => {
  const vitalsStr = `BP:${vitals.bp || '120/80'},HR:${vitals.hr || 80},S:${vitals.spo2 || 98},G:${vitals.gcs || 15}`;
  const signature = signCaseData(caseId, vitalsStr);

  const payload: CaseCapsuleData = {
    caseId,
    severity,
    lat: Number(lat.toFixed(4)),
    lng: Number(lng.toFixed(4)),
    vitals: vitalsStr,
    timestamp: new Date().toISOString(),
    signature,
  };

  const jsonString = JSON.stringify(payload);
  // SMS format GH|<caseId>|<severity>|<lat,lng>|<vitals> <= 160 chars
  const smsString = `GH|${caseId}|${severity}|${lat.toFixed(4)},${lng.toFixed(4)}|${vitalsStr}|${signature}`;

  return {
    jsonString,
    smsString: smsString.slice(0, 160),
    signature,
  };
};

export const verifyCaseCapsule = (payloadStr: string): { valid: boolean; data?: Partial<CaseCapsuleData> } => {
  try {
    if (payloadStr.startsWith('GH|')) {
      const parts = payloadStr.split('|');
      if (parts.length >= 6) {
        const [, caseId, severity, coords, vitals, sig] = parts;
        const [latStr, lngStr] = coords.split(',');
        const expectedSig = signCaseData(caseId, vitals);
        if (sig === expectedSig) {
          return {
            valid: true,
            data: {
              caseId,
              severity,
              lat: parseFloat(latStr),
              lng: parseFloat(lngStr),
              vitals,
              signature: sig,
            },
          };
        }
      }
      return { valid: false };
    }

    const parsed = JSON.parse(payloadStr) as CaseCapsuleData;
    const expectedSig = signCaseData(parsed.caseId, parsed.vitals);
    if (parsed.signature === expectedSig) {
      return { valid: true, data: parsed };
    }
    return { valid: false };
  } catch {
    return { valid: false };
  }
};
