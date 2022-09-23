import { FontAwesome } from "@expo/vector-icons";

import EditScreenInfo from "../components/EditScreenInfo";
import { RootTabScreenProps } from "../types";

import { Box, Heading, View, Text, Button } from "native-base";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

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
      <Box
        borderColor={"black"}
        flexGrow={1}
        borderWidth={0.2}
        padding={2}
        borderRadius={"sm"}
      >
        Test
      </Box>
    );
  };

  return (
    <View padding="3" backgroundColor={"white"} flexGrow={1}>
      {renderScreenHeading()}
      {renderProfile()}
      {renderDashboard()}
      {BarChartComponent()}
    </View>
  );
}

const BarChartComponent = () => {
  const screenWidth = Dimensions.get("window").width - 20;
  const data = {
    labels: ["1/8", "8/8", "15/8", "22/8", "29/8", "5/9", "12/9"],
    datasets: [
      {
        data: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFF",
    backgroundGradientToOpacity: 0,
    color: () => '#808080',
    barPercentage: 0.5,
    barRadius: 5,
    decimalPlaces: 0,
    fillShadowGradientFrom:'#451F55',
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 1,
    fillShadowGradientTo: '#724E91',
  };

  return (
    <Box
      borderWidth={2}
      borderColor={"whitesmoke"}
      borderRadius={10}
      padding={2}
      overflow={"hidden"}
    >
      <Box flexDirection={"row"} alignItems={"center"}>
        <Heading size={"sm"} flex={1}>
          Workouts Per Week
        </Heading>
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"info.100"}
          paddingX={2}
          height={"5"}
          borderRadius={4}
        >
          <FontAwesome
            name="ellipsis-h"
            size={15}
            color={"skyblue"}
            style={{ margin: "auto" }}
          />
        </Box>
      </Box>
      <Text fontSize={"sm"} fontWeight={"semibold"} marginY={1} opacity={70}>
        Activity
      </Text>
      <BarChart
        data={data}
        width={screenWidth}
        height={160}
        yAxisLabel=""
        chartConfig={chartConfig}
        yAxisSuffix=""
        withInnerLines
        showBarTops={false}
        fromZero
        segments={4}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingRight: 0,
        }}
      />
    </Box>
  );
};
