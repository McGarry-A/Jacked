import { Button, Text } from "native-base";
import { InterfaceButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";
import React from "react";

interface ICtaButton extends InterfaceButtonProps {
    children: React.ReactNode
  }

const CtaButton = (props: ICtaButton) => {
  const { children, ...rest } = props;

  return (
    <Button
      size={"xs"}
      borderRadius="3xl"
      borderWidth={1}
      borderColor={"info.300"}
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
