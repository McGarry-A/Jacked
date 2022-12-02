import { Box } from "native-base";
import { BarChart } from "react-native-chart-kit";
import usePreviousWorkoutDates from "../../../hooks/usePreviousWorkoutDates";
import { useAppSelector } from "../../../store";
import WidgetHeader from "../WidgetHeader";
import { CONFIG, SCREEN_WIDTH } from "./config";
import moment from "moment";

const BarChartWidget = () => {
  const { userId } = useAppSelector((state) => state.userSlice.user);

  // const labels = getPreviousMondays();

  const { workoutDates, isLoading, error } = usePreviousWorkoutDates(userId);

  const moments = workoutDates.map((el) => {
    return moment(el.date).startOf("week").format("DD/MM")
  });

  const counts: {
    [key: string]: number;
  } = {};

  for (let index in moments.reverse()) {
    const date = moments[index];
    counts[date] = counts[date] ? (counts[date] += 1) : 1;
  }
  
  const dateOccurances = Object.values(counts)
  const dateDays = Object.keys(counts)

  const data = {
    labels: ["1",'2','3','4','5'],
    datasets: [
      {
        data: [1,2,3,4,5],
      },
    ],
  };

  return (
    <Box
      borderWidth={2}
      marginY={1}
      borderColor={"whitesmoke"}
      borderRadius={10}
      padding={2}
      overflow={"hidden"}
    >
      <WidgetHeader title="Session" subtitle="Frequency" />
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
        segments={5}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingRight: 25,
        }}
      />
    </Box>
  );
};

export default BarChartWidget;
