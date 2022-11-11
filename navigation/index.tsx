/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons/faDumbbell";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { Pressable } from "native-base";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Profile from "../screens/root/Profile";
import History from "../screens/root/History";
import TabTwoScreen from "../screens/root/TabTwoScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { Text } from "native-base";
import Calendar from "../screens/modals/Calendar";
import Settings from "../screens/pages/Settings";
import ActiveWorkout from "../screens/pages/ActiveWorkout";
import Exercises from "../screens/root/Exercises";
import AddExercises from "../screens/modals/AddExercises";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { cancelWorkout } from "../store/currentWorkoutSlice";
import { useAppDispatch } from "../store";


export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useAppDispatch();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
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
          headerRight: () => (
            <Pressable
              onPress={() => {
                dispatch(cancelWorkout());
                navigation.navigate("Root");
              }}
              justifyContent={"center"}
            >
              <FontAwesomeIcon icon={faBan} color={'#ff0033'} size={20}/>
            </Pressable>
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
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: [{ backgroundColor: "#1f2937", paddingTop: 5 }],
      }}
    >
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }: RootTabScreenProps<"Profile">) => ({
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={25} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Settings")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="cog"
                size={25}
                color={"skyblue"}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
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
        options={({ navigation }: RootTabScreenProps<"History">) => ({
          headerTitle: "",
          title: "History",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faClockRotateLeft} color={color} size={25} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Calendar")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Text marginRight={3} color={"info.400"} fontSize={"sm"}>
                Calendar
              </Text>
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}
