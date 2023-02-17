import { VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import ModalItem from "./ModalItem";
import ModalWrapper from "./ModalWrapper";
import React, { memo } from "react";

interface IHistoryCardModal {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  workoutId: number;
}

const HistoryCardModal = (props: IHistoryCardModal) => {
  const { workoutId } = props;
  const { navigate } = useNavigation();

  const { isVisible, setIsVisible } = props;

  const handleSeeWorkout = () => {
    navigate("WorkoutDetails", {
      workoutId,
    });

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <ModalWrapper
      isOpen={isVisible}
      onClose={setIsVisible}
      header="Manage Workout"
    >
      <VStack>
        <ModalItem pressHandler={handleSeeWorkout}>View Workout</ModalItem>
      </VStack>
    </ModalWrapper>
  );
};

export default memo(HistoryCardModal);
