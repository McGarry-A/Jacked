import { createSlice } from "@reduxjs/toolkit";
import CurrentWorkoutInterface from "../types/CurrentWorkoutInterface";

const initialState: CurrentWorkoutInterface = {
  workoutTitle: "",
  isActive: false,
  exercises: [],
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
    startWorkout: (state, { payload }: { payload: startWorkoutProps }) => {
      const startTime = new Date().toLocaleTimeString();
      state.startTime = startTime;
      state.isActive = true;
    },
    setWorkoutTitle: (state, { payload }: { payload: setWorkoutTitleType }) => {
      state.workoutTitle = payload;
    },
    addLift: (state, { payload }: { payload: addLiftProps }) => {
      const { exerciseId, exerciseName, liftNumber } = payload;

      const newLift = {
        exerciseId,
        exerciseName,
        sets: [],
        liftNumber
      };

      state.exercises.push(newLift);
      state.exerciseOrder.push(exerciseId);
    },
    addSet: (state, { payload }) => {},
    deleteSet: (state, { payload }) => {},
    cancelWorkout: (state) => (state = initialState),
    saveWorkout: (state) => {
      Object.assign(state, initialState);
    },
  },
});

type setWorkoutTitleType = string;

interface addSetProps {
  exerciseId: number;
  setNumber: number;
  liftId: number;
}

interface updateSetProps {
  setId: number;
  newSet: {
    weight: string;
    reps: string;
    rpe: number;
    setNumber: number;
  };
}

interface addLiftProps {
  exerciseId: number;
  exerciseName: string;
  userId: string;
  liftNumber: number;
}

interface stateInterface {
  currentWorkoutSlice: CurrentWorkoutInterface;
  userSlice: any;
  ExerciseListSlice: any;
}

interface startWorkoutProps {
  userId: string;
}

export const {
  saveWorkout,
  cancelWorkout,
  setWorkoutTitle,
  startWorkout,
  addLift,
  addSet,
  deleteSet,
} = currentWorkoutSlice.actions;

export default currentWorkoutSlice.reducer;
