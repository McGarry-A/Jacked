import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Box,
  Button,
  Heading,
  ScrollView,
  Spacer,
  Text,
  Pressable,
} from "native-base";
import { useEffect, useState } from "react";
import Timer from "../components/Timer";

const ActiveWorkout = () => {
  const [workoutTitle, setWorkoutTitle] = useState("Quick Workout");
  return (
    <View padding={3} flex={1} backgroundColor={"white"}>
      <Box flex={1}>
        <Box flexDirection={"row"} alignItems="center">
          <Heading marginY={2} marginRight="3">
            {workoutTitle}
          </Heading>
          <Pressable onPress={() => {}}>
            <FontAwesome name="pencil" size={20} />
          </Pressable>
        </Box>
        <Timer />
      </Box>
      <Box marginBottom={2}>
        <Button marginY={1} backgroundColor="info.400" height={10}>
          <Text color="white" fontWeight="semibold">
            Add A Lift
          </Text>
        </Button>
        <Button backgroundColor="rose.400" height={10}>
          <Text color="white" fontWeight={"semibold"}>
            Cancel Workout
          </Text>
        </Button>
      </Box>
    </View>
  );
};

export default ActiveWorkout;
