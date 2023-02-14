import { Box, Heading, HStack, Pressable, Text, VStack } from "native-base";
import { SetInterface } from "../../types/CurrentWorkoutInterface";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons/faCheckDouble";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import Set from "./Set";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { addSet, deleteLift } from "../../store/currentWorkoutSlice";
import useId from "../../hooks/useId";
import { useAppDispatch } from "../../store";
import { Swipeable } from "react-native-gesture-handler";
import { useRef, useState } from "react";

interface IProps {
  exerciseId: number;
  exerciseName: string;
  sets: SetInterface;
  liftNumber: number;
  liftId: string;
  template: boolean;
}
const Lift = (props: IProps) => {
  const { exerciseName, sets, liftId, exerciseId } = props;
  const dispatch = useAppDispatch();

  const swipeableRef = useRef<null | any>(null);

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
        justifyContent={"center"}
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
    <Heading size={"md"} color={"info.400"} my={1} padding={2}>
      {exerciseName}
    </Heading>
  );

  const renderCheck = () => {
    const { template } = props;

    return (
      <Pressable flexShrink={1} padding={1}>
        <FontAwesomeIcon icon={template ? faLock : faCheckDouble} size={10} />
      </Pressable>
    );
  };

  const renderTableHead = () => {
    return (
      <HStack
        alignItems="center"
        justifyContent={"space-between"}
        my={2}
        paddingX={2}
      >
        <Heading size="xs" flexShrink={1}>
          Sets
        </Heading>
        <Heading size="xs" flex={2} textAlign="center">
          Previous
        </Heading>
        <Heading size="xs" flex={2} textAlign="center" mr={1}>
          Kg
        </Heading>
        <Heading size="xs" flex={2} textAlign="center" mr={4}>
          Reps
        </Heading>
        {renderCheck()}
      </HStack>
    );
  };

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
    const { template } = props;
    const setList = Object.values(sets);

    return (
      <VStack>
        {setList.map((set) => (
          <Set
            {...set}
            liftId={liftId}
            key={set.setId}
            exerciseId={exerciseId}
            template={template}
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
      containerStyle={{ marginVertical: 4 }}
    >
      <VStack key={liftId} backgroundColor={"white"} p={3}>
        {renderHeading(exerciseName)}
        {renderTableHead()}
        {renderSets(sets, liftId)}
        {renderAddSet(liftId)}
      </VStack>
    </Swipeable>
  );
};

export default Lift;
