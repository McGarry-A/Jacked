/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

type ActiveWorkoutParams =
  | {
      title: string | null;
    }
  | undefined;

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList>;
  Modal: undefined;
  NotFound: undefined;
  Calendar: undefined;
  User: undefined;
  Settings: undefined;
  ActiveWorkout: ActiveWorkoutParams;
  AddExercises: undefined;
  CreateTemplate: undefined;
  BottomTabNavigator: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Profile: undefined;
  Start: undefined;
  History: undefined;
  Exercises: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
