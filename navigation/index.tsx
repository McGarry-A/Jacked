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
import { Pressable } from "native-base";
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
import ActiveWorkout from "../screens/pages/ActiveWorkout";
import Exercises from "../screens/root/Exercises";
import AddExercises from "../screens/modals/AddExercises";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useAppDispatch, useAppSelector } from "../store";
import Start from "../screens/root/Start";
import ColorThemeSwitch from "../components/Layout/ColorThemeSwitch";
import Auth from "../components/Auth/Auth";
import Welcome from "../components/Auth/Welcome";
import Header from "../components/Layout/ScreenHeader";
import CreateTemplate from "../screens/pages/CreateTemplate";

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
          <Stack.Navigator initialRouteName="Root">
            <Stack.Screen
              name="Root"
              component={BottomTabNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CreateTemplate"
              component={CreateTemplate}
              options={{
                title: "Create Template",
                header: (props) => (
                  <Header showBack={true} showRouteTitle={false} {...props} />
                ),
              }}
            />
            <Stack.Screen
              name="ActiveWorkout"
              component={ActiveWorkout}
              options={({ navigation }) => ({
                title: "Active Workout",
                header: (props) => (
                  <Header
                    showBack={true}
                    showRouteTitle={false}
                    {...props}
                  />
                ),
              })}
            />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen
                name="Calendar"
                component={Calendar}
                options={() => ({
                  header: (props) => (
                    <Header showBack={true} showRouteTitle={true} {...props} />
                  ),
                })}
              />
              <Stack.Screen
                name="AddExercises"
                component={AddExercises}
                options={({ navigation }) => ({
                  title: "",
                  header: (props) => (
                    <Header
                      showBack={false}
                      showRouteTitle={false}
                      {...props}
                      ComponentRight={() => (
                        <Pressable onPress={() => navigation.goBack()}>
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            color={"skyblue"}
                            size={20}
                          />
                        </Pressable>
                      )}
                    />
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
          header: (props) => (
            <Header
              showBack={false}
              showRouteTitle={false}
              {...props}
            />
          ),
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={25} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Start"
        component={Start}
        options={{
          headerTitle: "",
          title: "Start",
          header: (props) => (
            <Header showBack={false} showRouteTitle={false} {...props} />
          ),
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
          header: (props) => (
            <Header showBack={false} showRouteTitle={false} {...props} />
          ),
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
          header: (props) => (
            <Header showBack={false} showRouteTitle={false} {...props} />
          ),
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faClockRotateLeft} color={color} size={25} />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}
