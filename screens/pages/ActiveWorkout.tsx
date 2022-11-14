import {
  Box,
  Text,
  Pressable,
  Input,
  ScrollView,
  View,
  VStack,
  Image,
} from "native-base";
import { useRef } from "react";
import { useState } from "react";
import Timer from "../../components/Timer";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  setWorkoutTitle as setWorkoutName,
  saveWorkout,
} from "../../store/currentWorkoutSlice";
import Lift from "../../components/Lift";

const ActiveWorkout = ({ navigation }: any) => {
  const [workoutTitle, setWorkoutTitle] = useState("Quick Workout");
  const workoutTitleRef = useRef<HTMLInputElement>(null);
  const state = useAppSelector((state) => state.currentWorkoutSlice);

  const dispatch = useAppDispatch();

  const handleEndWorkout = () => {
    dispatch(setWorkoutName(workoutTitle));
    dispatch(saveWorkout());
    navigation.navigate("Profile");
  };

  const renderHeading = () => {
    return (
      <Input
        flexDirection={"row"}
        alignItems="center"
        justifyContent={"space-between"}
        value={workoutTitle}
        variant={"unstyled"}
        onChangeText={(text) => setWorkoutTitle(text)}
        borderWidth={0}
        fontWeight={700}
        color={"text.600"}
        _focus={{ backgroundColor: "white" }}
        fontSize={"xl"}
        ref={workoutTitleRef}
        editable
      />
    );
  };

  const renderTimer = () => (
    <Box paddingX={3}>
      <Timer />
    </Box>
  );

  const renderEndWorkout = () => {
    return (
      <Box flexDir={"row"} justifyContent={"flex-end"} w="full" pr={2}>
        <Pressable
          mt={2}
          px={3}
          py={2}
          shadow={1}
          borderRadius={3}
          backgroundColor="success.400"
          onPress={handleEndWorkout}
        >
          <Text
            color="white"
            fontWeight={700}
            textAlign={"center"}
            fontSize="sm"
          >
            FINISH
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
      </Box>
    );
  };

  const renderLifts = () => {
    const { exercises } = state;

    if (Object.keys(exercises).length < 1) {
      return (
        <Box flexGrow={1} justifyContent={"center"} alignItems="center">
          <Image
            source={require("../../images/undraw_Powerful_re_frhr.png")}
            alt={"Personal Trainer Training Client"}
            size={"2xl"}
          />
          <Text
            color={"text.700"}
            opacity={50}
            fontWeight="semibold"
            textTransform="capitalize"
          >
            Add some lifts to start your workout!
          </Text>
        </Box>
      );
    }

    return (
      <ScrollView>
        <VStack flex={1} px={3} space={1}>
          {Object.values(exercises).map((el) => (
            <Lift {...el} key={el.liftId} />
          ))}
        </VStack>
      </ScrollView>
    );
  };

  return (
    <View backgroundColor={"white"} h={"full"}>
      {renderEndWorkout()}
      {renderHeading()}
      {renderTimer()}
      {renderLifts()}
      <Box padding={3}>{renderButtons()}</Box>
    </View>
  );
};

export default ActiveWorkout;
