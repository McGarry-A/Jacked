import { FontAwesome } from "@expo/vector-icons";
import { FlatList, Input, ScrollView, Text } from "native-base";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchAllExercises } from "../../store/exerciseList";
import ExerciseInterface from "../../types/ExerciseInterface";
import ExerciseCard from "./ExerciseCard";

interface Props {
  cardProps?: Object;
}

export const ExerciseList: React.FC<Props> = ({ cardProps }) => {
  const [exercises, setExercises] = useState<ExerciseInterface[]>([]);
  const dispatch = useAppDispatch();
  const { exerciseList, status } = useAppSelector(
    (state) => state.exerciseListSlice
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllExercises());
    }

    setExercises(exerciseList);
  }, [status]);

  if (status === "rejected") {
    return (
      <Text textAlign={"center"} color={"rose.800"}>
        There was an error loading this content! Please try again later.
      </Text>
    );
  }

  const handleFilter = (text: string) => {
    const filteredExercises = exerciseList.filter((el) =>
      el.exercise_name.includes(text)
    );
    setExercises(filteredExercises);
  };

  const renderSearchBar = () => (
    <Input
      flexDir={"row"}
      justifyContent="center"
      alignItems={"center"}
      paddingX={2}
      borderRadius={2}
      borderColor={"gray.200"}
      onChangeText={(text) => handleFilter(text)}
      fontSize={"md"}
      placeholder="Search"
      leftElement={
        <FontAwesome
          name="search"
          color="black"
          style={{ marginLeft: 10, color: "gray" }}
          size={15}
        />
      }
    />
  );
  const renderBodyPartFilter = () => {};
  const renderCategoriesFilter = () => {};

  return (
    <ScrollView my={2} flexGrow={1}>
      {renderSearchBar()}
      <FlatList
        data={exercises}
        renderItem={({ item }) => <ExerciseCard {...item} {...cardProps} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
};
