import { Dimensions } from "react-native";

const CONFIG = {
    backgroundGradientFrom: "#FFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFF",
    backgroundGradientToOpacity: 0,
    color: () => "#808080",
    decimalPlaces: 1,
    propsForDots: {
        r: "5",
        strokeWidth: "3",
        stroke: "#fff",
        fill: "#4169E1"
    },
    fillShadowGradientFromOpacity: 0,
    fillShadowGradientToOpacity: 0,
};

const SCREEN_WIDTH = Dimensions.get("window").width;

export { CONFIG, SCREEN_WIDTH }