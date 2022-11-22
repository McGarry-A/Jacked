import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { folders } from "../data";
import { LiftData } from "../screens/modals/AddExercises";
import { TemplateSliceInterface } from "../types/TemplateSliceInterface";

const initialState: TemplateSliceInterface = {
  status: "idle",
  folders: folders
};

type TemplateNameType = string
type FolderNameType = string
type FolderIdType = string
type TemplateIdType = string
type LiftIdType = string

interface addLiftsToTemplateInterface {
  params: LiftData[];
  folder: FolderIdType;
  tempId: TemplateIdType
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

interface CreateTemplateInterface {
  folId: FolderIdType;
  title: TemplateNameType;
  tempId: TemplateIdType;
}

interface CreateFolderInterface {
  newFolId: FolderIdType;
  title: FolderNameType;
}

const templateSlice = createSlice({
  name: "template",
  initialState: initialState,
  reducers: {
    addLiftsToTemplate: (
      state,
      { payload }: PayloadAction<addLiftsToTemplateInterface>
    ) => {
      const { params, folder, tempId } = payload

      params.map(({ exerciseId, exerciseName, liftId }) => {
        state.folders[folder].templates[tempId].exercises[liftId] = {
          exerciseId,
          exerciseName,
          sets: {},
        };

        state.folders[folder].templates[tempId].exerciseOrder.push(
          liftId
        );
      });
    },
    createTemplate: (state, { payload }: PayloadAction<CreateTemplateInterface>) => {
      const { folId, title, tempId } = payload

      const newTemplate = {
        exercises: {},
        exerciseOrder: [],
        templateName: title,
        tempId: tempId,
      }

      state.folders[folId].templates[tempId] = newTemplate
    },
    removeLiftFromTemplate: (state, { payload }: PayloadAction<RemoveLiftInterface>) => {
      const { folId, tempId, liftId } = payload

      delete state.folders[folId].templates[tempId].exercises[liftId]
      state.folders[folId].templates[tempId].exerciseOrder.filter(el => el === liftId)
    },
    createFolder: (state, { payload: { title, newFolId } }: PayloadAction<CreateFolderInterface>) => {
      const newFolder = {
        templates: {},
        id: newFolId,
        name: title
      }

      state.folders[newFolId] = newFolder
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

export const { addLiftsToTemplate, createTemplate, createFolder, deleteFolder, emptyFolder, deleteTemplate } = templateSlice.actions;
export default templateSlice.reducer;