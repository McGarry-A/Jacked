import { Avatar, Box, Checkbox, Pressable, Text } from "native-base";
import { useState } from "react";
import generateColor from "../../utils/generateColor";
import getExerciseInitials from "../../utils/getExerciseInitials";

interface Props {
  exercise_name: string;
  category: string;
  targets: string;
  description: string;
  image: string;
  id: number;
}

const ExerciseCard = (exercise: Props) => {
  const { exercise_name, targets } = exercise;
  const [isActive, setIsActive] = useState(false);

  const backgroundColor = isActive ? "info.50" : "white";

  return (
    <Box padding={2} borderColor={"gray.200"} backgroundColor={backgroundColor}>
      <Pressable
        flexDirection={"row"}
        alignItems="center"
        onPress={() => setIsActive((state) => !state)}
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
            borderWidth={"0"}
            outlineColor="white"
            _checked={{ backgroundColor: "info.200" }}
          />
        </Box>
      </Pressable>
    </Box>
  );
};

export default ExerciseCard;
