import { FontAwesome } from "@expo/vector-icons";
import { View, Box, Button, Text, Pressable, Input } from "native-base";
import { useState } from "react";
import Timer from "../components/Timer";

const ActiveWorkout = ({ navigation }: any) => {
  const [workoutTitle, setWorkoutTitle] = useState("Quick Workout");
  const [inputIsDisabled, setInputIsDisabled] = useState(true);

  const renderHeading = () => {
    return (
      <Input
        flexDirection={"row"}
        alignItems="center"
        value={workoutTitle}
        isDisabled={inputIsDisabled}
        onChangeText={(text) => setWorkoutTitle(text)}
        InputRightElement={
          <Pressable onPress={() => setInputIsDisabled(!inputIsDisabled)}>
            <FontAwesome name="pencil" size={20} />
          </Pressable>
        }
      ></Input>
    );
  };

  const renderTimer = () => <Timer />;

  const renderButtons = () => {
    return (
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
    );
  };

  return (
    <View padding={3} flex={1} backgroundColor={"white"}>
      {renderHeading()}
      {renderTimer()}
      {/* SETS AND REPS GO HERE */}
      <Box flex={1}></Box>
      {renderButtons()}
    </View>
  );
};

export default ActiveWorkout;
