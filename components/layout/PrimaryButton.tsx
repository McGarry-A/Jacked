import { Button, IButtonProps } from "native-base";

interface IPrimaryButton extends IButtonProps {
  children: React.ReactNode;
}

const PrimaryButton = ({ children, ...rest }: IPrimaryButton) => {
  return <Button {...rest}>{children}</Button>;
};

export default PrimaryButton;
