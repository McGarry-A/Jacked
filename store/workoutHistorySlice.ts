import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";

interface InitialStateInterface {
  history: {};
  status: "fulfilled" | "pending" | "rejected" | "idle";
}

const initialState: InitialStateInterface = {
  history: {},
  status: "idle",
};

const workoutHistorySlice = createSlice({
  name: "workoutHistorySlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default workoutHistorySlice.reducer;
