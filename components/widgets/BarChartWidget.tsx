import { Box } from "native-base";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import getPreviousMondays from "../../types/getPreviousMonday";
import WidgetHeader from "./WidgetHeader";

const BarChartWidget = () => {
  const screenWidth = Dimensions.get("window").width - 20;
  const data = {
    labels: getPreviousMondays(6),
    datasets: [
      {
        data: [5, 2, 3, 2, 5, 3, 2],
      },
    ],
  };

  const barChartConfig = {
    backgroundGradientFrom: "#FFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFF",
    backgroundGradientToOpacity: 0,
    color: () => "#808080",
    barPercentage: 0.5,
    barRadius: 5,
    decimalPlaces: 0,
    fillShadowGradientFrom: "#451F55",
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 1,
    fillShadowGradientTo: "#724E91",
  };

  return (
    <Box
      borderWidth={2}
      marginY={1}
      borderColor={"whitesmoke"}
      borderRadius={10}
      padding={2}
      overflow={"hidden"}
    >
      <WidgetHeader title="Session" subtitle="Frequency" />
      <BarChart
        data={data}
        width={screenWidth}
        height={160}
        yAxisLabel=""
        chartConfig={barChartConfig}
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

export default BarChartWidget;
