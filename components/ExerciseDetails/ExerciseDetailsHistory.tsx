import { Heading, HStack, Skeleton, Text, VStack } from "native-base";
import { IExerciseHistory } from "../hooks/useExerciseHistory";
import { ISet } from "../types/WorkoutInterface";
import calculateOneRepMax from "../utils/Workouts/calculateOneRepMax";
import Loader from "./utils/Loader";

interface IExerciseDetailsHistory {
  exerciseHistory: IExerciseHistory | undefined;
  isLoading: boolean;
}

const ExerciseDetailsHistory = ({
  exerciseHistory,
  isLoading,
}: IExerciseDetailsHistory) => {
  if (!exerciseHistory || isLoading) return <Loader />;

  const renderSet = (set: ISet, index: number) => {
    const { reps, weight, setNumber } = set;
    return (
      <HStack justifyContent={"space-between"} key={index}>
        <HStack space={3}>
          <Text>{setNumber}</Text>
          <Text>{`${weight} kg x ${reps}`}</Text>
        </HStack>
        <Text>{calculateOneRepMax([{ weight, reps }])}</Text>
      </HStack>
    );
  };

  const renderCard = (history: any, index: number) => {
    const { date, time, sets, workout_name } = history;
    return (
      <Skeleton
        isLoaded={!isLoading}
        w={"full"}
        h={"26"}
        startColor={"gray.100"}
        endColor={"gray.200"}
        key={index}
      >
        <VStack
          space={2}
          borderWidth={1}
          borderColor={"coolGray.200"}
          p={3}
          rounded={"md"}
          my={1}
        >
          <Heading size={"sm"}>{workout_name}</Heading>
          <Text
            fontSize={"sm"}
            fontWeight={600}
            color={"coolGray.400"}
          >{`${date}, ${time}`}</Text>
          <HStack justifyContent={"space-between"}>
            <Text fontWeight={600}>Sets Performed</Text>
            <Text fontWeight={600}>1RM</Text>
          </HStack>
          {sets.map(renderSet)}
        </VStack>
      </Skeleton>
    );
  };

  return <VStack>{Object.values(exerciseHistory).map(renderCard)}</VStack>;
};

export default ExerciseDetailsHistory;
