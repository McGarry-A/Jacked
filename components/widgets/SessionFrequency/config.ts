import { Dimensions } from "react-native";

const CONFIG = {
  backgroundGradientFrom: "#FFFF",
  backgroundGradientFromOpacity: 0,
  color: () => "#808080",
  barPercentage: 0.6,
  barRadius: 3,
  decimalPlaces: 0,
  propsForBackgroundLines: {
    strokeWidth: "0.3",
    strokeLinecap: "round",
    strokeDasharray: "0, 0",
    x1: 20,
  },
  propsForLabels: {
    // fontFamily: "sans-serif",
  },
};

const SCREEN_WIDTH = Dimensions.get("window").width;

export { CONFIG, SCREEN_WIDTH };
