import { Dimensions } from "react-native";

const CONFIG = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#FFFFFF",
  color: () => "#808080",
  decimalPlaces: 1,
  propsForDots: {
    r: "3",
    strokeWidth: "2",
    stroke: "#7851a9",
    fill: "transparent",
  },
  propsForBackgroundLines: {
    strokeWidth: "0.3",
    strokeLinecap: "round",
    strokeDasharray: "0, 0",
  },
  propsForLabels: {
    // fontFamily: "sans-serif",
  },
  fillShadowGradient: "#FFFFFF",
  fillShadowGradientOpacity: 0,
  bezier: true,
};

const SCREEN_WIDTH = Dimensions.get("window").width;

export { CONFIG, SCREEN_WIDTH };
