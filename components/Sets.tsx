import { FontAwesome } from "@expo/vector-icons";
import {
  Box,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
  Pressable,
} from "native-base";
import { useAppDispatch, useAppSelector } from "../store";
import { addSet } from "../store/currentWorkoutSlice";
import { SetInterface } from "../types/LiftInterface";
import Set from "./Set";

const Sets = () => {
  const dispatch = useAppDispatch();
  const workoutDetails = useAppSelector((state) => state.currentWorkoutSlice);
  const { exerciseOrder, exercises } = workoutDetails;

  const handleAddSet = (id: number) => {
    dispatch(addSet(id));
  };

  const renderHeading = (exerciseName: string) => (
    <Heading size="sm" color={"info.400"}>
      {exerciseName}
    </Heading>
  );

  const renderTableHead = () => (
    <HStack justifyContent={"space-evenly"} alignItems="center">
      <Heading size="sm">Sets</Heading>
      <Heading size="sm">Previous</Heading>
      <Heading size="sm">Kg</Heading>
      <Heading size="sm">Reps</Heading>
      <FontAwesome name="check" size={10} />
    </HStack>
  );

  const renderAddSet = (exerciseId: number) => (
    <Pressable
      w="full"
      bg={"whitesmoke"}
      my={2}
      onPress={() => handleAddSet(exerciseId)}
    >
      <Text textAlign={"center"} py={1} fontWeight={700}>
        Add a set
      </Text>
    </Pressable>
  );

  const renderSets = (sets: SetInterface[], exerciseId: number) =>
    Object.keys(sets).map((setId, index) => (
      <Set setId={setId} sets={sets} exerciseId={exerciseId} key={index} />
    ));

  return (
    <VStack>
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
