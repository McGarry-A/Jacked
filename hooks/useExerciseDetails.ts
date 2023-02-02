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
            exercise_name: string;
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
    const [details, setDetails] = useState<IExerciseDetails>()
    const [error, setError] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchExerciseDetails = async () => {
            try {
                const { data: exercise_details, error: exercise_details_error } = await supabase
                    .from("exercises")
                    .select("id, exercise_name, category, description, image")
                    .eq("id", exerciseId)

                if (exercise_details_error) {
                    console.error(exercise_details_error.message)
                    setError(exercise_details_error.message)
                    return
                }

                return exercise_details[0]
            } catch (e) {
                console.error(e.message)
                setError(e.message)
            }
        }

        const fetchExerciseHistory = async () => {
            try {
                const { data: exercise_history, error: exercise_history_error } = await supabase
                    .from("lifts")
                    .select(`created_at, exercise_name, set (weight, reps, setNumber)`)
                    .eq("exercise_id", exerciseId)

                if (exercise_history_error) {
                    console.error(exercise_history_error.message)
                    setError(exercise_history_error.message)
                    return
                }

                return exercise_history[0]
            } catch (e) {
                console.error(e.message)
                setError(e.message)
            }
        }
        // NOTE: 
        // DO THE OTHER 2 FIRST AND THEN COME BACK TO THIS ONE
        // const fetchExerciseRecords = async () => {
        //     try {


        //     } catch (e) {
        //         console.error(e.message)
        //         setError(e.message)
        //     }
        // }

        fetchExerciseHistory()
        fetchExerciseDetails()
    }, [])


    return { details, error, isLoading }
}

export default useExerciseDetails;