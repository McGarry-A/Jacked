import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Input, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import useId from "../../hooks/useId";
import { LiftData } from "../../screens/pages/AddExercisesTemplates";
import { useAppDispatch, useAppSelector } from "../../store";
import { createTemplate } from "../../store/templateSlice";
import { ExerciseList } from "../layout/ExerciseList";
import { faFile } from "@fortawesome/free-regular-svg-icons/faFile";
import ModalWrapper from "./ModalWrapper";

interface IProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  folId: string;
}

const AddTemplateModal = (props: IProps) => {
  const { isVisible, setIsVisible } = props;

  const [liftData, setLiftData] = useState<LiftData[]>([]);
  const [templateName, setTemplateName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { userId } = useAppSelector((state) => state.userSlice.user);

  const dispatch = useAppDispatch();

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

  return (
    <ModalWrapper
      header="Add Template"
      isOpen={isVisible}
      onClose={setIsVisible}
      width={"full"}
      saveHandler={handleCreateTemplate}
    >
      <VStack space={1}>
        {renderError()}
        {renderTemplateName()}
        {renderList()}
      </VStack>
    </ModalWrapper>
  );
};

export default AddTemplateModal;