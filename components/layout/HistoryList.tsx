import { FlatList } from "native-base";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getHistory } from "../../store/workoutHistorySlice";
import Template from "./Template";

const HistoryList = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userSlice.user.userId);
  const history = useAppSelector((state) => state.workoutHistorySlice.history);
  const status = useAppSelector((state) => state.workoutHistorySlice.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getHistory({ userId: userId }));
    }
  }, [status]);

  return (
    <FlatList
      data={history}
      initialNumToRender={6}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Template
          width="full"
          workoutName={item.workout_name}
          lifts={item.lifts}
          date={item.date}
        />
      )}
    />
  );
};

export default HistoryList;
