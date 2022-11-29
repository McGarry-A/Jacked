import { Box } from "native-base";
import { BarChart } from "react-native-chart-kit";
import { useAppSelector } from "../../../store";
import getPreviousMondays from "../../../utils/getPreviousMonday";
import WidgetHeader from "../WidgetHeader";
import { CONFIG, SCREEN_WIDTH } from "./config";

const BarChartWidget = () => {
  const { userId } = useAppSelector((state) => state.userSlice.user);

  const labels = getPreviousMondays(6);

  const data = {
    labels,
    datasets: [
      {
        data: [5, 2, 3, 2, 5, 3, 2],
      },
    ],
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
        width={SCREEN_WIDTH}
        height={160}
        yAxisLabel=""
        chartConfig={CONFIG}
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
