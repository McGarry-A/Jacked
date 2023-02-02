import { Text, HStack, Spinner } from "native-base";

const Loader = () => {
  return (
    <HStack space={2} justifyContent="center" my={2}>
      <Spinner accessibilityLabel="Loading.." colorScheme={"blue"} />
      <Text color="coolGray.800" fontSize="md">
        Loading...
      </Text>
    </HStack>
  );
};

export default Loader;
