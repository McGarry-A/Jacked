import { HStack, Spinner, Text } from "native-base";

const ListFooter = () => {
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
