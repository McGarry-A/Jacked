import { FontAwesome } from "@expo/vector-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FormControl, Input } from "native-base";
import { useState } from "react";
import PrimaryButton from "../layout/Buttons/PrimaryButton";
import InputField from "../layout/InputField";
import AuthStateSwitcher from "./AuthStateSwitcher";

interface IAuthForm {
  type: "SIGN_UP" | "LOG_IN";
}

interface IFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const AuthForm = ({ type }: IAuthForm) => {
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async () => {};
  const handleSignup = async () => {};

  const renderEmailField = () => {
    const { email } = formData;
    return (
      <InputField
        label="Email"
        value={email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        InputLeftElement={
          <FontAwesome
            name="envelope"
            size={15}
            style={{ marginRight: 8, color: "gray" }}
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
        onChangeText={(text) => setFormData({ ...formData, password: text })}
      />
    );
  };

  const renderConfrimPasswordField = () => {
    const { confirmPassword } = formData;
    return (
      <InputField
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) =>
          setFormData({ ...formData, confirmPassword: text })
        }
      />
    );
  };

  const renderSignUp = () => {
    if (type === "LOG_IN") return;

    return (
      <>
        {renderEmailField()}
        {renderPasswordField()}
        {renderConfrimPasswordField()}
      </>
    );
  };

  const renderLogIn = () => {
    if (type === "SIGN_UP") return;

    return (
      <>
        {renderEmailField()}
        {renderPasswordField()}
      </>
    );
  };

  const renderSubmitButton = () => {
    if (type === "SIGN_UP") {
      return <PrimaryButton onPress={handleSignup}>Sign Up</PrimaryButton>;
    }

    return <PrimaryButton onPress={handleLogin}>Log In</PrimaryButton>;
  };

  return (
    <>
      {renderSignUp()}
      {renderLogIn()}
      {renderSubmitButton()}
    </>
  );
};

export default AuthForm;
