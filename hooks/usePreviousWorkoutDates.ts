import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

const usePreviousWorkoutDates = (userId: string) => {
  const [workoutDates, setWorkoutDates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const { data, error } = await supabase
          .from("workouts")
          .select("date")
          .match({ user_id: userId })
          .limit(30)
          .order("date", { ascending: false })

        if (error) {
          console.error(error);
          setError(true);
          setIsLoading(false);
          return;
        }

        setWorkoutDates(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    fetchWorkouts();
  }, []);

  return { workoutDates, isLoading, error }
};

export default usePreviousWorkoutDates;
