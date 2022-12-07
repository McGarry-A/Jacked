import moment from "moment";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store";
import calculateOneRepMax from "../utils/calculateOneRepMax";
import usePrevLifts from "./usePrevLifts";

const useOneRepMaxGraph = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [exerciseName, setExerciseName] = useState<string>("");
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  const { userId } = useAppSelector((state) => state.userSlice.user);

  const { data, isLoading, error } = usePrevLifts({
    userId,
    limit: 6,
    exerciseId: 2,
  });

  useEffect(() => {
    if (isLoading || error) return;

    const { exercise_name } = data[0];
    setExerciseName(exercise_name);
    const set = data?.map((workout) => {
      return {
        sets: workout.set,
        date: workout.workouts.date,
      };
    });

    // getting array of the best set and date
    const getArrayOfBestSetAndDate = (setObj: any) => {
      return setObj.map((setItem: any) => {
        const { sets, date } = setItem;

        return sets.reduce((prev: any, current: any) => {
          return prev.weight * prev.reps > current.weight * prev.reps
            ? prev
            : { bestSet: current, date };
        }, {});
      });
    };

    // getting array of the dates // labels
    const labelsRaw = getArrayOfBestSetAndDate(set).map(
      (item: any) => item.date
    );
    const labelMoments = labelsRaw.map((label: any) =>
      moment(label).format("DD/MM")
    );

    // getting array of the datapoints
    const rawDataPoints = getArrayOfBestSetAndDate(set).map(
      (item: any) => item.bestSet
    );
    const dataPoints = calculateOneRepMax(rawDataPoints);

    setValues(dataPoints);
    setLabels(labelMoments);
    setIsLoaded(true);
  }, [data]);

  return { labels, values, exerciseName, isLoaded };
};

export default useOneRepMaxGraph;
