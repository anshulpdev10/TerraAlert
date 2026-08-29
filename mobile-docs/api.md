# GeoSafe Mobile - API Integration Guide

## 🔗 API Overview

**Base URL (Development):** `http://localhost:5000/api`  
**Base URL (Production):** `https://api.geosafe.com/api` (Update when deployed)  
**Backend:** Flask (Python) - Shared with Web App  
**Authentication:** Supabase JWT tokens

---

## 🔐 Authentication

### Supabase Auth Integration

The mobile app uses Supabase for authentication (same as web app).

#### Setup
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lwurspqlazvnaqcyzdwg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### Auth Methods

**Sign Up**
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
});
```

**Sign In**
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});
```

**Sign Out**
```typescript
const { error } = await supabase.auth.signOut();
```

**Get Session**
```typescript
const { data: { session } } = await supabase.auth.getSession();
const token = session?.access_token;
```

---

## 📡 API Client Configuration

### Base Axios Setup

```typescript
// services/api.ts
import axios from 'axios';
import { supabase } from './supabase';

const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5000/api' 
  : 'https://api.geosafe.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  
  return config;
});

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (logout user)
      supabase.auth.signOut();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## 🎯 API Endpoints

### 1. Health Check

**Endpoint:** `GET /health`  
**Auth Required:** No  
**Purpose:** Check if backend is running

**Request:**
```typescript
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-08-27T12:00:00.000Z"
}
```

**Usage:**
```typescript
async function checkHealth() {
  const response = await apiClient.get('/health');
  return response.data;
}
```

---

### 2. Get Landslide Prediction

**Endpoint:** `POST /predict`  
**Auth Required:** Yes  
**Purpose:** Get landslide risk prediction for a location

**Request:**
```typescript
POST /api/predict
Content-Type: application/json

{
  "lat": 31.1048,
  "lon": 77.1734,
  "days_back": 30,    // optional, default: 30
  "buffer": 1000,     // optional, default: 1000
  "use_cache": true   // optional, default: true
}
```

**Response:**
```json
{
  "location": {
    "lat": 31.1048,
    "lon": 77.1734
  },
  "date_range": {
    "start": "2026-07-28",
    "end": "2026-08-27"
  },
  "prediction": {
    "score": 68.5,
    "level": "HIGH",
    "confidence": 0.87
  },
  "features": {
    "values": [3, 0.45, -0.12, 15.5, 42.3, 89.7, 156.2, 750, 28.5, 180],
    "names": ["soil_type", "ndvi", "ndwi", "rainfall_3d", ...]
  },
  "forecast": {
    "7days": [...],
    "14days": [...],
    "30days": [...]
  },
  "cached": false,
  "timestamp": "2026-08-27T12:00:00.000Z"
}
```

**Usage:**
```typescript
async function getPrediction(lat: number, lon: number) {
  const response = await apiClient.post('/predict', {
    lat,
    lon,
    days_back: 30,
    buffer: 1000,
    use_cache: true
  });
  return response.data;
}
```

**Error Handling:**
```typescript
try {
  const prediction = await getPrediction(31.1048, 77.1734);
} catch (error) {
  if (error.response?.status === 404) {
    console.error('No satellite data available for this location');
  } else if (error.response?.status === 400) {
    console.error('Missing lat/lon coordinates');
  } else {
    console.error('Prediction failed:', error.message);
  }
}
```

---

### 3. Get 7-Day Forecast with SMS Alert

**Endpoint:** `POST /forecast/predict`  
**Auth Required:** Yes  
**Purpose:** Get 7-day forecast (triggers SMS if risk >= 70)

**Request:**
```typescript
POST /api/forecast/predict
Content-Type: application/json

