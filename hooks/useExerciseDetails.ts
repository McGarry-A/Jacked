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

interface IReturn {
  details: {
    exercise_details: IExerciseDetails;
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

    

    const fetch = async () => {
      try {
        const exercise_details = await fetchExerciseDetails();
        setDetails({ exercise_details });
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
