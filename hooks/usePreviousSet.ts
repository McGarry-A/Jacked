import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

interface IProps {
    exerciseId: number;
    setNumber: number;
}

interface ISet {
    weight: string;
    reps: string;
    rpe: number;
    setNumber: number;
}


// NOTE: FIX THIS AND THE SET TO USE A REF TO DECIDE THE INITIAL VALUE OF THE PLACEHOLDER 
export default function usePreviousSet(props: IProps) {
    const [previous, setPrevious] = useState<ISet>()
    const { exerciseId, setNumber } = props

    useEffect(() => {
        getPrevData();
    }, [])

    const getPrevData = async () => {
        try {
            try {
                const { data, error } = await supabase
                    .from("set")
                    .select("weight, reps, liftId, setNumber, rpe")
                    .eq("exerciseId", exerciseId)
                    .eq("setNumber", setNumber)
                    .order("liftId", { ascending: false })
                    .limit(1);

                if (error) {
                    console.error(error);
                    return null;
                }

                // NOTE: 
                // ERROR HERE WHEN THERE IS NO DATA RETURNED
                // NEED TO HANDLE THAT CASE

                const { weight, reps, rpe } = data[0];

                setPrevious({
                    reps,
                    weight,
                    rpe,
                    setNumber
                })

            } catch (error) {
                console.error(error);
                return null;
            }


        } catch (error) {
            console.error(error)
        }
    }

    return previous;
}