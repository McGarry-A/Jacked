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
  Spinner,
  Pressable,
  VStack,
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

  const handleFilterBodyPart = () => {};
  const handleFilterCategory = () => {};

  const renderHeading = () => (
    <Heading size={"xl"} mb={1} color={"text.800"}>
      Exercises
    </Heading>
  );

  const renderSearchBar = () => (
    <Input
      flexDir={"row"}
      justifyContent="center"
      alignItems={"center"}
      paddingX={2}
      borderRadius={2}
      borderColor={"gray.200"}
      fontSize={"md"}
      placeholder="Search"
      leftElement={
        <FontAwesome name="search" color="black" style={{ marginLeft: 10 }} />
      }
    />
  );

  const renderButton = (title: string, actionHandler: () => void) => (
    <Button
      flex={1}
      backgroundColor={"info.400"}
      onPress={actionHandler}
      size={"sm"}
    >
      <Text textAlign={"center"} color={"white"} fontWeight={"bold"}>
        {title}
      </Text>
    </Button>
  );

  const renderExerciseFilter = () => {
    return (
      <VStack space={1}>
        {renderSearchBar()}
        <HStack flexDir={"row"} space={1}>
          {renderButton("Body Part", handleFilterBodyPart)}
          {renderButton("Category", handleFilterCategory)}
        </HStack>
      </VStack>
    );
  };

  const renderExerciseList = () => {
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
