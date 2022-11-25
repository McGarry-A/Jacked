import { useNavigation } from "@react-navigation/native";
import { Text, Heading, Box, Button, ScrollView, View } from "native-base";
import { useAppDispatch, useAppSelector } from "../../store";
import { startWorkout } from "../../store/currentWorkoutSlice";
import { supabase } from "../../supabase/supabaseClient";
import { faFile } from "@fortawesome/free-regular-svg-icons/faFile";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Folder from "../../components/layout/Folder";
import ModalContainer from "../../components/utils/Modal";
import { useState } from "react";

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

  const renderHeading = () => <Heading size={"xl"}>Start A Workout</Heading>;

  const renderStartOrContinue = () => {
    if (!isActive) {
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

  const renderTemplatesSectionHeader = () => (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems={"center"}
    >
      <Heading size={"md"} fontWeight="semibold" color={"text.900"}>
        Folders
      </Heading>
      <Button
        onPress={() => setmodalIsVisible(true)}
        size="sm"
        variant="outline"
        backgroundColor={"info.100"}
        borderRadius="3xl"
        borderWidth={0}
        leftIcon={<FontAwesomeIcon icon={faFile} color={"#0284c7"} />}
      >
        <Text
          fontSize={"xs"}
          color={"info.600"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
        >
          Add Folder
        </Text>
      </Button>
    </Box>
  );

  const renderFolders = () => {
    return Object.values(folders).map(({ id, name, templates }) => {
      return <Folder templates={templates} id={id} name={name} />;
    });
  };

  return (
    <View padding={3} backgroundColor={"white"} flex={1}>
      <ScrollView>
        {renderHeading()}
        {renderQuickStart()}
        {renderTemplatesSectionHeader()}
        {renderFolders()}
        <ModalContainer
          isVisible={modalIsVisible}
          setIsVisible={setmodalIsVisible}
        />
      </ScrollView>
    </View>
  );
}
