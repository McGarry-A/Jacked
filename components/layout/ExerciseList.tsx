import { FontAwesome } from "@expo/vector-icons";
import {
  Box,
  Button,
  FlatList,
  Input,
  Popover,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import useColorScheme from "../../hooks/useColorScheme";
import useExerciseList from "../../hooks/useExerciseList";
import { LiftData } from "../../screens/modals/AddExercises";
import ExerciseInterface from "../../types/ExerciseInterface";
import ExerciseCard from "./ExerciseCard";

interface Props {
  cardProps?: {
    setLiftData: React.Dispatch<React.SetStateAction<LiftData[]>>;
    liftData: LiftData[];
  };
  config: {
    showInput: boolean;
    showFilterButtons: boolean;
  };
}

export const ExerciseList: React.FC<Props> = ({
  cardProps,
  config: { showInput = true, showFilterButtons = false },
}) => {
  const [exercises, setExercises] = useState<ExerciseInterface[]>([]);
  const [popoverIsOpen, setPopoverIsOpen] = useState<boolean>(false);
  const [bodyPartFilter, setBodyPartFilter] = useState<string>("");

  const { list: exerciseList, isLoading, error } = useExerciseList();

  const { buttonColorMode } = useColorScheme();

  useEffect(() => {
    return () => {
      if (cardProps) {
        const { setLiftData } = cardProps;
        setLiftData([]);
      }
    };
  }, []);

  const handleFilter = (text: string) => {
    const filteredExercises = exerciseList.filter((el) =>
      el.exercise_name.includes(text)
    );
    setExercises(filteredExercises);
  };

  const submitHandler = (filter: string) => {
    const filteredList = exerciseList.filter((el) => el.targets === filter);
    setExercises(filteredList);
    setPopoverIsOpen(false);
  };

  const handleClear = () => {
    setBodyPartFilter("");
    setExercises(exerciseList);
    setPopoverIsOpen(false);
  };

  const handleBodyPartFilter = (filter: string) => {
    setBodyPartFilter(filter);
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

  const renderPopover = ({
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
      backgroundColor={buttonColorMode}
      alignItems="center"
      justifyContent={"center"}
      h={9}
      borderRadius={5}
      padding={0}
    >
      <Popover
        isOpen={popoverIsOpen}
        placement="bottom"
        trigger={(triggerProps) => {
          return (
            <Pressable
              {...triggerProps}
              justifyContent={"center"}
              alignItems="center"
              onPress={() => setPopoverIsOpen(true)}
            >
              <Text fontWeight={700} color={"coolGray.100"}>
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

    return showFilterButtons ? renderPopover({ ...bodyPartProps }) : null;
  };

  const renderList = () => {
    return (
      <FlatList
        data={exercises.length ? exercises : exerciseList}
        // paddingBottom={40}
        borderRadius={5}
        overflow={"hidden"}
        flexGrow={1}
        renderItem={({ item }) => (
          <ExerciseCard {...item} {...cardProps} isLoading={!isLoading} />
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
    <Box mt={1} flex={1}>
      <VStack space={3} flex={1}>
        <VStack space={1}>
          {renderSearchBar()}
          {renderExerciseFilter()}
        </VStack>
        {renderList()}
      </VStack>
    </Box>
  );
};
