import { createSlice } from "@reduxjs/toolkit";
import useId from "../hooks/useId";
import { LiftData } from "../screens/modals/AddExercises";
import { TemplateSliceInterface } from "../types/TemplateSliceInterface";

const initialState: TemplateSliceInterface = {
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

interface addLiftsToTemplateInterface {
  params: LiftData[];
  folder: string;
  title: string;
}

const templateSlice = createSlice({
  name: "template",
  initialState: initialState,
  reducers: {
    addLiftsToTemplate: (
      state,
      { payload }: { payload: addLiftsToTemplateInterface }
    ) => {
      const { params, folder, title } = payload;
      const newTemplateId = useId("temp");

      const newTemplate = {
        exercises: {},
        exerciseOrder: [],
        templateName: title,
        tempId: newTemplateId,
      };

      state.folders[folder].templates[newTemplateId] = newTemplate;

      params.map((el) => {
        const { exerciseId, exerciseName, liftId } = el;

        state.folders[folder].templates[newTemplateId].exercises[liftId] = {
          exerciseId,
          exerciseName,
          sets: {},
        };

        state.folders[folder].templates[newTemplateId].exerciseOrder.push(
          liftId
        );
      });
    },
    createFolder: (state, { payload }) => {
      const { folderName } = payload
      const newFolderId = useId("fol")

      const newFolder = {
        templates: {},
        id: newFolderId,
        name: folderName
      }

      state.folders[newFolderId] = newFolder
    }
  },
  extraReducers: (builder) => { },
});

export const { addLiftsToTemplate, createFolder } = templateSlice.actions;
export default templateSlice.reducer;