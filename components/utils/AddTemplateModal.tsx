import { Button, Divider, Input, Modal, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import useId from "../../hooks/useId";
import { LiftData } from "../../screens/pages/AddExercisesTemplates";
import { useAppDispatch } from "../../store";
import { addLiftsToTemplate, createTemplate } from "../../store/templateSlice";
import { ExerciseList } from "../layout/ExerciseList";

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

  const dispatch = useAppDispatch();

  useEffect(() => {
    setError("");
  }, [templateName])

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
    };
    const addLiftsToTemplateProps = {
      params: liftData,
      folder: folId,
      tempId: templateId,
    };

    dispatch(createTemplate({ ...createTemplateProps }));
    dispatch(addLiftsToTemplate({ ...addLiftsToTemplateProps }));
    setIsVisible(false);
  };

  const renderTemplateName = () => {
    return (
      <Input
        onChangeText={(text) => setTemplateName(text)}
        placeholder="Template Name"
        fontSize={"md"}
        type="text"
      />
    );
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
    <Modal isOpen={isVisible} onClose={setIsVisible} size={"md"}>
      <Modal.Content maxH="4/5" w={"full"}>
        <Modal.CloseButton />
        <Modal.Header borderBottomWidth={0}>Add Template</Modal.Header>
        <Modal.Body>
          {error !== "" && (
            <Text italic={true} color={"red.500"}>
              *{error}
            </Text>
          )}
          <VStack>
            {renderTemplateName()}
            <Divider borderWidth={1} my={3} borderColor={"coolGray.200"} />
            {renderList()}
          </VStack>
        </Modal.Body>
        <Modal.Footer borderTopWidth={0}>
          <Button.Group space={2}>
            <Button backgroundColor={"info.500"} onPress={handleCreateTemplate}>
              <Text fontWeight={"semibold"} color={"coolGray.100"}>
                Save
              </Text>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AddTemplateModal;
