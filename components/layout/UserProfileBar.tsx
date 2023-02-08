import { FontAwesome } from "@expo/vector-icons";
import { Avatar, Box, Button, HStack, Skeleton, Text } from "native-base";
import useColorScheme from "../../hooks/useColorScheme";
import useTotalWorkouts from "../../hooks/useTotalWorkouts";

const UserProfileBar = () => {
  const { h1ColorMode } = useColorScheme();

  const { avatarBgColorMode } = useColorScheme();
  const { totalWorkouts, isLoading, error } = useTotalWorkouts();

  const renderInitials = () => (
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
  );

  const renderDetails = () => {
    // need to dynamically load the name too
    return (
      <Box flex={1}>
        <Text fontSize="md" fontWeight="semibold" color={h1ColorMode}>
          Ahmed McGarry
        </Text>
        <Skeleton isLoaded={!isLoading} w={20} h={12}>
          <Text fontSize="sm" color={"coolGray.400"}>
            {totalWorkouts}
          </Text>
        </Skeleton>
      </Box>
    );
  };

  return (
    <Button
      variant={"unstyled"}
      paddingRight={2}
      marginTop={2}
      rightIcon={<FontAwesome name="chevron-right" color="skyblue" size={15} />}
    >
      <HStack flexDirection="row" alignItems="center" w="full">
        {renderInitials()}
        {renderDetails()}
      </HStack>
    </Button>
  );
};

export default UserProfileBar;
