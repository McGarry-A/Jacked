/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Profile: {
            screens: {
              TabOneScreen: 'one',
              UserScreen: 'user'
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          History: {
            screens: {
              TabTwoScreen: 'three',
            },
          },
        },
      },
      Modal: 'modal',
      Calendar: 'calendar',
      ActiveWorkout: 'active-workout',
      User: 'user',
      NotFound: '*',
    },
  },
};

export default linking;
