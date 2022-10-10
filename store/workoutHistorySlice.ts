import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";
import {
  workoutHistoryType,
} from "../types/WorkoutHistoryInterface";

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHistory.fulfilled, (state, { payload }) => {
        if (typeof payload === "object") {
          const newState = payload.map((el) => {
            return state.history.push(el);
          });
        }

        state.status = "fulfilled";
      })
      .addCase(getHistory.rejected, (state, _) => {
        state.status = "rejected";
      });
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
      .eq("user_id", payload.userId);

    if (error) return console.error(error);
    return data as workoutHistoryType;
  }
);

export default workoutHistorySlice.reducer;
