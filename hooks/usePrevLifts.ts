import { useEffect, useState } from "react"
import { supabase } from "../supabase/supabaseClient";

interface props {
    userId: string;
    limit: number;
    exerciseId: number;
}

const usePrevLifts = ({ userId, limit, exerciseId }: props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from("lifts")
                    .select(`exercise_id, exercise_name, lift_id, user_id, set (weight, reps), workouts (id, date)`)
                    .match({ user_id: userId, exercise_id: exerciseId })
                    .order(`lift_id`, { ascending: false })
                    .limit(limit)

                if (error) {
                    console.error(error);
                }

                data && setData(data)
                setIsLoading(false)
            } catch (error) {
                console.error(error)
                setError(true)
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return { data, error, isLoading }
}

export default usePrevLifts