import { useEffect, useState } from "react"
import { useAppSelector } from "../store"
import { supabase } from "../supabase/supabaseClient"

const useTotalWorkouts = () => {
    const [totalWorkouts, setTotalWorkouts] = useState<number | null>(null)
    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { userId } = useAppSelector((state) => state.userSlice.user)

    const fetchTotalWorkouts = async () => {
        setIsLoading(true)

        try {
            const { data, count, error } = await supabase
                .from("workouts")
                .select("*", { count: "exact" })
                .eq("user_id", userId)

            if (error) {
                setError(error.message)
                setIsLoading(false)
                return
            }

            setTotalWorkouts(count)
            setIsLoading(false)
        } catch (e) {
            setError(e.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTotalWorkouts()
    }, [])

    return { isLoading, error, totalWorkouts }
}

export default useTotalWorkouts;