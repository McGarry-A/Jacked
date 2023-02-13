/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Auth: "auth",
      Welcome: "welcome",
      CreateTemplate: "create-template",
      Root: {
        path: "",
        screens: {
          Exercises: "exercises",
          History: "history",
          Profile: {
            path: "profile",
            screens: {
              path: "settings",
            },
          },
          Start: {
            path: "start",
            screens: {
              path: "active-workout",
            },
          },
        },
      },
    },
  },
};

export default linking;
