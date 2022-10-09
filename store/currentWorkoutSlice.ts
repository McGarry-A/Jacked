import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";
import CurrentWorkoutInterface from "../types/CurrentWorkoutInterface";

const initialState: CurrentWorkoutInterface = {
  workoutTitle: "",
  isActive: false,
  exercises: {},
  exerciseOrder: [],
  startTime: "",
  finishTime: "",
  totalSets: 0,
  totalVolume: 0,
  status: "idle",
};

const currentWorkoutSlice = createSlice({
  name: "current_workout",
  initialState: initialState,
  reducers: {
    cancelWorkout: (state) => (state = initialState),
    setWorkoutTitle: (state, { payload }) => {
      state.workoutTitle = payload;
    },
    startWorkout: (state) => {
      const startTime = new Date().toLocaleTimeString();
      state.startTime = startTime;
      state.isActive = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSet.pending, (state, payload) => {
        state.status = "pending";
      })
      .addCase(addSet.rejected, (state, payload) => {
        state.status = "error";
      })
      .addCase(addSet.fulfilled, (state, { payload }) => {
        const { exerciseId, id } = payload;

        state.exercises[exerciseId].sets[id] = {
          weight: payload.weight,
          reps: payload.reps,
          rpe: payload.rpe,
          setNumber: payload.setNumber,
        };
      })
      .addCase(addLift.fulfilled, (state, { payload }) => {
        const { exercise_id, exercise_name } = payload;
        state.exercises[exercise_id] = {
          exerciseId: exercise_id,
          exerciseName: exercise_name,
          sets: {},
        };
        state.exerciseOrder.push(exercise_id);
      })
      .addCase(addLift.rejected, (state, _) => {
        state.status = "error";
      })
      .addCase(deleteSet.fulfilled, (state, { payload }) => {
        const { id, exerciseId } = payload;
        state.status = "success";
        delete state.exercises[exerciseId].sets[id];
      })
      .addCase(endWorkout.fulfilled, (state, _) => {
        state.status = "success";
        console.log("reset state to initial")
        Object.assign(state, initialState)
      });
  },
});

interface endWorkoutProps {
  userId: string;
  workoutTitle: string
}

export const endWorkout = createAsyncThunk(
  "current_workout/endWorkout",
  async (payload: endWorkoutProps, _) => {
    const { userId, workoutTitle } = payload;
    const newWorkout = {
      date: new Date().toLocaleDateString(),
      user_id: userId,
      workout_name: workoutTitle
    };

    const { data, error } = await supabase
      .from("workouts")
      .insert([newWorkout]);

    if (error) return console.error(error);

    return data[0];
  }
);

interface deleteProps {
  id: number;
  exerciseId: number;
}

export const deleteSet = createAsyncThunk(
  "current_workout/deleteSet",
  async (payload: deleteProps) => {
    const { id } = payload;
    const { data, error } = await supabase.from("set").delete().eq("id", id);

    if (error) return console.error(error);

    console.log(data);

    return data[0];
  }
);

interface addSetProps {
  exerciseId: number;
  setNumber: number;
}

export const addSet = createAsyncThunk(
  "current_workout/addSet",
  async (payload: addSetProps, _) => {
    const newSet = {
      exerciseId: payload.exerciseId,
      weight: "0",
      reps: "0",
      rpe: 0,
      setNumber: payload.setNumber,
    };

    const { data, error } = await supabase.from("set").insert([newSet]);

    if (error) return console.error(error);

    return data[0];
  }
);

interface updateSetProps {
  setId: number;
  newSet: {
    weight: string;
    reps: string;
    rpe: number;
    setNumber: number;
  };
}

export const updateSet = createAsyncThunk(
  "current_workout/updateSet",
  async (payload: updateSetProps) => {
    const {
      setId,
      newSet: { weight, reps, rpe, setNumber },
    } = payload;

    const { data, error } = await supabase
      .from("set")
      .update({ weight, reps, rpe, setNumber })
      .eq("id", setId);

    if (error) return console.error(error);
    console.log("Data returning is");
    console.log(data);
    return data;
  }
);

interface addLiftProps {
  exerciseId: number;
  exerciseName: string;
  userId: string;
}

export const addLift = createAsyncThunk(
  "current_workout/addLift",
  async (payload: addLiftProps, { getState }) => {
    const newLift = {
      exercise_id: payload.exerciseId,
      exercise_name: payload.exerciseName,
      user_id: payload.userId,
    };

    const { data, error } = await supabase.from("lifts").insert([newLift]);

    if (error) return console.error(error);

    return data[0];
  }
);

export const { startWorkout, cancelWorkout, setWorkoutTitle } =
  currentWorkoutSlice.actions;

export default currentWorkoutSlice.reducer;
