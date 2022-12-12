import { Button, Text } from "native-base";
import { InterfaceButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";
import React from "react";

interface ICtaButton extends InterfaceButtonProps {
    children: React.ReactNode
    isHollow?: boolean
  }

const CtaButton = (props: ICtaButton) => {
  const { children, isHollow = false, ...rest } = props;

  const backgroundColor = isHollow ? "transparent" : "info.100";
  const borderColor = isHollow ? "transparent" : "info.300";
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
        color={"info.600"}
        textTransform={"uppercase"}
        fontWeight={"bold"}
      >
        {children}
      </Text>
    </Button>
  );
};

export default CtaButton;