{
  "lat": 31.1048,
  "lon": 77.1734
}
```

**Response:**
```json
{
  "location": {
    "lat": 31.1048,
    "lon": 77.1734
  },
  "forecast": [
    {
      "date": "2026-08-28",
      "day": 1,
      "rainfall_mm": 25.5,
      "risk_score": 72.3,
      "risk_level": "HIGH",
      "confidence": 0.85
    },
    // ... 6 more days
  ],
  "timestamp": "2026-08-27T12:00:00.000Z"
}
```

**Usage:**
```typescript
async function get7DayForecast(lat: number, lon: number) {
  const response = await apiClient.post('/forecast/predict', { lat, lon });
  return response.data;
}
```

---

### 4. Get Recent Predictions

**Endpoint:** `GET /predictions`  
**Auth Required:** Yes  
**Purpose:** Get recent predictions made by all users

**Request:**
```typescript
GET /api/predictions?limit=8
```

**Query Parameters:**
- `limit` (number, optional): Number of predictions to return (default: 8)

**Response:**
```json
{
  "predictions": [
    {
      "id": "uuid",
      "district_id": "loc_31.1048_77.1734",
      "location": "Shimla, Himachal Pradesh",
      "lat": 31.1048,
      "lon": 77.1734,
      "score": 68.5,
      "level": "HIGH",
      "features": { ... },
      "created_at": "2026-08-27T10:30:00.000Z"
    },
    // ... more predictions
  ],
  "count": 8
}
```

**Usage:**
```typescript
async function getRecentPredictions(limit: number = 8) {
  const response = await apiClient.get(`/predictions?limit=${limit}`);
  return response.data;
}
```

---

### 5. Get Dashboard Statistics

**Endpoint:** `GET /stats`  
**Auth Required:** Yes  
**Purpose:** Get aggregate statistics for dashboard

**Request:**
```typescript
GET /api/stats
```

**Response:**
```json
{
  "total_predictions": 1247,
  "critical_count": 12,
  "high_count": 89,
  "moderate_count": 456,
  "low_count": 690,
  "avg_risk_score": 45.2,
  "total_districts": 12,
  "last_refresh": "2026-08-27T12:00:00.000Z",
  "recent_predictions": [...],
  "trend_7d": [...],
  "score_distribution": [...],
  "highest_risk_location": "Shimla, Himachal Pradesh",
  "highest_risk_score": 85.3
}
```

**Usage:**
```typescript
async function getDashboardStats() {
  const response = await apiClient.get('/stats');
  return response.data;
}
```

---

### 6. Get Himachal Pradesh Districts

**Endpoint:** `GET /districts/himachal`  
**Auth Required:** Yes  
**Purpose:** Get all HP districts with current risk data

**Request:**
```typescript
GET /api/districts/himachal?use_cache=true&force_refresh=false
```

**Query Parameters:**
- `use_cache` (boolean, optional): Use cached data (default: true)
- `force_refresh` (boolean, optional): Force fresh fetch (default: false)

**Response:**
```json
{
  "districts": [
    {
      "id": "shimla",
      "name": "Shimla",
      "lat": 31.1048,
      "lon": 77.1734,
      "score": 68.5,
      "level": "HIGH",
      "confidence": 0.87,
      "elevation": 2200,
      "slope": 28.5,
      "rainfall_30d": 156.2,
      "ndvi": 0.45,
      "ndwi": -0.12,
      "soil_type": 3,
      "last_updated": "2026-08-27T12:00:00.000Z",
      "success": true
    },
    // ... 11 more districts
  ],
  "count": 12,
  "state": "Himachal Pradesh",
  "cached": true,
  "cache_age_minutes": 15,
  "timestamp": "2026-08-27T12:00:00.000Z"
}
```

**Usage:**
```typescript
async function getHimachalDistricts(forceRefresh: boolean = false) {
  const response = await apiClient.get('/districts/himachal', {
    params: {
      use_cache: !forceRefresh,
      force_refresh: forceRefresh
    }
  });
  return response.data;
}
```

---

### 7. Get Alerts

**Endpoint:** `GET /alerts`  
**Auth Required:** Yes  
**Purpose:** Get recent alerts

**Request:**
```typescript
GET /api/alerts?limit=10&level=HIGH
```

**Query Parameters:**
- `limit` (number, optional): Number of alerts (default: 10)
- `level` (string, optional): Filter by level (CRITICAL/HIGH/MODERATE/LOW)

**Response:**
```json
{
  "alerts": [
    {
      "id": "uuid",
      "district_id": "shimla",
      "level": "HIGH",
      "score": 75.2,
      "message": "High landslide risk detected",
      "created_at": "2026-08-27T09:00:00.000Z"
    },
    // ... more alerts
  ],
  "count": 10
}
```

**Usage:**
```typescript
async function getAlerts(limit: number = 10, level?: string) {
  const params: any = { limit };
  if (level) params.level = level;
  
  const response = await apiClient.get('/alerts', { params });
  return response.data;
}
```

---

## 🔄 API Service Layer

### Complete API Service Implementation

```typescript
// services/apiService.ts
import apiClient from './api';

export interface PredictionRequest {
  lat: number;
  lon: number;
  days_back?: number;
  buffer?: number;
  use_cache?: boolean;
}

export interface PredictionResponse {
  location: { lat: number; lon: number };
  date_range: { start: string; end: string };
  prediction: {
    score: number;
    level: string;
    confidence: number;
  };
  features: any;
  forecast: any;
  cached: boolean;
  timestamp: string;
}

