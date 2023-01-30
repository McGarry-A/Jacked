import { Box, Text, Heading, ScrollView, HStack, VStack } from "native-base";
import useWorkout from "../../hooks/useWorkout";
import { ISet } from "../../types/WorkoutInterface";
import numbericDateToString from "../../utils/Date/numericDateToString";
import calculateOneRepMax from "../../utils/Workouts/calculateOneRepMax";

const WorkoutDetails = ({ route }: any) => {
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
            <VStack key={index}>
              {renderLiftHead(lift.exercise_name)}
              {lift.set.map((set) => renderLiftSet(set))}
            </VStack>
          );
        })}
      </VStack>
    );
  };

  const renderLiftSet = ({ setNumber, weight, reps }: ISet) => {

    return (
      <HStack justifyContent={"space-between"}>
        <Text color={"gray.500"}>{setNumber}</Text>
        <Text color={"gray.500"}>{weight}</Text>
        <Text color={"gray.500"}>{reps}</Text>
        <Text color={"gray.500"}>{calculateOneRepMax([{ weight, reps }])}</Text>
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
