import { FontAwesome } from "@expo/vector-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Box, VStack } from "native-base";
import { useState } from "react";
import { useAppDispatch } from "../../store";
import { userLogin, userSignup } from "../../store/userSlice";
import PrimaryButton from "../layout/Buttons/PrimaryButton";
import InputField from "../layout/InputField";

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
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useAppDispatch();

  const handleLogin = () => {
    const { password, email } = formData;

    if (!password || !email) return;

    dispatch(userLogin({ email, password }));
  };

  const handleSignup = () => {
    const { password, email, confirmPassword } = formData;

    if (!password || !email || !confirmPassword) return;
    if (password !== confirmPassword) return;
    if (password.length < 6) return;

    dispatch(userSignup({ email, password }));
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
      </VStack>
    );
  };

  const renderLogIn = () => {
    if (type === "SIGN_UP") return;

    return (
      <VStack flex={1} space={3}>
        {renderEmailField()}
        {renderPasswordField()}
      </VStack>
    );
  };

  const renderSocialsComponent = () => {
    return <SocialsComponent />
  }

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
