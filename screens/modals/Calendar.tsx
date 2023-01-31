import { View } from "native-base";
import { CalendarList } from "react-native-calendars";
import { useAppSelector } from "../../store";

import useTodaysDate from "../../hooks/useTodaysDate";
import { Dimensions } from "react-native";
import useIsApp from "../../hooks/useIsApp";

export default function Calendar() {
  const history = useAppSelector((state) => state.workoutHistorySlice.history);
  const historyObj = history
    .map((el) => el.date)
    .reduce((ac, a) => ({ ...ac, [a]: { selected: true } }), {});

  const maxDate = useTodaysDate();

  const isApp = useIsApp()

  const SCREEN_WIDTH_APP = Dimensions.get("window").width;
  const SCREEN_WIDTH = isApp ? SCREEN_WIDTH_APP : 500;

  return (
    <View
      backgroundColor={"white"}
      flex={1}
      _web={{
        maxW: "lg",
        w: "100%",
        mx: "auto",
        backgroundColor: "white",
        display: "flex"
      }}
    >
      <CalendarList
        maxDate={maxDate}
        markedDates={historyObj}
        minDate={"2022-01-01"}
        calendarWidth={SCREEN_WIDTH}
      />
    </View>
  );
}
