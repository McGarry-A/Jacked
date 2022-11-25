import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { getHistory } from "../store/workoutHistorySlice";
import { workoutHistoryType } from "../types/WorkoutHistoryInterface";
import { refresh } from "../store/workoutHistorySlice";

export default function useHistory() {
    const [history, setHistory] = useState<workoutHistoryType>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    const dispatch = useAppDispatch()
    const { userId } = useAppSelector(state => state.userSlice.user)
    const { status, history: historySlice } = useAppSelector(state => state.workoutHistorySlice)

    const refreshHistory = () => dispatch(refresh())

    useEffect(() => {
        if (status === "idle") {
            dispatch(getHistory({ userId }))
            setIsLoading(false)
            return
        }
        if (status === "fulfilled") {
            setIsLoading(false)
            setHistory(historySlice)
            return
        }
        if (status === "pending") {
            setIsLoading(true)
            return
        }
        if (status === "rejected") {
            setIsLoading(false)
            setError(true)
            setHistory([])
        }
    }, [status])

    return { history, isLoading, error, refreshHistory }

}