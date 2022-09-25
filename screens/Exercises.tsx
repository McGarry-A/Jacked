import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Heading,
  FlatList,
  Box,
  Input,
  Button,
  HStack,
} from "native-base";
import ExerciseCard from "../components/layout/ExerciseCard";
import data from "../data";

const Exercises = () => {
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
    return (
      <FlatList
        data={Object.values(data)}
        renderItem={({ item }) => <ExerciseCard item={{ ...item }} />}
        keyExtractor={(item) => item.id}
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
