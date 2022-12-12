import { Button, Modal, Skeleton, Text, VStack } from "native-base";
import React, { useState } from "react";
import useExerciseList from "../../hooks/useExerciseList";
import useId from "../../hooks/useId";
import { useAppDispatch } from "../../store";
import { createWidget } from "../../store/WidgetsSlice";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  IButtonComponentType,
  InterfaceButtonProps,
} from "native-base/lib/typescript/components/primitives/Button/types";

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

  const renderHeader = () => (
    <Modal.Header borderBottomWidth={0}>Create Widget</Modal.Header>
  );

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
    <Modal isOpen={isVisible} onClose={setIsVisible} size={"sm"} shadow={8}>
      <Modal.Content maxH="212">
        <Modal.CloseButton />
        {renderHeader()}
        {renderBody()}
      </Modal.Content>
    </Modal>
  );
}
interface IModalItem extends InterfaceButtonProps {
  children: React.ReactNode;
  pressHandler: () => void;
  hasChevron?: boolean;
}

const ModalItem: React.FC<IModalItem> = ({
  children,
  pressHandler,
  hasChevron = false,
  ...rest
}) => {
  return (
    <Button
      onPress={pressHandler}
      variant={"filled"}
      justifyContent={"start"}
      backgroundColor={"coolGray.100"}
      rightIcon={
        hasChevron ? (
          <FontAwesomeIcon icon={faChevronRight} size={12} color={"#6b7280"} />
        ) : undefined
      }
      {...rest}
    >
      <Text color={"coolGray.600"} fontWeight={"semibold"}>
        {children}
      </Text>
    </Button>
  );
};
