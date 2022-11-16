import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, VStack, Heading, Pressable, HStack } from "native-base";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import getDaysAgo from "../../utils/getDaysAgo";
import { SetInterface } from "../../types/CurrentWorkoutInterface";
import useId from "../../hooks/useId";
import { addLift, startWorkout } from "../../store/currentWorkoutSlice";

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
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.userSlice.user);

  const handleAddLiftsToWorkout = () => {
    const { userId } = user;

    const params = Object.values(exercises).map((exercise) => {
      return {
        exerciseId: exercise.exerciseId,
        exerciseName: exercise.exerciseName,
        userId,
        liftId: useId("lift")
      }
    })

    dispatch(addLift(params))
  };

  const handlePress = () => {
    const { userId } = user
    handleAddLiftsToWorkout()
    dispatch(startWorkout({ userId }))
    navigation.navigate("ActiveWorkout", {
      title: { title },
      exercises: exercises,
    });
  };

  return (
    <Pressable
      borderWidth={1}
      borderColor={"gray.300"}
      p={2}
      borderRadius={"sm"}
      w={"full"}
      flex={1}
      onPress={handlePress}
    >
      <VStack space={1}>
        <Heading fontSize="sm">{title}</Heading>
        <Text fontSize={"xs"}>
          {Object.values(exercises).map((exercise) => {
            const { exerciseName, exerciseId } = exercise;
            return (
              <React.Fragment key={exerciseId}>
                {exerciseName + " "}
              </React.Fragment>
            );
          })}
        </Text>
        <HStack alignItems={"center"}>
          <FontAwesomeIcon icon={faClock} size={10} color="gray" />
          <Text fontSize={"xs"} color="text.400" ml={2}>
            {getDaysAgo("2022/10/1")}
          </Text>
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default TemplateCard;
