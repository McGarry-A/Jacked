import { faCalendar } from "@fortawesome/free-regular-svg-icons/faCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Heading, HStack, Skeleton, View } from "native-base";
import { lazy, Suspense, useState } from "react";
import CtaButton from "../../components/layout/CtaButton";
import ListFooter from "../../components/layout/ListFooter";
import useColorScheme from "../../hooks/useColorScheme";
import useHistory from "../../hooks/useHistory";
import { useAppSelector } from "../../store";

const HistoryCard = lazy(() => import("../../components/layout/HistoryCard"));

export default function History() {
  const [page, setPage] = useState<number>(1);
  const { history } = useHistory(page);
  const { screenColorMode, h1ColorMode } = useColorScheme();
  const navigation = useNavigation();

  const isLoaded =
    useAppSelector((state) => state.workoutHistorySlice.status) === "fulfilled";

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
        keyExtractor={({ id }) => String(id)}
        flexGrow={1}
        onEndReached={() => {
          console.log("PAGE " + page);
          setPage((page) => page + 1);
        }}
        onEndReachedThreshold={0.2}
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
