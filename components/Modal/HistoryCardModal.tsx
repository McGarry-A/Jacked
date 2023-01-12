import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { VStack } from "native-base";
import { useAppDispatch } from "../../store";
// import { deleteWorkout } from "../../store/workoutHistorySlice";
import ModalItem from "./ModalItem";
import ModalWrapper from "./ModalWrapper";

interface IHistoryCardModal {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  workoutId: number;
}

const HistoryCardModal = (props: IHistoryCardModal) => {
  // NOTE:
  // CANNOT DELETE WORKOUTS BECAUSE OF TABLE CASCADE EFFECTS ON LIFTS ETC

  const { isVisible, setIsVisible } = props;
  // const dispatch = useAppDispatch();

  const handleSeeWorkout = () => {
    const { workoutId } = props;
    // dispatch(deleteWorkout(workoutId));
    setIsVisible(false);
  };

  return (
    <ModalWrapper
      isOpen={isVisible}
      onClose={setIsVisible}
      header="Manage Workout"
    >
      <VStack>
        <ModalItem pressHandler={handleSeeWorkout}>Workout Details</ModalItem>
      </VStack>
    </ModalWrapper>
  );
};

export default HistoryCardModal;
