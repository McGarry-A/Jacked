import { View, Heading } from "native-base";
import { ExerciseList as ExerciseListComponent } from "../../components/layout/ExerciseList";

const Exercises = () => {
  const renderHeading = () => (
    <Heading size={"xl"} color={"coolGray.700"}>
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
    <View flex={1} backgroundColor="coolGray.50" padding={3}>
      {renderHeading()}
      {renderExerciseList()}
    </View>
  );
};

export default Exercises;
