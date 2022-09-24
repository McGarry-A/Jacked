import { FontAwesome } from "@expo/vector-icons";

import { RootTabScreenProps } from "../types";

import { Box, Heading, Text, Button, ScrollView } from "native-base";

import BarChartWidget from "../components/widgets/BarChartWidget";
import LineGraphWidget from "../components/widgets/LineGraphWidget";

export default function Profile({ navigation }: RootTabScreenProps<"Profile">) {
  const renderProfile = () => {
    return (
      <Box
        flexDirection="row"
        alignItems="center"
        paddingRight={2}
        marginTop={2}
      >
        <Box
          marginY={3}
          backgroundColor="white"
          width="16"
          height="16"
          alignItems="center"
          justifyContent="center"
          borderRadius="full"
          marginRight={"1"}
        >
          <FontAwesome name="user" size={40} color="grey" />
        </Box>
        <Box>
          <Text fontSize="md" fontWeight="semibold">
            Ahmed McGarry
          </Text>
          <Text fontSize="sm" opacity={60}>
            19 Workouts
          </Text>
        </Box>
        <Box marginLeft={"auto"}>
          <FontAwesome name="chevron-right" color="skyblue" size={15} />
        </Box>
      </Box>
    );
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
