import { Pressable, HStack, Text, VStack, useToast } from "native-base";
import { lazy, SetStateAction, Suspense, useEffect, useState } from "react";
import useExerciseDetails from "../../hooks/useExerciseDetails";
import useExerciseHistory from "../../hooks/useExerciseHistory";
import ExerciseDetailsAbout from "../ExerciseDetails/ExerciseDetailsAbout";
import Loader from "../utils/Loader";
import ToastAlert from "../utils/ToastAlert";
import ModalWrapper from "./ModalWrapper";

interface IExerciseDetailsModal {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  exerciseName: string;
  exerciseId: number;
}

type TTabs = "ABOUT" | "HISTORY" | "RECORDS";

const ExerciseDetailsHistory = lazy(
  () => import("../ExerciseDetails/ExerciseDetailsHistory")
);
const ExerciseDetailsRecords = lazy(
  () => import("../ExerciseDetails/ExerciseDetailsRecords")
);

const ExerciseDetailsModal = (props: IExerciseDetailsModal) => {
  const [ACTIVE_TAB, setActiveTab] = useState<TTabs>("ABOUT");
  const { isOpen, onClose, exerciseName, exerciseId } = props;
  const {
    details,
    isLoading: detailsIsLoading,
    error: detailsError,
  } = useExerciseDetails({
    exerciseId,
  });
  const {
    exerciseHistory,
    isLoading: historyIsLoading,
    error: historyError,
  } = useExerciseHistory(exerciseId);

  const TAB_LIST = {
    ABOUT: <ExerciseDetailsAbout {...details} />,
    HISTORY: (
      <ExerciseDetailsHistory
        exerciseHistory={exerciseHistory}
        isLoading={historyIsLoading}
      />
    ),
    RECORDS: (
      <ExerciseDetailsRecords
        exerciseHistory={exerciseHistory}
        isLoading={detailsIsLoading}
      />
    ),
  };

  const toast = useToast();

  useEffect(() => {
    if (detailsError || historyError) {
      toast.show({
        placement: "top",
        render: () => (
          <ToastAlert
            title="Error"
            description="There was an error loading workout details, please try again later"
            status="error"
            variant="solid"
          />
        ),
      });
    }
  }, [historyError, detailsError]);

  const renderTabs = () => {
    return (
      <HStack
        justifyContent={"space-evenly"}
        rounded={"md"}
        backgroundColor={"gray.300"}
      >
        {Object.keys(TAB_LIST).map((el, index) => {
          const activeWeight = ACTIVE_TAB === el ? "700" : "500";
          const activeBackground =
            ACTIVE_TAB === el ? "coolGray.50" : "coolGray.200";
          const activeShadow = ACTIVE_TAB === el ? "lg" : null;

          return (
            <Pressable
              key={index}
              flex={1}
              textAlign={"center"}
              onPress={() => setActiveTab(el as TTabs)}
              fontWeight={activeWeight}
              background={activeBackground}
              shadow={activeShadow}
              p={2}
            >
              <Text textTransform={"capitalize"}>{el}</Text>
            </Pressable>
          );
        })}
      </HStack>
    );
  };

  const renderContent = () => (
    <Suspense fallback={<Loader />}>{TAB_LIST[ACTIVE_TAB]}</Suspense>
  );

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      header={`${exerciseName} Details`}
    >
      <VStack space={2}>
        {renderTabs()}
        {renderContent()}
      </VStack>
    </ModalWrapper>
  );
};

export default ExerciseDetailsModal;
