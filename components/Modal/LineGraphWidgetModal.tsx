import { Select } from "native-base";
import { SetStateAction } from "react";
import ModalWrapper from "./ModalWrapper";

interface ILineGraphWidgetModal {
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

const LineGraphWidgetModal = (props: ILineGraphWidgetModal) => {
  const { modalIsVisible, setModalIsVisible } = props;

  const handleSave = () => null;

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
      {renderLimitWeeks()}
    </ModalWrapper>
  );
};

export default LineGraphWidgetModal;
