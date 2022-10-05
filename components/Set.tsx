import { FontAwesome } from "@expo/vector-icons";
import { HStack, Input, Pressable, Text } from "native-base";
import { useState } from "react";
import { useAppDispatch } from "../store";
import { addSetNumbers } from "../store/currentWorkoutSlice";
import { SetInterface } from "../types/LiftInterface";

interface Props {
  setId: string;
  exerciseId: number;
  sets: SetInterface[];
}

const Set = ({ setId, sets, exerciseId }: Props) => {
  const [newWeight, setNewWeight] = useState<string>("0");
  const [newReps, setNewReps] = useState<string>("0");
  const [isDone, setIsDone] = useState(false);

  const dispatch = useAppDispatch();
  const { weight, reps } = sets[setId as unknown as number];

//   const updateSet = (
//     exerciseId: number,
//     setId: number,
//     weight: string,
//     reps: string
//   ) => {
//     dispatch(addSetNumbers({ exerciseId, setId, weight, reps }));
//   };

//   const handleUpdateSet = () => {
//     updateSet(exerciseId, setId, Number(newWeight), newReps);
//     setIsDone(!isDone);
//   };

  return (
    <HStack justifyContent="space-evenly" alignItems={"center"}>
      <Text>{setId}</Text>
      <Text>{exerciseId}</Text>
      <Input
        placeholder={weight}
        w={12}
        keyboardType={"numeric"}
        onChangeText={(text) => setNewWeight(text)}
      />
      <Input
        placeholder={reps}
        w={12}
        keyboardType={"numeric"}
        onChangeText={(text) => setNewReps(text)}
      />
      <Pressable>
        <FontAwesome name="check" size={10} />
      </Pressable>
    </HStack>
  );
};

export default Set;
