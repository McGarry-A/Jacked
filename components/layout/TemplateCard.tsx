import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, VStack, Heading, Pressable, HStack, Box } from "native-base";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import getDaysAgo from "../../utils/getDaysAgo";
import { SetInterface } from "../../types/CurrentWorkoutInterface";
import useId from "../../hooks/useId";
import { addLift, startWorkout } from "../../store/currentWorkoutSlice";
import { FontAwesome } from "@expo/vector-icons";

interface TemplateCardProps {
  title: string;
  navigation: any;
  exercises: {
    [key: string]: {
      exerciseId: number;
      exerciseName: string;
      sets: SetInterface;
    };
  };
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  title,
  navigation,
  exercises,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.user);

  const handleAddLiftsToWorkout = () => {
    const { userId } = user;

    const params = Object.values(exercises).map((exercise) => {
      return {
        exerciseId: exercise.exerciseId,
        exerciseName: exercise.exerciseName,
        userId,
        liftId: useId("lift"),
      };
    });

    dispatch(addLift(params));
  };

  const handlePress = () => {
    const { userId } = user;
    handleAddLiftsToWorkout();
    dispatch(startWorkout({ userId }));
    navigation.navigate("ActiveWorkout", {
      title: { title },
      exercises: exercises,
    });
  };

  const renderExercises = (
    exercise: {
      exerciseId: number;
      exerciseName: string;
      sets: SetInterface;
    },
    index: number
  ) => {
    const { exerciseName, exerciseId } = exercise;
    const exercisesLength = Object.keys(exercises).length;
    const showComma = (index: number) =>
      exercisesLength === 1 || index + 1 === exercisesLength ? " " : ", ";

    return (
      <React.Fragment key={exerciseId}>
        {exerciseName}
        {showComma(index)}
      </React.Fragment>
    );
  };

  const renderHeader = () => {
    return (
      <HStack alignItems={"center"} justifyContent="space-between">
        <Heading fontSize="sm">{title}</Heading>
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"info.100"}
          paddingX={1}
          paddingY={1}
          borderRadius={4}
        >
          <FontAwesome name="ellipsis-h" size={10} color={"skyblue"} />
        </Box>
      </HStack>
    );
  };

  const renderBody = () => {
    return (
      <Text fontSize={"xs"} flex={1} numberOfLines={3}>
        {Object.values(exercises).map(renderExercises)}
      </Text>
    );
  };

  const renderDate = () => {
    return (
      <HStack alignItems={"center"}>
        <FontAwesomeIcon icon={faClock} size={10} color="gray" />
        <Text fontSize={"xs"} color="text.400" ml={2}>
          {getDaysAgo("2022/10/1")}
        </Text>
      </HStack>
    );
  };

  return (
    <Pressable
      borderWidth={1}
      borderColor={"gray.300"}
      p={2}
      borderRadius={"sm"}
      w="full"
      onPress={handlePress}
      my={1}
      h={"32"}
    >
      <VStack space={1} h="full" overflow={"hidden"}>
        {renderHeader()}
        {renderBody()}
        {renderDate()}
      </VStack>
    </Pressable>
  );
};

export default TemplateCard;
