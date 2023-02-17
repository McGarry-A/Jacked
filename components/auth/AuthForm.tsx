import { FontAwesome } from "@expo/vector-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Box, Checkbox, Text, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { userLogin, userSignup } from "../../store/userSlice";
import PrimaryButton from "../Layout/Buttons/PrimaryButton";
import InputField from "../Layout/InputField";
import ToastAlert from "../Utils/ToastAlert";

interface IAuthForm {
  type: "SIGN_UP" | "LOG_IN";
  SocialsComponent: () => JSX.Element;
}

interface IFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const AuthForm = ({ type, SocialsComponent }: IAuthForm) => {
  const [rememberMe, setRememberMe] = useState<"TRUE" | "FALSE">("FALSE");
  const [formData, setFormData] = useState<IFormData>({
    email: "ahmedmcgarry@hotmail.com",
    password: "adriano911",
    confirmPassword: "",
  });

  const toast = useToast();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    if (status === "rejected") {
      toast.show({
        placement: "top",
        render: () => (
          <ToastAlert
            title="Error logging in or signing up"
            description="An error occured, please try again"
            status="error"
            variant="solid"
          />
        ),
      });
    }
  }, [status]);

  useEffect(() => {
      toast.show({
        placement: "top",
        render: () => (
          <ToastAlert
            title="Notice!"
            description="For the purpose of this demo, use the login credentials provided"
            status="info"
            variant="solid"
          />
        ),
      });
  }, []);

  const handleLogin = () => {
    const { password, email } = formData;

    if (!password || !email) return;

    dispatch(userLogin({ email, password, rememberMe }));
  };

  const handleSignup = () => {
    const { password, email, confirmPassword } = formData;

    if (!password || !email || !confirmPassword) return;
    if (password !== confirmPassword) return;
    if (password.length < 6) return;

    dispatch(userSignup({ email, password, rememberMe }));
  };

  const renderEmailField = () => {
    const { email } = formData;
    return (
      <InputField
        label="Email"
        value={email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        fontSize={16}
        placeholder={"ahmedmcgarry@hotmail.com"}
        InputLeftElement={
          <FontAwesome
            name="envelope"
            size={22}
            style={{ marginHorizontal: 8, color: "gray" }}
          />
        }
      />
    );
  };

  const renderPasswordField = () => {
    const { password } = formData;
    return (
      <InputField
        label="Password"
        value={password}
        type={"password"}
        placeholder="●●●●●●●●"
        fontSize={16}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        InputLeftElement={
          <FontAwesomeIcon
            icon={faLock}
            size={22}
            style={{ marginHorizontal: 8, marginRight: 8, color: "gray" }}
          />
        }
        InputRightElement={
          <FontAwesomeIcon
            icon={faEye}
            size={22}
            style={{ marginHorizontal: 8, color: "gray" }}
          />
        }
      />
    );
  };

  const renderConfrimPasswordField = () => {
    const { confirmPassword } = formData;
    return (
      <InputField
        label="Confirm Password"
        type={"password"}
        placeholder="●●●●●●●●"
        value={confirmPassword}
        fontSize={16}
        onChangeText={(text) =>
          setFormData({ ...formData, confirmPassword: text })
        }
        InputLeftElement={
          <FontAwesomeIcon
            icon={faLock}
            size={22}
            style={{ marginHorizontal: 8, color: "gray" }}
          />
        }
        InputRightElement={
          <FontAwesomeIcon
            icon={faEye}
            size={22}
            style={{ marginHorizontal: 8, color: "gray" }}
          />
        }
      />
    );
  };

  const renderSignUp = () => {
    if (type === "LOG_IN") return;

    return (
      <VStack flex={1} space={3}>
        {renderEmailField()}
        {renderPasswordField()}
        {renderConfrimPasswordField()}
        {renderRememberMe()}
      </VStack>
    );
  };

  const renderLogIn = () => {
    if (type === "SIGN_UP") return;

    return (
      <VStack flex={1} space={3}>
        {renderEmailField()}
        {renderPasswordField()}
        {renderRememberMe()}
      </VStack>
    );
  };

  const renderSocialsComponent = () => {
    return <SocialsComponent />;
  };

  const renderSubmitButton = () => {
    if (type === "SIGN_UP") {
      return (
        <PrimaryButton
          alignItems="center"
          backgroundColor={"coolGray.900"}
          onPress={handleSignup}
        >
          Sign Up
        </PrimaryButton>
      );
    }

    return (
      <PrimaryButton
        alignItems="center"
        backgroundColor={"coolGray.900"}
        onPress={handleLogin}
      >
        Log In
      </PrimaryButton>
    );
  };

  const renderRememberMe = () => {
    return (
      <Checkbox
        value={rememberMe}
        size="sm"
        mt={2}
        onChange={() => {
          rememberMe === "FALSE"
            ? setRememberMe("TRUE")
            : setRememberMe("FALSE");
        }}
      >
        <Text color={"gray.500"}>Remember Me</Text>
      </Checkbox>
    );
  };

  return (
    <Box flexGrow={1} padding={4} flex={3} justifyContent={"space-between"}>
      {renderSignUp()}
      {renderLogIn()}
      {renderSocialsComponent()}
      {renderSubmitButton()}
    </Box>
  );
};

export default AuthForm;
