import { Box } from "native-base";
import { LineChart } from "react-native-chart-kit";
import usePrevLifts from "../../../hooks/usePrevLifts";
import { useAppSelector } from "../../../store";
import WidgetHeader from "../WidgetHeader";
import { CONFIG, SCREEN_WIDTH } from "./config";

const lineGraphWidget = () => {
  const { userId } = useAppSelector((state) => state.userSlice.user);

  const { data, isLoading, error } = usePrevLifts({
    userId,
    limit: 8,
    exerciseId: 2,
  });

  const chartData = {
    labels: ["1/8", "8/8", "15/8", "22/8", "29/8", "5/9", "12/9"],
    datasets: [
      {
        data: [72, 74, 73, 73, 74, 77, 75.5],
        color: (opacity = 1) => `rgba(69, 31, 85, ${opacity})`,
      },
    ],
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
        width={SCREEN_WIDTH}
        height={160}
        yAxisLabel=""
        chartConfig={CONFIG}
        yAxisSuffix="kg"
        withInnerLines={false}
        withDots={false}
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
