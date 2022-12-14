/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { faDumbbell } from "@fortawesome/free-solid-svg-icons/faDumbbell";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Button, Pressable, Text } from "native-base";
import useColorScheme from "../hooks/useColorScheme";
import Profile from "../screens/root/Profile";
import History from "../screens/root/History";

import {
  RootAuthStack,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Calendar from "../screens/modals/Calendar";
import Settings from "../screens/pages/Settings";
import ActiveWorkout from "../screens/pages/ActiveWorkout";
import Exercises from "../screens/root/Exercises";
import AddExercises from "../screens/modals/AddExercises";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { cancelWorkout } from "../store/currentWorkoutSlice";
import { useAppDispatch, useAppSelector } from "../store";
import Start from "../screens/root/Start";
import ColorThemeSwitch from "../components/layout/ColorThemeSwitch";
import Auth from "../components/auth/Auth";
import Welcome from "../components/auth/Welcome";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<RootAuthStack>();

function RootNavigator() {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.userSlice.user);
  const { screenColorModeHex } = useColorScheme();
  return (
    <>
      {!isLoggedIn ? (
        <AuthStack.Navigator initialRouteName="Welcome">
          <AuthStack.Screen
            name="Welcome"
            component={Welcome}
            options={() => ({
              headerShown: false,
            })}
          />
          <AuthStack.Screen
            name="Auth"
            component={Auth}
            options={() => ({
              headerShown: false,
            })}
          />
        </AuthStack.Navigator>
      ) : (
        <>
          <Stack.Navigator
            initialRouteName="Root"
            screenOptions={{
              statusBarColor: screenColorModeHex,
              headerStyle: {
                backgroundColor: screenColorModeHex,
              },
            }}
          >
            <Stack.Screen
              name="Root"
              component={BottomTabNavigator}
              options={() => ({
                headerShown: false,
                headerStyle: {
                  backgroundColor: screenColorModeHex,
                },
              })}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ title: "Settings" }}
            />
            <Stack.Screen
              name="ActiveWorkout"
              component={ActiveWorkout}
              options={({ navigation }) => ({
                title: "Active Workout",
                headerStyle: {
                  backgroundColor: screenColorModeHex,
                },
                headerRight: () => (
                  <Button
                    variant="ghost"
                    colorScheme={"red"}
                    onPress={() => {
                      dispatch(cancelWorkout());
                      navigation.navigate("Root");
                    }}
                  >
                    <Text
                      textTransform={"uppercase"}
                      color="red.400"
                      fontSize={"xs"}
                    >
                      Cancel
                    </Text>
                  </Button>
                ),
              })}
            />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen name="Calendar" component={Calendar} />
              <Stack.Screen
                name="AddExercises"
                component={AddExercises}
                options={({ navigation }) => ({
                  title: "",
                  headerRight: () => (
                    <Pressable onPress={() => navigation.goBack()}>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        color={"skyblue"}
                        size={20}
                      />
                    </Pressable>
                  ),
                })}
              />
            </Stack.Group>
          </Stack.Navigator>
        </>
      )}
    </>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const { screenColorModeHex, bottomNavColorMode } = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarStyle: [
          {
            backgroundColor: screenColorModeHex,
            paddingTop: 5,
            maxWidth: 512,
            marginHorizontal: "auto",
            width: "100%",
          },
        ],
        tabBarActiveTintColor: bottomNavColorMode,
        headerStyle: {
          backgroundColor: screenColorModeHex,
        },
      }}
    >
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }: RootTabScreenProps<"Profile">) => ({
          title: "Profile",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={25} />
          ),
          headerRight: () => <ColorThemeSwitch />,
        })}
      />
      <BottomTab.Screen
        name="Start"
        component={Start}
        options={{
          headerTitle: "",
          title: "Start",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faPlus} color={color} size={25} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Exercises"
        component={Exercises}
        options={{
          headerTitle: "",
          title: "Exercises",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faDumbbell} color={color} size={25} />
          ),
        }}
      />
      <BottomTab.Screen
        name="History"
        component={History}
        options={() => ({
          headerTitle: "",
          title: "History",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faClockRotateLeft} color={color} size={25} />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}
