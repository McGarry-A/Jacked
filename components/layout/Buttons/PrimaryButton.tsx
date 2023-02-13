import { Button, IButtonProps, Text } from "native-base";

interface IPrimaryButton extends IButtonProps {
  children: React.ReactNode;
  textDark?: boolean;
}

const PrimaryButton = ({ children, textDark, ...rest }: IPrimaryButton) => {
  return (
    <Button
      borderRadius={10}
      h={"16"}
      {...rest}
      backgroundColor={"coolGray.800"}
    >
      <Text
        color={textDark ? "coolGray.900" : "gray.50"}
        fontWeight={700}
        fontSize={18}
      >
        {children}
      </Text>
    </Button>
  );
};

export default PrimaryButton;
