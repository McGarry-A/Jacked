import { FontAwesome } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { Box, HStack, Input, Pressable, Text } from "native-base";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { deleteSet, updateSet } from "../store/currentWorkoutSlice";
import { Swipeable } from "react-native-gesture-handler";
import { supabase } from "../supabase/supabaseClient";
import getPreviousSet from "../supabase/utils/getPreviousSet";

interface Props {
  weight: string;
  reps: string;
  rpe: number;
  setNumber: number;
  liftId: string;
  setId: string;
  checked: boolean;
  exerciseId: number;
}

const Set = ({
  weight,
  reps,
  setNumber,
  liftId,
  setId,
  checked,
  exerciseId,
}: Props) => {
  const [newWeight, setNewWeight] = useState<string>("0");
  const [newReps, setNewReps] = useState<string>("0");
  const [isDone, setIsDone] = useState<boolean>(false);
  const [previous, setPrevious] = useState<string>("");

  useEffect(() => {
    if (checked === true) setIsDone(true);
    if (checked === false) setIsDone(false);
  }, [checked]);

  const swipeableRef = useRef<null | any>(null);

  const dispatch = useAppDispatch();
  const backgroundColor = isDone ? "emerald.100" : "white";

  useEffect(() => {
    const prevData = async () => {
      const previous = await getPreviousSet({ exerciseId, setNumber });
      if (!previous) return setPrevious(`Na`);
      const { weight: prevWeight, reps: prevReps } = previous;

      if (prevWeight && prevReps)
        return setPrevious(`${prevWeight} Kgs x ${prevReps}`);
    };

    prevData();
  }, []);

  const renderOnSwipeRight = () => {
    return (
      <Box
        backgroundColor={"red.500"}
        w={"full"}
        justifyContent={"flex-end"}
        flexDir={"row"}
        alignItems="center"
        pr={6}
      >
        <Text fontWeight={"700"} textAlign={"center"} color={"white"}>
          Delete Set
        </Text>
      </Box>
    );
  };

  const handleSwipeRight = () => {
    dispatch(deleteSet({ liftId, setId, setNumber }));
    swipeableRef.current && swipeableRef.current.close();
  };

  const handleUpdateSet = () => {
    const newSet = {
      weight: newWeight,
      reps: newReps,
      rpe: 0,
      setNumber: setNumber,
      setId,
    };

    dispatch(
      updateSet({
        setId,
        liftId,
        newSet,
      })
    );

    setIsDone((isDone) => !isDone);
  };

  return (
    <Swipeable
      renderRightActions={renderOnSwipeRight}
      onSwipeableOpen={handleSwipeRight}
      rightThreshold={10}
      ref={swipeableRef}
    >
      <HStack
        alignItems={"center"}
        justifyContent={"space-between"}
        backgroundColor={backgroundColor}
        paddingX={2}
      >
        <Box flex={1}>
          <Text color="text.900" textAlign={"center"} w={5}>
            {setNumber}
          </Text>
        </Box>
        <Text fontSize="xs" opacity={50} flex={2}>
          {previous}
        </Text>
        <Box flex={2}>
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
        <Box flex={2} py={1}>
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
          onPress={handleUpdateSet}
        >
          <FontAwesomeIcon icon={faCheck} size={15} />
        </Pressable>
      </HStack>
    </Swipeable>
  );
};

export default Set;
