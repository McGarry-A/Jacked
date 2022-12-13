import { useColorModeValue } from "native-base";

export default function useColorScheme() {
  // SCREEN
  const screenColorMode = useColorModeValue("coolGray.50", "coolGray.800");
  const screenColorModeHex = useColorModeValue("#f9fafb", "#1f2937");

  // TEXT
  const h1ColorMode = useColorModeValue("coolGray.700", "coolGray.50");
  const pTextColorMode = useColorModeValue("coolGray.600", "coolGray.50");

  // CTA WITH ICONS
  const ctaBgColorMode = useColorModeValue("info.100", "info.700");
  const ctaBorderColorMode = useColorModeValue("info.500", "info.100");
  const ctaTextColorMode = useColorModeValue("info.600", "info.100");
  const ctaIconColorMode = useColorModeValue("#0284c7","#bce3f5")

  // ELIPSES COLOR
  const elipsesColorMode = useColorModeValue("#0369a1", "#e0f2fe");
  const elipsesBgColorMode = useColorModeValue("#e0f2fe", "#0369a1");

  //AVATAR BG COLOR MODE
  const avatarBgColorMode = useColorModeValue("info.500", "info.700");

  return {
    screenColorMode,
    h1ColorMode,
    ctaBgColorMode,
    ctaBorderColorMode,
    ctaTextColorMode,
    ctaIconColorMode,
    pTextColorMode,
    screenColorModeHex,
    elipsesColorMode,
    elipsesBgColorMode,
    avatarBgColorMode
  };
}
