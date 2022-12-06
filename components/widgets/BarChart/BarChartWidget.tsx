import { Box } from "native-base";
import { BarChart } from "react-native-chart-kit";
import WidgetHeader from "../WidgetHeader";
import { CONFIG, SCREEN_WIDTH } from "./config";
import useSessionFrequency from "../../../hooks/useSessionFrequency";
import usePreviousWorkoutDates from "../../../hooks/usePreviousWorkoutDates";
import { useAppSelector } from "../../../store";

const BarChartWidget = () => {
  const { userId } = useAppSelector((state) => state.userSlice.user);
  const { workoutDates } = usePreviousWorkoutDates(userId);
  const { labels, values } = useSessionFrequency(workoutDates as [{ date: string }])

  const data = {
    labels: labels,
    datasets: [{ data: values }],
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
        width={SCREEN_WIDTH - 10}
        height={160}
        yAxisLabel=""
        chartConfig={CONFIG}
        yAxisSuffix=""
        showBarTops={false}
        withInnerLines={false}
        fromZero
        segments={labels.length || 3}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingRight: 25,
        }}
      />
    </Box>
  );
};

export default BarChartWidget;
