/**
 * API Service Layer
 * 
 * All API calls to the backend are centralized here.
 */

import apiClient from './api';

export interface PredictionRequest {
  lat: number;
  lon: number;
  days_back?: number;
  buffer?: number;
  use_cache?: boolean;
}

export interface Location {
  lat: number;
  lon: number;
}

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
  features: any;
  forecast: any;
  cached: boolean;
  timestamp: string;
}

class APIService {
  /**
   * Health check endpoint
   */
  async checkHealth() {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get landslide prediction for a location
   */
  async getPrediction(
    request: PredictionRequest,
  ): Promise<PredictionResponse> {
    try {
      const response = await apiClient.post('/predict', request);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get 7-day forecast with SMS alerts
   */
  async get7DayForecast(lat: number, lon: number) {
    try {
      const response = await apiClient.post('/forecast/predict', {lat, lon});
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get recent predictions
   */
  async getRecentPredictions(limit: number = 8) {
    try {
      const response = await apiClient.get(`/predictions?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats() {
    try {
      const response = await apiClient.get('/stats');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get Himachal Pradesh districts with risk data
   */
  async getHimachalDistricts(forceRefresh: boolean = false) {
    try {
      const response = await apiClient.get('/districts/himachal', {
        params: {
          use_cache: !forceRefresh,
          force_refresh: forceRefresh,
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get alerts
   */
  async getAlerts(limit: number = 10, level?: string) {
    try {
      const params: any = {limit};
      if (level) {
        params.level = level;
      }

      const response = await apiClient.get('/alerts', {params});
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle API errors consistently
   */
  private handleError(error: any) {
    if (error.response) {
      // Server responded with error
      return {
        status: error.response.status,
        message: error.response.data?.error || 'Server error',
        details: error.response.data?.details,
      };
    } else if (error.request) {
      // Request made but no response
      return {
        status: 0,
        message: 'Network error - check internet connection',
      };
    } else {
      // Error in request setup
      return {
        status: -1,
        message: error.message || 'Unknown error',
      };
    }
  }
}

export default new APIService();
