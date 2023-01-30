import { BarChart } from "react-native-chart-kit";
import { CONFIG, SCREEN_WIDTH } from "./config";
import useSessionFrequency from "../../../hooks/useSessionFrequency";
import { SCREEN_WIDTH_APP, SCREEN_WIDTH_WEB } from "../ScreenWidth";
import useIsApp from "../../../hooks/useIsApp";

const SessionFrequencyWidget: React.FC = () => {
  const { labels, values, isLoading } = useSessionFrequency();

  const isApp = useIsApp();

  const SCREEN_WIDTH = isApp ? SCREEN_WIDTH_APP : SCREEN_WIDTH_WEB;

  const maxInValues = Math.max(...values);
  const segmentCount = maxInValues < 4 ? maxInValues : 4;

  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        colors: [
          (opacity = 1) => `#702963`,
          (opacity = 1) => `#702963`,
          (opacity = 1) => `#702963`,
          (opacity = 1) => `#702963`,
          (opacity = 1) => `#702963`,
          (opacity = 1) => `#702963`,
          (opacity = 1) => `#702963`,
        ],
      },
    ],
  };

  return !isLoading ? (
    <BarChart
      yAxisLabel=""
      yAxisSuffix=""
      data={data}
      width={SCREEN_WIDTH - 49}
      height={160}
      chartConfig={CONFIG}
      showBarTops={false}
      withInnerLines={true}
      segments={segmentCount}
      withCustomBarColorFromData={true}
      yAxisInterval={1}
      style={{
        marginVertical: 8,
        borderRadius: 16,
        paddingRight: 25,
      }}
    />
  ) : null;
};

export default SessionFrequencyWidget;
