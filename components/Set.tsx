import { FontAwesome } from "@expo/vector-icons";
import { Box, HStack, Input, Pressable, Text } from "native-base";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { deleteSet } from "../store/currentWorkoutSlice";
import { Swipeable } from "react-native-gesture-handler";
import { SetInterface } from "../types/CurrentWorkoutInterface";

interface Props {
  set: SetInterface;
}

const Set = ({ set }: Props) => {
  const { weight, reps, setNumber } = set;

  const [newWeight, setNewWeight] = useState<string>("0");
  const [newReps, setNewReps] = useState<string>("0");
  const [isDone, setIsDone] = useState(false);

  const dispatch = useAppDispatch();

  const backgroundColor = isDone ? "emerald.100" : "white";

  const renderOnSwipeRight = () => {
    return (
      <Box backgroundColor={"red.500"} w={"full"} justifyContent={"center"}>
        <Text fontWeight={"700"} textAlign={"center"} color={"white"}>
          Delete Set
        </Text>
      </Box>
    );
  };

  const handleSwipeRight = () => {};

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
        <Text flexBasis={"22%"} color="text.900">
          {setNumber}
        </Text>
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
        <Pressable alignItems={"flex-end"} flexShrink={1}>
          <FontAwesome name="check" size={10} />
        </Pressable>
      </HStack>
    </Swipeable>
  );
};

export default Set;
