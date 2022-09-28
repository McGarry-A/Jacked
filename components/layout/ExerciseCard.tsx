import { useAtom } from "jotai";
import { Avatar, Box, Checkbox, Pressable, Text } from "native-base";
import { useState } from "react";
import { addToWorkoutIds } from "../../store/store";
import generateColor from "../../utils/generateColor";
import getExerciseInitials from "../../utils/getExerciseInitials";

interface Props {
  exercise_name: string;
  category: "Barbell" | "Dumbell" | "Machine" | "Cable" | "Bodyweight";
  targets: string;
  description: string;
  image: string;
  id: number;
}

const ExerciseCard = (exercise: Props) => {
  const { exercise_name, targets } = exercise;
  const [isActive, setIsActive] = useState(false);

  const backgroundColor = isActive ? "info.50" : "white";
  const [exerciseIds, setExerciseIds] = useAtom(addToWorkoutIds);

  const exersiseIsInState = exerciseIds.includes(exercise.id);

  return (
    <Box padding={2} borderColor={"gray.200"} backgroundColor={backgroundColor}>
      <Pressable
        flexDirection={"row"}
        alignItems="center"
        onPress={() => {
          setIsActive(!isActive);

          if (exersiseIsInState) {
            const newState = [...exerciseIds].filter(
              (el) => el !== exercise.id
            );
            setExerciseIds(newState)
          }
          if (!exersiseIsInState) setExerciseIds([...exerciseIds, exercise.id]);
        }}
      >
        <Avatar backgroundColor={generateColor()} marginRight={2}>
          <Text>{getExerciseInitials(exercise_name)}</Text>
        </Avatar>
        <Box flex={1}>
          <Text fontWeight={"semibold"}>{exercise_name}</Text>
          <Text color="text.900">{targets}</Text>
        </Box>
        <Box>
          <Checkbox
            value="isActive"
            colorScheme={"info"}
            isChecked={isActive}
            aria-label="Add to workout"
          />
        </Box>
      </Pressable>
    </Box>
  );
};

export default ExerciseCard;
