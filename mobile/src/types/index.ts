/**
 * TypeScript Type Definitions
 */

// User types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

// Location types
export interface Location {
  lat: number;
  lon: number;
  name?: string;
}

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

// Prediction types
export interface Prediction {
  score: number;
  level: string;
  confidence: number;
}

export interface PredictionResponse {
  location: Location;
  date_range: {
    start: string;
    end: string;
  };
  prediction: Prediction;
  features: Record<string, any>;
  forecast?: Record<string, any>;
  cached: boolean;
  timestamp: string;
}

// Alert types
export interface Alert {
  id: string;
  location: Location;
  level: string;
  score: number;
  timestamp: string;
  message?: string;
}

// District types
export interface District {
  name: string;
  centroid: Location;
  risk_level: string;
  risk_score: number;
  population?: number;
  area_sq_km?: number;
}

// Stats types
export interface DashboardStats {
  total_predictions: number;
  high_risk_areas: number;
  recent_alerts: number;
  last_updated: string;
}

// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  Prediction: {location?: Location};
  Forecast: {location: Location};
  Alerts: undefined;
  Settings: undefined;
  About: undefined;
  Help: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Map: undefined;
  Dashboard: undefined;
  Profile: undefined;
};
