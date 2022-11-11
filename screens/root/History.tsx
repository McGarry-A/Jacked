import { FlatList, Heading, Box, Text } from "native-base";
import { useEffect, useState } from "react";
import Template from "../../components/layout/Template";
import { useAppDispatch, useAppSelector } from "../../store";
import { getHistory } from "../../store/workoutHistorySlice";

export default function TabThreeScreen() {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userSlice.user.userId);
  const history = useAppSelector((state) => state.workoutHistorySlice.history);
  const noHistory = Object.keys(history).length === 0;

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
        renderItem={({ item: { workout_name, lifts, date } }) => (
          <Template
            width="full"
            workoutName={workout_name}
            lifts={lifts}
            date={date}
          />
        )}
      />
    );
  };

  if (noHistory) {
    return (
      <Box
        backgroundColor={"white"}
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text>No Workouts Here! Get in the Gym!</Text>
      </Box>
    );
  }

  return (
    <Box backgroundColor={"white"} padding={3} paddingBottom={10}>
      {renderHeading()}
      {renderSessions()}
    </Box>
  );
}
