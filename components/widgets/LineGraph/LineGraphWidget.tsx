import { Box } from "native-base";
import { LineChart } from "react-native-chart-kit";
import useOneRepMaxGraph from "../../../hooks/useOneRepMaxGraph";
import WidgetHeader from "../WidgetHeader";
import { CONFIG, SCREEN_WIDTH } from "./config";

const lineGraphWidget = () => {
  const { labels, values, exerciseName, isLoaded } = useOneRepMaxGraph();

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
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
      {isLoaded && (
        <>
          <WidgetHeader title={exerciseName} subtitle="1RM Estimate" />
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
        </>
      )}
    </Box>
  );
};

export default lineGraphWidget;
