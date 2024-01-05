import { Pressable, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { addLift } from "../../store/currentWorkoutSlice";
import { RootStackScreenProps } from "../../types";
import { ExerciseList } from "../../components/Lists/ExerciseList";
import { constants } from "../../constants";

export interface LiftData {
    exerciseId: number;
    exerciseName: string;
    liftId: string;
}

const AddExercisesTemplates = ({
    navigation,
}: RootStackScreenProps<"AddExercises">) => {
    const [liftData, setLiftData] = useState<LiftData[]>([]);

    const { userId } = useAppSelector((state) => state.userSlice.user);

    const dispatch = useAppDispatch();

    const handleAddExercises = () => {
        const params = liftData.map((el) => {
            return {
                ...el,
                userId,
                sets: {}
            };
        });

        dispatch(addLift(params));
        navigation.goBack();
    };

    const renderHeading = () => (
        <Text style={styles.heading}>
            All Exercises
        </Text>
    );

    const renderList = () => {

        return <ExerciseList showExerciseDetails={false} />;
    };

    const renderAddExercises = () => {
        const buttonText =
            liftData.length < 1
                ? "Add Exercise"
                : `Add Selected Exercises (${liftData.length})`;

        return (
            <Pressable
                style={styles.addExercisesCta}
                onPress={handleAddExercises}
            >
                <Text style={styles.addExercisesCtaText}>
                    {buttonText}
                </Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.pageContainer}>
            {renderHeading()}
            {renderList()}
            {renderAddExercises()}
        </View>
    );
};


const styles = StyleSheet.create({
    pageContainer: {
        padding: 12,
        backgroundColor: "white",
        height: "100%"
    },

    heading: {
        fontSize: constants.fonts.heading.size.xs,
        marginVertical: 4,
    },

    addExercisesCta: {
        backgroundColor: "skyblue",
        alignItems: "center",
        paddingVertical: 4,
        marginBottom: 12,
    },

    addExercisesCtaText: {
        fontWeight: "bold",
    }
})


export default AddExercisesTemplates;
