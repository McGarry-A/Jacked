import { Skeleton } from "native-base";
import { LineChart } from "react-native-chart-kit";
import useIsApp from "../../../hooks/useIsApp";
import useOneRepMaxGraph from "../../../hooks/useOneRepMaxGraph";
import { SCREEN_WIDTH_APP, SCREEN_WIDTH_WEB } from "../ScreenWidth";
import { CONFIG, SCREEN_WIDTH } from "./config";

interface ILineProps {
  exerciseId: number;
}

const OneRepMaxWidget: React.FC<ILineProps> = (props) => {
  const { exerciseId } = props;
  const { labels, values, isLoaded } = useOneRepMaxGraph({ exerciseId });
  const isApp = useIsApp();

  const SCREEN_WIDTH = isApp ? SCREEN_WIDTH_APP : SCREEN_WIDTH_WEB;

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        color: (_: any) => `rgba(90, 34, 139, 0.3)`,
      },
    ],
  };

  return (
    <Skeleton
      height={160}
      w={"full"}
      startColor={"gray.50"}
      endColor={"gray.100"}
      isLoaded={isLoaded}
    >
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
    </Skeleton>
  );
};

export default OneRepMaxWidget;
