import { FontAwesome } from "@expo/vector-icons";
import { Box, Heading, HStack, Text, VStack, Pressable } from "native-base";
import { useAppDispatch, useAppSelector } from "../store";
import { addSet } from "../store/currentWorkoutSlice";
import { SetInterface } from "../types/CurrentWorkoutInterface";
import Set from "./Set";

const Lifts = () => {
  const dispatch = useAppDispatch();
  const workoutDetails = useAppSelector((state) => state.currentWorkoutSlice);
  const { exerciseOrder, exercises } = workoutDetails;

  const handleAddSet = (exerciseId: number, setNumber: number) => {
    // const { liftId } = workoutDetails.exercises[exerciseId];
    // dispatch(addSet({ exerciseId, setNumber, liftId }));
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
        <FontAwesome name="check" size={10} />
      </Pressable>
    </HStack>
  );

  const renderAddSet = (exerciseId: number) => {
    // const setNumber =
    //   Object.keys(workoutDetails.exercises[exerciseId].sets).length + 1;
    return (
      <Pressable
        w="full"
        bg={"whitesmoke"}
        mt={2}
        // onPress={() => handleAddSet(exerciseId, setNumber)}
      >
        <Text textAlign={"center"} py={1} fontWeight={600}>
          Add a set
        </Text>
      </Pressable>
    );
  };

  const renderSets = (sets: SetInterface[], exerciseId: number) =>
    sets.map((set) => (
      <Set set={set} />
    ));

  return (
    <VStack flex={1} px={3}>
      {exercises.map((el) => {
        const { exerciseName, sets, exerciseId } = el;
        return (
          <VStack key={el.exerciseId} my={1} borderRadius={3}>
            <Box>
              <VStack>
                {renderHeading(exerciseName)}
                {renderTableHead()}
                {renderSets(sets, exerciseId)}
              </VStack>
            </Box>
            {renderAddSet(exerciseId)}
          </VStack>
        );
      })}
    </VStack>
  );
};

export default Lifts;
