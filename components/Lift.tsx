import { Box, Heading, HStack, Pressable, Text, VStack } from "native-base";
import { SetInterface } from "../types/CurrentWorkoutInterface";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons/faCheckDouble";
import Set from "./Set";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { addSet, deleteLift } from "../store/currentWorkoutSlice";
import useId from "../hooks/useId";
import { useAppDispatch } from "../store";
import { Swipeable } from "react-native-gesture-handler";
import { useRef, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

interface Props {
  exerciseId: number;
  exerciseName: string;
  sets: SetInterface;
  liftNumber: number;
  liftId: string;
}
const Lift = (props: Props) => {
  const [allDone, setAllDone] = useState<boolean>(false);
  const { exerciseName, sets, liftId, exerciseId } = props;
  const dispatch = useAppDispatch();

  const swipeableRef = useRef<null | any>(null);

  const handleCheckAllSets = () => {
    if (allDone === false) setAllDone(true);
    if (allDone === true) setAllDone(false);
  };

  const handleSwipeRight = () => {
    dispatch(deleteLift({ liftId }));
    swipeableRef.current && swipeableRef.current.close();
  };

  const handleAddSet = (liftId: string) => {
    const setId = useId("set");

    dispatch(addSet({ liftId, setId }));
  };

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
          Delete Lift
        </Text>
      </Box>
    );
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
      <Pressable onPress={() => handleCheckAllSets()} padding={1}>
        <FontAwesomeIcon icon={faCheckDouble} size={10} />
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

  const renderSets = (sets: SetInterface, liftId: string) => {
    const setList = Object.values(sets);

    return (
      <VStack>
        {setList.map((set) => (
          <Set
            {...set}
            liftId={liftId}
            key={set.setId}
            checked={allDone}
            exerciseId={exerciseId}
          />
        ))}
      </VStack>
    );
  };

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
