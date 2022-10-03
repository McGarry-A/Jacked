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
  isPressable?: boolean;
}

const ExerciseCard = ({
  exercise_name,
  targets,
  isPressable = false,
}: Props) => {
  const [isActive, setIsActive] = useState(false);

  const backgroundColor = isActive ? "info.50" : "white";
  const handlePress = () => setIsActive((state) => !state);

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
      <Pressable
        flexDirection={"row"}
        alignItems="center"
        onPress={isPressable ? handlePress : null}
      >
        {renderAvatar()}
        {renderBody()}
        {renderCheckbox()}
      </Pressable>
    </Box>
  );
};

export default ExerciseCard;
