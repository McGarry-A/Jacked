import {
  Text,
  Heading,
  Box,
  Button,
  ScrollView,
  VStack,
  HStack,
  View,
} from "native-base";
import TemplateCard from "../../components/layout/TemplateCard";
import { useAppDispatch, useAppSelector } from "../../store";
import { startWorkout } from "../../store/currentWorkoutSlice";
import { supabase } from "../../supabase/supabaseClient";

export default function TabTwoScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const userId = supabase.auth.user();
  const isWorkoutActive = useAppSelector(
    (state) => state.currentWorkoutSlice.isActive
  );

  const handlePressQuickStart = () => {
    dispatch(startWorkout({ userId: userId!.id }));
    navigation.navigate("ActiveWorkout");
  };

  const handleContinueWorkout = () => {
    navigation.navigate("ActiveWorkout");
  };

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
      <Heading size={"md"} fontWeight="semibold" color={"text.900"}>
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
        <Heading size={"sm"} marginY={2} color={"text.800"}>
          {heading}
        </Heading>
        <VStack paddingTop={2} space={2}>
          <HStack space={2} w="full" flexWrap="wrap">
            <TemplateCard
              title="Shoulder Day"
              author="Ahmed McGarry"
              lifts={[
                "Shoulder Press",
                "Lateral Raises",
                "Facepulls",
                "Front raises",
                "Tricep Pulldowns",
              ]}
              navigation={navigation}
            />
            <TemplateCard
              title="Chest Day"
              author="Ahmed McGarry"
              lifts={[
                "Shoulder Press",
                "Lateral Raises",
                "Facepulls",
                "Front raises",
                "Tricep Pulldowns",
              ]}
              navigation={navigation}
            />
          </HStack>
          <HStack space={2} w="full" flexWrap="wrap">
            <TemplateCard
              title="Leg Day"
              author="Ahmed McGarry"
              lifts={[
                "Shoulder Press",
                "Lateral Raises",
                "Facepulls",
                "Front raises",
                "Tricep Pulldowns",
              ]}
              navigation={navigation}
            />
            <TemplateCard
              title="Back Day"
              author="Ahmed McGarry"
              lifts={[
                "Shoulder Press",
                "Lateral Raises",
                "Facepulls",
                "Front raises",
                "Tricep Pulldowns",
              ]}
              navigation={navigation}
            />
          </HStack>
        </VStack>
      </Box>
    );
  };

  return (
    <View padding={3} backgroundColor={"white"}>
      <ScrollView >
        {renderHeading()}
        {renderQuickStart()}
        {renderTemplatesHeader()}
        {renderTemplateSection("My Workouts (4)")}
        {renderTemplateSection("Example Workouts (4)")}
      </ScrollView>
    </View>
  );
}
