import { createSlice } from "@reduxjs/toolkit";

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
  });

export const {} = currentWorkoutSlice.actions;

export default currentWorkoutSlice.reducer;
