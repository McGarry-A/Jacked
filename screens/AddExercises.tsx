import { FontAwesome } from "@expo/vector-icons";
import { useAtom } from "jotai";
import {
  Box,
  FlatList,
  Heading,
  Input,
  Skeleton,
  Text,
  View,
} from "native-base";
import { Suspense } from "react";
import ExerciseCard from "../components/layout/ExerciseCard";
import { useExerciseList } from "../hooks/useExerciseList";
import { addToWorkoutIds } from "../store/store";

const AddExercises = () => {
  const exerciseList = useExerciseList();
  const { list } = exerciseList;

  const [exerciseIds] = useAtom(addToWorkoutIds)

  return (
    <View padding={3} backgroundColor={"white"} h="full">
        <Text>{JSON.stringify(exerciseIds)}</Text>
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
