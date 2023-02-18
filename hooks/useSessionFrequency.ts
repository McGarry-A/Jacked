import moment from "moment";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store";
import getPreviousMondays from "../utils/Date/getPreviousMonday";
import usePreviousWorkoutDates from "./usePreviousWorkoutDates";

const useSessionFrequency = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { userId } = useAppSelector((state) => state.userSlice.user);
  const { workoutDates, isLoading: isFetching } = usePreviousWorkoutDates(userId);

  useEffect(() => {
    if (isFetching) return 
    const labels = getPreviousMondays(6);
    const moments = workoutDates.map((el) => {
      return moment(el.date).startOf("week").format("DD/MM");
    });

    const counts: {
      [key: string]: number;
    } = {};

    labels.forEach((label) => (counts[label] = 0));

    const newMoments: {
      [key: string]: number;
    } = moments.reduce((acc: any, curr) => {
      return acc[curr] >= 0 ? ++acc[curr] : null, acc;
    }, counts);

    setLabels(Object.keys(newMoments));
    setValues(Object.values(newMoments));
    setIsLoading(false);
  }, [isFetching]);

  return { labels, values, isLoading };
};

export default useSessionFrequency;
