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
    finishWorkout: (state, _) => {
      const finishTime = new Date().toLocaleTimeString();
      state.finishTime = finishTime;
    },
    addLift: (state, { payload: { id, exercise_name } }) => {
      state.exercises[id] = {
        exerciseId: id,
        exerciseName: exercise_name,
        sets: [],
      };
      state.exerciseOrder.push(id);
    },
    addSet: (state, { payload }) => {
      state.exercises[payload].sets.push({ weight: "0", reps: "0", rpe: 0 });
    },
    deleteSet: (state, { payload }) => {
      const { exerciseId, setId } = payload;

      const newState = state.exercises[exerciseId].sets.splice(
        Number(setId),
        1
      );
      state.exercises[exerciseId].sets = newState;
    },
    addSetNumbers: (
      state,
      { payload: { exerciseId, setId, newWeight, newReps } }
    ) => {
      state.exercises[exerciseId].sets[setId] = {
        weight: newWeight,
        reps: newReps,
        rpe: 0,
      };
    },
  },
});

// export const endWorkout = createAsyncThunk(
//   "current_workout/endWorkout",
//   async (_, { getState }) => {
//     const state: CurrentWorkoutInterface = getState()
    
//     const { data, error } = await supabase.from("workouts").insert([
//       {
//         exercises: "",
//         total_sets: "",
//         total_weight_moved: "",
//         date: new Date().toLocaleDateString(),
//         userId: "",
//         finished_at: state.finishTime
//       },
//     ]);
//   }
// );

export const {
  startWorkout,
  finishWorkout,
  addLift,
  cancelWorkout,
  setWorkoutTitle,
  addSet,
  deleteSet,
  addSetNumbers,
} = currentWorkoutSlice.actions;

export default currentWorkoutSlice.reducer;
