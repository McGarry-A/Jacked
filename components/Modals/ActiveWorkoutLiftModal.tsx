import { VStack } from "native-base";
import { useAppDispatch } from "../../store";
import { deleteLift } from "../../store/currentWorkoutSlice";
import ModalItem from "./ModalItem";
import ModalWrapper from "./ModalWrapper";

interface IProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  liftId: string;
}

export default function ActiveWorkoutLiftModal(props: IProps) {
  const { isVisible, setIsVisible, liftId } = props;

  const dispatch = useAppDispatch();

  const handleDeleteLift = () => {
    dispatch(deleteLift({ liftId }));
    setIsVisible(false);
  };

  return (
    <ModalWrapper
      isOpen={isVisible}
      onClose={setIsVisible}
      header="Lift Options"
    >
      <VStack>
        <ModalItem pressHandler={handleDeleteLift}>Delete Lift</ModalItem>
      </VStack>
    </ModalWrapper>
  );
}
