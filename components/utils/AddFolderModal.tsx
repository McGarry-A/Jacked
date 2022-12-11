import { Button, Input, Modal, Text, VStack } from "native-base";
import { useState } from "react";
import useId from "../../hooks/useId";
import { useAppDispatch } from "../../store";
import { createFolder } from "../../store/templateSlice";

interface IProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddFolderModal(props: IProps) {
  const { isVisible, setIsVisible } = props;

  const [folderTitle, setFolderTitle] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleSaveFolder = () => {
    const newFolId = useId("fol");
    dispatch(createFolder({ newFolId, title: folderTitle }));
    setIsVisible(false);
  };

  return (
    <Modal isOpen={isVisible} onClose={setIsVisible} size={"sm"}>
      <Modal.Content maxH="212">
        <Modal.CloseButton />
        <Modal.Header borderBottomWidth={0}>Create Folder</Modal.Header>
        <Modal.Body>
          <VStack>
            <Text>Folder Title</Text>
            <Input type="text" onChangeText={(text) => setFolderTitle(text)} />
          </VStack>
        </Modal.Body>
        <Modal.Footer borderTopWidth={0}>
          <Button.Group space={2}>
            <Button backgroundColor={"info.500"} onPress={handleSaveFolder}>
              <Text fontWeight={"semibold"} color={"coolGray.100"}>
                Save
              </Text>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
