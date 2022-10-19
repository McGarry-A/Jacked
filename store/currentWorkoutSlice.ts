import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";
import CurrentWorkoutInterface, {
  SetInterface,
} from "../types/CurrentWorkoutInterface";

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
    startWorkout: (state, { payload }: { payload: startWorkoutProps }) => {
      const startTime = new Date().toLocaleTimeString();
      state.startTime = startTime;
      state.isActive = true;
    },
    setWorkoutTitle: (state, { payload }: { payload: setWorkoutTitleType }) => {
      state.workoutTitle = payload;
    },
    addLift: (state, { payload }: { payload: addLiftProps }) => {
      const { exerciseId, exerciseName, liftNumber, liftId } = payload;
      state.exercises[liftId] = {
        exerciseId,
        exerciseName,
        sets: {},
        liftNumber,
        liftId,
      };

      state.exerciseOrder.push(liftId);
    },
    addSet: (state, { payload }: { payload: addDeleteSetProps }) => {
      const { liftId, setId, setNumber } = payload;

      const newSet: SetInterface = {
        [setId]: {
          weight: "0",
          reps: "0",
          rpe: 0,
          setNumber: setNumber,
          setId,
        },
      };

      state.exercises[liftId].sets[setId] = newSet[setId];
    },
    deleteSet: (state, { payload }: { payload: addDeleteSetProps }) => {
      const { setId, liftId } = payload;
      delete state.exercises[liftId].sets[setId];
    },
    updateSet: (state, { payload }: { payload: updateSetProps }) => {
      const { liftId, setId, newSet } = payload;
      state.exercises[liftId].sets[setId] = { ...newSet };
    },
    cancelWorkout: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveWorkout.fulfilled, (state, payload) => {
        Object.assign(state, initialState);
        state.status = "success";
      })
      .addCase(saveWorkout.pending, (state, payload) => {
        state.status = "pending";
      })
      .addCase(saveWorkout.rejected, (state, payload) => {
        state.status = "error";
      });
  },
});

export const saveWorkout = createAsyncThunk(
  "current_workout/saveWorkout",
  async (_, { getState }) => {
    const state: any = getState();
    const workout = {
      finished_at: null,
      date: null,
      user_id: state.userSlice.user.userId,
      workout_name: state.currentWorkoutSlice.workoutTitle,
    };

    const lifts = Object.values(state.currentWorkoutSlice.exercises)
    const formattedLifts = lifts.forEach((el: any) => {
      delete el.liftId
      delete el.sets
    })

    console.log(formattedLifts)

    // make call to supadb to save workout into tables
    // add workout to workout table
    // save workout ID to use in the lift tables
    let workout_id = "";
    let liftIds = [];

    try {
      const { data, error } = await supabase
        .from("workouts")
        .insert(workout)
        .select("id");

      if (error) return console.error(error);

      const { id } = data[0];
      workout_id = id;
    } catch (error) {
      console.error(error);
    }

    // add all lifts to lifts tables
    // use workout Id as foreign key
    // save liftId to use in the set tables

    /*
    lift_id > auto
    created_at > auto
    exercise_id > ok
    exercise_name > ok
    user_id > ok
    workout_id > ok
    */
    try {
      const { data, error } = await supabase
        .from("lifts")
        .insert(lifts)
        .select("lift_id");

      if (error) return console.error(error);

      const { lift_id } = data[0]
    } catch (error) {
      console.error(error);
    }

    // add all sets to set tables
    // use liftId as foreign key
  }

  /*
    id
    created_at 
    finished_at
    date
    user_id
    workout_name
  */
);

type setWorkoutTitleType = string;

interface addDeleteSetProps {
  liftId: string;
  setId: string;
  setNumber: number;
}

interface updateSetProps {
  liftId: string;
  setId: string;
  newSet: {
    weight: string;
    reps: string;
    rpe: number;
    setNumber: number;
    setId: string;
  };
}

interface addLiftProps {
  exerciseId: number;
  exerciseName: string;
  userId: string;
  liftNumber: number;
  liftId: string;
}

interface startWorkoutProps {
  userId: string;
}

export const {
  cancelWorkout,
  setWorkoutTitle,
  startWorkout,
  addLift,
  addSet,
  deleteSet,
  updateSet,
} = currentWorkoutSlice.actions;

export default currentWorkoutSlice.reducer;
