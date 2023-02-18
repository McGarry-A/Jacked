import { BarChart } from "react-native-chart-kit";
import { BAR_CONFIG } from "./config";
import useSessionFrequency from "../../../hooks/useSessionFrequency";
import { SCREEN_WIDTH_APP, SCREEN_WIDTH_WEB } from "../ScreenWidth";
import useIsApp from "../../../hooks/useIsApp";
import { Skeleton } from "native-base";

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
          () => `#604187`,
          () => `#604187`,
          () => `#604187`,
          () => `#604187`,
          () => `#604187`,
          () => `#604187`,
          () => `#604187`,
        ],
      },
    ],
  };

  return (
    <Skeleton
      height={160}
      w={"full"}
      startColor={"gray.50"}
      endColor={"gray.100"}
      isLoaded={!isLoading}
    >
      <BarChart
        yAxisLabel=""
        yAxisSuffix=""
        data={data}
        width={SCREEN_WIDTH - 49}
        height={160}
        chartConfig={BAR_CONFIG}
        showBarTops={false}
        withInnerLines={true}
        segments={segmentCount}
        withCustomBarColorFromData={true}
        yAxisInterval={1}
        flatColor
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingRight: 25,
        }}
      />
    </Skeleton>
  );
};

export default SessionFrequencyWidget;
