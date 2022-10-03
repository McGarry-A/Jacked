import { FontAwesome } from "@expo/vector-icons";
import { Box, FlatList, Heading, Input, Skeleton, View } from "native-base";
import { Suspense, useEffect } from "react";
import ExerciseCard from "../components/layout/ExerciseCard";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchAllExercises } from "../store/exerciseList";

const AddExercises = () => {
  const dispatch = useAppDispatch();
  const { exerciseList, status } = useAppSelector(
    (state) => state.exerciseListSlice
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllExercises());
    }
  }, []);

  const renderInput = () => {
    return (
      <Input
        placeholder="Filter Exercises Here"
        size="lg"
        type="text"
        variant={"filled"}
        marginBottom={2}
        InputLeftElement={
          <FontAwesome
            name="search"
            color="darkgray"
            style={{ marginHorizontal: 8 }}
            size={15}
          />
        }
      />
    );
  };

  const renderHeading = () => (
    <Heading size="sm" color={"text.500"} mb={2}>
      All Exercises
    </Heading>
  );

  const renderList = () => {
    return (
      <Box my={2}>
        <Suspense fallback={<Skeleton h={"full"} />}>
          <FlatList
            data={exerciseList}
            renderItem={({ item }) => <ExerciseCard {...item} isPressable />}
          />
        </Suspense>
      </Box>
    );
  };

  return (
    <View padding={3} backgroundColor={"white"} h="full">
      {renderInput()}
      {renderHeading()}
      {renderList()}
    </View>
  );
};

export default AddExercises;
