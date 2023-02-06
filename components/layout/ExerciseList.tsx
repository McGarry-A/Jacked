import { FontAwesome } from "@expo/vector-icons";
import { FlatList, Input, Skeleton, VStack, useToast } from "native-base";
import { lazy, Suspense, useEffect, useState } from "react";
import useExerciseList from "../../hooks/useExerciseList";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchAllExercises } from "../../store/exerciseList";
import ExerciseInterface from "../../types/ExerciseInterface";

interface Props {
  showExerciseDetails: boolean;
}

const ExerciseCard = lazy(() => import("./ExerciseCard"));

export const ExerciseList: React.FC<Props> = ({
  showExerciseDetails = false,
}) => {
  const [exercises, setExercises] = useState<ExerciseInterface[]>([]);
  const { exerciseList, status } = useExerciseList();

  const handleFilter = (text: string) => {
    const filteredExercises = exerciseList.filter((el) =>
      el.exercise_name.includes(text)
    );
    setExercises(filteredExercises);
  };

  const renderSearchBar = () => {
    return (
      <Input
        flexDir={"row"}
        justifyContent="center"
        alignItems={"center"}
        paddingX={2}
        borderRadius={5}
        borderColor={"coolGray.200"}
        backgroundColor={"white"}
        _dark={{
          backgroundColor: "coolGray.600",
          borderColor: "coolGray.600",
        }}
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
  };

  const renderList = () => {
    return (
      <FlatList
        data={exercises.length ? exercises : exerciseList}
        borderRadius={5}
        overflow={"hidden"}
        flexGrow={1}
        renderItem={({ item }) => (
          <Suspense
            fallback={
              <Skeleton
                w={"full"}
                h={"12"}
                startColor={"gray.50"}
                endColor={"gray.100"}
                my={2}
              />
            }
          >
            <ExerciseCard
              {...item}
              isLoading={status === "fulfilled"}
              showExerciseDetails={showExerciseDetails}
            />
          </Suspense>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

  return (
    <VStack mt={1} space={3} flex={1}>
      {renderSearchBar()}
      {renderList()}
    </VStack>
  );
};
