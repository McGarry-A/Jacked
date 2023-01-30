import { useEffect, useState } from "react";
import { LiftData } from "../screens/modals/AddExercises";
import { useAppSelector } from "../store";
import { supabase } from "../supabase/supabaseClient";
import { ILifts, IWorkout } from "../types/WorkoutInterface";

const useWorkout = (workoutId: number) => {
  const { userId } = useAppSelector((state) => state.userSlice.user);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>();
  const [workout, setWorkout] = useState<IWorkout>();

  useEffect(() => {
    const fetch = async () => {
      const workoutDetails = await fetchWorkoutDetails();
      const liftDetails = await fetchLiftDetails();

      setWorkout({
        name: workoutDetails.workout_name,
        date: workoutDetails.date,
        id: workoutDetails.id,
        lifts: [...(liftDetails as ILifts[])],
      });

      setIsLoading(false);
    };

    fetch();
  }, []);

  const fetchWorkoutDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("workouts")
        .select("id, date, workout_name")
        .eq("user_id", userId)
        .eq("id", workoutId);

      if (error) {
        console.error(error.message);
        setIsLoading(false);
        setError(error.message);
        return;
      }

      return data[0];
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const fetchLiftDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("lifts")
        .select(
          `exercise_id, exercise_name, lift_id, 
                            set (weight, reps, setNumber)`
        )
        .eq("user_id", userId)
        .eq("workout_id", workoutId);

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      return data as ILifts[];
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  console.log("workout ", workout);
  return { isLoading, error, workout };
};

export default useWorkout;
