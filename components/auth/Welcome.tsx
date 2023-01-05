import { Image, Box, View, Text, VStack } from "native-base";
import Logo from "../layout/Logo";
import AuthStateSwitcher from "./AuthStateSwitcher";
import PrimaryButton from "../layout/Buttons/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { useNavigation } from "@react-navigation/core";

const Welcome = () => {
  const { navigate } = useNavigation();

  const handleSignUpWithEmail = () => {
    navigate("Auth");
  };
  const handleSignUpWithGoogle = () => {};

  const renderHero = () => {
    return (
      <Box w={"full"} h={"lg"} position={"relative"}>
        <Image
          source={require("../../images/welcome-hero.png")}
          alt={"Hero Banner"}
          size={"full"}
        />
      </Box>
    );
  };

  const renderLogo = () => (
    <Box w={"1/3"} margin={"auto"} h={"16"}>
      <Logo
        size={"full"}
        position={"absolute"}
        top={-30}
        left={0}
        right={0}
        margin={"auto"}
        flex={1}
      />
    </Box>
  );

  const renderHeroContent = () => {
    return (
      <>
        {renderLogo()}
        <Box flexGrow={1}>
          <Text
            fontWeight={700}
            color={"coolGray.400"}
            textAlign={"center"}
            fontSize={18}
          >
            The all in one app for tracking your personal fitness Journey!
          </Text>
        </Box>
      </>
    );
  };

  const renderLoginOptions = () => {
    return (
      <VStack space={2} px={3}>
        <PrimaryButton
          onPress={handleSignUpWithEmail}
          alignItems="center"
          backgroundColor={"coolGray.900"}
          startIcon={
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ color: "#f9fafb", marginRight: 2 }}
              size={22}
            />
          }
        >
          Sign up with Email
        </PrimaryButton>
        <PrimaryButton
          onPress={handleSignUpWithGoogle}
          borderColor={"coolGray.900"}
          borderWidth={"2"}
          backgroundColor={"white"}
          textDark
          startIcon={
            <FontAwesomeIcon
              icon={faGoogle}
              style={{ color: "#111827", marginRight: 2 }}
              size={22}
            />
          }
        >
          Sign up with Google
        </PrimaryButton>
      </VStack>
    );
  };

  const renderAuthStateSwitcher = () => <AuthStateSwitcher type="LOG_IN" />;

  return (
    <View
      flex={1}
      _web={{
        maxW: "lg",
        margin: "auto",
      }}
    >
      {renderHero()}
      {renderHeroContent()}
      {renderLoginOptions()}
      {renderAuthStateSwitcher()}
    </View>
  );
};

export default Welcome;
