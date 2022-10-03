import { createSlice } from "@reduxjs/toolkit";
import CurrentWorkoutInterface from "../types/CurrentWorkoutInterface";

const initialState: CurrentWorkoutInterface = {
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
  });

export const {} = currentWorkoutSlice.actions;

export default currentWorkoutSlice.reducer;
