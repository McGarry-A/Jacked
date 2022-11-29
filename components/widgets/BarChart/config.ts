import { Dimensions } from "react-native";

const CONFIG = {
    backgroundGradientFrom: "#FFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFF",
    backgroundGradientToOpacity: 0,
    color: () => "#808080",
    barPercentage: 0.5,
    barRadius: 5,
    decimalPlaces: 0,
    fillShadowGradientFrom: "#451F55",
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 1,
    fillShadowGradientTo: "#724E91",
};

const SCREEN_WIDTH = Dimensions.get("window").width;

export { CONFIG, SCREEN_WIDTH }