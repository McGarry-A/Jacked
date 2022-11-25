import { Avatar, Box, Checkbox, Pressable, Skeleton, Text } from "native-base";
import { useState } from "react";
import { useAppSelector } from "../../store";
import getExerciseInitials from "../../utils/getExerciseInitials";
import { LiftData } from "../../screens/modals/AddExercises";
import useId from "../../hooks/useId";

interface IProps {
  exercise_name: string;
  category: string;
  targets: string;
  description: string;
  image: string;
  id: number;
  isLoading: boolean;
  setLiftData?: React.Dispatch<React.SetStateAction<LiftData[]>>;
  liftData?: LiftData[];
}

const ExerciseCard = (props: IProps) => {
  const { isLoading, setLiftData, id } = props;

  const exercises = useAppSelector(
    (state) => state.currentWorkoutSlice.exercises
  );

  const isInWorkout = Object.keys(exercises).includes(String(id));
  const [isActive, setIsActive] = useState(isInWorkout);

  const backgroundColor = isActive ? "info.50" : "white";

  const handleAddToLiftData = () => {
    const { liftData, setLiftData, id, exercise_name } = props;

    if (!liftData || !setLiftData) return;

    if (!isActive) {
      const liftId = useId("lift");

      const lift = {
        exerciseId: id,
        exerciseName: exercise_name,
        liftId,
      };

      setLiftData!((liftData) => [...liftData, lift]);
      setIsActive(true);
      return;
    }

    const newState = [...(liftData as LiftData[])];
    const newData = newState.filter((el) => el.exerciseId !== id);
    setLiftData(newData);
    setIsActive(false);
  };

  const renderAvatar = () => {
    const { exercise_name } = props;

    return (
      <Avatar marginRight={2} backgroundColor={"transparent"}>
        <Text
          fontSize={"lg"}
          fontWeight={"extrabold"}
          letterSpacing={"lg"}
          color={"text.800"}
        >
          {getExerciseInitials(exercise_name)}
        </Text>
      </Avatar>
    );
  };

  const renderCheckbox = () => {
    const { setLiftData } = props;

    if (setLiftData) {
      return (
        <Box>
          <Checkbox
            value="isActive"
            colorScheme={"info"}
            isChecked={isActive}
            aria-label="Add to workout"
            borderWidth={"0"}
            outlineColor="white"
            _checked={{ backgroundColor: "info.200" }}
          />
        </Box>
      );
    }

    return null;
  };

  const renderBody = () => {
    const { exercise_name, targets } = props;

    return (
      <Box flex={1}>
        <Text fontWeight={"semibold"}>{exercise_name}</Text>
        <Text color="text.900">{targets}</Text>
      </Box>
    );
  };

  return (
    <Skeleton
      my={2}
      h={12}
      startColor={"gray.200"}
      endColor={"coolGray.200"}
      isLoaded={isLoading}
    >
      <Box
        padding={2}
        borderColor={"gray.200"}
        backgroundColor={backgroundColor}
      >
        <Pressable
          flexDirection={"row"}
          alignItems="center"
          onPress={setLiftData ? handleAddToLiftData : null}
        >
          {renderAvatar()}
          {renderBody()}
          {renderCheckbox()}
        </Pressable>
      </Box>
    </Skeleton>
  );
};

export default ExerciseCard;
