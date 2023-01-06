import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Box, HStack, Pressable, Text, VStack } from "native-base";

const SocialIcons = () => {
  const renderHeader = () => {
    return (
      <HStack space={"4"} alignItems={"center"}>
        <Box w={"1/3"} borderWidth={1} borderColor={"coolGray.200"} h={"0"} />
        <Text
          flexGrow={1}
          flex={1}
          noOfLines={1}
          textAlign={"center"}
          textTransform={"uppercase"}
          letterSpacing={"lg"}
          fontWeight={600}
        >
          Or Sign in with
        </Text>
        <Box w={"1/3"} borderWidth={1} borderColor={"coolGray.200"} h={"0"} />
      </HStack>
    );
  };

  const renderIcons = () => {
    return (
      <HStack space={"4"} alignItems={"center"} justifyContent={"center"}>
        <Pressable
          w={"16"}
          h={"16"}
          borderRadius={"full"}
          backgroundColor={"coolGray.200"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <FontAwesomeIcon
            icon={faGoogle}
            size={24}
            style={{ color: "#111827" }}
          />
        </Pressable>
      </HStack>
    );
  };

  return (
    <VStack my={10} space={5}>
      {renderHeader()}
      {renderIcons()}
    </VStack>
  );
};

export default SocialIcons;
