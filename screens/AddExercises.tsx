import { FontAwesome } from "@expo/vector-icons";
import { Box, FlatList, Heading, Input, Skeleton, View } from "native-base";
import { Suspense, useEffect } from "react";
import ExerciseCard from "../components/layout/ExerciseCard";
import { useExerciseList } from "../hooks/useExerciseList";

const AddExercises = () => {
  const { list, isLoading, error } = useExerciseList();

  return (
    <View padding={3} backgroundColor={"white"} h="full">
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
      <Box my={2}>
        <Suspense fallback={<Skeleton h={40} />}>
          <Heading size="sm" color={"text.500"} mb={2}>
            All Exercises
          </Heading>
          <FlatList
            data={list}
            renderItem={({ item }) => <ExerciseCard {...item} />}
          />
        </Suspense>
      </Box>
    </View>
  );
};

export default AddExercises;
