import { FontAwesome } from "@expo/vector-icons";
import { Avatar, HStack, Skeleton, Text, VStack } from "native-base";
import { useState } from "react";
import { Pressable } from "react-native";
import useColorScheme from "../../hooks/useColorScheme";
import useTotalWorkouts from "../../hooks/useTotalWorkouts";
import SettingsModal from "../modal/SettingsModal";

const UserProfileBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const { h1ColorMode } = useColorScheme();

  const { avatarBgColorMode } = useColorScheme();
  const { totalWorkouts, isLoading } = useTotalWorkouts();

  const handlePress = () => setModalIsOpen(true);

  const renderInitials = () => (
    // NOTE:
    // also need to update the name here
    <Avatar
      size={"lg"}
      marginY={3}
      backgroundColor={avatarBgColorMode}
      marginRight={"3"}
    >
      <Text color={"info.50"} fontSize={"lg"} fontWeight={"bold"}>
        AM
      </Text>
    </Avatar>
  );

  const renderDetails = () => {
    // NOTE:
    // need to dynamically load the name too
    return (
      <VStack flex={1} pl={2}>
        <Text fontSize="md" fontWeight="semibold" color={h1ColorMode}>
          Ahmed McGarry
        </Text>
        <Skeleton isLoaded={!isLoading} w={"32"} h={"6"} endColor={"gray.200"}>
          <Text fontSize="sm" color={"coolGray.400"}>
            {totalWorkouts} Workouts
          </Text>
        </Skeleton>
      </VStack>
    );
  };

  const renderRightIcon = () => (
    <FontAwesome name="chevron-right" color="skyblue" size={15} />
  );

  const renderSettingsModal = () => (
    <SettingsModal isVisible={modalIsOpen} setIsVisible={setModalIsOpen} />
  );

  const renderUserProfileBar = () => (
    <Pressable onPress={handlePress}>
      <HStack
        w={"full"}
        flexDirection="row"
        alignItems="center"
        justifyContent={"space-between"}
      >
        {renderInitials()}
        {renderDetails()}
        {renderRightIcon()}
      </HStack>
    </Pressable>
  );

  return (
    <>
      {renderUserProfileBar()}
      {renderSettingsModal()}
    </>
  );
};

export default UserProfileBar;
