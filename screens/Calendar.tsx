import { Text, View } from "native-base";
import {
  Calendar as CalendarComponent,
  CalendarList,
  Agenda,
} from "react-native-calendars";
import useTodaysDate from "../hooks/useTodaysDate";

export default function Calendar() {

  const maxDate = useTodaysDate()
  
  return (
    <View>
      <CalendarList maxDate={maxDate} />
    </View>
  );
}
