import { FontAwesome } from "@expo/vector-icons";
import { Box, Text } from "native-base";

interface TemplateProps {
    width?: "half" | "full"
  }

const Template = ({ width }: TemplateProps) => {
    const isFullWidth = width === "full" ? "full" : "1/2"
    return (
      <Box
        w={isFullWidth}
        borderWidth={1}
        borderRadius={"sm"}
        padding={2}
        borderColor={"gray.200"}
        marginY={1}
      >
        <Box flexDirection={"row"} alignItems={"center"}>
          <Text
            flex={1}
            fontSize={"sm"}
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
        <Box marginY={1}>
          <Text fontSize={"sm"} color={"text.600"}>
            Bench Press, Squat, Deadlifts, Rows, Bicep Curls, Cool down
          </Text>
        </Box>
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
      </Box>
    );
  };
  
  export default Template