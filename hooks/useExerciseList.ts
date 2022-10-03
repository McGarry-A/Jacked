import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

export const useExerciseList = () => {
  const [list, setList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const { data, error } = await supabase
          .from("exercises")
          .select();
        if (error) {
          return console.error(error);
        }
        if (data) {
          console.log(JSON.stringify(data));
          setList(data);
          setIsLoading(false);
          setError(false);
        }
      } catch (error) {
        setList([]);
        setIsLoading(false);
        setError(true);
      }
    };

    fetchWorkouts();
  }, []);

  return { list, isLoading, error };
};
