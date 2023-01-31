import { Heading, View } from "native-base";
import { memo, SetStateAction, Suspense } from "react";
import ModalWrapper from "./ModalWrapper";
import { lazy } from "react";
import Loader from "../utils/Loader";

const WorkoutDetails = lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 1000)).then(
    () => import("../WorkoutDetails")
  );
});

interface IWorkoutDetailsModal {
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
  workoutId: number;
}

const WorkoutDetailsModal = ({
  isVisible,
  setIsVisible,
  workoutId,
}: IWorkoutDetailsModal): JSX.Element => {
  return (
    <ModalWrapper
      header={"Settings"}
      isOpen={isVisible}
      onClose={() => setIsVisible(false)}
    >
      <Suspense fallback={<Loader />}>
        <WorkoutDetails workoutId={workoutId} />
      </Suspense>
    </ModalWrapper>
  );
};

export default memo(WorkoutDetailsModal);
