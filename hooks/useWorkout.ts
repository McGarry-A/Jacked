import { useEffect, useState } from "react";
import { LiftData } from "../screens/modals/AddExercises";
import { useAppSelector } from "../store";
import { supabase } from "../supabase/supabaseClient";

const useWorkout = (workoutId: number) => {
    const { userId } = useAppSelector((state) => state.userSlice.user)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>()
    const [workout, setWorkout] = useState<LiftData[]>([])

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const { data, error } = await supabase
                    .from("lifts")
                    .select(`exercise_id, exercise_name, lift_id, user_id, set (weight, reps), workouts (id, date)`)
                    .eq("user_id", userId)
                    .eq("workout_id", workoutId)

                if (error) {
                    setError(error.message)
                    setIsLoading(false)
                    return
                }

                setWorkout(data)
                setIsLoading(false)
            } catch (error) {
                console.error(error)
            }
        }

        fetchWorkout()
    }, [])

    return { isLoading, error, workout }
}

export default useWorkout