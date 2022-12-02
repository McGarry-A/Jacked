import { Dimensions } from "react-native";

const CONFIG = {
    backgroundGradientFrom: "#FFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFF",
    backgroundGradientToOpacity: 0,
    color: () => "#808080",
    barPercentage: .6,
    barRadius: 5,
    decimalPlaces: 0,
    fillShadowGradientFrom: "#4169e1",
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 1,
    fillShadowGradientTo: "#153084",
};

const SCREEN_WIDTH = Dimensions.get("window").width;

export { CONFIG, SCREEN_WIDTH }