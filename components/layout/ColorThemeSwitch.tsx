import { HStack, Switch, Text } from "native-base";

export default function ColorThemeSwitch() {
  return (
    <HStack alignItems={"center"}>
      <Text
        fontWeight={"semibold"}
        fontSize={"2xs"}
        letterSpacing={"lg"}
        textTransform={"uppercase"}
      >
        Light
      </Text>
      <Switch size={"sm"} offTrackColor={"info.300"} />
      <Text
        fontWeight={"semibold"}
        fontSize={"2xs"}
        letterSpacing={"lg"}
        textTransform={"uppercase"}
      >
        Dark
      </Text>
    </HStack>
  );
}
