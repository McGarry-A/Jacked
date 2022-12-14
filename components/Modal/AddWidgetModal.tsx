import { Modal, Skeleton, VStack } from "native-base";
import React, { useState } from "react";
import useExerciseList from "../../hooks/useExerciseList";
import useId from "../../hooks/useId";
import { useAppDispatch } from "../../store";
import { createWidget } from "../../store/WidgetsSlice";
import ModalItem from "./ModalItem";
import ModalWrapper from "./ModalWrapper";

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
      widgetId: useId("wid"),
      title: `${exerciseName} Progression`,
      type: "line",
      subtitle: "1RM Estimate",
      exerciseId: id,
    };
    dispatch(createWidget({ ...widget }));
    setIsVisible(false);
    setStep("CHOOSE_WIDGET_TYPE");
  };

  const handleCreateBarWidget = () => {
    const widget = {
      widgetId: useId("wid"),
      title: `Session Frequency`,
      type: "bar",
      subtitle: "",
    };
    dispatch(createWidget({ ...widget }));
    setIsVisible(false);
  };

  const renderBody = () => {
    if (step === "CHOOSE_WIDGET_TYPE")
      return (
        <Modal.Body>
          <VStack space={1}>
            <ModalItem pressHandler={handleCreateBarWidget}>
              Session Frequency
            </ModalItem>
            <ModalItem hasChevron pressHandler={handleChooseExerciseToTrack}>
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

  return (
    <ModalWrapper
      header="Create Widget"
      isOpen={isVisible}
      onClose={setIsVisible}
      size={"sm"}
      shadow={8}
    >
      {renderBody()}
    </ModalWrapper>
  );
}
