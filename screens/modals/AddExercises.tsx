import { FontAwesome } from "@expo/vector-icons";
import { Heading, Input, Pressable, Text, View } from "native-base";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchAllExercises } from "../../store/exerciseList";
import { addLift } from "../../store/currentWorkoutSlice";
import { RootStackScreenProps } from "../../types";
import ExerciseInterface from "../../types/ExerciseInterface";
import { ExerciseList } from "../../components/layout/ExerciseList";

export interface LiftData {
  exerciseId: number;
  exerciseName: string;
  liftId: string;
}

const AddExercises = ({ navigation }: RootStackScreenProps<"AddExercises">) => {
  const [liftData, setLiftData] = useState<LiftData[]>([]);
  const [exercises, setExercises] = useState<ExerciseInterface[]>([]);

  const userId = useAppSelector((state) => state.userSlice.user.userId);

  const dispatch = useAppDispatch();
  const { exerciseList, status } = useAppSelector(
    (state) => state.exerciseListSlice
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllExercises());
    }

    setExercises(exerciseList);
  }, [status]);

  const handleAddExercises = () => {
    const params = liftData.map((el) => {
      return {
        ...el,
        userId,
      };
    });

    dispatch(addLift(params));
    navigation.goBack();
  };

  const handleFilterExercises = (text: string) => {
    const filteredExercises = exerciseList.filter((el) =>
      el.exercise_name.includes(text)
    );
    setExercises(filteredExercises);
  };

  const renderInput = () => {
    return (
      <Input
        placeholder="Filter Exercises Here"
        size="lg"
        type="text"
        variant={"filled"}
        marginBottom={2}
        onChangeText={(text) => handleFilterExercises(text)}
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
    <Heading size="sm" color={"text.500"} my={2}>
      All Exercises
    </Heading>
  );

  const renderList = () => {
    const liftProps = {
      setLiftData,
      liftData,
    };

    return <ExerciseList cardProps={liftProps} />;
  };

  const renderAddExercises = () => {
    const buttonText =
      liftData.length < 1
        ? "Add Exercise"
        : `Add Selected Exercises (${liftData.length})`;

    return (
      <Pressable
        backgroundColor={"info.400"}
        alignItems={"center"}
        py={2}
        mb={4}
        onPress={handleAddExercises}
      >
        <Text fontWeight={700} color={"white"}>
          {buttonText}
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
