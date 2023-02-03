import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

const useExerciseRecords = (exerciseId: number) => {
  const [exerciseRecords, setExerciseRecords] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const fetchExerciseRecords = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("")
        .select()
        .eq("exercise_id", exerciseId)
        .order("date", { ascending: false });

      if (error) {
        console.error(error.message);
        setError(error.message);
        setIsLoading(false);
        return;
      }

      // setExerciseRecords(data);
      setIsLoading(false);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExerciseRecords();
  }, []);

  return { exerciseRecords, isLoading, error };
};

export default useExerciseRecords;
