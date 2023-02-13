import {
  Box,
  Text,
  Pressable,
  Input,
  View,
  VStack,
  Image,
  FlatList,
  Button,
  HStack,
} from "native-base";
import { useState } from "react";
import Timer from "../../components/utils/Timer";
import { useAppDispatch, useAppSelector } from "../../store";
import { saveWorkout, setWorkoutTitle } from "../../store/currentWorkoutSlice";
import Lift from "../../components/layout/Lift";
import { useNavigation } from "@react-navigation/native";

const CreateWorkout = () => {
  const [title, setTitle] = useState<string>("");
  const state = useAppSelector((state) => state.currentWorkoutSlice);
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();

  const handleEndWorkout = () => {
    dispatch(setWorkoutTitle(title));
    dispatch(saveWorkout());
    // navigate("Profile");
  };

  const renderHeading = () => {
    return (
      <Input
        flexDirection={"row"}
        alignItems="center"
        justifyContent={"space-between"}
        value={title}
        onChangeText={(text) => setTitle(text)}
        borderWidth={0}
        fontWeight={700}
        color={"coolGray.700"}
        _focus={{ backgroundColor: "white" }}
        fontSize={"2xl"}
        editable
        rightElement={renderEndWorkout()}
      />
    );
  };

  const renderTimer = () => (
    <Box paddingX={3} mb={2}>
      <Timer />
    </Box>
  );

  const renderEndWorkout = () => {
    return (
      <HStack
        flexDir={"row"}
        alignItems="center"
        justifyContent={"flex-end"}
        pr={2}
      >
        <Button
          mt={2}
          px={3}
          py={2}
          shadow={1}
          borderRadius={5}
          backgroundColor="green.400"
          onPress={handleEndWorkout}
        >
          <Text
            color="green.50"
            fontWeight={700}
            textAlign={"center"}
            fontSize="xs"
            letterSpacing={"xl"}
          >
            FINISH
          </Text>
        </Button>
      </HStack>
    );
  };

  const renderButtons = () => {
    return (
      <Box padding={3}>
        <Pressable
          onPress={() => navigate("AddExercises")}
          marginY={1}
          backgroundColor="info.400"
          height={9}
          justifyContent={"center"}
        >
          <Text color="white" fontWeight={700} textAlign={"center"}>
            Add A Lift
          </Text>
        </Pressable>
      </Box>
    );
  };

  const renderNoLifts = () => {
    return (
      <Box flexGrow={1} justifyContent={"center"} alignItems="center">
        <Image
          source={require("../../images/undraw_Powerful_re_frhr.png")}
          alt={"Personal Trainer Training Client"}
          size={"2xl"}
        />
        <Text
          color={"text.700"}
          opacity={50}
          fontWeight="semibold"
          textTransform="capitalize"
        >
          Add some lifts to start your workout!
        </Text>
      </Box>
    );
  };

  const renderLifts = () => {
    const { exercises } = state;

    if (Object.keys(exercises).length < 1) return renderNoLifts();

    return (
      <VStack flex={1} px={2} space={1}>
        <FlatList
          data={Object.values(exercises)}
          renderItem={({ item }) => <Lift {...item} />}
          keyExtractor={(item) => item.liftId}
        />
      </VStack>
    );
  };

  return (
    <View backgroundColor={"coolGray.50"}>
      {renderHeading()}
      {renderTimer()}
      {renderLifts()}
      {renderButtons()}
    </View>
  );
};

export default CreateWorkout;
