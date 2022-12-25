import { LineChart } from "react-native-chart-kit";
import useOneRepMaxGraph from "../../../hooks/useOneRepMaxGraph";
import { CONFIG, SCREEN_WIDTH } from "./config";

interface ILineProps {
  exerciseId: number;
}

const lineGraphWidget: React.FC<ILineProps> = (props) => {
  const { exerciseId } = props;
  const { labels, values, isLoaded } = useOneRepMaxGraph({ exerciseId });

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        color: (_: any) => `rgba(90, 34, 139, 0.3)`,
      },
    ],
  };

  return isLoaded ? (
    <LineChart
      data={chartData}
      width={SCREEN_WIDTH}
      height={160}
      yAxisLabel=""
      chartConfig={CONFIG}
      yAxisSuffix="kg"
      withInnerLines={true}
      bezier
      style={{
        marginVertical: 8,
        marginHorizontal: -10,
        borderRadius: 16,
      }}
    />
  ) : null;
};

export default lineGraphWidget;
