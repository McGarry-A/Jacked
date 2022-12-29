import { Modal, Skeleton, VStack } from "native-base";
import React, { useState } from "react";
import useExerciseList from "../../hooks/useExerciseList";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  createWidget,
  IOneRepMaxLine,
  IWidgetInterface,
} from "../../store/WidgetsSlice";
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
  const { userId } = useAppSelector((state) => state.userSlice.user);

  const dispatch = useAppDispatch();

  const handleChooseExerciseToTrack = () => setStep("CHOOSE_EXERCISE_TO_TRACK");

  const handleCreateLineWidget = (id: number, exerciseName: string) => {
    const widget: IOneRepMaxLine = {
      title: `${exerciseName} Progression`,
      type: "ONE_REP_MAX_EST",
      subtitle: "1RM Estimate",
      exerciseId: id,
      user_id: userId,
    };
    dispatch(createWidget({ ...widget }));
    setIsVisible(false);
    setStep("CHOOSE_WIDGET_TYPE");
  };

  interface IHandleCreateWidget {
    title: string;
    type: "WEIGHT_TRACKER" | "SESSION_FREQUENCY";
    subtitle: string;
  }

  const handleCreateWidget = ({
    title,
    type,
    subtitle,
  }: IHandleCreateWidget) => {
    const widget: IWidgetInterface = {
      title,
      type,
      subtitle,
      user_id: userId,
    };
    dispatch(createWidget({ ...widget }));
    setIsVisible(false);
  };

  const renderBody = () => {
    if (step === "CHOOSE_WIDGET_TYPE")
      return (
        <Modal.Body>
          <VStack space={1}>
            <ModalItem
              pressHandler={() =>
                handleCreateWidget({
                  title: "Session Frequncy",
                  subtitle: "",
                  type: "SESSION_FREQUENCY",
                })
              }
            >
              Session Frequency
            </ModalItem>
            <ModalItem
              pressHandler={() =>
                handleCreateWidget({
                  title: "Weight Tracker",
                  subtitle: "",
                  type: "WEIGHT_TRACKER",
                })
              }
            >
              Weight Tracker
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
