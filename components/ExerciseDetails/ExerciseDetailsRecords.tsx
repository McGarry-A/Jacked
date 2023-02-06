import { HStack, Text, VStack } from "native-base";
import { IExerciseHistory } from "../../hooks/useExerciseHistory";
import calculateOneRepMax from "../../utils/Workouts/calculateOneRepMax";
import {
  getAcheivedOneRepMax,
  getBestPerformance,
  getBestVolume,
  getEstimatedOneRepMax,
} from "../../utils/Workouts/getRecords";
import Loader from "../utils/Loader";

interface IExerciseDetailsRecods {
  exerciseHistory: IExerciseHistory | undefined;
  isLoading: boolean;
}

const ExerciseDetailsRecords = ({
  exerciseHistory,
  isLoading,
}: IExerciseDetailsRecods) => {
  if (!exerciseHistory || isLoading) return <Loader />;

  const renderAchievedPR = () => {
    const oneRepMax = getAcheivedOneRepMax(exerciseHistory);
    return (
      <HStack justifyContent={"space-between"}>
        <Text fontWeight={600}>Achieved</Text>
        <Text>
          {oneRepMax.weight} kg x {oneRepMax.reps}
        </Text>
      </HStack>
    );
  };

  const renderEstimatedPR = () => {
    const estimatedPR = getEstimatedOneRepMax(exerciseHistory);
    return (
      <HStack justifyContent={"space-between"}>
        <Text fontWeight={600}>Estimate 1 RM</Text>
        <Text>{estimatedPR} kg</Text>
      </HStack>
    );
  };

  const renderTotalVolume = () => {
    const bestTotalVole = getBestVolume(exerciseHistory);
    return (
      <HStack justifyContent={"space-between"}>
        <Text fontWeight={600}>Best Volume</Text>
        <Text>{bestTotalVole} kg</Text>
      </HStack>
    );
  };

  const renderBestPerformances = () => {
    const bestPerformances = getBestPerformance(exerciseHistory);

    return (
      <VStack my={2}>
        <HStack justifyContent={"space-between"}>
          <Text textAlign={"center"} fontWeight={600}>
            Reps
          </Text>
          <Text textAlign={"center"} fontWeight={600}>
            Set Performance
          </Text>
          <Text textAlign={"center"} fontWeight={600}>
            1RM
          </Text>
        </HStack>
        <VStack space={1}>
          {bestPerformances.map((performance, index) => {
            if (performance.reps === 0 || performance.weight === 0) return null;
            return (
              <HStack justifyContent={"space-between"} key={index}>
                <Text textAlign={"center"}>{(index += 1)}</Text>
                <Text
                  textAlign={"center"}
                >{`${performance.weight} kg x ${performance.reps}`}</Text>
                <Text textAlign={"center"}>
                  {calculateOneRepMax([
                    {
                      weight: String(performance.weight),
                      reps: String(performance.reps),
                    },
                  ])}{" "}
                  kg
                </Text>
              </HStack>
            );
          })}
        </VStack>
      </VStack>
    );
  };

  return (
    <VStack space={2}>
      <Text
        textTransform={"uppercase"}
        letterSpacing={"lg"}
        fontWeight={"light"}
        fontSize="xs"
        my={2}
      >
        Personal Records
      </Text>
      {renderAchievedPR()}
      {renderEstimatedPR()}
      {renderTotalVolume()}
      {renderBestPerformances()}
    </VStack>
  );
};

export default ExerciseDetailsRecords;
