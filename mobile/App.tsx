/**
 * TerraAlert Mobile - Main App Entry Point
 * 
 * This is the root component of your React Native app.
 * Think of it like index.html in web - everything starts here!
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// Import our splash screen
import SplashScreen from './src/screens/SplashScreen';

// Import theme for consistent styling
import {theme} from './src/theme';

/**
 * Main App Component
 * 
 * Flow:
 * 1. SafeAreaProvider - Handles notches, safe areas on different devices
 * 2. GestureHandlerRootView - Enables touch gestures (swipes, pans, etc)
 * 3. StatusBar - Configure the top status bar
 * 4. SplashScreen - First screen users see
 * 
 * Later we'll add:
 * - Navigation (move between screens)
 * - Auth Context (login state)
 * - API Provider (backend connection)
 */
function App(): React.JSX.Element {
  return (
    // SafeAreaProvider: Ensures content doesn't overlap notches/curved screens
    <SafeAreaProvider>
      {/* GestureHandlerRootView: Required for React Navigation gestures */}
      <GestureHandlerRootView style={{flex: 1}}>
        {/* StatusBar: Configure the phone's top status bar */}
        <StatusBar
          barStyle="light-content" // White text/icons
          backgroundColor={theme.colors.primary} // Brown background
        />

        {/* 
          SplashScreen is shown first
          Later this will become:
          - Check if user is logged in
          - If yes → Show main app
          - If no → Show login screen
        */}
        <SplashScreen />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
