import { Dimensions } from "react-native";

const CONFIG = {
  backgroundGradientFrom: "#FFFF",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#FFFF",
  backgroundGradientToOpacity: 0,
  color: () => "#808080",
  barPercentage: 0.6,
  barRadius: 3,
  decimalPlaces: 0,
  fillShadowGradientFrom: "#702963",
  fillShadowGradientFromOpacity: 0.8,
  fillShadowGradientToOpacity: 1,
  fillShadowGradientTo: "#7851a9",
  propsForBackgroundLines: {
    translateX: 20,
    strokeWidth: "0.3",
    strokeLinecap: "round",
    strokeDasharray: "0, 0",
    zIndex: 99,
  },
  propsForHorizontalLabels: {
    translateY: 3,
  },
  verticalLabelRotation: 45,
};

const SCREEN_WIDTH = Dimensions.get("window").width;

export { CONFIG, SCREEN_WIDTH };
