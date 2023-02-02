import {
  Pressable,
  HStack,
  Text,
  View,
  VStack,
  Spinner,
  useToast,
} from "native-base";
import { SetStateAction, useEffect, useState } from "react";
import useExerciseDetails from "../../hooks/useExerciseDetails";
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

const ExerciseDetailsModal = (props: IExerciseDetailsModal) => {
  const [activeTab, setActiveTab] = useState<TTabs>("ABOUT");
  const { isOpen, onClose, exerciseName, exerciseId } = props;
  const { details, error, isLoading } = useExerciseDetails({ exerciseId });
  const toast = useToast();

  useEffect(() => {
    if (error) {
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
  }, [error]);

  const renderTabs = () => {
    return (
      <HStack
        justifyContent={"space-evenly"}
        bg={"gray.200"}
        py={2}
        rounded={"md"}
        color={"gray.800"}
      >
        <Pressable
          flex={1}
          textAlign={"center"}
          onPress={() => setActiveTab("ABOUT")}
        >
          <Text>About</Text>
        </Pressable>
        <Pressable
          flex={1}
          textAlign={"center"}
          onPress={() => setActiveTab("HISTORY")}
        >
          <Text>History</Text>
        </Pressable>
        <Pressable
          flex={1}
          textAlign={"center"}
          onPress={() => setActiveTab("RECORDS")}
        >
          <Text>Records</Text>
        </Pressable>
      </HStack>
    );
  };

  const renderAbout = () => {
    return <Text>About</Text>;
  };
  const renderHistory = () => {
    return <Text>History</Text>;
  };
  const renderRecords = () => {
    return <Text>Records</Text>;
  };

  const renderContent = () => {
    const TAB_LIST = {
      ABOUT: renderAbout(),
      HISTORY: renderHistory(),
      RECORDS: renderRecords(),
    };

    if (isLoading) return <Loader />;

    return TAB_LIST[activeTab];
  };

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
