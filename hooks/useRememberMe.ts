import { useEffect, useState } from "react";
import { useAppDispatch } from "../store";
import { rememberSession } from "../store/userSlice";
import getFromAsyncStorage from "../utils/Auth/getFromAsyncStorage";
import getFromLocalStorage from "../utils/Auth/getFromLocalStorage";
import useIsApp from "./useIsApp";

const useRememberMe = () => {
  const dispatch = useAppDispatch();
  const isApp = useIsApp();

  useEffect(() => {
    if (isApp) {
      const handleMobileRememberMe = async () => {
        try {
          const session = await getFromAsyncStorage("JACKED__SESSION_TOKEN");

          if (session) {
            dispatch(rememberSession(session));
          }
        } catch (error) {
          console.error(error);
        }
      };

      handleMobileRememberMe();
    }

    if (!isApp) {
      const token = getFromLocalStorage("JACKED__SESSION_TOKEN");
      Object.keys(token).length && dispatch(rememberSession(token));
    }
  });
};

export default useRememberMe;
