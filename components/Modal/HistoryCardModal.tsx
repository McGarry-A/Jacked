import { VStack } from "native-base";
import useWorkout from "../../hooks/useWorkout";
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
  const { workoutId } = props;
  const { isLoading, error, workout } = useWorkout(workoutId);

  const { isVisible, setIsVisible } = props;
  // const dispatch = useAppDispatch();

  const handleSeeWorkout = () => {
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
