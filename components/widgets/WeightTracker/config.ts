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
    fillShadowGradient: "#FFFFFF",
    fillShadowGradientOpacity: 0,
    bezier: true,
};

const SCREEN_WIDTH_APP = Dimensions.get("window").width;
const SCREEN_WIDTH_WEB = 500;

export { CONFIG, SCREEN_WIDTH_APP, SCREEN_WIDTH_WEB }