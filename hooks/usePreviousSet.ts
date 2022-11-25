import { useEffect, useState } from "react";
import getPreviousSet from "../supabase/utils/getPreviousSet";

interface IProps {
    exerciseId: number;
    setNumber: number;
}

export default function usePreviousSet(props: IProps) {
    const [previous, setPrevious] = useState<string>("")

    const { exerciseId, setNumber } = props

    useEffect(() => {
        const getPrevData = async () => {
            try {
                const previous = await getPreviousSet({ exerciseId, setNumber });
                if (!previous) return setPrevious(`Na`);

                const { weight: prevWeight, reps: prevReps } = previous;
                return setPrevious(`${prevWeight} Kgs x ${prevReps}`);
            } catch (error) {
                console.error(error)
            }
        }

        getPrevData();
    }, [])

    return previous;
}