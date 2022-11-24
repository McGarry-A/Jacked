import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchAllExercises } from "../store/exerciseList"

export const useExerciseList = () => {
  const [list, setList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const dispatch = useAppDispatch()
    const { exerciseList, status } = useAppSelector((state) => state.exerciseListSlice)

    useEffect(() => {
      if (status === "idle") {
        dispatch(fetchAllExercises())
        setIsLoading(false)
        return
      }

      if (status === "rejected") {
        setIsLoading(false)
        setError(true)
        return
      }

      if (status === "pending") {
        setIsLoading(true)
        return
      }

      if (status === "fulfilled") {
        setIsLoading(false)
        setList(exerciseList)
        return
      }
    })
  }, [status]);

  return { list, isLoading, error };
};
