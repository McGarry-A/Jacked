import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Box,
  Button,
  Heading,
  Text,
  Pressable,
  Modal,
  FlatList,
  Input,
} from "native-base";
import { useState } from "react";
import ExerciseCard from "../components/layout/ExerciseCard";
import Timer from "../components/Timer";
import data from "../data";

const ActiveWorkout = () => {
  const [workoutTitle, setWorkoutTitle] = useState("Quick Workout");
  const [addLiftIsHidden, setAddLiftIsHidden] = useState(true);

  const showModal = () => setAddLiftIsHidden(false);

  const renderModal = () => (
    <Modal isOpen={!addLiftIsHidden} onClose={showModal} size={"lg"}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add a Lift</Modal.Header>
        <Modal.Body>
          <Box
            flexDirection={"row"}
            alignItems={"center"}
            borderWidth={1}
            borderColor={"whitesmoke"}
          >
            <FontAwesome
              name="search"
              size={20}
              color={"black"}
              style={{ marginRight: 2 }}
            />
            <Input placeholder="Search for a lift" borderWidth={0} />
          </Box>
        </Modal.Body>
        <Modal.Body>
          {/* 
            ON CLICK THE EXERCISE CARD GETS ADDED TO THE ACTIVE WORKOUT 
            CARD NEEDS TO ACCEPT PROP THAT TELLS IT TO ADD TO AN ACTIVE WORKOUT
          */}
          <FlatList
            data={Object.values(data)}
            renderItem={({ item }) => <ExerciseCard item={{ ...item }} />}
            keyExtractor={({ id }) => id}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );

  return (
    <View padding={3} flex={1} backgroundColor={"white"}>
      <Box flex={1}>
        <Box flexDirection={"row"} alignItems="center">
          <Heading marginY={2} marginRight="3">
            {workoutTitle}
          </Heading>
          <Pressable onPress={() => {}}>
            <FontAwesome name="pencil" size={20} />
          </Pressable>
        </Box>
        <Timer />
      </Box>
      <Box marginBottom={2}>
        <Button
          onPress={showModal}
          marginY={1}
          backgroundColor="info.400"
          height={10}
        >
          <Text color="white" fontWeight="semibold">
            Add A Lift
          </Text>
        </Button>
        <Button backgroundColor="rose.400" height={10}>
          <Text color="white" fontWeight={"semibold"}>
            Cancel Workout
          </Text>
        </Button>
      </Box>
      {renderModal()}
    </View>
  );
};

export default ActiveWorkout;
