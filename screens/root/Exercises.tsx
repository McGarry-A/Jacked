import { StyleSheet, View, Text } from "react-native";
import { constants } from "../../constants";
import { ExerciseList as ExerciseListComponent } from "../../components/Lists/ExerciseList";
import useColorScheme from "../../hooks/useColorScheme";


const Exercises = () => {
  const renderHeading = () => (
    <Text style={styles.heading}>Exercises</Text>
  );

  const renderExerciseList = () => {
    return <ExerciseListComponent showExerciseDetails />;
  };

  return (
    <View style={styles.view}>
      {renderHeading()}
      {renderExerciseList()}
    </View>
  );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        marginHorizontal: 12,
    },

    heading: {
        // color: h1ColorMode,
        fontSize: constants.fonts.heading.size.md,
        fontWeight: 'bold',
        marginVertical: 12
    }
})

export default Exercises;
