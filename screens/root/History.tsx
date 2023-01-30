import { faCalendar } from "@fortawesome/free-regular-svg-icons/faCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Heading, HStack, View } from "native-base";
import CtaButton from "../../components/layout/CtaButton";
import HistoryCard from "../../components/layout/HistoryCard";
import useColorScheme from "../../hooks/useColorScheme";
import useHistory from "../../hooks/useHistory";

export default function History() {
  const { history, isLoading, refreshHistory } = useHistory();
  const { screenColorMode, h1ColorMode } = useColorScheme();
  const navigation = useNavigation();

  const renderHeader = () => {
    return (
      <HStack justifyContent={"space-between"} alignItems={"center"} my={2}>
        <Heading size={"xl"} color={h1ColorMode}>
          History
        </Heading>
        <CtaButton
          onPress={() => navigation.navigate("Calendar")}
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
        renderItem={({ item: { workout_name, lifts, date, id } }) => (
          <HistoryCard
            workoutName={workout_name}
            lifts={lifts}
            date={date}
            isLoaded={!isLoading}
            workoutId={id}
          />
        )}
      />
    );
  };

  return (
    <View
      backgroundColor={screenColorMode}
      padding={3}
      paddingBottom={10}
      h={"full"}
      _web={{
        maxW: "lg",
        w: "100%",
        mx: "auto",
      }}
    >
      {renderHeader()}
      {renderSessions()}
    </View>
  );
}
