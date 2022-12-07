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

  console.log(data)
  
  const chartData = {
    labels: ["1/8", "8/8", "15/8", "22/8", "29/8", "5/9"],
    datasets: [
      {
        data: [72, 74, 73, 73, 74, 77],
        color: (opacity = 1) => `rgba(65, 105, 225, ${opacity})`, 
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
      <WidgetHeader title={"Bench Press"} subtitle="Progression" />
      <LineChart
        data={chartData}
        width={SCREEN_WIDTH}
        height={160}
        yAxisLabel=""
        chartConfig={CONFIG}
        yAxisSuffix="kg"
        withInnerLines={false}
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
