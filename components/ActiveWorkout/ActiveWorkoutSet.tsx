import usePreviousSet from "@Hooks/usePreviousSet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { View, TextInput, Pressable, StyleSheet, Text } from "react-native";
import { useRef, useState } from "react";
import { useAppDispatch } from "@Store/index";
import { Swipeable } from "react-native-gesture-handler";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import {
    deleteSet,
    updateReps,
    updateWeight,
} from "@Store/currentWorkoutSlice";

interface Props {
    weight: string;
    reps: string;
    rpe: number;
    setNumber: number;
    liftId: string;
    setId: string;
    exerciseId: number;
    template: boolean;
}

const ActiveWorkoutSet = (props: Props) => {
    const { exerciseId, setNumber, weight, reps, template } = props;
    const [isDone, setIsDone] = useState<boolean>(false);

    const swipeableRef = useRef<null | any>(null);

    const previous = usePreviousSet({ exerciseId, setNumber });
    const dispatch = useAppDispatch();

    const handleSwipeRight = () => {
        const { liftId, setId } = props;

        dispatch(deleteSet({ liftId, setId, setNumber }));
        swipeableRef.current && swipeableRef.current.close();
    };

    const handleUpdateWeight = (newwWeight: string) => {
        const { setId, liftId } = props;

        const params = {
            liftId,
            setId,
            weight: newwWeight,
        };

        dispatch(updateWeight(params));
    };

    const handleUpdateReps = (newwReps: string) => {
        const { setId, liftId } = props;

        const params = {
            liftId,
            setId,
            reps: newwReps,
        };

        dispatch(updateReps(params));
    };

    const handleCheckSet = () => {
        setIsDone((isDone) => !isDone);
    };

    const renderOnSwipeRight = () => {
        return (
            <View style={styles.deleteSetContainer}>
                <Text style={styles.deleteSetText}>Delete Set</Text>
            </View>
        );
    };

    const renderSetNumber = () => (
        <View style={styles.setNumberContainer}>
            <Pressable style={styles.setNumberPressable}>
                <Text style={styles.setNumberText}>{setNumber}</Text>
            </Pressable>
        </View>
    );

    const renderPrevious = () => {
        if (!previous) {
            return (
                <View style={styles.previousContainer}>
                    <FontAwesomeIcon icon={faMinus} size={18} />
                </View>
            );
        }

        const previousString = `${previous?.weight} kg x ${previous?.reps}`

        return <Text style={styles.previousContainerText}>{previousString}</Text>
    };

    const renderWeightInput = () => (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder={weight}
                keyboardType={"phone-pad"}
                editable={!isDone}
                onChangeText={(text) => handleUpdateWeight(text)}
            />
        </View>
    );

    const renderRepsInput = () => (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder={reps}
                keyboardType={"phone-pad"}
                editable={!isDone}
                onChangeText={(text: string) => handleUpdateReps(text)}
            />
        </View>
    );

    const renderCheck = () => {
        return (
            <Pressable style={styles.checkmarkPressable} onPress={handleCheckSet}>
                <FontAwesomeIcon icon={template ? faMinus : faCheck} size={15} />
            </Pressable>
        );
    };

    return (
        <Swipeable
            renderRightActions={renderOnSwipeRight}
            onSwipeableOpen={handleSwipeRight}
            rightThreshold={10}
            ref={swipeableRef}
        >
            <View style={isDone ? styles.setContainerSuccess : styles.setContainer}>
                {renderSetNumber()}
                {renderPrevious()}
                {renderWeightInput()}
                {renderRepsInput()}
                {renderCheck()}
            </View>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    setContainer: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
    },
    setContainerSuccess: {
        backgroundColor: "green",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
    },
    deleteSetContainer: {
        backgroundColor: "red",
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 12,
    },

    deleteSetText: {
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    setNumberContainer: { flex: 1 },
    setNumberPressable: {
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        zIndex: -1,
    },
    setNumberText: { textAlign: "center", fontWeight: "bold" },
    checkmarkPressable: { alignItems: "flex-end", flexShrink: -1 },
    inputContainer: {
        flex: 2,
    },
    previousContainer: {
        flex: 2,
    },
    previousContainerText: {
        fontSize: 12,
        opacity: 0.5,
        flex: 2,
        fontWeight: "bold",
    },
});

export default ActiveWorkoutSet;
