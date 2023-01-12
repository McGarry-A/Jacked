import { VStack } from "native-base";
import useWorkout from "../../hooks/useWorkout";
import { useNavigation } from "@react-navigation/native";
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
  // const { navigate } = useNavigation();
  // NOTE: move this to a different page.
  const { isLoading, error, workout } = useWorkout(workoutId);
  console.log(workout);

  const { isVisible, setIsVisible } = props;
  // const dispatch = useAppDispatch();

  const handleSeeWorkout = () => {
    // NOTE: Something like this?
    // navigate("/history:workoutId")
    setIsVisible(false);
  };

  return (
    <ModalWrapper
      isOpen={isVisible}
      onClose={setIsVisible}
      header="Manage Workout"
    >
      <VStack>
        <ModalItem pressHandler={handleSeeWorkout}>See Details</ModalItem>
      </VStack>
    </ModalWrapper>
  );
};

export default HistoryCardModal;
