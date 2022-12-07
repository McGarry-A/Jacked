import moment from "moment"
import { useEffect, useState } from "react"
import { useAppSelector } from "../store"
import getPreviousMondays from "../utils/getPreviousMonday"
import usePreviousWorkoutDates from "./usePreviousWorkoutDates"

const useSessionFrequency = () => {
    const [labels, setLabels] = useState<string[]>([])
    const [values, setValues] = useState<number[]>([])

    const { userId } = useAppSelector((state) => state.userSlice.user);
    const { workoutDates, isLoading } = usePreviousWorkoutDates(userId);
    
    useEffect(() => {
        const labels = getPreviousMondays(4);
        const moments = workoutDates.map((el) => {
          return moment(el.date).startOf("week").format("DD/MM")
        });
      
        const counts: {
          [key: string]: number;
        } = {};
      
        labels.forEach(label => {
          counts[label] = 0
        })
      
        const newMoments: {
          [key: string]: number
        } = moments.reduce((acc: any, curr) => {
          return acc[curr] >= 0 ? ++acc[curr] :  null, acc
        }, counts)

        setLabels(Object.keys(newMoments))
        setValues(Object.values(newMoments))
    }, [isLoading])

    return { labels, values }

}

export default useSessionFrequency