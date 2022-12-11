import { useNavigation } from "@react-navigation/native";
import { Text, Heading, Box, Button, View, HStack, VStack } from "native-base";
import { useAppDispatch, useAppSelector } from "../../store";
import { startWorkout } from "../../store/currentWorkoutSlice";
import { faFolder } from "@fortawesome/free-regular-svg-icons/faFolder";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Folder from "../../components/layout/Folder";
import AddFolderModal from "../../components/utils/AddFolderModal";
import { useState } from "react";
import CtaButton from "../../components/layout/CTAButton";

export default function Start() {
  const [modalIsVisible, setmodalIsVisible] = useState<boolean>(false);

  const { userId } = useAppSelector((state) => state.userSlice.user);
  const { folders } = useAppSelector((state) => state.templateSlice);
  const { isActive } = useAppSelector((state) => state.currentWorkoutSlice);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handlePressQuickStart = () => {
    dispatch(startWorkout({ userId }));
    navigation.navigate("ActiveWorkout");
  };

  const handleContinueWorkout = () => {
    navigation.navigate("ActiveWorkout");
  };

  const renderHeading = () => (
    <Heading size={"xl"} color={"coolGray.700"}>
      Start A Workout
    </Heading>
  );

  const renderQuickStart = () => (
    <Box my={2}>
      <Heading fontSize={"lg"} color={"coolGray.600"}>
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
          backgroundColor={"info.400"}
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
      <Heading size={"lg"} color={"coolGray.600"}>
        Folders
      </Heading>
      <CtaButton
        onPress={() => setmodalIsVisible(true)}
        leftIcon={
          <FontAwesomeIcon icon={faFolder} color={"#0284c7"} size={12} />
        }
      >
        Add Folder
      </CtaButton>
    </HStack>
  );

  const renderFolders = () => {
    return (
      <>
        {renderTemplatesSectionHeader()}
        {Object.values(folders).map(({ id, name, templates }) => {
          return <Folder key={id} templates={templates} id={id} name={name} />;
        })}
      </>
    );
  };

  return (
    <View padding={3} backgroundColor={"coolGray.50"} flex={1}>
      <VStack space={2}>
        {renderHeading()}
        {renderQuickStart()}
        {renderFolders()}
      </VStack>
      <AddFolderModal
        isVisible={modalIsVisible}
        setIsVisible={setmodalIsVisible}
      />
    </View>
  );
}
