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
  Popover,
} from "native-base";
import { useEffect, useState } from "react";
import ExerciseCard from "../../components/layout/ExerciseCard";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchAllExercises } from "../../store/exerciseList";
import ExerciseInterface from "../../types/ExerciseInterface";

const Exercises = () => {
  const dispatch = useAppDispatch();
  const [exercises, setExercises] = useState<ExerciseInterface[]>([]);
  const [bodyPartFilter, setBodyPartFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [popoverIsOpen, setPopoverIsOpen] = useState<boolean>(false);

  const { exerciseList, status } = useAppSelector(
    (state) => state.exerciseListSlice
  );

  const handleBodyPartFilter = (filter: string) => {
    setBodyPartFilter(filter);
  };

  const handleCategoryFilter = (filter: string) => {
    setCategoryFilter(filter);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllExercises());
    }

    setExercises(exerciseList);
  }, [status]);

  const submitHandler = (filter: string) => {
    const filteredList = exerciseList.filter((el) => el.targets === filter);
    setExercises(filteredList);
    setPopoverIsOpen(false);
  };

  const handleClear = () => {
    setBodyPartFilter("");
    setCategoryFilter("");
    setExercises(exerciseList);
    setPopoverIsOpen(false);
  };

  const handleFilter = (text: string) => {
    const filteredExercises = exerciseList.filter((el) =>
      el.exercise_name.includes(text)
    );
    setExercises(filteredExercises);
  };

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

  const renderButton = ({
    title,
    popoverTitle,
    popoverList,
    addToFilterHandler,
    submitHandler,
    handleClear,
  }: {
    title: string;
    popoverTitle: string;
    popoverList: string[];
    addToFilterHandler: (filter: string) => void;
    submitHandler: (filter: string) => void;
    handleClear: () => void;
  }) => (
    <Box
      backgroundColor={"info.400"}
      flex={1}
      alignItems="center"
      justifyContent={"center"}
      h={9}
      borderRadius={2}
      padding={0}
    >
      <Popover
        isOpen={popoverIsOpen}
        placement="bottom"
        trigger={(triggerProps) => {
          return (
            <Pressable
              {...triggerProps}
              colorScheme="info"
              justifyContent={"center"}
              alignItems="center"
              onPress={() => setPopoverIsOpen(true)}
            >
              <Text fontWeight={700} color={"white"}>
                {title}
              </Text>
            </Pressable>
          );
        }}
      >
        <Popover.Content accessibilityLabel="Delete Customerd" w="56">
          <Popover.Arrow />
          <Popover.CloseButton onPress={() => setPopoverIsOpen(false)} />
          <Popover.Header borderBottomWidth={0}>{popoverTitle}</Popover.Header>
          <Popover.Body shadow={0}>
            <VStack space={1}>
              {popoverList.map((el, index) => {
                return (
                  <Pressable key={index} onPress={() => addToFilterHandler(el)}>
                    <Text fontWeight={600} color={"text.500"}>
                      {el}
                    </Text>
                  </Pressable>
                );
              })}
            </VStack>
          </Popover.Body>
          <Popover.Footer
            justifyContent="flex-end"
            p={2}
            borderTopWidth={0}
            shadow={0}
          >
            <Button.Group>
              <Button
                colorScheme="blueGray"
                variant={"outline"}
                onPress={handleClear}
              >
                Clear
              </Button>
              <Button
                colorScheme="lightBlue"
                variant={"solid"}
                onPress={() => submitHandler(bodyPartFilter)}
              >
                Filter
              </Button>
            </Button.Group>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </Box>
  );

  const renderExerciseFilter = () => {
    const bodyPartProps = {
      title: "Body Part",
      popoverTitle: "Body Part",
      popoverList: ["Chest", "Back", "Legs", "Arms", "Shoulders"],
      addToFilterHandler: handleBodyPartFilter,
      submitHandler,
      handleClear,
    };

    return (
      <VStack space={1} mt={1}>
        {renderSearchBar()}
        <HStack flexDir={"row"} space={2} mt={1}>
          {renderButton({ ...bodyPartProps })}
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
        data={exercises}
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
