import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { Box, HStack, Input, Pressable, Text } from "native-base";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { deleteSet, updateSet } from "../../store/currentWorkoutSlice";
import { Swipeable } from "react-native-gesture-handler";
import usePreviousSet from "../../hooks/usePreviousSet";

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

const Set = (props: Props) => {
  const { exerciseId, setNumber, checked, weight, reps } = props;

  const [newWeight, setNewWeight] = useState<string>("0");
  const [newReps, setNewReps] = useState<string>("0");
  const [isDone, setIsDone] = useState<boolean>(false);

  const swipeableRef = useRef<null | any>(null);

  const previous = usePreviousSet({ exerciseId, setNumber });
  const dispatch = useAppDispatch();

  const backgroundColor = isDone ? "success.100" : "white";

  const weightRef = useRef<HTMLInputElement>();
  const repsRef = useRef<HTMLInputElement>();

  useEffect(() => {
    weightRef.current!.value = previous!.weight;
    repsRef.current!.value = previous!.reps;
  }, []);

  useEffect(() => {
    if (checked === true) setIsDone(true);
    if (checked === false) setIsDone(false);
  }, [checked]);

  const handleSwipeRight = () => {
    const { liftId, setId } = props;

    dispatch(deleteSet({ liftId, setId, setNumber }));
    swipeableRef.current && swipeableRef.current.close();
  };

  const handleUpdateSet = () => {
    const { setId, liftId } = props;

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

  const renderOnSwipeRight = () => {
    return (
      <Box
        backgroundColor={"red.500"}
        w={"full"}
        justifyContent={"center"}
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

  const renderSetNumber = () => (
    <Box flex={1}>
      <Pressable
        w={"1/2"}
        alignItems="center"
        justifyContent={"center"}
        borderRadius={6}
        zIndex={"-1"}
      >
        <Text color="text.600" textAlign={"center"} w={5} fontWeight={700}>
          {setNumber}
        </Text>
      </Pressable>
    </Box>
  );

  const renderPrevious = () => {
    if (!previous) return <Box flex={2}></Box>;

    return (
      <Text fontSize="xs" opacity={50} flex={2} fontWeight={700}>
        {previous?.weight}KG x {previous?.reps}
      </Text>
    );
  };

  const renderWeightInput = () => (
    <Box flex={2} py={1}>
      <Input
        placeholder={weight}
        backgroundColor={"whitesmoke"}
        keyboardType={"numeric"}
        isDisabled={isDone}
        onChangeText={(text) => setNewWeight(text)}
        w={16}
        fontWeight={700}
        textAlign={"center"}
        color={"coolGray.700"}
        ref={weightRef}
      />
    </Box>
  );

  const renderRepsInput = () => (
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
        ref={repsRef}
      />
    </Box>
  );

  const renderCheck = () => (
    <Pressable alignItems={"flex-end"} flexShrink={1} onPress={handleUpdateSet}>
      <FontAwesomeIcon icon={faCheck} size={15} />
    </Pressable>
  );

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
        {renderSetNumber()}
        {renderPrevious()}
        {renderWeightInput()}
        {renderRepsInput()}
        {renderCheck()}
      </HStack>
    </Swipeable>
  );
};

export default Set;
