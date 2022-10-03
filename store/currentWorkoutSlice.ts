import { createSlice } from "@reduxjs/toolkit";
import CurrentWorkoutInterface from "../types/CurrentWorkoutInterface";

const initialState: CurrentWorkoutInterface = {
  workoutTitle: '',
  exercises: {},
  exerciseOrder: [],
  startTime: "",
  finishTime: "",
  totalSets: 0,
  totalVolume: 0
};

const currentWorkoutSlice = createSlice({
  name: "current_workout",
  initialState: initialState,
  reducers: {},
  });

export const {} = currentWorkoutSlice.actions;

export default currentWorkoutSlice.reducer;
