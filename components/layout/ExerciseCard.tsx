import { Avatar, Box, Checkbox, Pressable, Skeleton, Text } from "native-base";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { addLift } from "../../store/currentWorkoutSlice";
import generateColor from "../../utils/generateColor";
import getExerciseInitials from "../../utils/getExerciseInitials";

interface Props {
  exercise_name: string;
  category: string;
  targets: string;
  description: string;
  image: string;
  id: number;
  isPressable?: boolean;
}

const ExerciseCard = ({
  exercise_name,
  id,
  targets,
  isPressable = false,
}: Props) => {
  const dispatch = useAppDispatch();
  const exercises = useAppSelector(
    (state) => state.currentWorkoutSlice.exercises
  );
  const userId = useAppSelector((state) => state.userSlice.user.userId);
  const isInWorkout = Object.keys(exercises).includes(String(id));
  const [isActive, setIsActive] = useState(isInWorkout);

  const backgroundColor = isActive ? "info.50" : "white";
  const isLoaded =
    useAppSelector((state) => state.exerciseListSlice.status) === "fulfilled";
  const handlePress = () => {
    // We need to create a temporary lift_id to use as a key in redux
    // The lift_id used in supabase will be a different id
    // We can create the lift Id based on the number of

    const liftNumber = Object.keys(exercises).length

    const params = {
      exerciseName: exercise_name,
      exerciseId: id,
      userId: userId,
      liftNumber
    };
    
    setIsActive((state) => !state);
    dispatch(addLift(params));
  };

  const renderAvatar = () => {
    return (
      <Avatar backgroundColor={generateColor()} marginRight={2}>
        <Text>{getExerciseInitials(exercise_name)}</Text>
      </Avatar>
    );
  };

  const renderCheckbox = () => {
    if (isPressable) {
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
          onPress={isPressable ? handlePress : null}
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
