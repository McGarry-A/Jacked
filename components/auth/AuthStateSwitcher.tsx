import { Text } from "native-base";

interface IAuthStateSwitch {
  type: "SIGN_UP" | "LOG_IN";
}

const AuthStateSwitcher = ({ type }: IAuthStateSwitch) => {
  if (type === "LOG_IN") {
    return (
      <Text textAlign={"center"} my={5}>
        Already have an account?{" "}
        <Text fontWeight={700} underline>
          Log in
        </Text>
      </Text>
    );
  }

  return (
    <Text textAlign={"center"} my={5}>
      Dont have an account?{" "}
      <Text fontWeight={700} underline>
        Sign up
      </Text>
    </Text>
  );
};

export default AuthStateSwitcher;
