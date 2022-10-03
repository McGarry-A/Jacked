import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Heading,
  FlatList,
  Box,
  Input,
  Button,
  HStack,
  Skeleton,
  Text,
} from "native-base";
import { useEffect } from "react";
import ExerciseCard from "../components/layout/ExerciseCard";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchAllExercises } from "../store/exerciseList";

const Exercises = () => {
  const dispatch = useAppDispatch();
  const { exerciseList, status } = useAppSelector(
    (state) => state.exerciseListSlice
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllExercises());
    }
  }, []);

  const renderHeading = () => <Heading size={"xl"}>Exercises</Heading>;

  const renderExerciseFilter = () => {
    return (
      <Box>
        <Box
          flexDir={"row"}
          justifyContent="center"
          alignItems={"center"}
          h={10}
          borderWidth={1}
          paddingX={2}
          borderRadius={5}
          borderColor={"gray.300"}
        >
          <FontAwesome name="search" color="black" />
          <Input placeholder="Search" borderWidth={0} flex={1} />
        </Box>
        <HStack marginY={1} flexDir={"row"} space={1}>
          <Button
            flex={1}
            h={"10"}
            backgroundColor={"gray.300"}
            color={"text.900"}
            justifyContent={"center"}
          >
            Body Part
          </Button>
          <Button
            flex={1}
            h={"10"}
            backgroundColor={"gray.300"}
            color={"text.900"}
            justifyContent={"center"}
          >
            Cateogry
          </Button>
        </HStack>
      </Box>
    );
  };

  const renderExerciseList = () => {
    if (status === "pending") {
      return <Skeleton h={"100%"} />;
    }

    if (status === "rejected") {
      return (
        <Text textAlign={"center"} color={"rose.800"}>
          There was an error loading this content! Please try again later.
        </Text>
      );
    }

    return (
      <FlatList
        data={exerciseList}
        renderItem={({ item }) => <ExerciseCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        marginTop={2}
      ></FlatList>
    );
  };

  return (
    <View flex={1} backgroundColor="white" padding={3}>
      {renderHeading()}
      {renderExerciseFilter()}
      {renderExerciseList()}
    </View>
  );
};

export default Exercises;
