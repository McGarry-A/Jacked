import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";

interface InitialStateInterface {
    user: object;
    status: "fulfilled" | "pending" | "rejected" | "idle"
}

const initialState: InitialStateInterface = {
    user: {},
    status: "idle"
}

const exerciseListSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
            state.status = 'fulfilled'
            state.user = payload
        }),
        builder.addCase(fetchUser.rejected, (state, _) => {
            state.status = "rejected"
        }),
        builder.addCase(fetchUser.pending, (state, _) => {
            state.status = 'pending'
        })
}})

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => {
        const { data, error } = await supabase.from("exercises").select();
        if (error) return []
        return data
    }
)

export default exerciseListSlice.reducer