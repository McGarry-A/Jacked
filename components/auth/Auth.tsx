import { FontAwesome } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  View,
  Text,
  Box,
  Input,
  Pressable,
  FormControl,
  Spinner,
  Checkbox,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { reset, userLogin, userSignup } from "../../store/userSlice";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";

const Auth = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(
    (state) => state.userSlice.status === "pending"
  );

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoginRejected, _] = useState(
    useAppSelector((state) => state.userSlice.status) === "rejected"
  );

  useEffect(() => {
    if (isLoginRejected) return setError("Incorrect login details");
  }, [userLogin]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(reset());
      setError(null);
    }, 3000);
  }, [error]);

  const toggleLoginState = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = () => {
    if (!password || !email)
      return setError("Please enter username and password");

    dispatch(userLogin({ email: email, password: password }));
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
          borderRadius={3}
        >
          {isLoading ? (
            <>
              <Spinner color="white" />
              <Text textAlign={"center"} color="white" fontWeight={700} ml={2}>
                Loading
              </Text>
            </>
          ) : (
            <>
              <Text textAlign={"center"} color="white" fontWeight={700}>
                {buttonText}
              </Text>
              <FontAwesome
                name={iconName}
                size={15}
                style={{ color: "white", fontWeight: "700", marginLeft: 8 }}
              />
            </>
          )}
        </Pressable>
      </Box>
    );
  };

  const renderSwitchState = () => {
    if (isLogin) {
      return (
        <Box my={2}>
          <FormControl.Label textAlign={"center"} fontSize="sm">
            Dont have an account?{" "}
            <Pressable onPress={toggleLoginState}>
              <Text fontSize="sm" color="info.400" fontWeight={700}>
                Sign up
              </Text>
            </Pressable>
          </FormControl.Label>
        </Box>
      );
    }
    return (
      <Box my={2}>
        <FormControl.Label textAlign={"center"} fontSize="sm">
          Already have an account?{" "}
          <Pressable onPress={toggleLoginState}>
            <Text fontSize="sm" color="info.400" fontWeight={700}>
              Log in
            </Text>
          </Pressable>
        </FormControl.Label>
      </Box>
    );
  };

  const renderLogin = () => {
    if (isLogin) {
      return (
        <Box h="full" alignItems={"center"} justifyContent="center" mx={5}>
          {renderEmailField()}
          {renderPasswordField()}
          {renderRememberMe()}
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
          {renderRememberMe()}
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

  const renderRememberMe = () => {
    return (
      <FormControl w={"full"} marginY={"4"}>
        <Checkbox
          value={String(rememberMe)}
          size={"sm"}
          borderWidth={0}
          isChecked={rememberMe}
          _checked={{ backgroundColor: "info.400" }}
          onChange={() => {
            setRememberMe((state) => !state);
          }}
        >
          <Text fontSize={"xs"} fontWeight={600} ml={0} opacity={50}>
            Remember Me
          </Text>
        </Checkbox>
      </FormControl>
    );
  };

  const renderAuth = () => {
    return (
      <Box mx={4} h={"sm"} my={"auto"} w={"full"} bgColor={"coolGray.100"}>
        {renderHeading()}
        {renderLogin()}
        {renderSignin()}
      </Box>
    );
  };

  return (
    <View
      h={"full"}
      justifyContent={"center"}
      alignItems={"center"}
      px={5}
      backgroundColor={"white"}
    >
      {renderAuth()}
    </View>
  );
};

export default Auth;
