import { Heading, HStack, Spinner } from "native-base";

const Loader = () => {
  return (
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading.." colorScheme={"info"} />
      <Heading color="coolGray.800" fontSize="md">
        Loading
      </Heading>
    </HStack>
  );
};

export default Loader;
