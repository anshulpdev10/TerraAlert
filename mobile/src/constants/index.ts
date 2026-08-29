/**
 * App Constants
 */

// Risk levels
export const RISK_LEVELS = {
  VERY_LOW: 'Very Low',
  LOW: 'Low',
  MODERATE: 'Moderate',
  HIGH: 'High',
  VERY_HIGH: 'Very High',
  EXTREME: 'Extreme',
} as const;

// Risk level thresholds
export const RISK_THRESHOLDS = {
  VERY_LOW: 0.2,
  LOW: 0.4,
  MODERATE: 0.6,
  HIGH: 0.8,
  VERY_HIGH: 1.0,
};

// Map defaults
export const MAP_DEFAULTS = {
  INITIAL_REGION: {
    latitude: 31.1048,
    longitude: 77.1734,
    latitudeDelta: 3.0,
    longitudeDelta: 3.0,
  },
  HIMACHAL_PRADESH: {
    latitude: 31.1048,
    longitude: 77.1734,
  },
};

// API defaults
export const API_DEFAULTS = {
  DAYS_BACK: 30,
  BUFFER_KM: 5,
  USE_CACHE: true,
  TIMEOUT: 30000,
};

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  RECENT_SEARCHES: '@recent_searches',
  SETTINGS: '@settings',
} as const;

// Screen names
export const SCREENS = {
  // Auth
  SPLASH: 'Splash',
  LOGIN: 'Login',
  REGISTER: 'Register',
  
  // Main tabs
  HOME: 'Home',
  MAP: 'Map',
  DASHBOARD: 'Dashboard',
  PROFILE: 'Profile',
  
  // Screens
  PREDICTION: 'Prediction',
  FORECAST: 'Forecast',
  ALERTS: 'Alerts',
  SETTINGS: 'Settings',
  ABOUT: 'About',
  HELP: 'Help',
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_WITH_TIME: 'MMM DD, YYYY hh:mm A',
  API: 'YYYY-MM-DD',
  ISO: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
} as const;

export default {
  RISK_LEVELS,
  RISK_THRESHOLDS,
  MAP_DEFAULTS,
  API_DEFAULTS,
  STORAGE_KEYS,
  SCREENS,
  DATE_FORMATS,
};
