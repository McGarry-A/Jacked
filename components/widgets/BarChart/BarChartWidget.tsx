import { BarChart } from "react-native-chart-kit";
import { CONFIG, SCREEN_WIDTH } from "./config";
import useSessionFrequency from "../../../hooks/useSessionFrequency";
import WidgetContainer from "../WidgetContainer";

const BarChartWidget: React.FC = () => {
  const { labels, values, isLoading } = useSessionFrequency();

  const segmentsCount = Math.max(...values);
  const segments = segmentsCount < 5 ? 5 : segmentsCount;

  const data = {
    labels: labels,
    datasets: [{ data: values }],
  };

  return (
    !isLoading ? (
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
