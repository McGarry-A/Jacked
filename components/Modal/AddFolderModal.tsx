import { Input, VStack } from "native-base";
import { useState } from "react";
import useId from "../../hooks/useId";
import { useAppDispatch } from "../../store";
import { createFolder } from "../../store/templateSlice";
import ModalWrapper from "./ModalWrapper";

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
    <ModalWrapper
      isOpen={isVisible}
      onClose={setIsVisible}
      header="Create Folder"
      saveHandler={handleSaveFolder}
    >
      <VStack>
        <Input
          placeholder="Folder Title"
          fontSize={"md"}
          type="text"
          onChangeText={(text) => setFolderTitle(text)}
        />
      </VStack>
    </ModalWrapper>
  );
}
