import { FlatList, Heading, Box } from "native-base";
import { useEffect, useState } from "react";
import HistoryCard from "../../components/layout/HistoryCard";
import { useAppDispatch, useAppSelector } from "../../store";
import { getHistory } from "../../store/workoutHistorySlice";

export default function History() {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userSlice.user.userId);
  const history = useAppSelector((state) => state.workoutHistorySlice.history);

  const status = useAppSelector((state) => state.workoutHistorySlice.status)
  const isLoaded = status === "fulfilled"

  useEffect(() => {
    dispatch(getHistory({ userId: userId }));
    setLoading(false);
  }, [loading]);

  const toggleRefresh = () => setLoading(!loading);
  const renderHeading = () => <Heading size={"xl"}>History</Heading>;

  const renderSessions = () => {
    return (
      <FlatList
        data={history}
        initialNumToRender={6}
        onRefresh={toggleRefresh}
        refreshing={loading}
        keyExtractor={({ id }) => String(id)}
        flexGrow={1}
        renderItem={({ item: { workout_name, lifts, date } }) => (
          <HistoryCard
            workoutName={workout_name}
            lifts={lifts}
            date={date}
            isLoaded={isLoaded}
          />
        )}
      />
    );
  };

  return (
    <Box backgroundColor={"white"} padding={3} paddingBottom={10} h={'full'}>
      {renderHeading()}
      {renderSessions()}
    </Box>
  );
}
