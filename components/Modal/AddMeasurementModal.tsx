import { Input } from "native-base";
import { SetStateAction, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { faWeightScale } from "@fortawesome/free-solid-svg-icons/faWeightScale";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useAppDispatch, useAppSelector } from "../../store";
import { addWeight } from "../../store/weightSlice";

interface IAddMeasurementModal {
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

const AddMeasurementModal = (props: IAddMeasurementModal) => {
  const { isVisible, setIsVisible } = props;

  const [weight, setWeight] = useState<string>("");

  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.userSlice.user);

  const handleSave = () => {
    if (weight === "") return;
    // NOTE:
    // Check the string is only numbers, less than 3 characters and longer than 1
    if (!/^\d+$/.test(weight) && weight.length <= 3 && weight.length > 1) {
      // setError("Please type a valid number")
    }
    dispatch(addWeight({ weight, userId }));
    setIsVisible(false);
  };

  const renderAddWeightInput = () => {
    return (
      <Input
        placeholder="Add Weight"
        keyboardType="numeric"
        variant={"filled"}
        onChangeText={(text) => setWeight(text)}
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
