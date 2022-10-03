import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import currentWorkoutSlice from "./currentWorkoutSlice";
import exerciseListSlice from "./exerciseList"

const store = configureStore({
    reducer: {
        exerciseListSlice,
        currentWorkoutSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;

/*

// USEAGE IN COMPONENT ON LOAD

useEffect(() => {
    if (exercise_list.status === 'idle') {
        dispatch(fetchAllExercises())
    }
}, [])

// USEAGE TO SHOW LOADING STATE

if (exercise_list.status === 'pending') {
    return <div>loading...</div>
}
*/