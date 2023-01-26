import { View, Heading } from "native-base";
import { ExerciseList as ExerciseListComponent } from "../../components/layout/ExerciseList";
import useColorScheme from "../../hooks/useColorScheme";

const Exercises = () => {
  const { h1ColorMode, screenColorMode } = useColorScheme();
  const renderHeading = () => (
    <Heading size={"xl"} color={h1ColorMode} my={2}>
      Exercises
    </Heading>
  );

  const renderExerciseList = () => {
    const config = {
      showInput: true,
      showFilterButtons: true,
    };
    return <ExerciseListComponent config={config} />;
  };

  return (
    <View flex={1} backgroundColor={screenColorMode} padding={3}>
      {renderHeading()}
      {renderExerciseList()}
    </View>
  );
};

export default Exercises;
