/**
 * Color Palette
 * Based on the UI Design Brief - Earth tones with high-tech accents
 */

export const colors = {
  // Primary - Earth tones
  primary: '#8B4513', // Saddle Brown
  primaryLight: '#A0522D', // Sienna
  primaryDark: '#654321', // Dark Brown
  
  // Secondary - High-tech accents
  secondary: '#00BCD4', // Cyan
  secondaryLight: '#4DD0E1',
  secondaryDark: '#0097A7',
  
  // Status colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Risk levels
  risk: {
    veryLow: '#4CAF50',
    low: '#8BC34A',
    moderate: '#FFC107',
    high: '#FF9800',
    veryHigh: '#F44336',
    extreme: '#B71C1C',
  },
  
  // Neutrals
  background: '#FAFAFA',
  surface: '#FFFFFF',
  surfaceDark: '#121212',
  
  // Text
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    hint: '#9E9E9E',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
  },
  
  // Borders
  border: '#E0E0E0',
  divider: '#EEEEEE',
  
  // Overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  
  // Gradients
  gradients: {
    primary: ['#8B4513', '#654321'],
    secondary: ['#00BCD4', '#0097A7'],
    danger: ['#F44336', '#B71C1C'],
    terrain: ['#8B4513', '#CD853F', '#DEB887'],
  },
};

export default colors;
