import { FontAwesome } from "@expo/vector-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import { Badge, Box, HStack, Skeleton, Text, VStack } from "native-base";
import { useAppSelector } from "../../store";
import React, { memo } from "react";
import getDaysAgo from "../../utils/getDaysAgo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface TemplateProps {
  width?: "half" | "full";
  workoutName: string | null;
  date: string;
  lifts: {
    [key: number]: {
      exercise_name: string;
    };
  };
}

const Template = ({ width, workoutName, date, lifts }: TemplateProps) => {
  const isFullWidth = width === "full" ? "full" : "1/2";
  const textSize = width === "full" ? "md" : "sm";

  const isLoaded =
    useAppSelector((state) => state.workoutHistorySlice.status) === "fulfilled";

  const renderHeader = () => {
    return (
      <HStack>
        <Text
          flex={1}
          fontSize={textSize}
          fontWeight={"semibold"}
          color={"text.800"}
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

  const renderBadges = () => {
    if (width === "full") {
      return (
        <HStack space={2}>
          <Badge marginY={1} variant="outline" colorScheme={"info"}>
            Personal Best
          </Badge>
          <Badge marginY={1} variant="outline" colorScheme={"success"}>
            Total Volume
          </Badge>
        </HStack>
      );
    }

    return null;
  };

  const renderDaysAgo = () => {
    return (
      <Box flexDirection={"row"} alignItems={"center"}>
        <FontAwesomeIcon icon={faClock} size={13} color="gray" />
        <Text fontSize={"xs"} opacity={50} ml={1}>
          {getDaysAgo(date)}
        </Text>
      </Box>
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
      <Box marginY={2}>
        <Text fontSize={"sm"} color={"text.600"}>
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

  const renderOnSwipeRight = () => {
    // NOTE: delete should be shown on the popup instead
    return (
      <Box backgroundColor={"red.500"} w={"full"} justifyContent={"center"}>
        <Text fontWeight={"700"} textAlign={"center"} color={"white"}>
          Delete Workout
        </Text>
      </Box>
    );
  };

  const handleSwipeRight = () => {
    // NOTE: dispatch async thunk delete workout
  };

  return (
    <Skeleton isLoaded={isLoaded}>
      <VStack
        space={1}
        w={isFullWidth}
        borderWidth={1}
        borderRadius={"sm"}
        padding={2}
        borderColor={"gray.200"}
        marginY={1}
      >
        {renderHeader()}
        {/* {renderBadges()} */}
        {renderLifts()}
        {renderDaysAgo()}
      </VStack>
    </Skeleton>
  );
};

export default memo(Template);
