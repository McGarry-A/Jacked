import { BarChart } from "react-native-chart-kit";
import { CONFIG, SCREEN_WIDTH } from "./config";
import useSessionFrequency from "../../../hooks/useSessionFrequency";

const BarChartWidget: React.FC = () => {
  const { labels, values, isLoading } = useSessionFrequency();

  const segmentsCount = Math.max(...values);

  const data = {
    labels: labels,
    datasets: [{ data: values }],
  };

  return (
    !isLoading ? (
      <BarChart
        data={data}
        width={SCREEN_WIDTH - 49}
        height={160}
        yAxisLabel=""
        chartConfig={CONFIG}
        yAxisSuffix=""
        showBarTops={false}
        withInnerLines={true}
        fromZero
        segments={4}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingRight: 25,
        }}
      />
    ) : null
  );
};

export default BarChartWidget;
