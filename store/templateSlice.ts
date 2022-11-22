import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

type FolderNameType = string
type FolderIdType = string
type TemplateIdType = string
type LiftIdType = string

interface addLiftsToTemplateInterface {
  params: LiftData[];
  folder: string;
  title: string;
}

interface deleteTemplateInterface {
  tempId: TemplateIdType,
  folId: FolderIdType
}

interface RemoveLiftInterface {
  folId: FolderIdType,
  tempId: TemplateIdType,
  liftId: LiftIdType
}

const templateSlice = createSlice({
  name: "template",
  initialState: initialState,
  reducers: {
    addLiftsToTemplate: (
      state,
      { payload }: PayloadAction<addLiftsToTemplateInterface>
    ) => {
      const { params, folder, title } = payload
      const newTemplateId = useId("temp");
      const newTemplate = {
        exercises: {},
        exerciseOrder: [],
        templateName: title,
        tempId: newTemplateId,
      };

      state.folders[folder].templates[newTemplateId] = newTemplate;

      params.map(({ exerciseId, exerciseName, liftId }) => {

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
    removeLiftFromTemplate: (state, { payload }: PayloadAction<RemoveLiftInterface>) => {
      const { folId, tempId, liftId } = payload

      delete state.folders[folId].templates[tempId].exercises[liftId]
      state.folders[folId].templates[tempId].exerciseOrder.filter(el => el === liftId)
    },
    createFolder: (state, { payload: folderName }: PayloadAction<FolderNameType>) => {
      const newFolderId = useId("fol")

      const newFolder = {
        templates: {},
        id: newFolderId,
        name: folderName
      }

      state.folders[newFolderId] = newFolder
    },
    deleteFolder: (state, { payload: folderId }: PayloadAction<FolderIdType>) => {
      delete state.folders[folderId]
    },
    emptyFolder: (state, { payload }) => {
      const { folderId } = payload
      state.folders[folderId].templates = {}
    },
    deleteTemplate: (state, { payload }: PayloadAction<deleteTemplateInterface>) => {
      const { folId, tempId } = payload
      delete state.folders[folId].templates[tempId]
    },
  },
  extraReducers: (builder) => { },
});

export const { addLiftsToTemplate, createFolder, deleteFolder, emptyFolder, deleteTemplate } = templateSlice.actions;
export default templateSlice.reducer;