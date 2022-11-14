import { View, Heading } from "native-base";
import { ExerciseList as ExerciseListComponent } from "../../components/layout/ExerciseList";

const Exercises = () => {
  const renderHeading = () => (
    <Heading size={"xl"} mb={1} color={"text.800"}>
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
    <View flex={1} backgroundColor="white" padding={3}>
      {renderHeading()}
      {renderExerciseList()}
    </View>
  );
};

export default Exercises;
