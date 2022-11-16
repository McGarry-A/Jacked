import { createSlice } from "@reduxjs/toolkit";
import { LiftInterface, SetInterface } from "../types/CurrentWorkoutInterface";

interface InitialStateInterface {
  status: "fulfilled" | "pending" | "rejected" | "idle";
  templates: {
    [key: string]: {
      exercises: {
        [key: string]: {
          exerciseId: number;
          exerciseName: string;
          sets: SetInterface;
        };
      };
      exerciseOrder: string[];
      templateName: string;
      tempId: string;
    };
  };
}

const initialState: InitialStateInterface = {
  status: "idle",
  templates: {
    "temp-00": {
      exercises: {
        "ex-00": {
          exerciseId: 2,
          exerciseName: "Barbell Bench Press",
          sets: {},
        },
        "ex-01": {
          exerciseId: 3,
          exerciseName: "Barbell Squat",
          sets: {},
        },
        "ex-02": {
          exerciseId: 6,
          exerciseName: "Seated Shoulder Press",
          sets: {},
        },
      },
      exerciseOrder: ["ex-00"],
      templateName: "Example Template",
      tempId: "temp-00"
    },
    "temp-01": {
        exercises: {
          "ex-00": {
            exerciseId: 2,
            exerciseName: "Barbell Bench Press",
            sets: {},
          },
          "ex-01": {
            exerciseId: 3,
            exerciseName: "Barbell Squat",
            sets: {},
          },
          "ex-02": {
            exerciseId: 6,
            exerciseName: "Seated Shoulder Press",
            sets: {},
          },
        },
        exerciseOrder: ["ex-00"],
        templateName: "Second Template",
        tempId: "temp-01"
      },
  },
};

const templateSlice = createSlice({
  name: "template",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default templateSlice.reducer;
