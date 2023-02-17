import { Image, Box, View, Text, VStack } from "native-base";
import Logo from "../Layout/Logo/Logo";
import AuthStateSwitcher from "./AuthStateSwitcher";
import PrimaryButton from "../Layout/Buttons/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { useNavigation } from "@react-navigation/core";
import { useAppDispatch } from "../../store";
import { signInWithGoogle } from "../../store/userSlice";
import useRememberMe from "../../hooks/useRememberMe";

const Welcome = () => {
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();
  useRememberMe()

  const handleSignUpWithEmail = () => {
    navigate("Auth", { type: "SIGN_UP" });
  };

  const handleSignUpWithGoogle = async () => {
    dispatch(signInWithGoogle());
  };

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
    <Box w={"1/3"} margin={"auto"}>
      <Logo
        size={"full"}
        position={"absolute"}
        top={-30}
        left={0}
        right={0}
        margin={"auto"}
        flex={1}
        h={"16"}
        resizeMode={"contain"}
      />
    </Box>
  );

  const renderHeroContent = () => {
    return (
      <>
        {renderLogo()}
        <Box flexGrow={1} mt={12}>
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

  const renderAuthStateSwitcher = () => <AuthStateSwitcher type="SIGN_UP" />;

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
      {renderHero()}
      {renderHeroContent()}
      {renderLoginOptions()}
      {renderAuthStateSwitcher()}
    </View>
  );
};

export default Welcome;
