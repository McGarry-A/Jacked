import { Dimensions } from "react-native";

const CONFIG = {
    backgroundGradientFrom: "#FFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFF",
    backgroundGradientToOpacity: 0,
    color: () => "#808080",
    decimalPlaces: 1,
    propsForDots: {
        r: "6",
        strokeWidth: "3",
        stroke: "#fff",
        fill: "blue"
    },
    fillShadowGradientFromOpacity: 0,
    fillShadowGradientToOpacity: 0,
};

const SCREEN_WIDTH = Dimensions.get("window").width;

export { CONFIG, SCREEN_WIDTH }