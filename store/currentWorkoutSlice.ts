import { createSlice } from "@reduxjs/toolkit";
import CurrentWorkoutInterface from "../types/CurrentWorkoutInterface";

const initialState: CurrentWorkoutInterface = {
  workoutTitle: "",
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
    addSetNumbers: (
      state,
      { payload: { exerciseId, setId, weight, reps } }
    ) => {
      state.exercises[exerciseId].sets[setId] = {
        weight: weight,
        reps: reps,
        rpe: 0,
      };
    },
  },
});

export const {
  startWorkout,
  finishWorkout,
  addLift,
  cancelWorkout,
  setWorkoutTitle,
  addSet,
  addSetNumbers
} = currentWorkoutSlice.actions;

export default currentWorkoutSlice.reducer;
