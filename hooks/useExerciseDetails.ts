import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { ISet } from "../types/WorkoutInterface";

interface IUseExerciseDetails {
  exerciseId: number;
}

interface IExerciseDetails {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}
interface IExerciseHistory {
  [key: string]: {
    date: string;
    time: string;
    exercise_name: string;
    sets: ISet;
  }[];
}

interface IExerciseRecords {
  achieved_one_rep_max: string;
  estimated_one_rep_max: string;
  max_volume: string;
  best_performance_reps: {
    reps: number;
    weight: string;
    estimated_one_rep_max: string;
    date: string;
  }[];
}

interface IReturn {
  details: {
    exercise_details: IExerciseDetails;
    exercise_history: IExerciseHistory;
    // exercise_records: IExerciseRecords;
  };
  error: string | undefined;
  isLoading: boolean;
}

const useExerciseDetails = ({ exerciseId }: IUseExerciseDetails) => {
  const [details, setDetails] = useState<any>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("ISLOADING", isLoading);
    const fetchExerciseDetails = async () => {
      try {
        const { data: exercise_details_data, error: exercise_details_error } =
          await supabase
            .from("exercises")
            .select("id, exercise_name, category, description, image")
            .eq("id", exerciseId);

        if (exercise_details_error) {
          console.error(exercise_details_error.message);
          setError(exercise_details_error.message);
          return {};
        }

        const exercise_details: IExerciseDetails = {
          id: exercise_details_data[0].id,
          name: exercise_details_data[0].exercise_name,
          description: exercise_details_data[0].description,
          image: exercise_details_data[0].image,
          category: exercise_details_data[0].category,
        };

        return exercise_details;
      } catch (e) {
        console.error(e.message);
        setError(e.message);
      }
    };

    const fetchExerciseHistory = async () => {
      try {
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
          return;
        }

        return exercise_history_data.reduce((acc, lift) => {
          const liftDate = new Date(lift.created_at).toLocaleDateString();
          const liftTime = new Date(lift.created_at).toLocaleTimeString();
          return {
            ...acc,
            [lift.lift_id]: {
              workout_name: lift.workout_id.workout_name,
              date: liftDate,
              time: liftTime,
              exercise_name: lift.exercise_name,
              sets: lift.set,
            },
          };
        }, {}) as IExerciseHistory;
      } catch (e) {
        console.error(e.message);
        setError(e.message);
      }
    };

    const fetch = async () => {
      try {
        const exercise_details = await fetchExerciseDetails();
        const exercise_history = await fetchExerciseHistory();
        setDetails({ exercise_history, exercise_details });
        setIsLoading(false);
      } catch (e) {
        console.error(e.message);
        setError(e.message);
      }
    };

    fetch();
    console.log("ISLOADING", isLoading);
    console.log("DETAILS", details);
    console.log("ERROR", error);
  }, []);

  return { details, error, isLoading };
};

export default useExerciseDetails;
