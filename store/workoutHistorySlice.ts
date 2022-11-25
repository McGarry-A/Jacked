import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";
import { workoutHistoryType } from "../types/WorkoutHistoryInterface";

interface InitialStateInterface {
  history: workoutHistoryType;
  status: "fulfilled" | "pending" | "rejected" | "idle";
}

const initialState: InitialStateInterface = {
  history: [],
  status: "idle",
};

const workoutHistorySlice = createSlice({
  name: "workoutHistorySlice",
  initialState: initialState,
  reducers: {
    refresh: (state) => {
      state.status = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistory.fulfilled, (state, { payload }) => {
        if (typeof payload === "object") {
          state.history = []
          payload.map((el) => (state.history = [...state.history, el]));
        }
        state.status = "fulfilled";
      })
      .addCase(getHistory.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getHistory.pending, (state) => {
        state.status = "pending"
      })
  },
});

interface getHistoryProps {
  userId: string;
}

export const getHistory = createAsyncThunk(
  "workoutHistorySlice/getHistory",
  async (payload: getHistoryProps) => {
    console.log("Get History");
    const { data, error } = await supabase
      .from("workouts")
      .select(`id, workout_name, date, lifts (exercise_name)`)
      .order("id", { ascending: false })
      .eq("user_id", payload.userId);

    if (error) return console.error(error);
    return data as workoutHistoryType;
  }
);

export const { refresh } = workoutHistorySlice.actions

export default workoutHistorySlice.reducer;
