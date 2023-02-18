import { Dimensions } from "react-native";

const BAR_CONFIG = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  fillShadowGradientFromOpacity: 0,
  fillShadowGradientToOpacity: 0,
  fillShadowGradientFrom: '#7851a9',
  fillShadowGradientTo: '#7851a9',
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
};

const SCREEN_WIDTH = Dimensions.get("window").width;

export { BAR_CONFIG, SCREEN_WIDTH };
