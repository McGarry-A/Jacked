import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Box, Pressable, Text, useColorModeValue } from "native-base";
import useColorScheme from "../../hooks/useColorScheme";

interface Props {
  isClickable?: boolean;
}

const UserProfileBar = ({ isClickable = true }: Props) => {
  const navigation = useNavigation();
  const { h1ColorMode } = useColorScheme();

  const renderChevron = () => {
    if (isClickable) {
      return (
        <Box marginLeft={"auto"}>
          <FontAwesome name="chevron-right" color="skyblue" size={15} />
        </Box>
      );
    }

    return null;
  };

  const { avatarBgColorMode } = useColorScheme();

  const renderBody = () => {
    return (
      <Box flexDirection="row" alignItems="center">
        <Avatar
          size={"lg"}
          marginY={3}
          backgroundColor={avatarBgColorMode}
          marginRight={"3"}
        >
          <Text color={"info.50"} fontSize={"lg"} fontWeight={"bold"}>
            AM
          </Text>
        </Avatar>
        <Box flex={1}>
          <Text fontSize="md" fontWeight="semibold" color={h1ColorMode}>
            Ahmed McGarry
          </Text>
          <Text fontSize="sm" color={"coolGray.400"}>
            19 Workouts
          </Text>
        </Box>
        {renderChevron()}
      </Box>
    );
  };

  if (isClickable && navigation) {
    return (
      <Pressable
        flexDirection="row"
        alignItems="center"
        onPress={() => navigation.navigate("User")}
      >
        {renderBody()}
      </Pressable>
    );
  }

  return (
    <Box paddingRight={2} marginTop={2}>
      {renderBody()}
    </Box>
  );
};

export default UserProfileBar;
