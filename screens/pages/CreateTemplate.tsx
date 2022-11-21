import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Heading,
  Input,
  Pressable,
  Text,
  View,
  VStack,
} from "native-base";
import { useState } from "react";
import { ExerciseList } from "../../components/layout/ExerciseList";
import { useAppDispatch, useAppSelector } from "../../store";
import { addLift, startWorkout } from "../../store/currentWorkoutSlice";
import { addLiftsToTemplate } from "../../store/templateSlice";
import { LiftData } from "./AddExercisesTemplates";

type StepType = "choose title" | "choose folder" | "add exercises";

export default function CreateTemplate() {
  const [step, setStep] = useState<StepType>("choose title");
  const [templateTitle, setTemplateTitle] = useState<string>("");
  const [activeFolderId, setActiveFolderId] = useState<string>("");
  const [liftData, setLiftData] = useState<LiftData[]>([]);

  const folders = useAppSelector((state) => state.templateSlice.folders);
  const { userId } = useAppSelector((state) => state.userSlice.user);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const next = () =>
    step === "choose title"
      ? setStep("choose folder")
      : step === "choose folder"
      ? setStep("add exercises")
      : handleAddExercises();

  const handleChooseFolder = (folderId: string) => {
    setActiveFolderId(folderId);
    next();
  };

  const startActiveWorkout = () => {
    const params = liftData.map((el) => {
      return {
        ...el,
        userId,
      };
    });

    dispatch(addLift(params));
    dispatch(startWorkout({ userId }));
  };

  const handleAddExercises = () => {
    dispatch(
      addLiftsToTemplate({
        params: liftData,
        folder: activeFolderId,
        title: templateTitle,
      })
    );
    startActiveWorkout();
    navigation.navigate("ActiveWorkout");
  };

  const renderHeading = () => (
    <Heading size="lg" color={"text.800"} my={1} textTransform="capitalize">
      {step}
    </Heading>
  );

  const renderTemplateTitleInput = () => {
    if (step !== "choose title") return;

    return (
      <Input
        placeholder="Quick Workout"
        value={templateTitle ? templateTitle : ""}
        my={1}
        fontSize="lg"
        onChangeText={(text) => setTemplateTitle(text)}
      />
    );
  };

  const renderChooseFolder = () => {
    if (step !== "choose folder") return;

    return (
      <VStack>
        {Object.values(folders).map((el) => {
          return (
            <Button
              key={el.id}
              variant={"outline"}
              onPress={() => handleChooseFolder(el.id)}
            >
              {el.name}
            </Button>
          );
        })}
      </VStack>
    );
  };

  const renderNext = () => {
    if (step === "add exercises") return renderAddExercises();

    return (
      <Button backgroundColor={"info.400"} mt={"auto"} onPress={next}>
        <Text fontWeight={700} color="white">
          Next
        </Text>
      </Button>
    );
  };

  const renderList = () => {
    if (step !== "add exercises") return;

    const config = {
      showInput: true,
      showFilterButtons: true,
    };

    const templateProps = {
      liftData,
      setLiftData
    };

    return <ExerciseList config={config} cardProps={templateProps} />;
  };

  const renderAddExercises = () => {
    const buttonText =
      liftData.length < 1
        ? "Add Exercise"
        : `Add Selected Exercises (${liftData.length})`;

    return (
      <Pressable
        backgroundColor={"info.400"}
        alignItems={"center"}
        py={2}
        mb={4}
        onPress={next}
      >
        <Text fontWeight={700} color={"white"}>
          {buttonText}
        </Text>
      </Pressable>
    );
  };

  return (
    <View flex={1} backgroundColor={"white"} p={3}>
      {renderHeading()}
      {renderTemplateTitleInput()}
      {renderChooseFolder()}
      {renderList()}
      {renderNext()}
    </View>
  );
}
