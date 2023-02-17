import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Select } from "native-base";
import { SetStateAction } from "react";
import ModalItem from "./ModalItem";
import ModalWrapper from "./ModalWrapper";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { useDispatch } from "react-redux";
import { deleteWidget } from "../../store/WidgetsSlice";
import { useAppDispatch } from "../../store";

interface IBarChartWidgetModal {
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<SetStateAction<boolean>>;
  widgetId: string;
}

const BarChartWidgetModal = (props: IBarChartWidgetModal) => {
  const { modalIsVisible, setModalIsVisible, widgetId } = props;
  const dispatch = useAppDispatch()

  const handleSave = () => null;
  const handleDelete = (widgetId: string) => {
    dispatch(deleteWidget(Number(widgetId)));
    setModalIsVisible(false);
  };

  const renderSetTarget = () => {
    return (
      <Select placeholder="Target Days Per Week" fontSize="sm">
        <Select.Item label="1" value={"1"} />
        <Select.Item label="2" value={"2"} />
        <Select.Item label="3" value={"3"} />
        <Select.Item label="4" value={"4"} />
        <Select.Item label="5" value={"5"} />
        <Select.Item label="6" value={"6"} />
        <Select.Item label="7" value={"7"} />
      </Select>
    );
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
      {/* {renderSetTarget()} */}
      {renderDelete()}
    </ModalWrapper>
  );
};

export default BarChartWidgetModal;
