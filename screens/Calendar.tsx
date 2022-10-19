import { View } from "native-base";
import { CalendarList } from "react-native-calendars";
import { useAppSelector } from "../store";

import useTodaysDate from "../hooks/useTodaysDate";

export default function Calendar() {
  const history = useAppSelector((state) => state.workoutHistorySlice.history);
  const historyObj = history
    .map((el) => el.date)
    .reduce((ac, a) => ({ ...ac, [a]: { selected: true } }), {});

  console.log(historyObj);

  console.log(history);
  const maxDate = useTodaysDate();

  return (
    <View backgroundColor={"white"} flex={1}>
      <CalendarList
        maxDate={maxDate}
        markedDates={historyObj}
        minDate={"2022-01-01"}
      />
    </View>
  );
}
