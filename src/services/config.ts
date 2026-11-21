export const APP_CONFIG = {
  AI_ENABLED: true,
  SIMULATED: true,
  DEFAULT_LANG: 'en' as 'en' | 'te' | 'hi',
  APP_VERSION: 'v3.0.0-mvp',
  API_URL: '(mock-local)',
};

export const setAiEnabled = (enabled: boolean) => {
  APP_CONFIG.AI_ENABLED = enabled;
};
