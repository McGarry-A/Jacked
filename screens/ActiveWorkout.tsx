import { FontAwesome } from "@expo/vector-icons";
import { Box, Text, Pressable, Input, ScrollView } from "native-base";
import { useRef } from "react";
import { useState } from "react";
import Sets from "../components/Lifts";
import Timer from "../components/Timer";
import { useAppDispatch } from "../store";
import {
  cancelWorkout,
  setWorkoutTitle as setWorkoutName,
  saveWorkout,
} from "../store/currentWorkoutSlice";

const ActiveWorkout = ({ navigation }: any) => {
  const [workoutTitle, setWorkoutTitle] = useState("Quick Workout");
  const [inputIsDisabled, setInputIsDisabled] = useState(true);
  const workoutTitleRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const handleEndWorkout = () => {
    dispatch(saveWorkout());
    navigation.navigate("Profile");
  };

  const handleCancelWorkout = () => {
    dispatch(cancelWorkout());
    navigation.navigate("Root");
  };

  const handleEditWorkoutTitle = () => {
    workoutTitleRef.current!.focus();
    setInputIsDisabled(!inputIsDisabled);
    setWorkoutTitle("");
  };

  const handleSaveWorkoutName = () => {
    workoutTitleRef.current!.blur();
    dispatch(setWorkoutName(workoutTitle));
    setInputIsDisabled(true);
  };

  const renderTickOrEdit = () => {
    if (workoutTitle === "Quick Workout") {
      return (
        <Pressable onPress={handleEditWorkoutTitle}>
          <FontAwesome name="pencil" size={20} />
        </Pressable>
      );
    }

    return (
      <Pressable>
        <FontAwesome
          name="check-square"
          size={20}
          onPress={handleSaveWorkoutName}
        />
      </Pressable>
    );
  };

  const renderHeading = () => {
    return (
      <Input
        flexDirection={"row"}
        alignItems="center"
        justifyContent={"space-between"}
        value={workoutTitle}
        isDisabled={inputIsDisabled}
        color={"text.900"}
        onChangeText={(text) => setWorkoutTitle(text)}
        borderWidth={0}
        paddingLeft={0}
        _focus={{ backgroundColor: "white" }}
        _disabled={{ color: "black", opacity: 100 }}
        fontSize={"xl"}
        ref={workoutTitleRef}
        editable
        InputRightElement={renderTickOrEdit()}
      />
    );
  };

  const renderTimer = () => <Timer />;

  const renderEndWorkout = () => {
    return (
      <Box flexDir={"row"} justifyContent={"flex-end"} w="full">
        <Pressable
          mt={2}
          px={6}
          py={2}
          shadow={1}
          backgroundColor="success.400"
          onPress={handleEndWorkout}
        >
          <Text color="white" fontWeight={700} textAlign={"center"}>
            End
          </Text>
        </Pressable>
      </Box>
    );
  };

  const renderButtons = () => {
    return (
      <Box marginBottom={2}>
        <Pressable
          onPress={() => navigation.navigate("AddExercises")}
          marginY={1}
          backgroundColor="info.400"
          height={8}
          justifyContent={"center"}
        >
          <Text color="white" fontWeight={700} textAlign={"center"}>
            Add A Lift
          </Text>
        </Pressable>
        <Pressable
          backgroundColor="red.600"
          height={8}
          onPress={handleCancelWorkout}
          justifyContent={"center"}
        >
          <Text color="white" fontWeight={700} textAlign={"center"}>
            Cancel Workout
          </Text>
        </Pressable>
      </Box>
    );
  };

  return (
    <ScrollView backgroundColor={"white"} h={"full"}>
      {renderEndWorkout()}
      <Box padding={3}>
        {renderHeading()}
        {renderTimer()}
      </Box>
      <Sets />
      <Box padding={3}>{renderButtons()}</Box>
    </ScrollView>
  );
};

export default ActiveWorkout;
