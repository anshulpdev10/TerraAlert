/**
 * Splash Screen
 * Initial loading screen
 */

import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {theme} from '../theme';

const SplashScreen: React.FC = () => {
  useEffect(() => {
    // TODO: Check auth status, load initial data
    // Navigate to appropriate screen
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TerraAlert</Text>
      <Text style={styles.subtitle}>Landslide Early Warning System</Text>
      <ActivityIndicator
        size="large"
        color={theme.colors.secondary}
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.onPrimary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text.onPrimary,
    opacity: 0.8,
  },
  loader: {
    marginTop: theme.spacing.xl,
  },
});

export default SplashScreen;
