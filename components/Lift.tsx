import { Box, Heading, HStack, Pressable, Text, VStack } from "native-base";
import { SetInterface } from "../types/CurrentWorkoutInterface";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import Set from "./Set";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { addSet, deleteLift } from "../store/currentWorkoutSlice";
import useId from "../hooks/useId";
import { useAppDispatch, useAppSelector } from "../store";
import { Swipeable } from "react-native-gesture-handler";
import { useRef } from "react";

interface Props {
  exerciseId: number;
  exerciseName: string;
  sets: SetInterface;
  liftNumber: number;
  liftId: string;
}
const Lift = (props: Props) => {
  const { exerciseName, sets, liftId } = props;

  const workoutState = useAppSelector((state) => state.currentWorkoutSlice);
  const dispatch = useAppDispatch();

  const swipeableRef = useRef<null | any>(null);

  const renderOnSwipeRight = (x: any, y: any) => {
    console.log(x);
    console.log(y);
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
          Delete Lift
        </Text>
      </Box>
    );
  };

  const handleSwipeRight = () => {
    dispatch(deleteLift({ liftId }));
    swipeableRef.current && swipeableRef.current.close();
  };

  const handleAddSet = (liftId: string) => {
    const setNumber =
      Object.keys(workoutState.exercises[liftId].sets).length + 1;

    const setId = useId("set");
    dispatch(addSet({ liftId, setId, setNumber }));
  };

  const renderHeading = (exerciseName: string) => (
    <Heading size="sm" color={"info.400"} my={1} padding={2}>
      {exerciseName}
    </Heading>
  );

  const renderTableHead = () => (
    <HStack
      alignItems="center"
      justifyContent={"space-between"}
      my={1}
      paddingX={2}
    >
      <Heading size="xs">Sets</Heading>
      <Heading size="xs">Previous</Heading>
      <Heading size="xs">Kg</Heading>
      <Heading size="xs">Reps</Heading>
      <Pressable>
        <FontAwesomeIcon icon={faCheck} size={10} />
      </Pressable>
    </HStack>
  );

  const renderAddSet = (liftId: string) => {
    return (
      <Pressable
        w="full"
        bg={"whitesmoke"}
        mt={2}
        onPress={() => handleAddSet(liftId)}
      >
        <Text textAlign={"center"} py={1} fontWeight={600}>
          Add a set
        </Text>
      </Pressable>
    );
  };

  const renderSets = (sets: SetInterface, liftId: string) =>
    Object.values(sets).map((set) => (
      <Set {...set} liftId={liftId} key={set.setId} />
    ));

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderOnSwipeRight}
      onSwipeableOpen={handleSwipeRight}
      rightThreshold={10}
    >
      <VStack borderRadius={3} key={liftId} backgroundColor={"white"}>
        <Box>
          <VStack>
            {renderHeading(exerciseName)}
            {renderTableHead()}
            {renderSets(sets, liftId)}
          </VStack>
        </Box>
        {renderAddSet(liftId)}
      </VStack>
    </Swipeable>
  );
};

export default Lift;
