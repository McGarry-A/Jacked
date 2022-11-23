import { Button, Input, Modal, Text, VStack } from "native-base";
import { useState } from "react";
import useId from "../hooks/useId";
import { useAppDispatch } from "../store";
import { createFolder } from "../store/templateSlice";

interface IProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ModalContainer(props: IProps) {
  const [folderTitle, setFolderTitle] = useState<string>("");
  const dispatch = useAppDispatch()

  const handleSaveFolder = () => {
    const newFolId = useId("fol")
    dispatch(createFolder({ newFolId, title: folderTitle}))
    setIsVisible(false)
  }

  const { isVisible, setIsVisible } = props;
  return (
    <>
      <Modal isOpen={isVisible} onClose={setIsVisible} size={"sm"}>
        <Modal.Content maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Create Folder</Modal.Header>
          <Modal.Body>
            <VStack>
              <Text>Folder Title</Text>
              <Input
                type="text"
                onChangeText={(text) => setFolderTitle(text)}
              />
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setIsVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={handleSaveFolder}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
