import { FontAwesome } from "@expo/vector-icons";
import {
  Box,
  Button,
  FlatList,
  Heading,
  Input,
  Pressable,
  Skeleton,
  Text,
  View,
} from "native-base";
import { Suspense, useEffect, useState } from "react";
import ExerciseCard from "../components/layout/ExerciseCard";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchAllExercises } from "../store/exerciseList";
import { addLift } from "../store/currentWorkoutSlice";
import { RootStackScreenProps } from "../types";

export interface LiftData {
  exerciseId: number;
  exerciseName: string;
  liftId: string;
}

const AddExercises = ({ navigation }: RootStackScreenProps<"AddExercises">) => {
  const [liftData, setLiftData] = useState<LiftData[]>([]);
  const userId = useAppSelector((state) => state.userSlice.user.userId);

  const dispatch = useAppDispatch();
  const { exerciseList, status } = useAppSelector(
    (state) => state.exerciseListSlice
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllExercises());
    }
  }, []);

  const handleAddExercises = () => {
    const params = liftData.map((el, index) => {
      return {
        ...el,
        liftNumber: index,
        userId
      }
    })

    dispatch(addLift(params))
    navigation.goBack()
  };

  const renderInput = () => {
    return (
      <Input
        placeholder="Filter Exercises Here"
        size="lg"
        type="text"
        variant={"filled"}
        marginBottom={2}
        InputLeftElement={
          <FontAwesome
            name="search"
            color="darkgray"
            style={{ marginHorizontal: 8 }}
            size={15}
          />
        }
      />
    );
  };

  const renderHeading = () => (
    <Heading size="sm" color={"text.500"} mb={2}>
      All Exercises
    </Heading>
  );

  const renderList = () => {
    return (
      <Box my={2} flexGrow={1}>
        <Suspense fallback={<Skeleton h={"full"} />}>
          <FlatList
            data={exerciseList}
            renderItem={({ item }) => (
              <ExerciseCard {...item} setLiftData={setLiftData} liftData={liftData} />
            )}
          />
        </Suspense>
      </Box>
    );
  };

  const renderAddExercises = () => {
    return (
      <Pressable
        backgroundColor={"info.400"}
        alignItems={"center"}
        py={2}
        mb={4}
        onPress={handleAddExercises}
      >
        <Text fontWeight={700} color={"white"}>
          Add Selected Exercises
        </Text>
      </Pressable>
    );
  };

  return (
    <View padding={3} backgroundColor={"white"} h="full">
      {renderInput()}
      {renderHeading()}
      {renderList()}
      {renderAddExercises()}
    </View>
  );
};

export default AddExercises;
