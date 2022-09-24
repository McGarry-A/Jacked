import { FontAwesome } from "@expo/vector-icons";
import { Box, Heading, Text } from "native-base";

const WidgetHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <Box>
      <Box flexDirection={"row"} alignItems={"center"}>
        <Heading size={"sm"} flex={1}>
          {title}
        </Heading>
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"info.100"}
          paddingX={2}
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
      <Text fontSize={"sm"} fontWeight={"semibold"} marginY={1} opacity={70}>
        {subtitle}
      </Text>
    </Box>
  );
};

export default WidgetHeader