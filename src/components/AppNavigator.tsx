import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, Screens} from '@/types/navigation';

import CreateAccount from '@/screens/CreateAccount';
import MainMenu from '@/screens/MainMenu';
import Map from '@/screens/Map';
import Quiz from '@/screens/Quiz';
import Settings from '@/screens/Settings';
import Scoreboard from '@/screens/Scoreboard';
import About from '@/screens/About';
import Profile from '@/screens/Profile';
import Study from '@/screens/Study';
import Reference from '@/screens/Reference';
import StudyDetails from '@/screens/StudyDetails';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.MAIN_MENU}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Screens.CREATE_ACCOUNT} component={CreateAccount} />
        <Stack.Screen name={Screens.MAIN_MENU} component={MainMenu} />
        <Stack.Screen name={Screens.MAP} component={Map} />
        <Stack.Screen name={Screens.QUIZ} component={Quiz} />
        <Stack.Screen name={Screens.SETTINGS} component={Settings} />
        <Stack.Screen name={Screens.SCOREBOARD} component={Scoreboard} />
        <Stack.Screen name={Screens.ABOUT} component={About} />
        <Stack.Screen name={Screens.PROFILE} component={Profile} />
        <Stack.Screen name={Screens.STUDY} component={Study} />
        <Stack.Screen name={Screens.REFERENCE} component={Reference} />
        <Stack.Screen name={Screens.STUDY_DETAILS} component={StudyDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
