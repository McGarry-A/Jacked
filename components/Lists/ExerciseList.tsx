import { FontAwesome } from "@expo/vector-icons";
import { Input, Skeleton, VStack, SectionList, Text } from "native-base";
import React, { lazy, Suspense, useState } from "react";
import useExerciseList from "../../hooks/useExerciseList";
import ExerciseInterface from "../../types/ExerciseInterface";
import exerciseListToSections from "../../utils/ExerciseList/exerciseListToSections";

interface Props {
  showExerciseDetails: boolean;
}

const ExerciseCard = lazy(() => import("../Layout/Cards/ExerciseCard"));

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
    const sectionList = exercises.length
      ? exerciseListToSections(exercises)
      : exerciseListToSections(exerciseList);
    return (
      <SectionList
        sections={sectionList}
        borderRadius={5}
        overflow={"hidden"}
        flexGrow={1}
        renderSectionHeader={({ section: { title } }) => (
          <Text fontWeight={700} color={"coolGray.300"} fontSize={"xs"} p={2}>
            {title}
          </Text>
        )}
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
