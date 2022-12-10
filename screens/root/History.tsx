import { FlatList, Heading, Box } from "native-base";
import HistoryCard from "../../components/layout/HistoryCard";
import useHistory from "../../hooks/useHistory";

export default function History() {
  const { history, isLoading, refreshHistory } = useHistory();

  const renderHeading = () => <Heading size={"xl"} color="coolGray.700">History</Heading>;

  const renderSessions = () => {
    return (
      <FlatList
        data={history}
        initialNumToRender={6}
        onRefresh={refreshHistory}
        refreshing={isLoading}
        keyExtractor={({ id }) => String(id)}
        flexGrow={1}
        renderItem={({ item: { workout_name, lifts, date } }) => (
          <HistoryCard
            workoutName={workout_name}
            lifts={lifts}
            date={date}
            isLoaded={!isLoading}
          />
        )}
      />
    );
  };

  return (
    <Box backgroundColor={"coolGray.50"} padding={3} paddingBottom={10} h={"full"}>
      {renderHeading()}
      {renderSessions()}
    </Box>
  );
}
