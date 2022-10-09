import { FontAwesome } from "@expo/vector-icons";
import { Box, Heading, HStack, Text, VStack, Pressable } from "native-base";
import { useAppDispatch, useAppSelector } from "../store";
import { addSet } from "../store/currentWorkoutSlice";
import { SetInterface } from "../types/LiftInterface";
import Set from "./Set";

const Sets = () => {
  const dispatch = useAppDispatch();
  const workoutDetails = useAppSelector((state) => state.currentWorkoutSlice);
  const { exerciseOrder, exercises } = workoutDetails;

  const handleAddSet = (exerciseId: number, setNumber: number) => {
    dispatch(addSet({ exerciseId, setNumber }));
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
    const setNumber =
      Object.keys(workoutDetails.exercises[exerciseId].sets).length + 1;
    return (
      <Pressable
        w="full"
        bg={"whitesmoke"}
        my={2}
        onPress={() => handleAddSet(exerciseId, setNumber)}
      >
        <Text textAlign={"center"} py={1} fontWeight={600}>
          Add a set
        </Text>
      </Pressable>
    );
  };

  const renderSets = (sets: SetInterface, exerciseId: number) =>
    Object.keys(sets).map((setId, index) => (
      <Set setId={setId} sets={sets} exerciseId={exerciseId} key={index} />
    ));

  return (
    <VStack flex={1} px={3}>
      {exerciseOrder.map((el, index) => {
        const { exerciseName, sets, exerciseId } = exercises[el];
        return (
          <VStack key={index}>
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

export default Sets;
