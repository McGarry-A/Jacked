import {
  Box,
  Text,
  Pressable,
  Input,
  View,
  VStack,
  Image,
  FlatList,
} from "native-base";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Timer from "../../components/Timer";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  setWorkoutTitle as setWorkoutName,
  saveWorkout,
} from "../../store/currentWorkoutSlice";
import Lift from "../../components/Lift";

const ActiveWorkout = ({ route, navigation }: any) => {
  const titleInState = useAppSelector(
    (state) => state.currentWorkoutSlice.workoutTitle
  );
  const title = titleInState ? titleInState : "Quick Workout";

  const [workoutTitle, setWorkoutTitle] = useState(title);

  const workoutTitleRef = useRef<HTMLInputElement>(null);
  const state = useAppSelector((state) => state.currentWorkoutSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (route.params) {
      const {
        title: { title },
      } = route.params;
      setWorkoutTitle(title);
      dispatch(setWorkoutName(title));
    }
  }, []);

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
        rightElement={renderEndWorkout()}
      />
    );
  };

  const renderTimer = () => (
    <Box paddingX={3} mb={2}>
      <Timer />
    </Box>
  );

  const renderEndWorkout = () => {
    return (
      <Box flexDir={"row"} justifyContent={"flex-end"} pr={2}>
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
      <VStack flex={1} px={3} space={1}>
        <FlatList
          data={Object.values(exercises)}
          renderItem={({ item }) => <Lift {...item} />}
          keyExtractor={(item) => item.liftId}
        />
      </VStack>
    );
  };

  return (
    <View backgroundColor={"white"} h={"full"} px={1} py={3}>
      {renderHeading()}
      {renderTimer()}
      {renderLifts()}
      <Box padding={3}>{renderButtons()}</Box>
    </View>
  );
};

export default ActiveWorkout;
