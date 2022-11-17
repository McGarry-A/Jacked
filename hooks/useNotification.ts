import { useAppDispatch } from "../store"
import { notify } from "../store/NotificationSlice";

interface notificationHandlerProps {
    type: "success" | "error" | "info" | null;
    title: string;
    content?: string;
    show: boolean;
}

type clear = "clear"

type props = clear | notificationHandlerProps

const useNotification = (notificationProps: props) => {
    const dispatch = useAppDispatch()
    
    if (typeof notificationProps === "string") {
        return dispatch(notify({
            title: "",
            type: null,
            content: "",
            show: false
        }))
    }

    return dispatch(notify({ ...notificationProps }))
}

export default useNotification