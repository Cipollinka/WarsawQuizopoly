import React from 'react';
import BackgroundTask from '@/components/BackgroundTask';
import BackgroundMusic from '@/components/BackgroundMusic';
import AppNavigator from '@/components/AppNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function GameScreen() {
  return (<SafeAreaProvider>
    <BackgroundTask />
    <BackgroundMusic />
    <AppNavigator />
  </SafeAreaProvider>);
}
