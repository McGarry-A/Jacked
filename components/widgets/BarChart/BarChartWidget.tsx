import { BarChart } from "react-native-chart-kit";
import { CONFIG, SCREEN_WIDTH } from "./config";
import useSessionFrequency from "../../../hooks/useSessionFrequency";
import WidgetContainer from "../WidgetContainer";

interface IBarProps {
  title: string;
  subtitle: string;
}

const BarChartWidget: React.FC<IBarProps> = (props) => {
  const { title, subtitle } = props;
  const { labels, values, isLoading } = useSessionFrequency();

  const segmentsCount = Math.max(...values);
  const segments = segmentsCount > 5 ? 5 : segmentsCount;

  const data = {
    labels: labels,
    datasets: [{ data: values }],
  };
  
  return (
    <WidgetContainer title={title} subtitle={subtitle}>
      {!isLoading && (
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
          segments={segments}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            paddingRight: 25,
          }}
        />
      )}
    </WidgetContainer>
  );
};

export default BarChartWidget;
