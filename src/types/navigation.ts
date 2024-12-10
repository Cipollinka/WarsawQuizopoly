import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {QuizParams} from '.';

export enum Screens {
  CREATE_ACCOUNT = 'createAccount',
  MAIN_MENU = 'mainMenu',
  PROFILE = 'profile',
  SETTINGS = 'settings',
  SCOREBOARD = 'scoreboard',
  MAP = 'map',
  QUIZ = 'quiz',
  ABOUT = 'about',
  STUDY = 'study',
  REFERENCE = 'reference',
  STUDY_DETAILS = 'studyDetails',
}

export type RootStackParamList = {
  [Screens.CREATE_ACCOUNT]: undefined;
  [Screens.MAIN_MENU]: undefined;
  [Screens.PROFILE]: undefined;
  [Screens.SETTINGS]: undefined;
  [Screens.SCOREBOARD]: undefined;
  [Screens.MAP]: undefined;
  [Screens.ABOUT]: undefined;
  [Screens.QUIZ]: QuizParams;
  [Screens.STUDY]: undefined;
  [Screens.REFERENCE]: undefined;
  [Screens.STUDY_DETAILS]: {id: number};
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

export type UseNavigationProp = NativeStackNavigationProp<RootStackParamList>;
