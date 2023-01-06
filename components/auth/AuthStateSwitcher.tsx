import { Text } from "native-base";
import { SetStateAction } from "react";
import { useNavigation } from "@react-navigation/native";

interface IAuthStateSwitch {
  type: "SIGN_UP" | "LOG_IN";
  setType?: React.Dispatch<SetStateAction<"SIGN_UP" | "LOG_IN">>;
}

const AuthStateSwitcher = ({ type, setType }: IAuthStateSwitch) => {
  const { navigate } = useNavigation();

  const handleSwitch = () => {
    if (!setType) return navigate("Auth", { type: "LOG_IN" });
    if (type === "SIGN_UP") return setType("LOG_IN");

    setType("SIGN_UP");
  };

  if (type === "SIGN_UP") {
    return (
      <Text textAlign={"center"} my={5}>
        Already have an account?{" "}
        <Text fontWeight={700} underline onPress={handleSwitch}>
          Log in
        </Text>
      </Text>
    );
  }

  return (
    <Text textAlign={"center"} my={5}>
      Dont have an account?{" "}
      <Text fontWeight={700} underline onPress={handleSwitch}>
        Sign up
      </Text>
    </Text>
  );
};

export default AuthStateSwitcher;
