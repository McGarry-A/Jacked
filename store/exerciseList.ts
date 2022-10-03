import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ExerciseInterface from "../types/ExerciseInterface";
import { supabase } from "../supabase/supabaseClient";

interface InitialStateInterface {
    status: "fulfilled" | "pending" | "rejected" | "idle",
    exerciseList: ExerciseInterface[]
}

const initialState: InitialStateInterface = {
    status: "idle",
    exerciseList: []
}

const exerciseListSlice = createSlice({
    name: "exercise_list",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllExercises.fulfilled, (state, { payload }) => {
            state.status = 'fulfilled'
            state.exerciseList = payload
        }),
        builder.addCase(fetchAllExercises.rejected, (state, action) => {
            state.status = "rejected"
        }),
        builder.addCase(fetchAllExercises.pending, (state, action) => {
            state.status = 'pending'
        })
}})

export const fetchAllExercises = createAsyncThunk(
    'exercise_list/getAllExercises',
    async () => {
        const { data, error } = await supabase.from("exercises").select();
        if (error) return []
        return data
    }
)

export default exerciseListSlice.reducer