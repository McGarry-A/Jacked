import { Avatar, Box, Checkbox, Pressable, Skeleton, Text } from "native-base";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import generateColor from "../../utils/generateColor";
import getExerciseInitials from "../../utils/getExerciseInitials";
import { LiftData } from "../../screens/AddExercises";
import useId from "../../hooks/useId";

interface Props {
  exercise_name: string;
  category: string;
  targets: string;
  description: string;
  image: string;
  id: number;
  setLiftData?: React.Dispatch<React.SetStateAction<LiftData[]>>;
  liftData?: LiftData[];
}

const ExerciseCard = ({
  exercise_name,
  id,
  targets,
  setLiftData,
  liftData,
}: Props) => {
  const dispatch = useAppDispatch();
  const exercises = useAppSelector(
    (state) => state.currentWorkoutSlice.exercises
  );

  const isInWorkout = Object.keys(exercises).includes(String(id));
  const [isActive, setIsActive] = useState(isInWorkout);

  const backgroundColor = isActive ? "info.50" : "white";
  const isLoaded =
    useAppSelector((state) => state.exerciseListSlice.status) === "fulfilled";

  // REVIEW:
  // MIGHT NEED TO CHANGE IF NEGATIVELY AFFECTS EXERCISE PAGE ** ! OPERATOR
  // ADD FUNCTION SHOULD BE IN THE PARENT COMPONENT
  const handleAddToLiftData = () => {
    if (!liftData || !setLiftData) return;
    console.log("handle add")
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

    //NOTE: REMOVE FROM LIST
    const newState = [...(liftData as LiftData[])];
    const newData = newState.filter((el) => el.exerciseId !== id);
    setLiftData(newData);
    setIsActive(false)
  };

  const renderAvatar = () => {
    return (
      <Avatar backgroundColor={generateColor()} marginRight={2}>
        <Text>{getExerciseInitials(exercise_name)}</Text>
      </Avatar>
    );
  };

  const renderCheckbox = () => {
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
    return (
      <Box flex={1}>
        <Text fontWeight={"semibold"}>{exercise_name}</Text>
        <Text color="text.900">{targets}</Text>
      </Box>
    );
  };

  return (
    <Box padding={2} borderColor={"gray.200"} backgroundColor={backgroundColor}>
      <Skeleton isLoaded={isLoaded} h={12}>
        <Pressable
          flexDirection={"row"}
          alignItems="center"
          onPress={setLiftData ? handleAddToLiftData : null}
        >
          {renderAvatar()}
          {renderBody()}
          {renderCheckbox()}
        </Pressable>
      </Skeleton>
    </Box>
  );
};

export default ExerciseCard;
