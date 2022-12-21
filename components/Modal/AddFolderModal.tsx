import { Input, VStack } from "native-base";
import { useState } from "react";
import useId from "../../hooks/useId";
import { useAppDispatch, useAppSelector } from "../../store";
import { createFolder } from "../../store/templateSlice";
import ModalWrapper from "./ModalWrapper";

interface IProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddFolderModal(props: IProps) {
  const { isVisible, setIsVisible } = props;
  const { userId } = useAppSelector((state) => state.userSlice.user);

  const [folderTitle, setFolderTitle] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleSaveFolder = () => {
    dispatch(createFolder({ title: folderTitle, userId }));
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
