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
        path: "Root",
        screens: {
          Exercises: 'Exercises',
          History: 'History',
          Profile: {
            path: "Profile",
            screens: {
              path: "Settings"
            }
          },
          Start: {
            path: "Start",
            screens: {
              path: "ActiveWorkout",
            }
          }
        }
      },
    }
  },
};

export default linking;
