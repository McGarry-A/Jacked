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
        color: (opacity = 1) => `rgba(65, 105, 225, ${opacity})`,
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
      withInnerLines={false}
      style={{
        marginVertical: 8,
        marginHorizontal: -10,
        borderRadius: 16,
      }}
    />
  ) : null;
};

export default lineGraphWidget;
