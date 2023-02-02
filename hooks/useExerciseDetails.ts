import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { ISet } from "../types/WorkoutInterface";

interface IUseExerciseDetails {
    exerciseId: number;
}

interface IExerciseDetails {
    exercise_details: {
        id: number;
        name: string;
        description: string;
        image: string;
        category: string;
    },
    exercise_history: {
        lifts: {
            created_at: string;
            sets: ISet
        }[]
    },
    exercise_records: {
        achieved_one_rep_max: string;
        estimated_one_rep_max: string;
        max_volume: string;
        best_performance_reps: {
            reps: number;
            weight: string;
            estimated_one_rep_max: string;
            date: string;
        }[]
    }
}

const useExerciseDetails = ({ exerciseId }: IUseExerciseDetails) => {
    const [details, setDetails] = useState<any>()
    const [error, setError] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchWorkoutDetails = async () => {
            try {
                const { data, error } = await supabase.from("lifts").select()
            } catch (e) {
                console.error(e.message)
                setError(e.message)
            }
        }

        fetchWorkoutDetails()
    }, [])


    return { details, error, isLoading }
}

export default useExerciseDetails;