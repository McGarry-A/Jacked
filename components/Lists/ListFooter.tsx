import { Center, HStack, Spinner, Text } from "native-base";
import useTotalWorkouts from "../../hooks/useTotalWorkouts";
import { useAppSelector } from "../../store";

const ListFooter = () => {
  const { status, history } = useAppSelector(
    (state) => state.workoutHistorySlice
  );
  const { totalWorkouts } = useTotalWorkouts();

  if (history.length === totalWorkouts) {
    return (
      <Center mt={2}>
        <Text color={"coolGray.400"} fontSize={"sm"}>
          You have reached the end!
        </Text>
      </Center>
    );
  }

  if (status !== "pending") return null;

  return (
    <HStack
      justifyContent={"center"}
      w={"full"}
      space={2}
      alignItems="center"
      h={"16"}
    >
      <Spinner colorScheme={"info"} />
      <Text>Loading</Text>
    </HStack>
  );
};

export default ListFooter;
