import { HStack, Spinner, Text } from "native-base";
import { useAppSelector } from "../../store";

const ListFooter = () => {
  const { status } = useAppSelector((state) => state.workoutHistorySlice);

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
