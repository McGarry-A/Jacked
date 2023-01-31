import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { getHistory } from "../store/workoutHistorySlice";
import { refresh } from "../store/workoutHistorySlice";

export default function useHistory() {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.userSlice.user);
  const { status, history } = useAppSelector(
    (state) => state.workoutHistorySlice
  );

  const refreshHistory = () => dispatch(refresh());

  useEffect(() => {
    if (status === "idle") {
      dispatch(getHistory({ userId }));
    }
  }, [status]);

  return { history, refreshHistory };
}
