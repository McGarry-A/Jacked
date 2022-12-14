import { Input } from "native-base";
import { SetStateAction, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { faWeightScale } from "@fortawesome/free-solid-svg-icons/faWeightScale";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface IAddMeasurementModal {
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

const AddMeasurementModal = (props: IAddMeasurementModal) => {
  const { isVisible, setIsVisible } = props;

  const [weight, setWeight] = useState<number>();

  const handleSave = () => null;

  const renderAddWeightInput = () => {
    return (
      <Input
        placeholder="Add Weight"
        keyboardType="numeric"
        variant={"filled"}
        onChangeText={(text) => setWeight(text as unknown as number)}
        leftElement={
          <FontAwesomeIcon
            icon={faWeightScale}
            size={15}
            style={{ marginLeft: 6, marginRight: 6, color: "gray" }}
          />
        }
      />
    );
  };

  return (
    <ModalWrapper
      isOpen={isVisible}
      onClose={setIsVisible}
      header="Add New Measurement"
      saveHandler={handleSave}
    >
      {renderAddWeightInput()}
    </ModalWrapper>
  );
};

export default AddMeasurementModal;
