import { FontAwesome } from "@expo/vector-icons";
import { Badge, Box, HStack, Skeleton, Text } from "native-base";
import { useAppSelector } from "../../store";
import { memo } from "react";

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
      <Box flexDirection={"row"} alignItems={"center"}>
        <Text
          flex={1}
          fontSize={textSize}
          fontWeight={"semibold"}
          color={"darkText"}
        >
          {workoutName === null ? "Workout __" : workoutName}
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
      </Box>
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
      <Box
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Text fontSize={"xs"} opacity={50}>
          {date}
        </Text>
        <FontAwesome name="clock-o" size={15} color="gray" />
      </Box>
    );
  };

  const renderLifts = () => {
    if (Object.keys(lifts).length === 0) return <Text>No Lifts</Text>;

    return (
      <Box marginY={2}>
        <Text fontSize={"sm"} color={"text.600"}>
          {Object.values(lifts).map((el, index) => (
            <>{el.exercise_name}, </>
          ))}
        </Text>
      </Box>
    );
  };

  return (
    <Box
      w={isFullWidth}
      borderWidth={1}
      borderRadius={"sm"}
      padding={2}
      borderColor={"gray.200"}
      marginY={1}
    >
      <Skeleton isLoaded={isLoaded}>
        {renderHeader()}
        {renderBadges()}
        {renderLifts()}
        {renderDaysAgo()}
      </Skeleton>
    </Box>
  );
};

export default memo(Template);
