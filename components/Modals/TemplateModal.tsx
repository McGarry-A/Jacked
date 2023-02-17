import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useAppDispatch } from "../../store";
import { deleteTemplate } from "../../store/templateSlice";
import ModalItem from "./ModalItem";
import ModalWrapper from "./ModalWrapper";

interface IProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  templateId: string;
}

const TemplateModal = (props: IProps) => {
  const { isVisible, setIsVisible } = props;
  const dispatch = useAppDispatch()

  const handleDelete = (templateId: string) => {
    dispatch(deleteTemplate(templateId));
    setIsVisible(false);
  };

  const renderDelete = () => {
    const { templateId } = props;

    return (
      <ModalItem
        pressHandler={() => handleDelete(templateId)}
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
