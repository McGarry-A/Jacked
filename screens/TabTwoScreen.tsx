import { View, Text, Heading, Box, Button } from "native-base";
export default function TabTwoScreen() {
  const renderHeading = () => <Heading size={"xl"}>Start A Workout</Heading>;

  const renderQuickStart = () => (
    <Box marginY={5}>
      <Heading fontSize={"sm"}>Quick Start</Heading>
      <Button marginY={3} size="sm" backgroundColor={"info.400"}>
        <Text fontWeight={"bold"} color="white">
          Start an Empty Workout
        </Text>
      </Button>
    </Box>
  );

  const renderTemplatesContainer = () => (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems={"center"}
    >
      <Heading size={"md"} fontWeight="semibold">
        Templates
      </Heading>
      <Button
        size="sm"
        variant="outline"
        backgroundColor={"info.100"}
        borderRadius="3xl"
        borderWidth={0}
      >
        <Text
          fontSize={"xs"}
          color={"info.600"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Add Template
        </Text>
      </Button>
    </Box>
  );

  return (
    <View backgroundColor={"white"} padding={3}>
      {renderHeading()}
      {renderQuickStart()}
      {renderTemplatesContainer()}
    </View>
  );
}
