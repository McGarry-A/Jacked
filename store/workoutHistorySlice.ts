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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHistory.fulfilled, (state, { payload }) => {
        if (typeof payload === "object") {
          state.history = [];
          payload.map((el) => (state.history = [...state.history, el]));
        }
        state.status = "fulfilled";
      })
      .addCase(getHistory.rejected, (state, _) => {
        state.status = "rejected";
      })
      .addCase(deleteWorkout.pending, (state, _) => {
        state.status = "pending";
      })
      .addCase(deleteWorkout.fulfilled, (state, { payload }) => {
        state.status = "fulfilled";
        console.log("payload");
        console.log(payload);
        state.history.filter((el) => el.id !== payload);
      })
      .addCase(deleteWorkout.rejected, (state, _) => {
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
    const { data, error } = await supabase
      .from("workouts")
      .select(`id, workout_name, date, lifts (exercise_name)`)
      .order("id", { ascending: false })
      .eq("user_id", payload.userId);

    if (error) return console.error(error);
    return data as workoutHistoryType;
  }
);

export const deleteWorkout = createAsyncThunk(
  "workoutHistorySlice/deleteWorkout",
  async (payload: { workoutId: number }, thunkAPI) => {
    const { workoutId } = payload;

    console.log(workoutId);

    const { data, error } = await supabase
      .from("workouts")
      .delete()
      .match({ id: workoutId });

    if (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error);
    }

    console.log(data);

    return workoutId;
  }
);

export default workoutHistorySlice.reducer;
