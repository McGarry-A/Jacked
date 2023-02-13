import { View } from "native-base";
import CreateWorkout from "../../components/CreateWorkout/CreateWorkout";

const ActiveWorkout = () => {
  return (
    <View
      backgroundColor={"coolGray.50"}
      h={"full"}
      px={1}
      py={3}
      _web={{
        maxW: "lg",
        w: "100%",
        mx: "auto",
      }}
    >
      <CreateWorkout template={false} />
    </View>
  );
};

export default ActiveWorkout;
