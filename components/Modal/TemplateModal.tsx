import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ModalItem from "./ModalItem";
import ModalWrapper from "./ModalWrapper";

interface IProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const TemplateModal = (props: IProps) => {
  const { isVisible, setIsVisible } = props;

  const handleDelete = (widgetId: string) => {
    // dispatch(deleteWidget(Number(widgetId)));
    setIsVisible(false);
  };

  const renderDelete = () => {
    return (
      <ModalItem
        pressHandler={() => handleDelete("1")}
        leftIcon={<FontAwesomeIcon icon={faXmark} size={13} color="red" />}
      >
        Delete
      </ModalItem>
    );
  };

  return (
    <ModalWrapper
      isOpen={isVisible}
      onClose={() => setIsVisible(false)}
      header={"Template Settings"}
    >
      {renderDelete()}
    </ModalWrapper>
  );
};

export default TemplateModal;
