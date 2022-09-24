import { Box } from "native-base";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import WidgetHeader from "./WidgetHeader";

const lineGraphWidget = () => {
    const screenWidth = Dimensions.get("window").width;
    const data = {
      labels: ["1/8", "8/8", "15/8", "22/8", "29/8", "5/9", "12/9"],
      datasets: [
        {
          data: [72, 74, 73, 73, 74, 77, 75.5],
          color: (opacity = 1) => `rgba(69, 31, 85, ${opacity})`,
        },
      ],
    };
  
    const lineChartConfig = {
      backgroundGradientFrom: "#FFFF",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#FFFF",
      backgroundGradientToOpacity: 0,
      color: () => "#808080",
      decimalPlaces: 1,
      fillShadowGradientOpacityFrom: 0,
      fillShadowGradientOpacityTo: 0,
      fillShadowGradientOpacity: 0,
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
        <WidgetHeader title="Weight" subtitle="Progression" />
        <LineChart
          data={data}
          width={screenWidth}
          height={160}
          yAxisLabel=""
          chartConfig={lineChartConfig}
          yAxisSuffix="kg"
          withInnerLines={false}
          segments={4}
          style={{
            marginVertical: 8,
            marginHorizontal: -10,
            borderRadius: 16,
          }}
        />
      </Box>
    );
  };

  export default lineGraphWidget