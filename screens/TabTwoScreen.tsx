import {
  Text,
  Heading,
  Box,
  Button,
  ScrollView,
  VStack,
  HStack,
} from "native-base";
import Template from "../components/layout/Template";
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

  const renderTemplatesHeader = () => (
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

  const renderTemplateSection = (heading: string) => {
    return (
      <Box>
        <Heading size={"sm"} marginY={2}>
          {heading}
        </Heading>
        <VStack
          paddingTop={2}
        >
          <HStack space={2} w="98%">
            <Template />
            <Template />
          </HStack>
        </VStack>
        <VStack
          style={{}}
          flexDirection={"row"}
          flexWrap={"wrap"}
          justifyContent={""}
        >
          <HStack space={2} w="98%">
            <Template />
            <Template />
          </HStack>
        </VStack>
      </Box>
    );
  };

  return (
    <ScrollView backgroundColor={"white"} padding={3}>
      {renderHeading()}
      {renderQuickStart()}
      {renderTemplatesHeader()}
      {renderTemplateSection("My Workouts")}
      {renderTemplateSection("Example Workouts")}
    </ScrollView>
  );
}



