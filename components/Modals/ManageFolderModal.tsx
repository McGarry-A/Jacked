import { useNavigation } from "@react-navigation/native";
import { VStack } from "native-base";
import { useAppDispatch } from "../../store";
import { deleteFolder } from "../../store/templateSlice";
import ModalItem from "./ModalItem";
import ModalWrapper from "./ModalWrapper";

interface IManageFolderModal {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  folId: string;
  templateIds?: string[] | undefined;
}

const ManageFolderModal = (props: IManageFolderModal) => {
const { isVisible, setIsVisible, folId, templateIds } = props;

  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();

  const handleDeleteFolder = () => {
    dispatch(deleteFolder({ folderId: folId, templateIds }));
    setIsVisible(false);
  };

  const handleCreateTemplate = () => {
    setIsVisible(false);
    navigate("CreateTemplate", { folderId: folId });
  };

  const renderBody = () => {
    return (
      <VStack space={2}>
        <ModalItem hasChevron pressHandler={handleCreateTemplate}>
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
      width={"full"}
      flex={1}
    >
      {renderBody()}
    </ModalWrapper>
  );
};

export default ManageFolderModal;
