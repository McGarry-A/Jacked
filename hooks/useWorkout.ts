import { useEffect, useState } from "react";
import { useAppSelector } from "../store";
import { supabase } from "../supabase/supabaseClient";

const useWorkout = (workoutId: number) => {
    const { userId } = useAppSelector((state) => state.userSlice.user)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>()
    const [workout, setWorkout] = useState()

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const { data, error } = await supabase
                    .from("workout")
                    .select(`id, date, title, lifts (
                        exercise_name, exercise_id, set(
                           weight, repps, setNumber )
                        )`)
                    .eq("user_id", userId)
                    .eq("id", workoutId)

                console.log(data)
                console.log(error)
            } catch (error) {
                console.error(error)
            }
        }

        fetchWorkout()
    }, [])

    return { isLoading, error, workout }
}

export default useWorkout