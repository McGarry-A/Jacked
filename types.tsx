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

type LoginTypes = "SIGN_UP" | "LOG_IN";

export type RootAuthStack = {
  Auth: undefined;
  Welcome: undefined;
};

export type RootStackParamList = {
  Auth: { type: LoginTypes };
  Welcome: undefined;
  ActiveWorkout: undefined;
  Root: NavigatorScreenParams<RootTabParamList>;
  Modal: undefined;
  NotFound: undefined;
  Calendar: undefined;
  User: undefined;
  Settings: undefined;
  AddExercises: undefined;
  CreateTemplate: {
    folderId: string;
  };
  BottomTabNavigator: undefined;
  WorkoutDetails: { workoutId: number };
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
