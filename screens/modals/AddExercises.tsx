import { Heading, Pressable, Text, View } from "native-base";
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
  const { userId } = useAppSelector((state) => state.userSlice.user);
  const { exercises } = useAppSelector((state) => state.currentWorkoutSlice);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleAddExercises = () => {
    const params = Object.values(exercises).map((el) => {
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

  const renderList = () => <ExerciseList showExerciseDetails={false} />;

  const renderAddExercises = () => {
    const exercisesLength = Object.keys(exercises).length;

    const buttonText =
      exercisesLength < 1
        ? "Add Exercise"
        : `Add Selected Exercises (${exercisesLength})`;

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
    <View
      paddingTop={3}
      paddingX={3}
      backgroundColor={"white"}
      h="full"
      flex={1}
      flexGrow={1}
      _web={{
        maxW: "lg",
        w: "100%",
        mx: "auto",
      }}
    >
      {renderHeading()}
      {renderList()}
      {renderAddExercises()}
    </View>
  );
};

export default AddExercises;
