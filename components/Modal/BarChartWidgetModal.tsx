import { Select } from "native-base";
import { SetStateAction } from "react";
import ModalWrapper from "./ModalWrapper";

interface IBarChartWidgetModal {
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

const BarChartWidgetModal = (props: IBarChartWidgetModal) => {
  const { modalIsVisible, setModalIsVisible } = props;

  const handleSave = () => null;

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

  return (
    <ModalWrapper
      header={"Settings"}
      isOpen={modalIsVisible}
      onClose={() => setModalIsVisible(false)}
      saveHandler={handleSave}
    >
      {renderSetTarget()}
    </ModalWrapper>
  );
};

export default BarChartWidgetModal;
