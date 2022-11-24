import {
  Box,
  Button,
  Center,
  Heading,
  Pressable,
  Select,
  Text,
  View,
} from "native-base";
import { useAppDispatch } from "../../store";
import { userSignout } from "../../store/userSlice";

export default function Settings() {
  const dispatch = useAppDispatch();

  const handleSignout = () => dispatch(userSignout());

  return (
    <View backgroundColor={"white"} flex={1} padding={3}>
      <Heading marginY={1}>General</Heading>
      <Box flexDirection={"row"} alignItems={"center"}>
        <Text flex={1} fontSize={"md"}>
          Plate Units
        </Text>
        <Box maxW="200">
          <Select
            minWidth="200"
            accessibilityLabel="Choose Plate Weights"
            placeholder="Choose Plate Weights"
            mt={1}
          >
            <Select.Item label="Kilogram" value="kg" />
            <Select.Item label="Pounds" value="lbs" />
          </Select>
        </Box>
      </Box>
      <Box flexDirection={"row"} alignItems={"center"}>
        <Text flex={1} fontSize={"md"}>
          Body Weight Units
        </Text>
        <Box maxW="200" marginY={1}>
          <Select
            minWidth="200"
            accessibilityLabel="Choose Plate Weights"
            placeholder="Choose Body Weight Units"
            mt={1}
          >
            <Select.Item label="Kilogram" value="kg" />
            <Select.Item label="Pounds" value="lbs" />
          </Select>
        </Box>
      </Box>
      <Pressable
        background={"info.400"}
        padding={2}
        borderRadius={4}
        marginTop={"auto"}
        marginBottom={2}
      >
        <Center>
          <Text color={"white"} fontSize={16} fontWeight={"semibold"}>
            Save
          </Text>
        </Center>
      </Pressable>
      {/* NOTE: MOVE THIS TO THE USER PAGE */}
      <Button
        variant={"solid"}
        colorScheme={"error"}
        alignSelf={"end"}
        w="full"
        onPress={handleSignout}
      >
        Sign Out
      </Button>
    </View>
  );
}
