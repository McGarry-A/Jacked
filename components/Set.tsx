import { FontAwesome } from "@expo/vector-icons";
import { Box, HStack, Input, Pressable, Text } from "native-base";
import { useState } from "react";
import { useAppDispatch } from "../store";
import { addSetNumbers, deleteSet } from "../store/currentWorkoutSlice";
import { SetInterface } from "../types/LiftInterface";
import { Swipeable } from "react-native-gesture-handler";

interface Props {
  setId: string;
  exerciseId: number;
  sets: SetInterface[];
}

const Set = ({ setId, sets, exerciseId }: Props) => {
  const [newWeight, setNewWeight] = useState<string>("0");
  const [newReps, setNewReps] = useState<string>("0");
  const [isDone, setIsDone] = useState(false);

  const dispatch = useAppDispatch();
  const { weight, reps } = sets[setId as unknown as number];

  const handleUpdateSet = () => {
    dispatch(addSetNumbers({ exerciseId, setId, newWeight, newReps }));
    setIsDone(!isDone);
  };

  const backgroundColor = isDone ? "green.50" : "white";

  const renderOnSwipeRight = () => {
    return (
      <Box backgroundColor={"red.500"} w={"full"} justifyContent={"center"}>
        <Text fontWeight={"700"} textAlign={"center"} color={"white"}>
          Delete Set
        </Text>
      </Box>
    );
  };

  const handleSwipeRight = () => {
    dispatch(deleteSet({ exerciseId, setId }));
  };

  return (
    <Swipeable
      renderRightActions={renderOnSwipeRight}
      onSwipeableOpen={handleSwipeRight}
    >
      <HStack
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={backgroundColor}
        paddingX={3}
      >
        <Text flexBasis={"22%"}>{setId}</Text>
        <Text flex={1}>previous</Text>
        <Box flex={1}>
          <Input
            placeholder={weight}
            backgroundColor={"whitesmoke"}
            keyboardType={"numeric"}
            isDisabled={isDone}
            onChangeText={(text) => setNewWeight(text)}
            w={16}
            fontWeight={700}
            textAlign={"center"}
            color={"text.900"}
          />
        </Box>
        <Box flex={1} py={1}>
          <Input
            placeholder={reps}
            backgroundColor={"whitesmoke"}
            keyboardType={"numeric"}
            isDisabled={isDone}
            onChangeText={(text) => setNewReps(text)}
            w={16}
            fontWeight={700}
            textAlign={"center"}
            color={"text.900"}
          />
        </Box>
        <Pressable
          alignItems={"flex-end"}
          flexShrink={1}
          onPress={() => handleUpdateSet()}
        >
          <FontAwesome name="check" size={10} />
        </Pressable>
      </HStack>
    </Swipeable>
  );
};

export default Set;
