import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import { Box, HStack, Skeleton, Text, VStack } from "native-base";
import React, { memo, SetStateAction } from "react";
import getDaysAgo from "../../utils/getDaysAgo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Elipsis from "./Elipsis";
import useColorScheme from "../../hooks/useColorScheme";

interface IHistoryCard {
  isLoaded: boolean;
  workoutName: string | null;
  date: string;
  setModalIsVisible: React.Dispatch<SetStateAction<boolean>>;
  lifts: {
    [key: number]: {
      exercise_name: string;
      set: {
        weight: number;
        reps: number;
      }[];
    };
  };
}

const HistoryCard = ({
  workoutName,
  date,
  lifts,
  isLoaded,
  setModalIsVisible,
}: IHistoryCard) => {
  const isLifts = Object.keys(lifts).length > 0;

  console.log(workoutName, date, JSON.stringify(lifts), isLoaded);

  const { pTextColorMode, h2ColorMode } = useColorScheme();
  const renderHeader = () => {
    return (
      <HStack alignItems={"center"}>
        <Text flex={1} fontSize={"md"} fontWeight={"bold"} color={h2ColorMode}>
          {workoutName === null ? "Quick Workout" : workoutName}
        </Text>
        <Elipsis size={14} onPress={() => setModalIsVisible(true)} />
      </HStack>
    );
  };

  const renderDaysAgo = () => {
    return (
      <HStack alignItems={"center"}>
        <FontAwesomeIcon icon={faClock} size={10} color="gray" />
        <Text fontSize={"xs"} color="text.400" ml={2}>
          {getDaysAgo(date)}
        </Text>
      </HStack>
    );
  };

  const renderLiftsHead = () => {
    if (!isLifts) return null;
    return (
      <HStack marginTop={1}>
        <Text fontWeight={"semibold"} color={pTextColorMode} flex={1}>
          Exercise Name
        </Text>
        <Text fontWeight={"semibold"} color={pTextColorMode} flex={1}>
          Best Set
        </Text>
      </HStack>
    );
  };

  const renderBestSet = (sets: Array<{ weight: number; reps: number }>) => {
    if (!isLifts) return null;

    const bestSet = sets.reduce(
      (acc, curr) => {
        if (acc.weight * acc.reps < curr.weight * curr.reps) return curr;
        return acc;
      },
      { weight: 0, reps: 0 }
    );

    return (
      <Text fontSize={"sm"} color={"coolGray.500"} flex={1}>
        {bestSet.weight}KG x {bestSet.reps}
      </Text>
    );
  };

  const renderLifts = () => {
    return (
      <Box marginBottom={1}>
        {Object.values(lifts).map((el, index) => {
          const numberOfSets = el.set.length;
          return (
            <HStack key={index}>
              <Text
                display={"block"}
                fontSize={"sm"}
                color={"coolGray.500"}
                flex={1}
              >
                {el.exercise_name} x {numberOfSets}
              </Text>
              {renderBestSet(el.set)}
            </HStack>
          );
        })}
      </Box>
    );
  };

  const renderNoLifts = () => {
    if (isLifts) return null;

    return (
      <Text fontSize={"sm"} color={"coolGray.500"}>
        No Lifts
      </Text>
    );
  };

  return (
    <Skeleton
      my={2}
      isLoaded={isLoaded}
      startColor={"gray.200"}
      endColor={"coolGray.200"}
      h={24}
    >
      <VStack
        space={1}
        w={"full"}
        borderRadius={5}
        padding={3}
        marginY={1}
        borderWidth={2}
        borderColor={"coolGray.100"}
        backgroundColor={"transparent"}
      >
        {renderHeader()}
        {renderLiftsHead()}
        {renderLifts()}
        {renderNoLifts()}
        {renderDaysAgo()}
      </VStack>
    </Skeleton>
  );
};

export default memo(HistoryCard);
