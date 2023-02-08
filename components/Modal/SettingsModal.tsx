import { SetStateAction } from "react";
import { useAppDispatch } from "../../store";
import { reset } from "../../store/userSlice";
import ModalItem from "./ModalItem";
import ModalWrapper from "./ModalWrapper";

interface ISettingsModal {
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

const SettingsModal = (props: ISettingsModal) => {
  const { isVisible, setIsVisible } = props;
  const dispatch = useAppDispatch();

  const handleLogout = () => {};

  return (
    <ModalWrapper
      header="Settings"
      isOpen={isVisible}
      onClose={setIsVisible}
      size={"sm"}
    >
      <ModalItem pressHandler={handleLogout} colorScheme={"red"}>
        Logout
      </ModalItem>
    </ModalWrapper>
  );
};

export default SettingsModal;
