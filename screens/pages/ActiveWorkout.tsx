import { View, StyleSheet } from "react-native";
import CreateWorkout from "../../components/CreateWorkout/CreateWorkout";

const ActiveWorkout = () => {
    return (
        <View style={styles.container}>
            <CreateWorkout template={false} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%",
        paddingHorizontal: 4,
        paddingVertical: 12
    }
})

export default ActiveWorkout;
