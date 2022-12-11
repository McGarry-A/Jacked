import { faCalendar } from "@fortawesome/free-regular-svg-icons/faCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Heading, HStack, View } from "native-base";
import CtaButton from "../../components/layout/CTAButton";
import HistoryCard from "../../components/layout/HistoryCard";
import useHistory from "../../hooks/useHistory";

export default function History() {
  const { history, isLoading, refreshHistory } = useHistory();
  const navigation = useNavigation();
  console.log(history)

  const renderHeader = () => {
    return (
      <HStack justifyContent={"space-between"} alignItems={"center"} my={2}>
        <Heading size={"xl"} color="coolGray.700">
          History
        </Heading>
        <CtaButton
          onPress={() => navigation.navigate("Calendar")}
          size={"xs"}
          leftIcon={
            <FontAwesomeIcon icon={faCalendar} size={12} color={"#0284c7"} />
          }
        >
          Calendar
        </CtaButton>
      </HStack>
    );
  };

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
    <View
      backgroundColor={"coolGray.50"}
      padding={3}
      paddingBottom={10}
      h={"full"}
    >
      {renderHeader()}
      {renderSessions()}
    </View>
  );
}
