import { Text } from "native-base";

interface IAuthStateSwitch {
  type: "SIGN_UP" | "LOG_IN";
}

const AuthStateSwitcher = ({ type }: IAuthStateSwitch) => {
  if (type === "LOG_IN") {
    return (
      <Text>
        Already have an account?{" "}
        <Text fontWeight={700} textDecoration={"underline"}>
          Log in
        </Text>
      </Text>
    );
  }

  return (
    <Text>
      Dont have an account?{" "}
      <Text fontWeight={700} textDecoration={"underline"}>
        Sign up
      </Text>
    </Text>
  );
};

export default AuthStateSwitcher;
