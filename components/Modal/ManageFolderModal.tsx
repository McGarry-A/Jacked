import { faFile } from "@fortawesome/free-regular-svg-icons/faFile";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Input, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import useId from "../../hooks/useId";
import { LiftData } from "../../screens/modals/AddExercises";
import { useAppDispatch, useAppSelector } from "../../store";
import { createTemplate, deleteFolder } from "../../store/templateSlice";
import { ExerciseList } from "../layout/ExerciseList";
import ModalItem from "./ModalItem";
import ModalWrapper from "./ModalWrapper";

interface IManageFolderModal {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  folId: string;
}

type Tstep = "DEFAULT" | "ADD_TEMPLATE";

const ManageFolderModal = (props: IManageFolderModal) => {
  const [step, setStep] = useState<Tstep>("DEFAULT");
  const { isVisible, setIsVisible } = props;

  const [liftData, setLiftData] = useState<LiftData[]>([]);
  const [templateName, setTemplateName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { userId } = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();

  const handleAddTemplate = () => {
    setStep("ADD_TEMPLATE");
  };

  const handleDeleteFolder = () => {
    dispatch(deleteFolder(props.folId));
    setIsVisible(false)
  };

  useEffect(() => {
    setError("");
  }, [templateName]);

  const handleCreateTemplate = () => {
    if (templateName === "") {
      setError("Please enter a template name");
      return;
    }

    const { folId } = props;
    const templateId = useId("temp");

    const createTemplateProps = {
      folId: folId,
      title: templateName,
      tempId: templateId,
      params: liftData,
      userId,
    };

    dispatch(createTemplate({ ...createTemplateProps }));
    setIsVisible(false);
  };

  const renderTemplateName = () => {
    return (
      <Input
        flexDir={"row"}
        justifyContent="center"
        alignItems={"center"}
        paddingX={2}
        borderRadius={5}
        borderColor={"coolGray.200"}
        backgroundColor={"white"}
        onChangeText={(text) => setTemplateName(text)}
        fontSize={"md"}
        type="text"
        placeholder="Template Name"
        leftElement={
          <FontAwesomeIcon
            icon={faFile}
            size={15}
            style={{ marginLeft: 10, color: "gray" }}
          />
        }
      />
    );
  };

  const renderError = () => {
    return error !== "" ? (
      <Text italic={true} color={"red.500"}>
        *{error}
      </Text>
    ) : null;
  };
  const renderList = () => {
    const config = {
      showInput: true,
      showFilterButtons: false,
    };

    const templateProps = {
      liftData,
      setLiftData,
    };

    return <ExerciseList config={config} cardProps={templateProps} />;
  };

  const renderAddTemplateStep = () => {
    if (step === "ADD_TEMPLATE") {
      return (
        <VStack space={2} flex={1}>
          {renderError()}
          {renderTemplateName()}
          {renderList()}
        </VStack>
      );
    }
  };

  const renderDefaultStep = () => {
    if (step !== "DEFAULT") return;
    return (
      <VStack space={2}>
        <ModalItem hasChevron pressHandler={handleAddTemplate}>
          Add Template
        </ModalItem>
        <ModalItem pressHandler={handleDeleteFolder}>Delete Folder</ModalItem>
      </VStack>
    );
  };

  return (
    <ModalWrapper
      isOpen={isVisible}
      onClose={setIsVisible}
      header="Manage Folder"
      w={"full"}
      saveHandler={handleCreateTemplate}
    >
      {renderDefaultStep()}
      {renderAddTemplateStep()}
    </ModalWrapper>
  );
};

export default ManageFolderModal;
