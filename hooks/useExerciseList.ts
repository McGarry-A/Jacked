import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchAllExercises } from "../store/exerciseList";

export default function useExerciseList() {
  const dispatch = useAppDispatch()
  const { exerciseList, status } = useAppSelector((state) => state.exerciseListSlice)

  useEffect(() => {
    if (!Object.keys(exerciseList).length) {
      dispatch(fetchAllExercises());
      return;
    }
  }, [status]);

  return { exerciseList, status };
}