class APIService {
  // Health check
  async checkHealth() {
    const response = await apiClient.get('/health');
    return response.data;
  }

  // Predictions
  async getPrediction(request: PredictionRequest): Promise<PredictionResponse> {
    const response = await apiClient.post('/predict', request);
    return response.data;
  }

  async get7DayForecast(lat: number, lon: number) {
    const response = await apiClient.post('/forecast/predict', { lat, lon });
    return response.data;
  }

  async getRecentPredictions(limit: number = 8) {
    const response = await apiClient.get(`/predictions?limit=${limit}`);
    return response.data;
  }

  // Dashboard
  async getDashboardStats() {
    const response = await apiClient.get('/stats');
    return response.data;
  }

  // Districts
  async getHimachalDistricts(forceRefresh: boolean = false) {
    const response = await apiClient.get('/districts/himachal', {
      params: {
        use_cache: !forceRefresh,
        force_refresh: forceRefresh
      }
    });
    return response.data;
  }

  // Alerts
  async getAlerts(limit: number = 10, level?: string) {
    const params: any = { limit };
    if (level) params.level = level;
    
    const response = await apiClient.get('/alerts', { params });
    return response.data;
  }
}

export default new APIService();
```

---

## 🗺️ GEE Data Explained

The backend fetches data from Google Earth Engine (GEE). Mobile app receives processed data:

### Features Returned
1. **soil_type** - Soil classification (1-5)
2. **ndvi** - Normalized Difference Vegetation Index (-1 to 1)
3. **ndwi** - Normalized Difference Water Index (-1 to 1)
4. **rainfall_3d** - 3-day cumulative rainfall (mm)
5. **rainfall_7d** - 7-day cumulative rainfall (mm)
6. **rainfall_14d** - 14-day cumulative rainfall (mm)
7. **rainfall_30d** - 30-day cumulative rainfall (mm)
8. **elevation** - Elevation above sea level (meters)
9. **slope** - Terrain slope (degrees)
10. **aspect** - Terrain aspect/direction (0-360 degrees)

---

## ⚡ Performance Optimization

### Caching Strategy
```typescript
// Use cache for repeated requests
const prediction = await apiService.getPrediction({
  lat: 31.1048,
  lon: 77.1734,
  use_cache: true  // Default: true
});
```

### Request Timeout
```typescript
// Configure timeout for slow networks
apiClient.defaults.timeout = 60000; // 60 seconds
```

### Retry Logic
```typescript
import axiosRetry from 'axios-retry';

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
           error.response?.status === 429;
  }
});
```

---

## 🚨 Error Handling

### Error Types
```typescript
interface APIError {
  status: number;
  message: string;
  details?: any;
}

function handleAPIError(error: any): APIError {
  if (error.response) {
    // Server responded with error
    return {
      status: error.response.status,
      message: error.response.data?.error || 'Server error',
      details: error.response.data?.details
    };
  } else if (error.request) {
    // Request made but no response
    return {
      status: 0,
      message: 'Network error - check internet connection'
    };
  } else {
    // Error in request setup
    return {
      status: -1,
      message: error.message || 'Unknown error'
    };
  }
}
```

### Common Error Codes
- **400** - Bad Request (missing parameters)
- **401** - Unauthorized (invalid token)
- **404** - Not Found (no data available)
- **429** - Too Many Requests (rate limited)
- **500** - Internal Server Error
- **503** - Service Unavailable

---

## 🔔 Real-time Updates (Future)

### WebSocket Support (Planned)
```typescript
import io from 'socket.io-client';

const socket = io(API_BASE_URL);

socket.on('new_alert', (alert) => {
  // Handle new alert
  console.log('New alert received:', alert);
});

socket.on('prediction_update', (prediction) => {
  // Handle prediction update
  console.log('Prediction updated:', prediction);
});
```

---

## 📝 Testing

### Mock API for Development
```typescript
// services/mockApi.ts
export const mockPrediction: PredictionResponse = {
  location: { lat: 31.1048, lon: 77.1734 },
  prediction: {
    score: 68.5,
    level: 'HIGH',
    confidence: 0.87
  },
  // ... rest of mock data
};

// Toggle between real and mock
const USE_MOCK_API = __DEV__ && false;

export const getAPI = () => {
  return USE_MOCK_API ? mockAPIService : realAPIService;
};
```

---

**Document Version:** 1.0  
**Last Updated:** 2026-08-27  
**Backend API Version:** v1
