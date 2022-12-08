import { Button, Modal, Skeleton, VStack } from "native-base";
import React, { useState } from "react";
import useExerciseList from "../../hooks/useExerciseList";
import useId from "../../hooks/useId";
import { useAppDispatch } from "../../store";
import { createWidget } from "../../store/WidgetsSlice";

interface IProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

type TStep = "CHOOSE_WIDGET_TYPE" | "CHOOSE_EXERCISE_TO_TRACK";

export default function AddWidgetModal(props: IProps) {
  const [step, setStep] = useState<TStep>("CHOOSE_WIDGET_TYPE");

  const { isVisible, setIsVisible } = props;
  const { list: exerciseList, isLoading, error } = useExerciseList();

  const dispatch = useAppDispatch();

  const handleChooseExerciseToTrack = () => setStep("CHOOSE_EXERCISE_TO_TRACK");

  const handleCreateLineWidget = (id: number, exerciseName: string) => {
    const widget = {
      newWidgetId: useId("wid"),
      title: `${exerciseName} Progression`,
      type: "line",
      subtitle: "1RM Estimate",
    };
    dispatch(createWidget({ ...widget }));
    setIsVisible(false);
  };

  const handleCreateBarWidget = () => {
    const widget = {
      newWidgetId: useId("wid"),
      title: `Session Frequency`,
      type: "bar",
      subtitle: "",
    };
    dispatch(createWidget({ ...widget }));
    setIsVisible(false);
  };

  const renderHeader = () => <Modal.Header>Create Widget</Modal.Header>;

  const renderBody = () => {
    if (step === "CHOOSE_WIDGET_TYPE")
      return (
        <Modal.Body>
          <VStack>
            <ModalItem pressHandler={handleCreateBarWidget}>
              Session Frequency
            </ModalItem>
            <ModalItem pressHandler={handleChooseExerciseToTrack}>
              1 Rep Max Estimator
            </ModalItem>
          </VStack>
        </Modal.Body>
      );

    if (step === "CHOOSE_EXERCISE_TO_TRACK")
      return (
        <Modal.Body>
          <VStack space={1}>
            {exerciseList.map(({ exercise_name, id }) => {
              return (
                <ModalItem
                  pressHandler={() => handleCreateLineWidget(id, exercise_name)}
                  key={id}
                >
                  {exercise_name}
                </ModalItem>
              );
            })}
          </VStack>
        </Modal.Body>
      );

    if (step === "CHOOSE_EXERCISE_TO_TRACK" && isLoading)
      return <Skeleton h="full" />;
  };

  const renderFooter = () => {
    return (
      <Modal.Footer>
        <Button.Group space={2}>
          <Button
            colorScheme={"error"}
            onPress={() => {
              setIsVisible(false);
            }}
          >
            Close
          </Button>
        </Button.Group>
      </Modal.Footer>
    );
  };

  return (
    <Modal isOpen={isVisible} onClose={setIsVisible} size={"sm"}>
      <Modal.Content maxH="212">
        <Modal.CloseButton />
        {renderHeader()}
        {renderBody()}
        {renderFooter()}
      </Modal.Content>
    </Modal>
  );
}
interface IModalItem {
  children: React.ReactNode;
  pressHandler: () => void;
}

const ModalItem: React.FC<IModalItem> = ({ children }) => {
  return <Button variant={"unstyled"}>{children}</Button>;
};
