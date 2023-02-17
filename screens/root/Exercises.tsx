import { View, Heading } from "native-base";
import { ExerciseList as ExerciseListComponent } from "../../components/Lists/ExerciseList";
import useColorScheme from "../../hooks/useColorScheme";

const Exercises = () => {
  const { h1ColorMode, screenColorMode } = useColorScheme();
  const renderHeading = () => (
    <Heading size={"xl"} color={h1ColorMode} my={2}>
      Exercises
    </Heading>
  );

  const renderExerciseList = () => {
    return <ExerciseListComponent showExerciseDetails />;
  };

  return (
    <View
      flex={1}
      backgroundColor={screenColorMode}
      padding={3}
      _web={{
        maxW: "lg",
        w: "100%",
        mx: "auto",
      }}
    >
      {renderHeading()}
      {renderExerciseList()}
    </View>
  );
};

export default Exercises;
