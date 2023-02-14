import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, VStack, Heading, Pressable, HStack } from "native-base";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { SetInterface } from "../../types/CurrentWorkoutInterface";
import useId from "../../hooks/useId";
import { addLift, startWorkout } from "../../store/currentWorkoutSlice";
import useColorScheme from "../../hooks/useColorScheme";
import Elipsis from "./Elipsis";
import { useNavigation } from "@react-navigation/native";
import TemplateModal from "../modal/TemplateModal";

interface TemplateCardProps {
  title: string;
  templateId: string;
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
  exercises,
  templateId,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.user);
  const { pTextColorMode } = useColorScheme();
  const { navigate } = useNavigation();
  const [tempalteModalIsVisible, setTemplateModalIsVisible] =
    useState<boolean>(false);

  const handleAddLiftsToWorkout = () => {
    const { userId } = user;

    const params = Object.values(exercises).map(
      ({ exerciseId, exerciseName, sets }) => {
        return {
          exerciseId,
          exerciseName,
          sets,
          userId,
          liftId: useId("lift"),
        };
      }
    );

    dispatch(addLift(params));
  };

  const handlePress = () => {
    const { userId } = user;
    handleAddLiftsToWorkout();
    dispatch(startWorkout({ userId }));
    navigate("ActiveWorkout");
  };

  const renderTemplateModal = () => {
    return (
      <TemplateModal
        templateId={templateId}
        isVisible={tempalteModalIsVisible}
        setIsVisible={setTemplateModalIsVisible}
      />
    );
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
      <HStack alignItems={"center"} mb={1}>
        <Heading fontSize="sm" color={pTextColorMode} flex={1}>
          {title}
        </Heading>
        <Elipsis size={10} onPress={() => setTemplateModalIsVisible(true)} />
      </HStack>
    );
  };

  const renderBody = () => {
    return (
      <Text fontSize={"xs"} color={pTextColorMode} flex={1} numberOfLines={3}>
        {Object.values(exercises).map(renderExercises)}
      </Text>
    );
  };

  const renderDate = () => {
    return (
      <HStack alignItems={"center"} space={2}>
        <FontAwesomeIcon icon={faClock} size={10} color="#d1d5db" />
        <Text fontSize={"xs"} color="coolGray.500">
          {"2022/10/1"}
        </Text>
      </HStack>
    );
  };

  return (
    <Pressable
      borderWidth={1}
      borderColor={"coolGray.200"}
      backgroundColor={"transparent"}
      py={3}
      px={2}
      borderRadius={"sm"}
      w={"49%"}
      onPress={handlePress}
      my={1}
      mr={1}
      h={"32"}
    >
      <VStack space={1} h="full" overflow={"hidden"}>
        {renderHeader()}
        {renderBody()}
        {renderDate()}
      </VStack>
      {renderTemplateModal()}
    </Pressable>
  );
};

export default TemplateCard;
