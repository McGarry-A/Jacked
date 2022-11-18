import { useAppDispatch } from "../store";
import { notify } from "../store/notificationSlice";

interface notificationHandlerProps {
  type: "success" | "error" | "info" | null;
  title: string;
  content?: string;
  show: boolean;
}

type clear = "clear";

type props = clear | notificationHandlerProps;

const useNotification = () => {
  const dispatch = useAppDispatch();
  console.log("NOTIFY HOOK")

  const handleNotify = (notificationProps: props) => {
    if (typeof notificationProps === "string") {
        return dispatch(notify({ title: "", content: "", type: null, show: false }))
    }

    return dispatch(notify({ ...notificationProps }))
  };

  return { handleNotify }
};
export default useNotification;
