import { Box, Image, View, Text, VStack } from "native-base";
import WelcomeHero from "../../images/welcome-hero.png";
import Logo from "../layout/Logo";
import AuthStateSwitcher from "./AuthStateSwitcher";
import PrimaryButton from "../layout/Buttons/PrimaryButton";

const Welcome = () => {
  const handleSignUpWithEmail = () => {};
  const handleSignUpWithGoogle = () => {};

  const renderHero = () => {
    return (
      <Box>
        <Image src={WelcomeHero} alt={"JACKED Logo"} />
      </Box>
    );
  };

  const renderLogo = () => {
    return (
      <Box position={"absolute"} top={-100} left={0} right={0} margin={"auto"}>
        <Logo />
      </Box>
    );
  };

  const renderHeroContent = () => {
    return (
      <Text>
        The all in one app for tracking your personal fitness Journey!
      </Text>
    );
  };

  const renderLoginOptions = () => {
    return (
      <VStack>
        <PrimaryButton onPress={handleSignUpWithEmail}>
          Sign up with Email
        </PrimaryButton>
        <PrimaryButton onPress={handleSignUpWithGoogle}>
          Sign up with Google
        </PrimaryButton>
      </VStack>
    );
  };

  const renderAuthStateSwitcher = () => <AuthStateSwitcher type="LOG_IN" />;

  return (
    <View position={"relative"}>
      {renderHero()}
      {renderLogo()}
      {renderHeroContent()}
      {renderLoginOptions()}
      {renderAuthStateSwitcher()}
    </View>
  );
};

export default Welcome;
