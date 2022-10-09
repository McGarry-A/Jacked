import { FlatList, Heading, Box } from "native-base";
import { useEffect } from "react";
import Template from "../components/layout/Template";
import { supabase } from "../supabase/supabaseClient";

export default function TabThreeScreen() {
  // get data from supabase
  // need template name (workouts), date (workouts), lifts (lifts)

  useEffect(() => {
    const getHistory = async () => {
      const { data, error } = await supabase
        .from("workouts")
        .select(`workout_name, date, id, lifts (exercise_name)`);

      if (error) return console.error(error);
      console.log(data);
    };

    getHistory();
  }, []);
  const renderHeading = () => <Heading size={"xl"}>History</Heading>;

  const renderSessions = () => {
    const data = [1, 2, 3, 4, 5, 5, 6];
    return (
      <FlatList data={data} renderItem={() => <Template width="full" />} />
    );
  };

  return (
    <Box backgroundColor={"white"} padding={3} paddingBottom={10}>
      {renderHeading()}
      {renderSessions()}
    </Box>
  );
}
