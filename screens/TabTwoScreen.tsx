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
import { useAppDispatch, useAppSelector } from "../store";
import { startWorkout } from "../store/currentWorkoutSlice";
export default function TabTwoScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const isWorkoutActive = useAppSelector(
    (state) => state.currentWorkoutSlice.isActive
  );

  const handlePressQuickStart = () => {
    dispatch(startWorkout());
    navigation.navigate("ActiveWorkout");
  };

  const handleContinueWorkout = () => {
    navigation.navigate("ActiveWorkout");
  }

  const renderHeading = () => <Heading size={"xl"}>Start A Workout</Heading>;

  const renderStartOrContinue = () => {
    if (!isWorkoutActive) {
      return (
        <Button
          onPress={handlePressQuickStart}
          marginY={3}
          size="sm"
          backgroundColor={"info.400"}
        >
          <Text fontWeight={"bold"} color="white">
            Start an Empty Workout
          </Text>
        </Button>
      );
    }

    return (
      <Button
        onPress={handleContinueWorkout}
        marginY={3}
        size="sm"
        backgroundColor={"green.400"}
      >
        <Text fontWeight={"bold"} color="white">
          Continue Workout
        </Text>
      </Button>
    );
  };

  const renderQuickStart = () => (
    <Box marginY={5}>
      <Heading fontSize={"sm"}>Quick Start</Heading>
      {renderStartOrContinue()}
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
        <VStack paddingTop={2}>
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
