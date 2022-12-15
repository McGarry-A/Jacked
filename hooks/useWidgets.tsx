import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { getWidgets } from "../store/WidgetsSlice";

const useWidgets = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.userSlice.user);

  useEffect(() => {
    dispatch(getWidgets({ userId }));
  }, []);
};

export default useWidgets;
