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
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistory.fulfilled, (state, { payload }) => {
        if (typeof payload === "object") {
          payload.map((el) => (state.history = [...state.history, el]));
        }
        state.status = "fulfilled";
      })
      .addCase(getHistory.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getHistory.pending, (state) => {
        state.status = "pending";
      });
  },
});

interface getHistoryProps {
  userId: string;
  page: number;
}

export const getHistory = createAsyncThunk(
  "workoutHistorySlice/getHistory",
  async (payload: getHistoryProps) => {
    const { userId, page } = payload

    const currentPage = page - 1

    const { data, error } = await supabase
      .from("workouts")
      .select(
        `id, workout_name, date, lifts (exercise_name, set (weight, reps))`
      )
      .order("id", { ascending: false })
      .eq("user_id", userId)
      .range(currentPage * 10, page * 10)
      .limit(10);

    if (error) return console.error(error);
    return data as workoutHistoryType;
  }
);

export const { refresh } = workoutHistorySlice.actions;

export default workoutHistorySlice.reducer;
