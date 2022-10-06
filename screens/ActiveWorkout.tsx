import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Box,
  Button,
  Text,
  Pressable,
  Input,
  Heading,
  HStack,
  VStack,
  ScrollView,
} from "native-base";
import { useRef } from "react";
import { useState } from "react";
import Sets from "../components/Sets";
import Timer from "../components/Timer";
import { useAppDispatch, useAppSelector } from "../store";
import {
  addSet,
  addSetNumbers,
  cancelWorkout,
  setWorkoutTitle as setWorkoutName,
} from "../store/currentWorkoutSlice";

const ActiveWorkout = ({ navigation }: any) => {
  const [workoutTitle, setWorkoutTitle] = useState("Quick Workout");
  const [inputIsDisabled, setInputIsDisabled] = useState(true);
  const workoutTitleRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

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
        onChangeText={(text) => setWorkoutTitle(text)}
        borderWidth={0}
        paddingLeft={0}
        _focus={{ backgroundColor: "white" }}
        fontSize={"xl"}
        ref={workoutTitleRef}
        editable
        InputRightElement={renderTickOrEdit()}
      />
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
        <Button
          backgroundColor="rose.400"
          height={10}
          onPress={handleCancelWorkout}
        >
          <Text color="white" fontWeight={"semibold"}>
            Cancel Workout
          </Text>
        </Button>
      </Box>
    );
  };

  return (
    <ScrollView flex={1} backgroundColor={"white"}>
      <Box padding={3}>
        {renderHeading()}
        {renderTimer()}
      </Box>
      <Box>
        <Sets />
        <Box flex={1}></Box>
      </Box>
      <Box padding={3}>{renderButtons()}</Box>
    </ScrollView>
  );
};

export default ActiveWorkout;
