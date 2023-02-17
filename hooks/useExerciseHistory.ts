import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { ISet } from "../types/WorkoutInterface";
import {
  getAcheivedOneRepMax,
  getBestPerformance,
} from "../utils/Workouts/getRecords";

export interface IExerciseHistory {
  [key: string]: {
    date: string;
    time: string;
    exercise_name: string;
    sets: ISet[];
  };
}

const useExerciseHistory = (exerciseId: number) => {
  const [exerciseHistory, setExerciseHistory] = useState<IExerciseHistory>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchExerciseHistory();
  }, []);

  const fetchExerciseHistory = async () => {
    try {
      setIsLoading(true);
      const { data: exercise_history_data, error: exercise_history_error } =
        await supabase
          .from("lifts")
          .select(
            `lift_id, created_at, exercise_name, set (weight, reps, setNumber), workout_id (workout_name)`
          )
          .eq("exercise_id", exerciseId)
          .order("created_at", { ascending: false })
          .limit(10);

      if (exercise_history_error) {
        console.error(exercise_history_error.message);
        setError(exercise_history_error.message);
        setIsLoading(false);
        return;
      }

      const newExerciseHistory = exercise_history_data.reduce((acc, lift) => {
        const {
          lift_id,
          exercise_name,
          set,
          workout_id: { workout_name },
        } = lift;
        const liftDate = new Date(lift.created_at).toLocaleDateString();
        const liftTime = new Date(lift.created_at).toLocaleTimeString();

        return {
          ...acc,
          [lift_id]: {
            workout_name,
            date: liftDate,
            time: liftTime,
            exercise_name,
            sets: set,
          },
        };
      }, {}) as IExerciseHistory;

      setIsLoading(false);
      setExerciseHistory(newExerciseHistory);
    } catch (e) {
      console.error(e.message);
      setError(e.message);
      setIsLoading(false);
    }
  };

  return { exerciseHistory, error, isLoading };
};

export default useExerciseHistory;
