import { Box, HStack, Switch, Text, useColorMode } from "native-base";
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import useColorScheme from "../../hooks/useColorScheme";

export default function ColorThemeSwitch() {
  const { toggleColorMode, colorMode } = useColorMode();
  const { pTextColorMode } = useColorScheme();

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
        onChange={toggleColorMode}
      />
    </HStack>
  );
}
