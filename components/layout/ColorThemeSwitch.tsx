import {
  Box,
  HStack,
  ISwitchProps,
  Switch,
  Text,
  useColorMode,
} from "native-base";
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";
import { faSun } from "@fortawesome/free-solid-svg-icons/faSun";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import useColorScheme from "../../hooks/useColorScheme";
import { LogBox } from "react-native";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { useState } from "react";

interface IColorSwitch extends IHStackProps {
  switchProps?: ISwitchProps;
}

export default function ColorThemeSwitch(props: IColorSwitch) {
  const { switchProps, ...rest } = props;
  const { toggleColorMode, colorMode } = useColorMode();
  const { pTextColorMode } = useColorScheme();

  const isActive = colorMode === "light" ? true : false;

  return (
    <HStack alignItems={"center"} mr={4} {...rest}>
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
        offTrackColor={"coolGray.200"}
        offThumbColor={"info.500"}
        onTrackColor={"info.600"}
        onToggle={toggleColorMode}
        isChecked={isActive}
      />
    </HStack>
  );
}
// NOTE: This is a workaround for a bug in native-base
LogBox.ignoreLogs([
  "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
]);
