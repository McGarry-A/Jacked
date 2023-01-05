import { FontAwesome } from "@expo/vector-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { useAppDispatch } from "../../store";
import { userLogin, userSignup } from "../../store/userSlice";
import PrimaryButton from "../layout/Buttons/PrimaryButton";
import InputField from "../layout/InputField";

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
        InputRightElement={
          <FontAwesomeIcon
            icon={faLock}
            size={15}
            style={{ marginRight: 8, color: "gray" }}
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
        value={confirmPassword}
        onChangeText={(text) =>
          setFormData({ ...formData, confirmPassword: text })
        }
        InputRightElement={
          <FontAwesomeIcon
            icon={faLock}
            size={15}
            style={{ marginRight: 8, color: "gray" }}
          />
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
