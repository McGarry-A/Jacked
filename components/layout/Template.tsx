import { FontAwesome } from "@expo/vector-icons";
import { Badge, Box, HStack, Text } from "native-base";

interface TemplateProps {
  width?: "half" | "full";
}

const Template = ({ width }: TemplateProps) => {
  const isFullWidth = width === "full" ? "full" : "1/2";
  const textSize = width === "full" ? "md" : "sm";

  const renderHeader = () => {
    return (
      <Box flexDirection={"row"} alignItems={"center"}>
        <Text
          flex={1}
          fontSize={textSize}
          fontWeight={"semibold"}
          color={"darkText"}
        >
          Template Name
        </Text>
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"info.100"}
          paddingX={1}
          height={"5"}
          borderRadius={4}
        >
          <FontAwesome
            name="ellipsis-h"
            size={15}
            color={"skyblue"}
            style={{ margin: "auto" }}
          />
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
          6 days ago
        </Text>
        <FontAwesome name="clock-o" size={15} color="gray" />
      </Box>
    );
  };

  const renderLifts = () => {
    return (
      <Box marginY={1}>
        <Text fontSize={"sm"} color={"text.600"}>
          Bench Press, Squat, Deadlifts, Rows, Bicep Curls, Cool down
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
      {renderHeader()}
      {renderBadges()}
      {renderLifts()}
      {renderDaysAgo()}
    </Box>
  );
};

export default Template;
