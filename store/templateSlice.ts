import { createSlice } from "@reduxjs/toolkit";
import { LiftInterface, SetInterface } from "../types/CurrentWorkoutInterface";

interface InitialStateInterface {
  status: "fulfilled" | "pending" | "rejected" | "idle";
  folders: {
    [key: string]: {
      name: string;
      id: string;
      templates: {
        [key: string]: {
          exerciseOrder: string[];
          templateName: string;
          tempId: string;
          exercises: {
            [key: string]: {
              exerciseId: number;
              exerciseName: string;
              sets: SetInterface;
            };
          };
        };
      };
    };
  };
}

const initialState: InitialStateInterface = {
  status: "idle",
  folders: {
    "fol-00": {
      name: "Example Workouts",
      id: "fol-00",
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
          tempId: "temp-00",
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
          tempId: "temp-01",
        },
      },
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
