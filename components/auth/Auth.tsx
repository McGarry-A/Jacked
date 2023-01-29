import { View, Text, Box, Heading, VStack } from "native-base";
import React, { useState } from "react";
import Logo from "../layout/Logo";
import AuthForm from "./AuthForm";
import AuthStateSwitcher from "./AuthStateSwitcher";
import SocialIcons from "./SocialIcons";

const Auth = ({ route }: any) => {
  const { type: routeType } = route && route.params ? route.params : "LOG_IN";

  const [type, setType] = useState<"SIGN_UP" | "LOG_IN">(routeType);

  const renderLogo = () => (
    <Box w={"40"} h={"16"} marginX={"auto"} marginY={10}>
      <Logo flex={1} position={"relative"} />
    </Box>
  );

  const renderHeroCopy = () => {
    if (type === "LOG_IN") {
      <VStack space={3}>
        <Heading
          color={"coolGray.900"}
          fontSize={32}
          fontWeight={900}
          textAlign={"center"}
        >
          Welcome to Jacked
        </Heading>
        <Text
          color={"coolGray.400"}
          fontSize={14}
          fontWeight={700}
          textAlign={"center"}
        >
          Sign in to start your fitness journey
        </Text>
      </VStack>;
    }

    return (
      <VStack space={3}>
        <Heading
          color={"coolGray.900"}
          fontSize={32}
          fontWeight={900}
          textAlign={"center"}
        >
          Welcome Back
        </Heading>
        <Text
          color={"coolGray.400"}
          fontSize={14}
          fontWeight={700}
          textAlign={"center"}
        >
          Login to pick up where you left off
        </Text>
      </VStack>
    );
  };

  const renderAuthForm = () => (
    <AuthForm type={type} SocialsComponent={SocialIcons} />
  );

  const renderSwitchState = () => (
    <AuthStateSwitcher type={type} setType={setType} />
  );

  return (
    <View
      flex={1}
      backgroundColor={"white"}
      _web={{
        maxW: "lg",
        width: "100%",
        margin: "auto",
      }}
    >
      {renderLogo()}
      {renderHeroCopy()}
      {renderAuthForm()}
      {renderSwitchState()}
    </View>
  );
};

export default Auth;
