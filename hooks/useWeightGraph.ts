import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { getWeight } from "../store/weightSlice";

const useWeightTracker = () => {
  const { userId } = useAppSelector((state) => state.userSlice.user);
  const { status } = useAppSelector((state) => state.weightSlice);
  const { labels, values } = useAppSelector(
    (state) => state.weightSlice.weight
  );

  const dispatch = useAppDispatch();

  const isLoading = status === "pending" || status === "idle";

  useEffect(() => {
    if (status === "idle") dispatch(getWeight({ userId }));
  }, [status]);

  return { isLoading, labels, values };
};

export default useWeightTracker;
