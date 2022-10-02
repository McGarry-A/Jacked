import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";

interface initialStateInterface {
  exercises: {
    [key: number]: {
      exerciseId: number;
      setScheme: string[];
      repScheme: string[];
      weightScheme: string[];
    };
  };
  exerciseOrder: number[];
  startTime: string;
  finishTime: string;
}

const initialState: initialStateInterface = {
  exercises: {},
  exerciseOrder: [],
  startTime: "",
  finishTime: "",
};
/* FUCKED UP HERE CREATE AN EXERCISE LIST SLICE USING THIS CODE TY */

const currentWorkoutSlice = createSlice({
  name: "current_workout",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllExercises.fulfilled, (state, { payload }) => {
      state.exercises = payload
    })
  }
});

const fetchAllExercises = createAsyncThunk(
  "exercises/getAllExercises",
  async () => {
    const { data, error } = await supabase.from("exercises").select();
    if (error) return error
    return data
  }
);

export const {} = currentWorkoutSlice.actions;

export default currentWorkoutSlice;
