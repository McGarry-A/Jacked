import { FontAwesome } from "@expo/vector-icons";
import {
  Text,
  Heading,
  Box,
  Button,
  ScrollView,
  VStack,
  HStack,
} from "native-base";
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

interface TemplateProps {
  width?: "half" | "full"
}

export const Template = ({ width }: TemplateProps) => {
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
