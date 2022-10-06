import { FontAwesome } from "@expo/vector-icons";
import { View, Text, Box, Input, Pressable, FormControl } from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");

  const toggleLoginState = () => {
    setIsLogin(!isLogin);
  };

  const renderEmailField = () => {
    return (
      <FormControl>
        <FormControl.Label>E-mail</FormControl.Label>
        <Input
          type="text"
          variant="filled"
          w="full"
          autoCapitalize={"none"}
          placeholder="Enter Email"
          InputRightElement={
            <FontAwesome
              name="envelope"
              size={15}
              style={{ marginRight: 8, color: "gray" }}
            />
          }
        />
      </FormControl>
    );
  };

  const renderPasswordField = () => {
    return (
      <FormControl>
        <FormControl.Label>Password</FormControl.Label>
        <Input
          w="full"
          placeholder="Enter Password"
          type={"password"}
          variant="filled"
          InputRightElement={
            <FontAwesome
              name="anchor"
              size={15}
              style={{ marginRight: 8, color: "gray" }}
            />
          }
        />
      </FormControl>
    );
  };

  const renderConfrimPasswordField = () => {
    return (
      <FormControl>
        <FormControl.Label>Confirm Password</FormControl.Label>
        <Input
          w="full"
          placeholder="Enter Password"
          type={"password"}
          variant="filled"
          InputRightElement={
            <FontAwesome
              name="anchor"
              size={15}
              style={{ marginRight: 8, color: "gray" }}
            />
          }
        />
      </FormControl>
    );
  };

  const renderButton = (iconName: "sign-in", buttonText: string) => {
    return (
      <Box w={"full"} my={2}>
        <Pressable
          backgroundColor="info.400"
          w="full"
          p={2}
          flexDir="row"
          justifyContent={"center"}
          alignItems="center"
        >
          <Text textAlign={"center"} color="white" fontWeight={700}>
            {buttonText}
          </Text>
          <FontAwesome
            name={iconName}
            size={15}
            style={{ color: "white", fontWeight: "700", marginLeft: 8 }}
          />
        </Pressable>
      </Box>
    );
  };

  const renderSwitchState = () => {
    if (isLogin) {
      return (
        <Box my={2}>
          <Text textAlign={"center"} fontSize="sm">
            Dont have an account?{" "}
            <Pressable onPress={toggleLoginState}>
              <Text fontSize="sm" color="info.400" fontWeight={700}>
                Sign up
              </Text>
            </Pressable>
          </Text>
        </Box>
      );
    }
    return (
      <Box my={2}>
        <Text textAlign={"center"} fontSize="sm">
          Already have an account?{" "}
          <Pressable onPress={toggleLoginState}>
            <Text fontSize="sm" color="info.400" fontWeight={700}>
              Log in
            </Text>
          </Pressable>
        </Text>
      </Box>
    );
  };

  const renderLogin = () => {
    if (isLogin) {
      return (
        <Box h="full" alignItems={"center"} justifyContent="center" mx={5}>
          {renderEmailField()}
          {renderPasswordField()}
          {renderButton("sign-in", "Log-in")}
          {renderSwitchState()}
        </Box>
      );
    }
  };

  const renderSignin = () => {
    if (!isLogin) {
      return (
        <Box h="full" alignItems={"center"} justifyContent="center" mx={5}>
          {renderEmailField()}
          {renderPasswordField()}
          {renderConfrimPasswordField()}
          {renderButton("sign-in", "Sign-In")}
          {renderSwitchState()}
        </Box>
      );
    }
  };

  return (
    <View justifyContent={"center"}>
      {renderLogin()}
      {renderSignin()}
    </View>
  );
};

export default Auth;
