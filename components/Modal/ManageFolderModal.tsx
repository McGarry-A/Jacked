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
}

const ManageFolderModal = (props: IManageFolderModal) => {
  const { isVisible, setIsVisible, folId } = props;

  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();

  const handleDeleteFolder = () => {
    dispatch(deleteFolder(folId));
    setIsVisible(false);
  };

  const handleCreateTemplate = () => {
    navigate("CreateTemplate");
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
