import { FontAwesome } from "@expo/vector-icons";
import { FlatList, Input, Skeleton, Text, VStack, useToast } from "native-base";
import { lazy, Suspense, useEffect, useState } from "react";
import useExerciseList from "../../hooks/useExerciseList";
import { LiftData } from "../../screens/modals/AddExercises";
import ExerciseInterface from "../../types/ExerciseInterface";
import ToastAlert from "../utils/ToastAlert";

interface Props {
  cardProps?: {
    setLiftData: React.Dispatch<React.SetStateAction<LiftData[]>>;
    liftData: LiftData[];
  };
  config: {
    showInput: boolean;
  };
}

const ExerciseCard = lazy(() => import("./ExerciseCard"));

export const ExerciseList: React.FC<Props> = ({
  cardProps,
  config: { showInput = true },
}) => {
  const [exercises, setExercises] = useState<ExerciseInterface[]>([]);

  const { list: exerciseList, isLoading, error } = useExerciseList();
  const toast = useToast();

  useEffect(() => {
    return () => {
      if (cardProps) {
        const { setLiftData } = cardProps;
        setLiftData([]);
      }
    };
  }, []);

  useEffect(() => {
    if (error) {
      toast.show({
        placement: "top",
        render: () => (
          <ToastAlert
            description="There was an error loading the cards. Please try again later."
            status="error"
            title="Error loading cards!"
            variant="solid"
          />
        ),
      });
    }
  }, [error]);

  const handleFilter = (text: string) => {
    const filteredExercises = exerciseList.filter((el) =>
      el.exercise_name.includes(text)
    );
    setExercises(filteredExercises);
  };

  const renderSearchBar = () => {
    if (showInput) {
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
    }
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
            <ExerciseCard {...item} {...cardProps} isLoading={!isLoading} />
          </Suspense>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

  if (error) {
    return (
      <Text textAlign={"center"} color={"rose.800"}>
        There was an error loading this content! Please try again later.
      </Text>
    );
  }

  return (
    <VStack mt={1} space={3} flex={1}>
      {renderSearchBar()}
      {renderList()}
    </VStack>
  );
};
