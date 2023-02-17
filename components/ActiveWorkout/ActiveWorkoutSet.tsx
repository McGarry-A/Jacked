import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { Box, HStack, Input, Pressable, Text } from "native-base";
import { useRef, useState } from "react";
import { useAppDispatch } from "../../store";
import { deleteSet, updateReps, updateWeight } from "../../store/currentWorkoutSlice";
import { Swipeable } from "react-native-gesture-handler";
import usePreviousSet from "../../hooks/usePreviousSet";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";

interface Props {
  weight: string;
  reps: string;
  rpe: number;
  setNumber: number;
  liftId: string;
  setId: string;
  exerciseId: number;
  template: boolean;
}

const ActiveWorkoutSet = (props: Props) => {
  const { exerciseId, setNumber, weight, reps, template } = props;
  const [isDone, setIsDone] = useState<boolean>(false);

  const swipeableRef = useRef<null | any>(null);

  const previous = usePreviousSet({ exerciseId, setNumber });
  const dispatch = useAppDispatch();

  const backgroundColor = isDone ? "success.100" : "white";

  const weightRef = useRef<HTMLInputElement>();
  const repsRef = useRef<HTMLInputElement>();

  const handleSwipeRight = () => {
    const { liftId, setId } = props;

    dispatch(deleteSet({ liftId, setId, setNumber }));
    swipeableRef.current && swipeableRef.current.close();
  };

  const handleUpdateWeight = (newwWeight: string) => { 
    const { setId, liftId } = props;

    const params = {
      liftId,
      setId,
      weight: newwWeight
    }

    dispatch(updateWeight(params))
  }

  const handleUpdateReps = (newwReps: string) => {
    const { setId, liftId } = props;

    const params = {
      liftId,
      setId,
      reps: newwReps
    }

    dispatch(updateReps(params))
   } 

  const handleCheckSet = () => {

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

  const renderDash = () => {
    return <FontAwesomeIcon icon={faMinus} size={18} />;
  };

  const renderPrevious = () => {
    if (!previous) return <Box flex={2}>{renderDash()}</Box>;

    const previousString = `${previous?.weight} kg x ${previous?.reps}`;

    return (
      <Text fontSize="xs" opacity={50} flex={2} fontWeight={700}>
        {previousString}
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
        onChangeText={(text) => handleUpdateWeight(text)}
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
        onChangeText={(text) => handleUpdateReps(text)}
        w={16}
        fontWeight={700}
        textAlign={"center"}
        color={"text.900"}
        ref={repsRef}
      />
    </Box>
  );

  const renderCheck = () => {
    return (
      <Pressable
        alignItems={"flex-end"}
        flexShrink={1}
        onPress={handleCheckSet}
      >
        <FontAwesomeIcon icon={template ? faMinus : faCheck} size={15} />
      </Pressable>
    );
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
        {renderSetNumber()}
        {renderPrevious()}
        {renderWeightInput()}
        {renderRepsInput()}
        {renderCheck()}
      </HStack>
    </Swipeable>
  );
};

export default ActiveWorkoutSet;
