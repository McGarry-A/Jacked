import { Box, Heading, HStack, Pressable, Text, VStack } from "native-base";
import { SetInterface } from "../types/CurrentWorkoutInterface";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import Set from "./Set";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { addSet } from "../store/currentWorkoutSlice";
import useId from "../hooks/useId";
import { useAppDispatch, useAppSelector } from "../store";

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
    <VStack my={1} borderRadius={3} key={liftId}>
      <Box>
        <VStack>
          {renderHeading(exerciseName)}
          {renderTableHead()}
          {renderSets(sets, liftId)}
        </VStack>
      </Box>
      {renderAddSet(liftId)}
    </VStack>
  );
};

export default Lift;
