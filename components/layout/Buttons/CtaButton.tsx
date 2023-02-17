import { Button, Text, useColorModeValue } from "native-base";
import { InterfaceButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";
import React from "react";
import useColorScheme from "../../../hooks/useColorScheme";

interface ICtaButton extends InterfaceButtonProps {
  children: React.ReactNode;
  isHollow?: boolean;
}

const CtaButton = (props: ICtaButton) => {
  const { children, isHollow = false, ...rest } = props;
  const { ctaBgColorMode, ctaTextColorMode, ctaBorderColorMode } =
    useColorScheme();
  const backgroundColor = isHollow ? "transparent" : ctaBgColorMode;
  const borderColor = isHollow ? "transparent" : ctaBorderColorMode;
  const varient = isHollow ? "ghost" : "outline";

  return (
    <Button
      size={"xs"}
      borderRadius="3xl"
      borderWidth={1}
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      variant={varient}
      {...rest}
    >
      <Text
        fontSize={"2xs"}
        color={ctaTextColorMode}
        textTransform={"uppercase"}
        fontWeight={"bold"}
      >
        {children}
      </Text>
    </Button>
  );
};

export default CtaButton;
