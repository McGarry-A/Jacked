import { FontAwesome } from "@expo/vector-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import { Box, HStack, Skeleton, Text, VStack } from "native-base";
import React, { memo } from "react";
import getDaysAgo from "../../utils/getDaysAgo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface HistoryCardProps {
  isLoaded: boolean;
  workoutName: string | null;
  date: string;
  lifts: {
    [key: number]: {
      exercise_name: string;
    };
  };
}

const HistoryCard = ({
  workoutName,
  date,
  lifts,
  isLoaded,
}: HistoryCardProps) => {

  const renderHeader = () => {
    return (
      <HStack alignItems={"center"}>
        <Text
          flex={1}
          fontSize={'md'}
          fontWeight={"bold"}
          color={"coolGray.700"}
        >
          {workoutName === null ? "Quick Workout" : workoutName}
        </Text>
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"info.100"}
          paddingX={1}
          height={"5"}
          borderRadius={4}
        >
          <FontAwesome name="ellipsis-h" size={15} color={"skyblue"} />
        </Box>
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

  const renderLifts = () => {
    const liftsLength = Object.keys(lifts).length;
    const showComma = (index: number) =>
      liftsLength === 1 || index + 1 === liftsLength ? " " : ", ";

    if (liftsLength === 0)
      return (
        <Text fontSize={"sm"} color={"text.600"}>
          No Lifts
        </Text>
      );

    return (
      <Box marginTop={2} marginBottom={1}>
        <Text fontSize={"sm"} color={"coolGray.500"}>
          {Object.values(lifts).map((el, index) => (
            <React.Fragment key={index}>
              {el.exercise_name}
              {showComma(index)}
            </React.Fragment>
          ))}
        </Text>
      </Box>
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
        w={'full'}
        borderRadius={5}
        padding={3}
        marginY={1}
        borderWidth={2}
        borderColor={"coolGray.100"}
        backgroundColor={'coolGray.50'}
      >
        {renderHeader()}
        {renderLifts()}
        {renderDaysAgo()}
      </VStack>
    </Skeleton>
  );
};

export default memo(HistoryCard);
