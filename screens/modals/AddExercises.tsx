import { Heading, Pressable, Text, View } from "native-base";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { addLift } from "../../store/currentWorkoutSlice";
import { RootStackScreenProps } from "../../types";
import { ExerciseList } from "../../components/layout/ExerciseList";
import { useNavigation } from "@react-navigation/native";

export interface LiftData {
  exerciseId: number;
  exerciseName: string;
  liftId: string;
}

type Props = RootStackScreenProps<"AddExercises">;

const AddExercises: React.FC<Props> = () => {
  const [liftData, setLiftData] = useState<LiftData[]>([]);
  const { userId } = useAppSelector((state) => state.userSlice.user);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleAddExercises = () => {
    // NOTE: IF CHECK
    // IF A ID HAS BEEN REMOVED FROM THE LIST
    // WE DISPATCH AN ACTION WHICH REMOVES IT FROM THE CURRENT WORKOUT
    const params = liftData.map((el) => {
      return {
        ...el,
        userId,
      };
    });
    console.log(params)
    dispatch(addLift(params));
    navigation.goBack();
  };

  const renderHeading = () => (
    <Heading size="sm" color={"text.500"} my={2}>
      All Exercises
    </Heading>
  );

  const renderList = () => {
    const props = {
      cardProps: {
        setLiftData,
        liftData,
      },
      config: {
        showInput: true,
        showFilterButtons: false,
      },
    };

    return <ExerciseList {...props} />;
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

export default AddExercises;
