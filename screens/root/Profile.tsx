import { RootTabScreenProps } from "../../types";

import { Box, Heading, Text, Button, ScrollView } from "native-base";

import BarChartWidget from "../../components/widgets/BarChartWidget";
import LineGraphWidget from "../../components/widgets/LineGraphWidget";
import UserProfileBar from "../../components/layout/UserProfileBar";
import { useAppDispatch, useAppSelector } from "../../store";
import { getBestSet, getPreviousWorkoutDates } from "../../store/WidgetsSlice";

export default function Profile({ navigation }: RootTabScreenProps<"Profile">) {
  const dispatch = useAppDispatch();

  const { userId } = useAppSelector((state) => state.userSlice.user);

  dispatch(getPreviousWorkoutDates({ userId }));
  dispatch(getBestSet({ exerciseId: 2, userId }));

  const renderProfile = () => {
    return <UserProfileBar navigation={navigation} />;
  };

  const renderDashboard = () => {
    return (
      <Box
        flexDirection="row"
        alignItems={"center"}
        justifyContent="space-between"
        marginY={5}
      >
        <Heading size={"sm"}>Dashboard</Heading>
        <Button
          size="sm"
          variant="outline"
          backgroundColor={"info.100"}
          borderRadius="3xl"
          borderWidth={0}
        >
          <Text
            fontSize={"xs"}
            color={"info.600"}
            textTransform={"uppercase"}
            fontWeight={"bold"}
          >
            Add Widget
          </Text>
        </Button>
      </Box>
    );
  };

  const renderScreenHeading = () => (
    <Box>
      <Heading size="xl">My Profile</Heading>
    </Box>
  );

  const renderWidgets = () => {
    return (
      <Box>
        <BarChartWidget />
        <LineGraphWidget />
      </Box>
    );
  };

  return (
    <ScrollView padding="3" backgroundColor={"white"} flexGrow={1}>
      {renderScreenHeading()}
      {renderProfile()}
      {renderDashboard()}
      {renderWidgets()}
    </ScrollView>
  );
}
