import { FontAwesome } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  View,
  Text,
  Box,
  Input,
  Pressable,
  FormControl,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { reset, userLogin, userSignup } from "../store/userSlice";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import Notification from "./Notification";
import { SafeAreaView } from "react-native-safe-area-context";

const Auth = () => {
  const dispatch = useAppDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>("");
  const [isLoginRejected, _] = useState(
    useAppSelector((state) => state.userSlice.status) === "rejected"
  );

  useEffect(() => {
    if (isLoginRejected) return setError("Incorrect login details");
  }, [userLogin]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(reset());
      setError(null)
    }, 3000);
  }, [error]);

  const toggleLoginState = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = () => {
    if (!password || !email)
      return setError("Please enter username and password");

      // NOTE: 
      // CHECK VALID EMAIL FUNCTION VALIDATEMAIL IF NOT THROW ERROR

    dispatch(userLogin({ email: email, password: password }));
    console.log(`DISPATCHED ${email} ${password}`);
  };

  const handleSignup = async () => {
    // REVIEW: 
    // DOES THE SIGN UP WORK CORRECTLY?
    if (!password || !email || !confrimPassword)
      return setError("Please enter username and password");
    if (password !== confrimPassword)
      return setError("Please ensure passwords match");
    if (password.length < 6)
      return setError(
        "Please ensure that your password is at least 6 characters long."
      );

    dispatch(userSignup({ email: email, password: password }));

    console.log("Signed Up");
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
          backgroundColor={"white"}
          _focus={{
            borderColor: "info.200",
          }}
          value={email}
          onChangeText={(text) => setEmail(text)}
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
          backgroundColor={"white"}
          onChangeText={(text) => setPassword(text)}
          value={password}
          _focus={{
            borderColor: "info.200",
          }}
          InputRightElement={
            <FontAwesomeIcon
              icon={faLock}
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
          backgroundColor={"white"}
          value={confrimPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          _focus={{
            borderColor: "info.200",
          }}
          InputRightElement={
            <FontAwesomeIcon
              icon={faLock}
              size={15}
              style={{ marginRight: 8, color: "gray" }}
            />
          }
        />
      </FormControl>
    );
  };

  const renderButton = (iconName: "sign-in", buttonText: string) => {
    const onPessFunc = buttonText === "Sign-In" ? handleSignup : handleLogin;
    return (
      <Box w={"full"} my={2}>
        <Pressable
          backgroundColor="info.400"
          w="full"
          p={2}
          flexDir="row"
          justifyContent={"center"}
          alignItems="center"
          onPress={onPessFunc}
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

  const renderHeading = () => {
    return (
      <Box flexDirection={"row"} alignItems="center" pl={5} pt={5}>
        <Text fontSize={"xs"} fontWeight={700} opacity={50} letterSpacing={2}>
          JACKED
        </Text>
      </Box>
    );
  };

  const renderErrorNotification = () => {
    const errorProps = {
      status: "error",
      content: error || "",
      variant: "solid",
      dismissFunc: () => dispatch(reset()),
    };

    if (error) {
      return <Notification {...errorProps} />;
    }
  };

  return (
    <SafeAreaView>
      <View justifyContent={"center"} h={"full"}>
        {renderErrorNotification()}
        <Box mx={4} backgroundColor={"whitesmoke"} h={"sm"} my={"auto"}>
          {renderHeading()}
          {renderLogin()}
          {renderSignin()}
        </Box>
      </View>
    </SafeAreaView>
  );
};

export default Auth;
