import { FontAwesome } from "@expo/vector-icons";
import { useAtom } from "jotai";
import {
  View,
  Box,
  Button,
  Heading,
  Text,
  Pressable,
  Modal,
  Input,
  Center,
  VStack,
} from "native-base";
import { useState } from "react";
import Timer from "../components/Timer";
import { currentWorkoutAtom } from "../store/store";

const ActiveWorkout = ({ navigation }: any) => {
  const [workoutTitle, setWorkoutTitle] = useState("Quick Workout");
  const [currentWorkout] = useAtom(currentWorkoutAtom);

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
      <Box>
        <Text>{JSON.stringify(currentWorkout)}</Text>
      </Box>
      <Box marginBottom={2}>
        <Button
          onPress={() => navigation.navigate("AddExercises")}
          marginY={1}
          backgroundColor="info.400"
          height={10}
        >
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
