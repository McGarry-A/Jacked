import { faCalendar } from "@fortawesome/free-regular-svg-icons/faCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from "native-base";
import { View, FlatList, Text, StyleSheet } from "react-native"
import { lazy, Suspense, useState } from "react";
import CtaButton from "../../components/Layout/Buttons/CtaButton";
import ListFooter from "../../components/Lists/ListFooter";
import useColorScheme from "../../hooks/useColorScheme";
import useHistory from "../../hooks/useHistory";
import { useAppSelector } from "../../store";
import { constants } from "../../constants";

const HistoryCard = lazy(() => import("../../components/Layout/Cards/HistoryCard"));

export default function History() {
  const [page, setPage] = useState<number>(1);
  const { history } = useHistory(page);
  const { screenColorMode, h1ColorMode } = useColorScheme();
  const navigation = useNavigation();

  const isLoaded =
    useAppSelector((state) => state.workoutHistorySlice.status) === "fulfilled";

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          History
        </Text>
        <CtaButton
          onPress={() => navigation.navigate("Calendar")}
          leftIcon={
            <FontAwesomeIcon icon={faCalendar} size={12} color={"#0284c7"} />
          }
        >
          Calendar
        </CtaButton>
      </View>
    );
  };

  const renderSessions = () => {
    return (
      <FlatList
        data={history}
        initialNumToRender={6}
        keyExtractor={({ id }) => String(id)}
        style={styles.list}
        onEndReached={() => {
          setPage((page) => page + 1);
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<ListFooter />}
        renderItem={({ item: { workout_name, lifts, date, id } }) => (
          <Suspense
            fallback={
              <Skeleton
                startColor={"gray.50"}
                endColor={"gray.100"}
                h={"40"}
                my={2}
              />
            }
          >
            <HistoryCard
              workoutName={workout_name}
              lifts={lifts}
              date={date}
              isLoaded={isLoaded}
              workoutId={id}
            />
          </Suspense>
        )}
      />
    );
  };

  return (
    <View style={styles.viewContainer}>
      {renderHeader()}
      {renderSessions()}
    </View>
  );
}

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: "white",
        padding: 3,
        paddingBottom: 10,
        height: "100%",
        paddingHorizontal: 12,
    },

    headerContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 12,
        flexDirection: "row",
    },

    header: {
        fontSize: constants.fonts.heading.size.md,
        fontWeight: "bold"
    },

    list: {
        flexGrow: 1,
    }
})
