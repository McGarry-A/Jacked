import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  errorAtom,
  exerciseListAtom,
  isLoadingAtom,
} from "../store/store";
import { supabase } from "../supabase/supabaseClient";

export const useExerciseList = () => {
  const [list, setList] = useAtom(exerciseListAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useAtom(errorAtom);

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
