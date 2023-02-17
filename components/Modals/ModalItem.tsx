import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { InterfaceButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";
import { Button, Text } from "native-base";

interface IModalItem extends InterfaceButtonProps {
  children: React.ReactNode;
  pressHandler: () => void;
  hasChevron?: boolean;
}

const ModalItem: React.FC<IModalItem> = ({
  children,
  pressHandler,
  hasChevron = false,
  ...rest
}) => {
  return (
    <Button
      onPress={pressHandler}
      variant={"filled"}
      justifyContent={"start"}
      backgroundColor={"coolGray.100"}
      rightIcon={
        hasChevron ? (
          <FontAwesomeIcon icon={faChevronRight} size={12} color={"#6b7280"} />
        ) : undefined
      }
      {...rest}
    >
      <Text color={"coolGray.600"} fontWeight={"semibold"}>
        {children}
      </Text>
    </Button>
  );
};

export default ModalItem;
