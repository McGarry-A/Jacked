import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";

interface IInitialState {
    status: "fulfilled" | "pending" | "rejected" | "idle";
    widgets: {
        [key: string]: {
            type: "bar" | "line";
            title: string;
            subtitle: string;
            data: {
                labels: string[];
                datasets: {
                    data: number[]
                    color: (opacity: number) => any
                }[]
            }

        }
    }
}

const initialState: IInitialState = {
    status: "idle",
    widgets: {}
}

const widgetSlice = createSlice({
    name: "widget_slice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBestSet.fulfilled, (state, { payload }) => {
            // NOTE: manipulate data into the shape that we need
            // add to state
            state.status = "fulfilled"
        })
            .addCase(getBestSet.pending, (state) => {
                state.status = "pending"
            })
            .addCase(getBestSet.rejected, (state) => {
                state.status = "rejected"
            })
    },
});

// start by fetching estimates 1RM for specific exercise based on best set per workout

interface getBestSetProps {
    exerciseId: number;
    userId: string;
}

export const getBestSet = createAsyncThunk(
    "widget_slice/getBestSet",
    async (payload: getBestSetProps, { rejectWithValue }) => {
        const { exerciseId, userId } = payload;

        const { data, error } = await supabase
            .from("workouts")
            .select(`id, user_id, lifts (exercise_id, set (weight, reps))`)
            .match({ exercise_id: exerciseId, user_id: userId })
            .order("id", { ascending: true });

        if (error) return rejectWithValue([]);

        return data;
    }
);

export default widgetSlice.reducer;
