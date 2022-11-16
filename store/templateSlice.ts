import { createSlice } from "@reduxjs/toolkit";
import { LiftInterface } from "../types/CurrentWorkoutInterface";

interface InitialStateInterface {
  status: "fulfilled" | "pending" | "rejected" | "idle";
  folders: {
    [key: string]: {
        exercises: LiftInterface
        exerciseOrder: string[]
        templateName: string
    }
  }
}

const initialState: InitialStateInterface = {
  status: "idle",
  folders: {

  }
};

const templateSlice = createSlice({
  name: "template",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default templateSlice.reducer;
