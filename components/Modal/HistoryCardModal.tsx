import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Input, VStack } from "native-base";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { createFolder } from "../../store/templateSlice";
import ModalItem from "./ModalItem";
import ModalWrapper from "./ModalWrapper";

interface IHistoryCardModal {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const HistoryCardModal = (props: IHistoryCardModal) => {
  const { isVisible, setIsVisible } = props;

  const handleDeleteWorkout = () => {};

  return (
    <ModalWrapper
      isOpen={isVisible}
      onClose={setIsVisible}
      header="Manage Workout"
    >
      <VStack>
        <ModalItem
          leftIcon={<FontAwesomeIcon icon={faXmark} size={13} color="red" />}
          pressHandler={handleDeleteWorkout}
        >
          Delete Workout
        </ModalItem>
      </VStack>
    </ModalWrapper>
  );
};

export default HistoryCardModal;
