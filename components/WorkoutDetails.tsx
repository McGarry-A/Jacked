import { ISet, IWorkout } from "../types/WorkoutInterface";
import { Box, Heading, HStack, Text, View, VStack } from "native-base";
import numbericDateToString from "../utils/Date/numericDateToString";
import calculateOneRepMax from "../utils/Workouts/calculateOneRepMax";
import useWorkout from "../hooks/useWorkout";
import { Suspense } from "react";
import Loader from "./utils/Loader";

interface IWorkoutDetails {
  workoutId: number;
}

const WorkoutDetails = ({ workoutId }: IWorkoutDetails) => {
  const { isLoading, error, workout } = useWorkout(workoutId);

  if (typeof workout === "undefined" || error || isLoading) return <></>;

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

    return (
      <VStack space={3} my={3}>
        {lifts.map((lift, index) => {
          return (
            <VStack key={index}>
              {renderLiftHead(lift.exercise_name)}
              {lift.set.map((set, index) => renderLiftSet(set, index))}
            </VStack>
          );
        })}
      </VStack>
    );
  };

  const renderLiftSet = ({ setNumber, weight, reps }: ISet, index: number) => {
    return (
      <HStack justifyContent={"space-between"} key={index}>
        <Text color={"gray.500"}>{setNumber}</Text>
        <Text color={"gray.500"}>{weight}</Text>
        <Text color={"gray.500"}>{reps}</Text>
        <Text color={"gray.500"}>{calculateOneRepMax([{ weight, reps }])}</Text>
      </HStack>
    );
  };

  return (
    <Suspense fallback={<Loader />}>
      <View>
        {renderTitle()}
        {renderWorkoutDetails()}
        {renderLifts()}
      </View>
    </Suspense>
  );
};

export default WorkoutDetails;
