import { Avatar, Box, Pressable, Text } from "native-base";

interface Props {
  item: {
    name: string;
    category: "Barbell" | "Dumbell" | "Machine" | "Cable";
    targets: string;
    id: string;
  };
}

const ExerciseCard = (exercise: Props) => {
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };

  const getExerciseInitials = (itemName: string) => {
    return itemName.split(" ").map((el) => {
      return `${el[0]}`;
    });
  };

  return (
    <Box borderTopWidth={1} borderBottomWidth={1} paddingY={1} borderColor={'gray.200'}>
      <Pressable flexDirection={"row"} alignItems="center">
        <Avatar backgroundColor={generateColor()} marginRight={2}>
          <Text>{getExerciseInitials(exercise.item.name)}</Text>
        </Avatar>
        <Box>
          <Text fontWeight={'semibold'}>{exercise.item.name}</Text>
          <Text fontWeight={''}>{exercise.item.targets}</Text>
        </Box>
      </Pressable>
    </Box>
  );
};

export default ExerciseCard;
