import { Box, HStack, Switch, Text, useColorMode } from "native-base";
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import useColorScheme from "../../hooks/useColorScheme";
import { LogBox } from "react-native";

export default function ColorThemeSwitch() {
  const { toggleColorMode, colorMode } = useColorMode();
  const { pTextColorMode } = useColorScheme();

  // NOTE: This is a workaround for a bug in native-base
  LogBox.ignoreLogs([
    "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
  ]);

  return (
    <HStack alignItems={"center"} mr={4}>
      <Box mr={2}>
        <FontAwesomeIcon
          icon={colorMode === "light" ? faSun : faMoon}
          size={16}
          color={"#0284c7"}
        />
      </Box>
      <Text
        fontWeight={"semibold"}
        fontSize={"2xs"}
        letterSpacing={"lg"}
        textTransform={"uppercase"}
        color={pTextColorMode}
      >
        {colorMode}
      </Text>
      <Switch
        size={"sm"}
        offTrackColor={"info.300"}
        onChange={() => toggleColorMode()}
      />
    </HStack>
  );
}
