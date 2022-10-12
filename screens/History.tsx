import { FlatList, Heading, Box } from "native-base";
import { useEffect, useState } from "react";
import Template from "../components/layout/Template";
import { useAppDispatch, useAppSelector } from "../store";
import { getHistory } from "../store/workoutHistorySlice";

export default function TabThreeScreen() {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userSlice.user.userId);
  const history = useAppSelector((state) => state.workoutHistorySlice.history);

  useEffect(() => {
    dispatch(getHistory({ userId: userId }));
    setLoading(false)
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

  return (
    <Box backgroundColor={"white"} padding={3} paddingBottom={10}>
      {renderHeading()}
      {renderSessions()}
    </Box>
  );
}
