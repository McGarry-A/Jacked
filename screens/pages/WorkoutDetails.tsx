import { Box, Text, Heading, ScrollView, HStack, VStack } from "native-base";
import useWorkout from "../../hooks/useWorkout";
import numbericDateToString from "../../utils/Date/numericDateToString";
import calculateOneRepMax from "../../utils/Workouts/calculateOneRepMax";

const WorkoutDetails = ({ route }: any) => {

  // NOTE: INTERFACE IS NOT CORRECT HERE
  const { workoutId } = route && route.params;

  const { isLoading, error, workout } = useWorkout(workoutId);

  if (typeof workout === "undefined" || error || isLoading) return <></>;

  console.log(workout);
  const renderTitle = () => {
    const { name = "Quick Workout" } = workout;

    return <Heading>{name}</Heading>;
  };

  const renderWorkoutDetails = () => {
    const { date } = workout;

    return (
      <Box>
        <Text color={"gray.500"}>{numbericDateToString(date)}</Text>
      </Box>
    );
  };

  const renderLiftHead = (exerciseName: string) => {
    return (
      <VStack space={1}>
        <Heading size="md">{exerciseName}</Heading>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"semibold"}>Set</Text>
          <Text fontWeight={"semibold"}>Weight</Text>
          <Text fontWeight={"semibold"}>Reps</Text>
          <Text fontWeight={"semibold"}>1RM</Text>
        </HStack>
      </VStack>
    );
  };

  const renderLifts = () => {
    const { lifts } = workout;

    console.log("lifts", lifts);

    return (
      <VStack space={3} my={3}>
        {lifts.map((lift, index) => {
          return (
            <VStack>
              {renderLiftHead(lift.exercise_name)}
              {lift.set.map((set) => renderLiftSet(set))}
            </VStack>
          );
        })}
      </VStack>
    );
  };

  const renderLiftSet = (sets: { weight: string; reps: string }) => {
    return (
      <HStack justifyContent={"space-between"}>
        <Text color={"gray.500"}>{sets.setNumber}</Text>
        <Text color={"gray.500"}>{sets.weight}</Text>
        <Text color={"gray.500"}>{sets.reps}</Text>
        <Text color={"gray.500"}>{calculateOneRepMax([{weight: sets.weight, reps: sets.reps}])}</Text>
      </HStack>
    );
  };

  return (
    <ScrollView backgroundColor={"white"} p={3}>
      {renderTitle()}
      {renderWorkoutDetails()}
      {renderLifts()}
    </ScrollView>
  );
};

export default WorkoutDetails;
