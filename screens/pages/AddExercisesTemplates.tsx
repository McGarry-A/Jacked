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

const AddExercisesTemplates = ({ navigation }: RootStackScreenProps<"AddExercises">) => {
  const [liftData, setLiftData] = useState<LiftData[]>([]);

  const userId = useAppSelector((state) => state.userSlice.user.userId);

  const dispatch = useAppDispatch();

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

    const config = {
      showInput: true,
      showFilterButtons: false,
    };

    return <ExerciseList cardProps={liftProps} config={config} />;
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
      {renderHeading()}
      {renderList()}
      {renderAddExercises()}
    </View>
  );
};

export default AddExercisesTemplates;
