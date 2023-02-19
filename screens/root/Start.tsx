import { useNavigation } from "@react-navigation/native";
import {
  Text,
  Heading,
  Box,
  Button,
  View,
  HStack,
  VStack,
  Skeleton,
} from "native-base";
import { useAppDispatch, useAppSelector } from "../../store";
import { startWorkout } from "../../store/currentWorkoutSlice";
import { faFolder } from "@fortawesome/free-regular-svg-icons/faFolder";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Folder from "../../components/Templates/Folder";
import AddFolderModal from "../../components/Modals/AddFolderModal";
import { useState } from "react";
import CtaButton from "../../components/Layout/Buttons/CtaButton";
import useColorScheme from "../../hooks/useColorScheme";
import useTemplatesAndFolders from "../../hooks/useTemplatesAndFolders";

export default function Start() {
  const [folderModalIsVisible, setFolderModalIsVisible] =
    useState<boolean>(false);

  const { userId } = useAppSelector((state) => state.userSlice.user);
  const { folders, status } = useAppSelector((state) => state.templateSlice);
  const { isActive } = useAppSelector((state) => state.currentWorkoutSlice);

  const {
    h1ColorMode,
    h2ColorMode,
    buttonColorMode,
    ctaIconColorMode,
    screenColorMode,
  } = useColorScheme();

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // NOTE: This is a temporary solution to get the folders and templates
  useTemplatesAndFolders();

  const handlePressQuickStart = () => {
    dispatch(startWorkout({ userId }));
    navigation.navigate("ActiveWorkout");
  };

  const handleContinueWorkout = () => {
    navigation.navigate("ActiveWorkout");
  };

  const renderHeading = () => (
    <Heading size={"xl"} color={h1ColorMode} my={1}>
      Start A Workout
    </Heading>
  );

  const renderQuickStart = () => (
    <Box my={1}>
      <Heading fontSize={"lg"} color={h2ColorMode}>
        Quick Start
      </Heading>
      {renderStartOrContinue()}
    </Box>
  );

  const renderStartOrContinue = () => {
    if (!isActive) {
      return (
        <Button
          onPress={handlePressQuickStart}
          marginY={1}
          size="sm"
          backgroundColor={buttonColorMode}
        >
          <Text fontWeight={"bold"} color="coolGray.100">
            Start an Empty Workout
          </Text>
        </Button>
      );
    }

    return (
      <Button
        onPress={handleContinueWorkout}
        marginY={1}
        size="sm"
        backgroundColor={"green.400"}
      >
        <Text fontWeight={"bold"} color="green.50">
          Continue Workout
        </Text>
      </Button>
    );
  };

  const renderTemplatesSectionHeader = () => (
    <HStack
      flexDirection="row"
      justifyContent="space-between"
      alignItems={"center"}
    >
      <Heading size={"lg"} color={h2ColorMode}>
        Folders
      </Heading>
      <CtaButton
        onPress={() => setFolderModalIsVisible(true)}
        leftIcon={
          <FontAwesomeIcon icon={faFolder} color={ctaIconColorMode} size={12} />
        }
      >
        Add Folder
      </CtaButton>
    </HStack>
  );

  const renderFolders = () => {
    const isLoaded = status === "fulfilled";
    return (
      <>
        {renderTemplatesSectionHeader()}
        <Skeleton h={"48"} endColor={"gray.200"} isLoaded={isLoaded}>
          {Object.values(folders).map(({ id, name, templates }) => {
            return (
              <Folder key={id} templates={templates} id={id} name={name} />
            );
          })}
        </Skeleton>
      </>
    );
  };

  const renderAddFolderModal = () => {
    return (
      <AddFolderModal
        isVisible={folderModalIsVisible}
        setIsVisible={setFolderModalIsVisible}
      />
    );
  };

  return (
    <View
      padding={3}
      backgroundColor={screenColorMode}
      flex={1}
      _web={{
        maxW: "lg",
        w: "100%",
        mx: "auto",
      }}
    >
      <VStack space={2}>
        {renderHeading()}
        {renderQuickStart()}
        {renderFolders()}
      </VStack>
      {renderAddFolderModal()}
    </View>
  );
}
