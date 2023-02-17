import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Select } from "native-base";
import { SetStateAction } from "react";
import { useAppDispatch } from "../../store";
import { deleteWidget } from "../../store/WidgetsSlice";
import ModalItem from "./ModalItem";
import ModalWrapper from "./ModalWrapper";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark"

interface ILineGraphWidgetModal {
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<SetStateAction<boolean>>;
  widgetId: string;
}

const LineGraphWidgetModal = (props: ILineGraphWidgetModal) => {
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

  const renderLimitWeeks = () => {
    return (
      <Select placeholder="Limit Weeks">
        <Select.Item label="4" value={"4"} />
        <Select.Item label="5" value={"5"} />
        <Select.Item label="6" value={"6"} />
        <Select.Item label="7" value={"7"} />
        <Select.Item label="8" value={"8"} />
      </Select>
    );
  };

  return (
    <ModalWrapper
      header={"Settings"}
      isOpen={modalIsVisible}
      onClose={() => setModalIsVisible(false)}
      saveHandler={handleSave}
    >
      {/* {renderLimitWeeks()} */}
      {renderDelete()}
    </ModalWrapper>
  );
};

export default LineGraphWidgetModal;
