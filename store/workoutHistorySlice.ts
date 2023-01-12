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
      state.status = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistory.fulfilled, (state, { payload }) => {
        if (typeof payload === "object") {
          state.history = []
          payload.map((el) => (state.history = [...state.history, el]));
        }
        state.status = "fulfilled";
      })
      .addCase(getHistory.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getHistory.pending, (state) => {
        state.status = "pending"
      })
    // .addCase(deleteWorkout.fulfilled, (state, { payload: workoutId }) => {
    //   state.history.filter((el) => {
    //     console.log(el.id)
    //     console.log(workoutId)
    //     return el.id !== workoutId
    //   })

    //   state.status = "fulfilled"
    // })
    // .addCase(deleteWorkout.pending, state => {
    //   state.status = "pending"
    // })
    // .addCase(deleteWorkout.rejected, state => {
    //   state.status = "rejected"
    // })
  },
});

interface getHistoryProps {
  userId: string;
}

export const getHistory = createAsyncThunk(
  "workoutHistorySlice/getHistory",
  async (payload: getHistoryProps) => {
    console.log("Get History");
    const { data, error } = await supabase
      .from("workouts")
      .select(`id, workout_name, date, lifts (exercise_name, set (weight, reps))`)
      .order("id", { ascending: false })
      .eq("user_id", payload.userId)
      .limit(10)

    if (error) return console.error(error);
    return data as workoutHistoryType;
  }
);

// export const deleteWorkout = createAsyncThunk(
//   "workoutHistorySlice/deleteWorkout",
//   async (payload: number, { rejectWithValue }) => {
//     const { error } = await supabase
//       .from("workouts")
//       .delete()
//       .eq("id", payload)

//     console.log(payload)

//     if (error) {
//       console.error(error)
//       return rejectWithValue(error.message)
//     }

//     return payload
//   }
// )

export const { refresh } = workoutHistorySlice.actions

export default workoutHistorySlice.reducer;
