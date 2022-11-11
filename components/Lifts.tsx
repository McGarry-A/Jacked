import { FontAwesome } from "@expo/vector-icons";
import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  Pressable,
  ScrollView,
} from "native-base";
import useId from "../hooks/useId";
import { useAppDispatch, useAppSelector } from "../store";
import { addSet } from "../store/currentWorkoutSlice";
import { SetInterface } from "../types/CurrentWorkoutInterface";
import Set from "./Set";

const Lifts = () => {
  const dispatch = useAppDispatch();
  const workoutDetails = useAppSelector((state) => state.currentWorkoutSlice);
  const { exerciseOrder, exercises } = workoutDetails;

  const handleAddSet = (liftId: string) => {
    const setNumber =
      Object.keys(workoutDetails.exercises[liftId].sets).length + 1;

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
        <FontAwesome name="check" size={10} />
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
    <ScrollView>
      <VStack flex={1} px={3}>
        {Object.values(exercises).map((el) => {
          const { exerciseName, sets, liftId } = el;
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
        })}
      </VStack>
    </ScrollView>
  );
};

export default Lifts;
