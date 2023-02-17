import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Button, IButtonProps, Text } from "native-base";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

interface IDeleteButton extends IButtonProps {
  title: string;
  variant: "ghost" | "solid";
}

const DeleteButton = (props: IDeleteButton) => {
  const { title, variant, ...restProps } = props;

  const strokeColor = variant === "solid" ? "white" : "#FF0000";

  return (
    <Button
      colorScheme={"danger"}
      variant={variant}
      leftIcon={
        <FontAwesomeIcon icon={faTrash} size={10} color={strokeColor} />
      }
      {...restProps}
    >
      <Text color={strokeColor} fontWeight={"semibold"}>
        Delete {title}
      </Text>
    </Button>
  );
};

export default DeleteButton;
