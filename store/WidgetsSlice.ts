import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";

interface IInitialState {
  status: "fulfilled" | "pending" | "rejected" | "idle";
  widgets: {
    [key: string]: {
      type: "bar" | "line";
      title: string;
      subtitle: string;
      data: {
        labels: string[];
        datasets: {
          data: number[];
          color: (opacity: number) => any;
        }[];
      };
    };
  };
}

const initialState: IInitialState = {
  status: "idle",
  widgets: {},
};

const widgetSlice = createSlice({
  name: "widget_slice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBestSet.fulfilled, (state, { payload }) => {
        // NOTE: manipulate data into the shape that we need
        // add to state
        state.status = "fulfilled";
        console.log(payload);
      })
      .addCase(getBestSet.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getBestSet.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getPreviousWorkoutDates.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getPreviousWorkoutDates.fulfilled, (state, { payload }) => {
        state.status = "fulfilled";
        console.log(payload);
      })
      .addCase(getPreviousWorkoutDates.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// start by fetching estimates 1RM for specific exercise based on best set per workout
interface getBestSetProps {
  exerciseId: number;
  userId: string;
}

interface getPreviousWorkoutDates {
  userId: string;
}

export const getPreviousWorkoutDates = createAsyncThunk(
  "widget_slice/getPreviouseWorkoutDates",
  async (payload: getPreviousWorkoutDates, { rejectWithValue }) => {
    const { userId } = payload;

    const { data, error } = await supabase
      .from("workouts")
      .select("date")
      .match({ user_id: userId })
      .limit(10)

    if (error) {
      console.error(error);
      rejectWithValue([]);
    }

    return data;
  }
);

export const getBestSet = createAsyncThunk(
  "widget_slice/getBestSet",
  async (payload: getBestSetProps, { rejectWithValue }) => {
    const { exerciseId, userId } = payload;

    const { data, error } = await supabase
      .from("lifts")
      .select(`exercise_id, lift_id, user_id, set (weight, reps), workouts (id)`)
      .match({ user_id: userId, exercise_id: exerciseId })
      .order(`lift_id`, { ascending: false })
      .limit(20)

    if (error) {
      console.error(error);
      rejectWithValue([]);
    }

    return data;
  }
);

export default widgetSlice.reducer;
