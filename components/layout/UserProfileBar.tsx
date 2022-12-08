import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Box, Pressable, Text } from "native-base";

interface Props {
  isClickable?: boolean;
}

const UserProfileBar = ({ isClickable = true }: Props) => {
  const navigation = useNavigation();

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

  const renderBody = () => {
    return (
      <Box flexDirection="row" alignItems="center">
        <Avatar
          size={"lg"}
          marginY={3}
          backgroundColor="info.300"
          marginRight={"3"}
        >
          AM
        </Avatar>
        <Box flex={1}>
          <Text fontSize="md" fontWeight="semibold">
            Ahmed McGarry
          </Text>
          <Text fontSize="sm" opacity={60}>
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
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
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
