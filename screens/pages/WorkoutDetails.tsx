import { Box, Text, Heading, ScrollView, FlatList, HStack } from "native-base";
import useWorkout from "../../hooks/useWorkout";

const WorkoutDetails = ({ route }: any) => {
  const { workoutId } = route && route.params;

  const { isLoading, error, workout } = useWorkout(workoutId);

  if (typeof workout === "undefined" || error || isLoading) return <></>;

  const renderTitle = () => {
    const { name } = workout;

    return <Heading>{name}</Heading>;
  };

  const renderWorkoutDetails = () => {
    const { date } = workout;

    return (
      <Box>
        <Text>{date}</Text>
      </Box>
    );
  };

  const renderLiftHead = (exerciseName: string) => {
    return (
      <>
        <Text>{exerciseName}</Text>
        <HStack justifyContent={"space-between"}>
          <Text>Set</Text>
          <Text>Weight</Text>
          <Text>Reps</Text>
          <Text>1RM</Text>
        </HStack>
      </>
    );
  };

  const renderLifts = () => {
    const { lifts } = workout;

    return lifts.map((lift, index) => {
      return <>{renderLiftHead(lift.exerciseName)}</>;
    });
  };

  const renderLiftSets = (sets: { weight: string; reps: string }) => {
    return;
  };

  return (
    <ScrollView>
      {renderTitle()}
      {renderWorkoutDetails()}
    </ScrollView>
  );
};

export default WorkoutDetails;
