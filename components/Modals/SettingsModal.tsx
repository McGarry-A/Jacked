import { SetStateAction } from "react";
import { useAppDispatch } from "../../store";

import useIsApp from "../../hooks/useIsApp";
import { logout } from "../../store/userSlice";

import ModalItem from "./ModalItem";
import ModalWrapper from "./ModalWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ISettingsModal {
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

const SettingsModal = (props: ISettingsModal) => {
  const { isVisible, setIsVisible } = props;
  const dispatch = useAppDispatch();

  const isApp = useIsApp();

  const logoutOnApp = async () => {
    if (isApp) {
      try {
        await AsyncStorage.removeItem("JACKED__SESSION_TOKEN");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const logoutOnWeb = () => {
    if (!isApp) {
      localStorage.removeItem("JACKED__SESSION_TOKEN");
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    logoutOnApp();
    logoutOnWeb();
    setIsVisible(false);
  };

  return (
    <ModalWrapper
      header="Settings"
      isOpen={isVisible}
      onClose={setIsVisible}
      size={"sm"}
    >
      <ModalItem pressHandler={() => handleLogout()} colorScheme={"red"}>
        Logout
      </ModalItem>
    </ModalWrapper>
  );
};

export default SettingsModal;
