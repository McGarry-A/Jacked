import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { getHistory } from "../store/workoutHistorySlice";

export default function useHistory(page = 1) {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.userSlice.user);
  const { history } = useAppSelector(
    (state) => state.workoutHistorySlice
  );

  useEffect(() => {
    dispatch(getHistory({ userId, page }));
  }, [page]);

  return { history };
}
