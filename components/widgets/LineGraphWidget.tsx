import { Box } from "native-base";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import usePrevLifts from "../../hooks/usePrevLifts";
import { useAppSelector } from "../../store";
import WidgetHeader from "./WidgetHeader";

const lineGraphWidget = () => {
  const { userId } = useAppSelector((state) => state.userSlice.user);

  const { data, isLoading, error } = usePrevLifts({
    userId,
    limit: 8,
    exerciseId: 2,
  });

  const formattedData = data.map((el) => {});

  const screenWidth = Dimensions.get("window").width;

  const chartData = {
    labels: ["1/8", "8/8", "15/8", "22/8", "29/8", "5/9", "12/9"],
    datasets: [
      {
        data: [72, 74, 73, 73, 74, 77, 75.5],
        color: (opacity = 1) => `rgba(69, 31, 85, ${opacity})`,
      },
    ],
  };

  const lineChartConfig = {
    backgroundGradientFrom: "#FFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFF",
    backgroundGradientToOpacity: 0,
    color: () => "#808080",
    decimalPlaces: 1,
    fillShadowGradientOpacityFrom: 0,
    fillShadowGradientOpacityTo: 0,
    fillShadowGradientOpacity: 0,
  };

  return (
    <Box
      marginY={1}
      borderWidth={2}
      borderColor={"whitesmoke"}
      borderRadius={10}
      padding={2}
      overflow={"hidden"}
    >
      <WidgetHeader title="Weight" subtitle="Progression" />
      <LineChart
        data={chartData}
        width={screenWidth}
        height={160}
        yAxisLabel=""
        chartConfig={lineChartConfig}
        yAxisSuffix="kg"
        withInnerLines={false}
        segments={4}
        style={{
          marginVertical: 8,
          marginHorizontal: -10,
          borderRadius: 16,
        }}
      />
    </Box>
  );
};

export default lineGraphWidget;
