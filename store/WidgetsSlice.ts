import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";
import useId from "../hooks/useId"
import calculateOneRepMax from "../utils/calculateOneRepMax";

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
        state.status = "fulfilled";
        const widgetId = useId("wid")
        const type = "line"
        const labels = payload?.map((el) => el.workouts.date)
        const data = payload?.map((el) => calculateOneRepMax(el.sets))
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
      .select(`exercise_id, lift_id, user_id, set (weight, reps), workouts (id, date)`)
      .match({ user_id: userId, exercise_id: exerciseId })
      .order(`lift_id`, { ascending: false })
      .limit(6)

    if (error) {
      console.error(error);
      rejectWithValue([]);
    }

    return data;
  }
);

export default widgetSlice.reducer;


// NOTE: 
// SHAPE OF OBJECT
// {
// exercise_id: 2
// lift_id: 142
// set: Array(3)
// 0:
// reps: "10"
// weight: "90"
// __proto__: Object
// 1:
// reps: "10"
// weight: "100"
// __proto__: Object
// 2:
// reps: "10"
// weight: "110"
// __proto__: Object
// length: 3
// __proto__: Array(0)
// user_id: "5936f6bc-7db7-46d9-9af5-bc78ec84095e"
// workouts:
// id: 114
// }