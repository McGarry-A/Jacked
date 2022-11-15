import { FontAwesome } from "@expo/vector-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import {
  Badge,
  Box,
  HStack,
  Popover,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { memo, useState } from "react";
import getDaysAgo from "../../utils/getDaysAgo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useAppDispatch } from "../../store";
import { deleteWorkout } from "../../store/workoutHistorySlice";

interface TemplateProps {
  width?: "half" | "full";
  workoutName: string | null;
  date: string;
  workoutId: number;
  lifts: {
    [key: number]: {
      exercise_name: string;
    };
  };
}

// NOTE:
// SHOW BAGES:
// TOTAL VOLUME
// TOTAL WEGHT
// WORKOUT NUMBER

const Template = ({
  width,
  workoutName,
  date,
  lifts,
  workoutId,
}: TemplateProps) => {
  const [popoverIsOpen, setPopoverIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const isFullWidth = width === "full" ? "full" : "1/2";
  const textSize = width === "full" ? "md" : "sm";

  const handleDeleteWorkout = (workoutId: number) => {
    dispatch(deleteWorkout({ workoutId }));
  };

  const renderPopover = () => {
    return (
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"info.100"}
        paddingX={1}
        height={"5"}
        borderRadius={4}
      >
        <Popover
          isOpen={popoverIsOpen}
          placement="bottom"
          trigger={(triggerProps) => {
            return (
              <Pressable onPress={() => setPopoverIsOpen(true)}>
                <FontAwesome
                  {...triggerProps}
                  name="ellipsis-h"
                  size={15}
                  color={"skyblue"}
                />
              </Pressable>
            );
          }}
        >
          <Popover.Content>
            <Popover.Arrow />
            <Popover.CloseButton onPress={() => setPopoverIsOpen(false)} />
            <Popover.Body>
              <VStack>
                <Pressable onPress={() => handleDeleteWorkout(workoutId)}>
                  <Text>Delete Workout</Text>
                </Pressable>
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover>
      </Box>
    );
  };

  const renderHeader = () => {
    return (
      <HStack alignItems={"center"}>
        <Text
          flex={1}
          fontSize={textSize}
          fontWeight={"semibold"}
          color={"text.700"}
        >
          {workoutName === null ? "Quick Workout" : workoutName}
        </Text>
        {renderPopover()}
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

  return (
    <VStack
      space={1}
      w={isFullWidth}
      borderWidth={1}
      borderRadius={"xs"}
      padding={3}
      borderColor={"gray.200"}
      marginY={1}
    >
      {renderHeader()}
      {renderLifts()}
      {renderDaysAgo()}
    </VStack>
  );
};

export default memo(Template);
