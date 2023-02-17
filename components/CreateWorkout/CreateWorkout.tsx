import {
  Box,
  Text,
  Input,
  View,
  VStack,
  Image,
  FlatList,
  Button,
  Center,
} from "native-base";
import Timer from "../Utils/Timer";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  cancelWorkout,
  saveWorkout,
  setWorkoutTitle,
} from "../../store/currentWorkoutSlice";
import ActiveWorkoutLift from "../ActiveWorkout/ActiveWorkoutLift";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createTemplate } from "../../store/templateSlice";

interface IParams {
  folderId: string;
}

interface ICreateWorkout {
  template: boolean;
}

const CreateWorkout = ({ template }: ICreateWorkout) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.currentWorkoutSlice);
  const title = state.workoutTitle || "Untitled Workout";
  const { userId } = useAppSelector((state) => state.userSlice.user);
  const { navigate, goBack } = useNavigation();
  const { params } = useRoute();

  const handleEndWorkout = () => {
    dispatch(setWorkoutTitle(title));
    dispatch(saveWorkout());
    goBack();
  };

  const handleChangeWorkoutTitle = (text: string) => {
    dispatch(setWorkoutTitle(text));
  };

  const handleSaveTemplate = () => {
    const { folderId: folId } = params as IParams;
    const exercisesArray = Object.values(state.exercises);

    const templateParams = {
      folId,
      title,
      params: exercisesArray,
      userId,
    };

    console.log("templateParams", templateParams);

    dispatch(setWorkoutTitle(title));
    dispatch(createTemplate(templateParams));
    dispatch(cancelWorkout());
    goBack();
  };

  const renderHeading = () => {
    return (
      <Input
        flexDirection={"row"}
        alignItems="center"
        justifyContent={"space-between"}
        value={title}
        onChangeText={(text) => handleChangeWorkoutTitle(text)}
        borderWidth={0}
        fontWeight={700}
        color={"coolGray.700"}
        _focus={{
          backgroundColor: "white",
          borderWidth: 0,
          focusOutlineColor: "white",
        }}
        fontSize={"2xl"}
        editable
        mx={2}
        rightElement={renderEndWorkout()}
      />
    );
  };

  const renderTimer = () => {
    return template ? null : (
      <Box paddingX={3} m={2}>
        <Timer />
      </Box>
    );
  };

  const renderEndWorkout = () => {
    return template ? (
      <></>
    ) : (
      <Center>
        <Button
          shadow={1}
          borderRadius={5}
          backgroundColor="green.400"
          onPress={handleEndWorkout}
        >
          <Text
            color="green.50"
            fontWeight={900}
            textAlign={"center"}
            fontSize="xs"
            letterSpacing={"xl"}
          >
            FINISH
          </Text>
        </Button>
      </Center>
    );
  };

  const renderSaveTemplate = () => {
    return !template ? null : (
      <Button
        onPress={handleSaveTemplate}
        backgroundColor="success.400"
        justifyContent={"center"}
        size={"sm"}
      >
        <Text color="success.50" fontWeight={900} textAlign={"center"}>
          Save Template
        </Text>
      </Button>
    );
  };

  const renderCancelWorkout = () => {
    return template ? null : (
      <Button
        justifyContent={"center"}
        size={"sm"}
        variant={"subtle"}
        backgroundColor={"red.400"}
        onPress={() => {
          dispatch(cancelWorkout());
          navigate("Root", { screen: "Start" });
        }}
      >
        <Text color="red.50" fontWeight={900} textAlign={"center"}>
          Cancel
        </Text>
      </Button>
    );
  };
  const renderAddLift = () => {
    return (
      <Button
        onPress={() => navigate("AddExercises")}
        backgroundColor="info.400"
        justifyContent={"center"}
        size={"sm"}
      >
        <Text color="info.50" fontWeight={900} textAlign={"center"}>
          Add A Lift
        </Text>
      </Button>
    );
  };

  const renderButtons = () => {
    return (
      <VStack space={2} mt={2} px={3}>
        {renderCancelWorkout()}
        {renderAddLift()}
        {renderSaveTemplate()}
      </VStack>
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
      <FlatList
        data={Object.values(exercises)}
        renderItem={({ item }) => (
          <ActiveWorkoutLift {...item} template={template} />
        )}
        keyExtractor={(item) => item.liftId}
        flex={1}
      />
    );
  };

  return (
    <View flex={1}>
      {renderHeading()}
      {renderTimer()}
      {renderLifts()}
      {renderButtons()}
    </View>
  );
};

export default CreateWorkout;
