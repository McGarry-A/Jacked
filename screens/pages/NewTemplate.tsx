import { Heading, Pressable, Text, View } from "native-base";
import { useState } from "react";
import { ExerciseList } from "../../components/layout/ExerciseList";
import { useAppDispatch } from "../../store";
import { addLiftsToTemplate } from "../../store/templateSlice";
import { LiftData } from "./AddExercisesTemplates";

const NewTemplate = ({ navigation, route }: any) => {
  const [templateData, setTemplateData] = useState<LiftData[]>([]);
  const { folder, title } = route.params;

  const dispatch = useAppDispatch();

  const handleAddExercises = () => {
    const params = templateData.map((el) => {
      return {
        ...el,
      };
    });

    // NOTE: DISPATCH ADD TEMPLATE

    console.log(params, folder, title);
    dispatch(addLiftsToTemplate({ params, folder, title }));
    navigation.navigate("ActiveWorkout")
    // MOVE ON TO THE NEXT PAGE
  };

  const renderHeading = () => (
    <Heading size="lg" color={"text.800"} my={1}>
      Add Exercises
    </Heading>
  );

  const renderList = () => {
    const config = {
      showInput: true,
      showFilterButtons: true,
    };

    const templateProps = {
      setLiftData: setTemplateData,
      liftData: templateData,
    };

    return <ExerciseList cardProps={templateProps} config={config} />;
  };

  const renderAddExercises = () => {
    const buttonText =
      templateData.length < 1
        ? "Add Exercise"
        : `Add Selected Exercises (${templateData.length})`;

    return (
      <Pressable
        backgroundColor={"info.400"}
        alignItems={"center"}
        py={2}
        mb={4}
        onPress={handleAddExercises}
      >
        <Text fontWeight={700} color={"white"}>
          {buttonText}
        </Text>
      </Pressable>
    );
  };

  return (
    <View flex={1} padding={3} backgroundColor="white">
      {renderHeading()}
      {renderList()}
      {renderAddExercises()}
    </View>
  );
};

export default NewTemplate;
