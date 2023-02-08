import { FontAwesome } from "@expo/vector-icons";
import { Avatar, HStack, Skeleton, Text, VStack } from "native-base";
import { useState } from "react";
import { Pressable } from "react-native";
import useColorScheme from "../../hooks/useColorScheme";
import useTotalWorkouts from "../../hooks/useTotalWorkouts";
import SettingsModal from "../modal/SettingsModal";

const UserProfileBar = () => {
  

  const { h1ColorMode } = useColorScheme();

  const { avatarBgColorMode } = useColorScheme();
  const { totalWorkouts, isLoading } = useTotalWorkouts();

  

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

  const renderUserProfileBar = () => (
      <HStack
        w={"full"}
        flexDirection="row"
        alignItems="center"
        justifyContent={"space-between"}
      >
        {renderInitials()}
        {renderDetails()}
      </HStack>
  );

  return (
    <>
      {renderUserProfileBar()}
    </>
  );
};

export default UserProfileBar;
