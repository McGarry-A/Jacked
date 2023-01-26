import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { rememberSession } from "../store/userSlice";
import isSessionInLocalStorage from "../utils/Auth/isSessionInLocalStorage";

const useSessionInLocalStorage = () => {
    const session = isSessionInLocalStorage();
    const dispatch = useAppDispatch()

    useEffect(() => {
        Object.keys(session).length ? dispatch(rememberSession(session)) : null
    }, []);
}

export default useSessionInLocalStorage;