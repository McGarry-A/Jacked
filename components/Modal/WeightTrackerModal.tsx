import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { SetStateAction } from "react";
import { useAppDispatch } from "../../store";
import { deleteWidget } from "../../store/WidgetsSlice";
import ModalItem from "./ModalItem";
import ModalWrapper from "./ModalWrapper";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

interface IWeightTrackerModal {
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<SetStateAction<boolean>>;
  widgetId: string;
}

const WeightTrackerModal = (props: IWeightTrackerModal) => {
  const { modalIsVisible, setModalIsVisible, widgetId } = props;
  const dispatch = useAppDispatch();

  const handleSave = () => null;
  const handleDelete = (widgetId: string) => {
    dispatch(deleteWidget(Number(widgetId)));
    setModalIsVisible(false);
  };

  const renderDelete = () => {
    return (
      <ModalItem
        pressHandler={() => handleDelete(widgetId)}
        leftIcon={<FontAwesomeIcon icon={faXmark} size={13} color="red" />}
      >
        Delete
      </ModalItem>
    );
  };

  return (
    <ModalWrapper
      header={"Settings"}
      isOpen={modalIsVisible}
      onClose={() => setModalIsVisible(false)}
      saveHandler={handleSave}
    >
      {renderDelete()}
    </ModalWrapper>
  );
};

export default WeightTrackerModal;
